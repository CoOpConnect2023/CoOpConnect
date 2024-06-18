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
}
