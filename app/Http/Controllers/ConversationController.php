<?php

namespace App\Http\Controllers;

use App\Models\Conversation; // Make sure to use your actual Message model
use Illuminate\Http\Request;
use Inertia\Inertia;

class ConversationController extends Controller
{
    public function index()
    {
        // You can pass data related to messages if needed
        return Inertia::render('Conversations', [
            // 'messages' => $messagesData, // Pass any necessary data
        ]);
    }

    public function createConversation(Request $req)
    {
        $send_id = $req->input('send_id');
        $recv_id = $req->input('recv_id');

        $conversation_id = Conversation::where('send_id', '=', $send_id)
        ->where("recv_id",'=',$recv_id)->first();

        if(is_null($conversation_id)){
            $conversation = new Conversation();
            $conversation->send_id = $send_id;
            $conversation->recv_id = $recv_id;
            $conversation->save();
        }
        return redirect()->route('messaging')->with('success', 'Message posted successfully.');
    }

    public function fetchConversationId(Request $req)
    {
        $send_id = $req->input('send_id');
        $recv_id = $req->input('recv_id');

        $conversation_id = Conversation::where('send_id', '=', $send_id)
        ->where("recv_id",'=',$recv_id)->pluck('id')->first();

        if(!is_null($conversation_id)){
            return response()->json(array(
                "status" => 1,
                "message" => "Fetched Successfully...",
                "conversation_id" => $conversation_id
            ));
        }
    }
}
