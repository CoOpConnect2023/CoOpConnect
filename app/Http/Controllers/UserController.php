<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\School;
use App\Models\Courses;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Log;
use App\Models\Jobs;
use App\Imports\UsersImport;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\JsonResponse;
use Maatwebsite\Excel\Facades\Excel;
use App\Http\Requests\ChangePasswordRequest;
use Illuminate\Support\Facades\Hash;
use App\Mail\WelcomeEmail;
use Illuminate\Support\Facades\Mail;


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

    public function getAllStudents(Request $request)
    {
        // Fetch all users with the role of 'student', excluding the authenticated user
        $students = User::where('id', '!=', $request->user()->id)  // Exclude the authenticated user
            ->where('role', 'student')  // Filter users with the 'student' role
            ->get(['id','email']);  // Select only required fields

        // Return the filtered student data in JSON format
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
        $user->pronouns = $request->pronouns;
        $user->company_id = $request->company_id;


        if ($request->has('school_id')) {

            $user->school_id = $request->school_id !== 'null' && $request->school_id !== null ? $request->school_id : null;
        }

        $user->positiontitle = $request->positiontitle;



        $skills = $request->input('skills');
        if (is_string($skills)) {
            $skills = json_decode($skills, true);
        }
        $user->skills = $skills;

        if ($request->input('searching') == 1) {
            $user->searching = 1;
            $user->interviewing = 0;
            $user->working = 0;
            $user->status = 'searching';
        } elseif ($request->input('interviewing') == 1) {
            $user->searching = 0;
            $user->interviewing = 1;
            $user->working = 0;
            $user->status = 'interviewing';
        } elseif ($request->input('working') == 1) {
            $user->searching = 0;
            $user->interviewing = 0;
            $user->working = 1;
            $user->status = 'working';
        }

        $user->save();


        if ($request->has('status')) {
            $status = $request->input('status');

            if (in_array($status, ['hiring', 'nothiring'])) {
                $user->status = $status;
                $user->save();
                return response()->json(['message' => 'Status updated successfully', 'user' => $user]);
            } else {
                return response()->json(['error' => 'Invalid status'], 400);
            }
        }


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
        $coursesData = $request->input('courses');
        $jobsData = $request->input('jobs');

        if (empty($usersData) && empty($schoolsData) && empty($coursesData)) {
            return response()->json(['message' => 'No users, schools, or courses data received'], 400);
        }

        try {
            DB::beginTransaction();

            $createdUsers = [];
            $createdSchools = [];


            if (!empty($schoolsData)) {
                foreach ($schoolsData as $schoolData) {
                    $existingSchool = School::where('name', $schoolData['name'])->first();
                    if ($existingSchool) {

                        $createdSchools[$existingSchool->name] = $existingSchool->id;
                        continue;
                    }

                    $validator = Validator::make($schoolData, [
                        'name' => 'required|string|unique:schools,name',
                        'location' => 'required|string',
                        'description' => 'nullable|string',
                        'principal_name' => 'nullable|string|max:255',
                        'contact_email' => 'nullable|max:255|unique:schools,contact_email',
                        'contact_phone' => 'nullable|string|max:255|unique:schools,contact_phone',
                    ]);

                    if ($validator->fails()) {
                        continue;  // Skip creating the school if validation fails
                    }

                    // Create school and store the reference
                    $school = School::create($schoolData);
                    $createdSchools[$school->name] = $school->id; // Store the school ID by name
                }
            }

            // Handle users data after schools are created
            if (!empty($usersData)) {
                foreach ($usersData as $userData) {
                    $existingUser = User::where('email', $userData['email'])->first();
                    if ($existingUser) {
                        continue;  // Skip creating the user if they already exist
                    }

                    $schoolId = null;

                    // Check if school_id is provided and valid
                    if (isset($userData['school_id']) && School::where('id', $userData['school_id'])->exists()) {
                        $schoolId = $userData['school_id'];
                    }
                    // If school_name is provided, find or create the school by name
                    elseif (isset($userData['school_name'])) {
                        if (isset($createdSchools[$userData['school_name']])) {
                            $schoolId = $createdSchools[$userData['school_name']];
                        } else {
                            $existingSchool = School::where('name', $userData['school_name'])->first();
                            if ($existingSchool) {
                                $schoolId = $existingSchool->id;
                            } else {
                                // Optionally, create the school here if it doesn't exist
                                // $school = School::create([...]);
                                // $schoolId = $school->id;
                                continue;  // Skip creating the user if school is not found
                            }
                        }
                    }

                    // Set the school_id to the correct value
                    $userData['school_id'] = $schoolId;

                    $validator = Validator::make($userData, [
                        'name' => 'required|string',
                        'email' => 'required|email|unique:users,email',
                        'class' => 'nullable|string',
                        'password' => 'required|string|min:6',
                        'role' => 'required|string',
                        'school_id' => 'nullable|exists:schools,id',
                        'company_id' => 'nullable|exists:companies,id',
                    ]);

                    if ($validator->fails()) {
                        continue;  // Skip creating the user if validation fails
                    }

                    // Create user
                    $user = User::create($userData);
                    $createdUsers[] = $user;
                }
            }

            // Handle courses data
            if (!empty($coursesData)) {
                foreach ($coursesData as $courseData) {
                    $existingCourse = Courses::where('name', $courseData['name'])->first();
                    if ($existingCourse) {
                        continue;  // Skip creating the course if it already exists
                    }

                    $schoolId = null;

                    // Check if school_id is provided and valid
                    if (isset($courseData['school_id']) && School::where('id', $courseData['school_id'])->exists()) {
                        $schoolId = $courseData['school_id'];
                    }
                    // If school_name is provided, find or create the school by name
                    elseif (isset($courseData['school_name'])) {
                        if (isset($createdSchools[$courseData['school_name']])) {
                            $schoolId = $createdSchools[$courseData['school_name']];
                        } else {
                            $existingSchool = School::where('name', $courseData['school_name'])->first();
                            if ($existingSchool) {
                                $schoolId = $existingSchool->id;
                            } else {
                                continue;  // Skip creating the course if school is not found
                            }
                        }
                    } else {
                        continue;  // Skip creating the course if school_id or name is not provided
                    }

                    // Set the school_id to the correct value
                    $courseData['school_id'] = $schoolId;

                    // Ensure either teacher_id or teacher_name is provided
                    if (isset($courseData['teacher_id']) && User::where('id', $courseData['teacher_id'])->exists()) {
                        $teacherId = $courseData['teacher_id'];
                    } elseif (isset($courseData['teacher_name'])) {
                        $teacher = User::where('name', $courseData['teacher_name'])->first();
                        if ($teacher) {
                            $teacherId = $teacher->id;
                        } else {
                            continue;  // Skip creating the course if teacher is not found
                        }
                    } else {
                        continue;  // Skip creating the course if teacher ID or name is not provided
                    }

                    // Set the teacher_id to the correct value
                    $courseData['teacher_id'] = $teacherId;

                    $validator = Validator::make($courseData, [
                        'name' => 'required|string|unique:courses,name',
                        'description' => 'nullable|string',
                        'start_date' => 'required|date',
                        'end_date' => 'required|date|after_or_equal:start_date',
                        'school_id' => 'required|exists:schools,id',
                        'teacher_id' => 'required|exists:users,id',
                    ]);

                    if ($validator->fails()) {
                        continue;
                    }


                    Courses::create($courseData);
                }


                  if (!empty($jobsData)) {
                    foreach ($jobsData as $jobData) {
                        Log::info('Processing job data:', $jobData);


        if (isset($jobData['skills']) && is_string($jobData['skills'])) {

            $jobData['skills'] = explode(',', str_replace(['[', ']', "'"], '', $jobData['skills']));

            $jobData['skills'] = array_map('trim', $jobData['skills']);
        }


        $existingJob = Jobs::where('title', $jobData['title'])
            ->where('company_id', $jobData['company_id'])
            ->first();

        if ($existingJob) {
            Log::info('Skipping job creation, job already exists with title and company:', [
                'title' => $jobData['title'],
                'company_id' => $jobData['company_id']
            ]);
            continue;
        }




        $validator = Validator::make($jobData, [
            'title' => 'required|string',
            'description' => 'required|string',
            'skills' => 'required|array',
            'location' => 'required|string',
            'posting_status' => ['required', Rule::in(['Open', 'Closed'])],
            'job_type' => 'required|string',
            'company_id' => 'required|exists:companies,id',
            'user_id' => 'required|exists:users,id',
        ]);

        if ($validator->fails()) {
            Log::error('Job validation failed:', $validator->errors()->toArray());
            continue;
        }


        Log::info('Creating job with data:', $jobData);


        Jobs::create($jobData);

        Log::info('Job created successfully:', $jobData);
    }

                }
            }

            DB::commit();


            foreach ($createdUsers as $user) {
                Mail::to($user->email)->send(new WelcomeEmail($user));
            }

            return response()->json(['message' => 'Users, schools, and courses processed successfully'], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Failed to process users, schools, or courses', 'error' => $e->getMessage()], 500);
        }
    }

    //change password

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

    //update user prefs

    public function updatePreferences(Request $request)
{
    $user = Auth::user();
    $validatedData = $request->validate([
        'darkMode' => 'boolean',
        'fontSize' => 'sometimes|string|in:small,medium,large',
        'notifications' => 'sometimes|boolean',
    ]);

    if ($request->has('darkMode')) {
        $user->darkMode = $request->darkMode;
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
    }

    if ($request->has('notifications')) {
        $user->notifications = $request->notifications;
    }

    $user->save();
    return response()->json(['message' => 'Preferences updated successfully']);
}


    public function store(Request $request)
    {
        // Validate the incoming request
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8|confirmed',

        ]);

        // Create the user
        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            // You can also add additional fields here
        ]);

        // Return a response, you can return the newly created user or any message
        return response()->json([
            'message' => 'User created successfully!',
            'user' => $user
        ], 201);
    }



}








