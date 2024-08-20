<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\School;
use App\Models\Courses;
use App\Imports\UsersImport;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\JsonResponse;
use Maatwebsite\Excel\Facades\Excel;
use App\Http\Requests\ChangePasswordRequest;
use Illuminate\Support\Facades\Hash;


class UserController extends Controller
{
    /**
     * Display a listing of the users.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        // Fetch all users except the authenticated one and with the role of 'student'
        $students = User::where('id', '!=', $request->user()->id)
            ->where('role', 'student')
            ->get(['id', 'name', 'email', 'class']); // Add the required fields

        return response()->json($students);
    }

    public function getUserId()
    {
        $userId = Auth::id();

        // Fetch the user with their courses using eager loading
        $user = User::with('courses')->find($userId);

        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        // Fetch all user courses directly from the pivot table
        $userCourses = $user->courses()->get();

        // Return user ID, user courses, and any other necessary user data
        return response()->json([
            'user' => $user,
            'user_courses' => $userCourses,

        ]);
    }

    public function getStudentStatusPercentages(): JsonResponse
    {
        // Total number of students
        $totalStudents = User::where('role', 'student')->count();

        // Number of students in each status
        $statusCounts = User::where('role', 'student')
            ->select('status', DB::raw('count(*) as count'))
            ->groupBy('status')
            ->pluck('count', 'status');

        // Calculate percentages
        $percentages = [
            'working' => 0,
            'interviewing' => 0,
            'searching' => 0,
        ];

        if ($totalStudents > 0) {
            $percentages = [
                'working' => ($statusCounts->get('working', 0) / $totalStudents) * 100,
                'interviewing' => ($statusCounts->get('interviewing', 0) / $totalStudents) * 100,
                'searching' => ($statusCounts->get('searching', 0) / $totalStudents) * 100,
            ];
        }

        return response()->json($percentages);
    }

    public function updateProfile(Request $request, User $user)
    {
        if (!Auth::user()->isAdmin() && Auth::id() != $user->id) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        if ($request->hasFile('profile_image')) {
            $image = $request->file('profile_image');
            $imageName = time() . '.' . $image->getClientOriginalExtension();
            $image->storeAs('public/profile_images', $imageName);
            $user->profile_image = '/storage/profile_images/' . $imageName;
            info('Uploaded image path: ' . $user->profile_image);
        }

        
        $user->description = $request->description;
        $user->name = $request->name;
        $user->email = $request->email;
        $user->role = $request->role;


        if ($request->has('school_id')) {

            $user->school_id = $request->school_id !== 'null' && $request->school_id !== null ? $request->school_id : null;
        }

        $user->positiontitle = $request->positiontitle;
        $user->company_name = $request->company_name;


        $skills = $request->input('skills');
        if (is_string($skills)) {
            $skills = json_decode($skills, true);
        }
        $user->skills = $skills;

        $user->save();


        if ($request->has('courses')) {
            $courses = json_decode($request->input('courses'), true);
            if (is_array($courses)) {
                if (empty($courses)) {
                    $user->courses()->detach();
                } else {
                    $courseIds = array_column($courses, 'id');
                    $user->courses()->sync($courseIds);
                }
            }
        }

        info('Updated user data: ' . json_encode($user));

        return response()->json(['message' => 'Profile updated successfully', 'user' => $user]);
    }

    public function getStudentsByTeacherCourses(Request $request, $teacherId)
{

    $students = User::whereHas('courses', function ($query) use ($teacherId) {
            $query->where('teacher_id', $teacherId);
        })
        ->where('role', 'student')
        ->with(['courses' => function ($query) use ($teacherId) {
            $query->where('teacher_id', $teacherId);
        }])
        ->get(['id', 'name', 'email', 'profile_image', 'working', 'interviewing', 'searching']);

    // Calculate percentages for each status
    $totalStudents = $students->count();

    $workingCount = $students->where('working', 1)->count();
    $interviewingCount = $students->where('interviewing', 1)->count();
    $searchingCount = $students->where('searching', 1)->count();

    $percentages = [
        'working' => $totalStudents > 0 ? ($workingCount / $totalStudents) * 100 : 0,
        'interviewing' => $totalStudents > 0 ? ($interviewingCount / $totalStudents) * 100 : 0,
        'searching' => $totalStudents > 0 ? ($searchingCount / $totalStudents) * 100 : 0,
    ];

    // Transform student data to include courses
    $students = $students->map(function ($student) {
        $student->courses = $student->courses->map(function ($course) {
            return [
                'id' => $course->id,
                'name' => $course->name,
            ];
        });
         // Remove courses relationship

        return $student;
    });

    return response()->json([
        'students' => $students,
        'percentages' => $percentages,
    ]);
}


public function getAllUsers(Request $request)
{

    $users = User::all();


    return response()->json($users);
}

public function isAdmin()
{
    return $this->role === 'admin';
}

public function deleteUser(Request $request, $id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'User not found.'], 404);
        }


        if (!Auth::user()->isAdmin() && Auth::id() != $id) {
            return response()->json(['message' => 'Unauthorized. You are not allowed to delete this user.'], 403);
        }

        DB::table('interviews')
        ->where('interviewee_id', $id)
        ->orWhere('interviewer_id', $id)
        ->delete();


        $user->delete();

        return response()->json(['message' => 'User deleted successfully.']);
    }

    public function uploadUsers(Request $request)
{
    $usersData = $request->input('users');
    $schoolsData = $request->input('schools');

    if (empty($usersData) && empty($schoolsData)) {
        return response()->json(['message' => 'No users or schools data received'], 400);
    }

    try {
        // Handle users data
        if (!empty($usersData)) {
            foreach ($usersData as $userData) {
                $validator = validator()->make($userData, [
                    'name' => 'required|string',
                    'email' => 'required|email|unique:users,email',
                    'class' => 'required|string',
                    'password' => 'required|string|min:6',
                    'role' => 'required|string',
                ]);

                if ($validator->fails()) {
                    return response()->json(['message' => 'Validation failed for users', 'errors' => $validator->errors()], 400);
                }

                // Add remember_token to user data
                $userData['remember_token'] = Str::random(10);

                // Create user
                User::create($userData);
            }
        }

        // Handle schools data
        if (!empty($schoolsData)) {
            foreach ($schoolsData as $schoolData) {
                $validator = validator()->make($schoolData, [
                    'name' => 'required|string',
                    'location' => 'required|string',
                    'description' => 'nullable|string',
                    'principal_name' => 'nullable|string|max:255',
                    'contact_email' => 'nullable|email|max:255',
                    'contact_phone' => 'nullable|string|max:255',
                ]);

                if ($validator->fails()) {
                    return response()->json(['message' => 'Validation failed for schools', 'errors' => $validator->errors()], 400);
                }

                // Create school
                School::create($schoolData);
            }
        }

        return response()->json(['message' => 'Users and schools created successfully'], 201);
    } catch (\Exception $e) {
        return response()->json(['message' => 'Failed to create users or schools', 'error' => $e->getMessage()], 500);
    }
}

    public function changePassword(ChangePasswordRequest $request)
    {
        $user = Auth::user();

        if (!Hash::check($request->current_password, $user->password)) {
            return response()->json(['message' => 'Current password is incorrect'], 400);
        }

        $user->password = Hash::make($request->new_password);
        $user->save();

        return response()->json(['message' => 'Password updated successfully']);
    }

    public function updatePreferences(Request $request)
    {
        $user = Auth::user();


        Log::info('Updating user preferences', [
            'user_id' => $user->id,
            'request_data' => $request->all(),
        ]);


        $validatedData = $request->validate([
            'darkMode' => 'boolean',
            'fontSize' => 'sometimes|string|in:small,medium,large',
        ]);


        Log::info('Validated data', [
            'validated_data' => $validatedData,
        ]);


        if ($request->has('darkMode')) {
            $user->darkMode = $request->darkMode;
            Log::info('User dark mode updated', ['user_id' => $user->id, 'darkMode' => $user->darkMode]);
        }


        if ($request->has('fontSize')) {
            switch ($request->fontSize) {
                case 'small':
                    $user->fontSize = 'small';
                    break;
                case 'medium':
                    $user->fontSize = 'medium';
                    break;
                case 'large':
                    $user->fontSize = 'large';
                    break;
            }
            Log::info('User font size updated', ['user_id' => $user->id, 'fontSize' => $user->fontSize]);
        }


        $user->save();


        Log::info('User preferences saved', [
            'user_id' => $user->id,
            'darkMode' => $user->darkMode,
            'fontSize' => $user->fontSize,
        ]);

        return response()->json(['message' => 'Preferences updated successfully']);
    }


}








