<?php

namespace App\Http\Controllers;

use App\Models\Message; // Make sure to use your actual Message model
use App\Models\Conversation;
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

    // public function getMessages(Request $request, $conversationId)
    // {
    //     // Ensure you have 'user' relation defined in your Message model to use 'with('user')'
    //     $messages = Message::where('conversation_id', $conversationId)
    //                         ->with('user') // Load the user relationship
    //                         ->get();

    //     return response()->json($messages);
    // }

    public function sendMessage(Request $req)
    {
        $validated = validator($req->all(),[
            'body' => 'required'
        ]);

        if($validated->fails()){
            $res = array(
                "status" => -1,
                "message" => "The given data is either empty or invalid.",
                "errors" => $validated->errors()
            );

            return response()->json($res);
        }

        $send_id = $req->input("send_id");
        $recv_id = $req->input("recv_id");

        $conversation_id = Conversation::where('send_id', '=', $send_id)
        ->where("recv_id",'=',$recv_id)->pluck('id')->first();
        $body = $req->input("body");

        $message = new Message();
        $message->conversation_id = $conversation_id;
        $message->body = $body;
        $message->save();
    }

    public function fetchMessages(Request $req)
    {
        $conversation_id = $req->input('conversation_id');

        $send_id = Conversation::where('id', '=', $conversation_id)
        ->pluck('send_id')->first();
        $recv_id = Conversation::where('id', '=', $conversation_id)
        ->pluck('recv_id')->first();

        $recv_id1 = $send_id;
        $send_id1 = $recv_id;

        $conversation_id1 = Conversation::where('send_id', '=', $send_id)
        ->where('recv_id', '=', $recv_id)->pluck('id')->first();

        $conversation_id2 = Conversation::where('send_id', '=', $send_id1)
        ->where('recv_id', '=', $recv_id1)->pluck('id')->first();

        $data = Message::where('conversation_id', $conversation_id1)
        ->orWhere('conversation_id', $conversation_id2)->orderBy('created_at')->get(['id', 'conversation_id', 'body', 'created_at']);

        if(!is_null($data)){
            return response()->json(array(
                "status" => 1,
                "message" => "Fetched Successfully...",
                "data" => $data
            ));
        }
    }
}
