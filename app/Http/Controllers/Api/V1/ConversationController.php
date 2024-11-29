<?php

namespace App\Http\Controllers\Api\V1;

use App\Models\Conversation;
use App\Http\Controllers\Controller;
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

        $conversations = Conversation::whereHas('users', function ($query) use ($user_id) {
            $query->where('users.id', $user_id);
        })
        ->with([
            'users.company', // Load the company relationship
            'users.school',  // Load the school relationship
            'latestMessage' => function ($query) {
                $query->orderBy('created_at', 'desc');
            }
        ])
            ->orderByDesc('updated_at')
            ->get();

        // Attach the most recent message to each conversation
        $conversations->each(function ($conversation) {
            // Set the latest_message attribute to the latest message or null if no message exists
            $conversation->latest_message = $conversation->latestMessage ? $conversation->latestMessage : null;
            $conversation->unsetRelation('latestMessage'); // Remove the latestMessage relation
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

    public function getAllMessages()
{

}


}
