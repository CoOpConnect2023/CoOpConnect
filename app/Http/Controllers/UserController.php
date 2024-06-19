<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Conversation;
use App\Models\UserConversation;
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


      /**
     * Retrieve conversations associated with a user.
     *
     * @param  int  $userId
     * @return \Illuminate\Http\Response
     */
    public function getConversations($userId)
    {
      // Ensure the authenticated user matches $userId or handle authorization accordingly
      // (Similar to the commented section in the previous code)

      // Fetch user conversations
      $userConversations = UserConversation::where('user_id', $userId)->get();

      // Extract conversation IDs from user conversations
      $conversationIds = $userConversations->pluck('conversation_id');

      // Fetch conversations based on the retrieved IDs
      $conversations = Conversation::whereIn('id', $conversationIds)->get();

      // Return the conversations as JSON response
      return response()->json([
        'user' => Auth::user(),
        'conversations' => $conversations,
      ]);
    }


    public function deleteAccount($id)
    {
        try {
            // Find the user by ID
            $user = User::findOrFail($id);

            // Perform actions to delete user (example)
            $user->delete();

            // Optionally, perform additional cleanup tasks like deleting related records

            // Return success response
            return response()->json(['message' => 'Account deleted successfully'], 200);
        } catch (\Exception $e) {
            // Log any errors
            Log::error('Error deleting account: ' . $e->getMessage());

            // Return error response
            return response()->json(['error' => 'Could not delete account'], 500);
        }
    }



    public function updateProfile(Request $request, User $user)
{
    // Ensure the authenticated user matches the requested user ID
    if (Auth::user()->id !== $user->id) {
        return response()->json(['error' => 'Unauthorized'], 403);
    }

    // Handle profile image upload
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
    $user->skills = $request->skills;

    // Save user data
    $user->save();

    // Log the updated user data
    info('Updated user data: ' . json_encode($user));

    return response()->json(['message' => 'Profile updated successfully', 'user' => $user]);
}
}
