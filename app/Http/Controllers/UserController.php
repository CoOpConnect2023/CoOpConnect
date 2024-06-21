<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    /**
     * Display a listing of the users.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        // Fetch all users except the authenticated one
        $users = User::where('id', '!=', $request->user()->id)->get(['id', 'name']);

        return response()->json($users);
    }

    public function getUserId()
    {
        return response()->json(['user_id' => Auth::id()]);
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
