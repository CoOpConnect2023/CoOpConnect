<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\JsonResponse;


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
        return response()->json(['user_id' => Auth::id()]);
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

        if (Auth::user()->id !== $user->id) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }


        if ($request->hasFile('profile_image')) {
            $image = $request->file('profile_image');

            // Generate a unique file name
            $imageName = time() . '.' . $image->getClientOriginalExtension();

            // Store the image in the storage/app/public/profile_images directory
            $image->storeAs('public/profile_images', $imageName);

            // Update user's profile_image field in database
            $user->profile_image = '/storage/profile_images/' . $imageName;

            // Log the uploaded image path
            info('Uploaded image path: ' . $user->profile_image);
        }

        // Update other fields
        $user->description = $request->description;
        $user->name = $request->name;
        $user->email = $request->email;
        $user->role = $request->role;
        $user->school = $request->school;
        $user->positiontitle = $request->positiontitle;
        $user->company_name = $request->company_name;
        $user->skills = $request->skills;


        $user->save();


        info('Updated user data: ' . json_encode($user));

        return response()->json(['message' => 'Profile updated successfully', 'user' => $user]);
    }



}
