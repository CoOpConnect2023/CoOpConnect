<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\Conversation;
use App\Models\Message;
use App\Models\User;

class MessagesController extends Controller
{
    public function store(Request $request)
{
    $validatedData = $request->validate([
        'content' => 'required|string',
    ]);


    if ($request->has('conversation_id')) {

        $validatedData['conversation_id'] = $request->validate([
            'conversation_id' => 'required|exists:conversations,id',
        ])['conversation_id'];
    } else {

        $conversation = new Conversation();
        $conversation->save();


        $validatedData['conversation_id'] = $conversation->id;
    }


    $message = new Message();
    $message->conversation_id = $validatedData['conversation_id'];
    $message->user_id = Auth::id();
    $message->content = $validatedData['content'];
    $message->save();

    return response()->json(['message' => 'Message sent successfully', 'message' => $message], 201);
}

    public function getMessages(Conversation $conversation)
    {
        $messages = Message::where('conversation_id', $conversation_id)->get();
    return response()->json($messages);
    }


    public function createConversation(Request $request)
{
    // Validate the incoming request data
    $request->validate([
        'recipient_email' => 'required|email',
        'content' => 'required|string',
        'user_id' => 'required|exists:users,id',
    ]);

    // Get the authenticated user based on user_id
    $user = User::findOrFail($request->user_id);

    // Find the recipient user by email
    $recipient = User::where('email', $request->recipient_email)->first();

    if (!$recipient) {
        return response()->json(['error' => 'Recipient not found'], 404);
    }

    // Check if a conversation already exists between these two users
    $conversation = Conversation::whereHas('users', function ($query) use ($user) {
        $query->where('user_id', $user->id);
    })
    ->whereHas('users', function ($query) use ($recipient) {
        $query->where('user_id', $recipient->id);
    })
    ->whereHas('users', function ($query) use ($user, $recipient) {
        $query->where('user_id', '<>', $user->id)
              ->where('user_id', '<>', $recipient->id);
    })
    ->first();

    // If conversation exists, return a message
    if ($conversation) {
        return response()->json(['message' => 'Conversation already exists', 'conversation_id' => $conversation->id], 200);
    }

    // If conversation doesn't exist, this block won't execute
    // Create a new conversation and message
    $conversation = new Conversation();
    $conversation->save();

    // Attach users to the conversation
    $conversation->users()->attach([$user->id, $recipient->id]);

    // Create a new message in this conversation
    $message = new Message();
    $message->content = $request->content;
    $message->conversation_id = $conversation->id;
    $message->user_id = $user->id; // Assuming the sender is the authenticated user
    $message->save();

    return response()->json(['message' => 'Conversation created successfully', 'conversation_id' => $conversation->id], 200);
}
}
