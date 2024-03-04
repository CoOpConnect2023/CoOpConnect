<?php

namespace App\Http\Controllers;

use App\Models\Message; // Make sure to use your actual Message model
use Illuminate\Http\Request;
use Inertia\Inertia;

class MessagingController extends Controller
{
    public function index()
    {
        // You can pass data related to messages if needed
        return Inertia::render('Messaging', [
            // 'messages' => $messagesData, // Pass any necessary data
        ]);
    }

    public function getMessages(Request $request, $conversationId)
    {
        // Ensure you have 'user' relation defined in your Message model to use 'with('user')'
        $messages = Message::where('conversation_id', $conversationId)
                            ->with('user') // Load the user relationship
                            ->get();

        return response()->json($messages);
    }

    public function sendMessage(Request $request)
    {
        $request->validate([
            'conversation_id' => 'required|exists:conversations,id',
            'body' => 'required',
        ]);

        $message = new Message();
        $message->conversation_id = $request->conversation_id;
        $message->user_id = $request->user()->id; // Ensure the user is authenticated
        $message->body = $request->body;
        $message->save();

        return response()->json($message);
    }
}
