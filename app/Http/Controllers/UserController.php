<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Courses;
use App\Imports\UsersImport;
use Illuminate\Http\Request;
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

        // Update other fields
        $user->description = $request->description;
        $user->name = $request->name;
        $user->email = $request->email;
        $user->role = $request->role;
        $user->school_id = $request->school_id;
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
                    // If courses array is empty, remove all associated courses
                    $user->courses()->detach();
                } else {
                    // Extract course IDs from the courses array
                    $courseIds = array_column($courses, 'id');

                    // Sync user's courses with the provided course IDs
                    $user->courses()->sync($courseIds);
                }
            }
        }


        info('Updated user data: ' . json_encode($user));

        info('Updated user data: ' . json_encode($user));

        return response()->json(['message' => 'Profile updated successfully', 'user' => $user]);
    }

    public function getStudentsByTeacherCourses(Request $request, $teacherId)
{
    // Fetch students enrolled in courses where teacher_id matches $teacherId
    $students = User::whereHas('courses', function ($query) use ($teacherId) {
            $query->where('teacher_id', $teacherId);
        })
        ->where('role', 'student')
        ->with(['courses' => function ($query) use ($teacherId) {
            $query->where('teacher_id', $teacherId); // Filter courses by teacher_id
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

        if (empty($usersData)) {
            return response()->json(['message' => 'No users data received'], 400);
        }

        try {
            foreach ($usersData as $userData) {

                $validator = validator()->make($userData, [
                    'name' => 'required|string',
                    'email' => 'required|email|unique:users,email',
                    'class' => 'required|string',
                    'password' => 'required|string|min:6',
                    'role' => 'required|string',

                ]);

                if ($validator->fails()) {
                    return response()->json(['message' => 'Validation failed', 'errors' => $validator->errors()], 400);
                }

                // Create user
                User::create($userData);
            }

            return response()->json(['message' => 'Users created successfully'], 201);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to create users', 'error' => $e->getMessage()], 500);
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
}








