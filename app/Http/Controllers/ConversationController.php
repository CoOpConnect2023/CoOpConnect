<?php

namespace App\Http\Controllers;

use App\Models\Conversation;
use App\Models\Message; // Make sure to use your actual Message model
use Illuminate\Http\Request;
use Inertia\Inertia;

class ConversationController extends Controller
{
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'participants' => 'required|array|min:2',
        ]);

        $conversation = Conversation::create();

        $conversation->users()->attach($validatedData['participants']);

        return response()->json(['message' => 'Conversation created successfully', 'conversation' => $conversation], 201);
    }

    public function show($user_id)
{
    // Find all conversations where the given user ID participates
    $conversations = Conversation::whereHas('users', function ($query) use ($user_id) {
        $query->where('users.id', $user_id);
    })
    ->with(['users', 'messages' => function ($query) {
        $query->orderBy('created_at', 'desc'); // Order messages by created_at descending
    }])
    ->orderBy('updated_at', 'desc') // Ensure conversations are ordered chronologically by last update
    ->get();

    // Attach the most recent message to each conversation
    $conversations->each(function ($conversation) {
        $conversation->latest_message = $conversation->messages->first();
        $conversation->unsetRelation('messages'); // Remove the messages relation to only include the latest message
    });

    return response()->json(['conversations' => $conversations]);
}

    public function getMessages($conversation_id)
{
    $messages = Message::where('conversation_id', $conversation_id)->get();
    return response()->json($messages);
}


public function getCurrentConversation($id)
    {
        // Retrieve the conversation with the given ID
        $conversation = Conversation::with(['users'])->find($id);

        if (!$conversation) {
            return response()->json(['error' => 'Conversation not found'], 404);
        }

        return response()->json(['conversation' => $conversation]);
    }


}
