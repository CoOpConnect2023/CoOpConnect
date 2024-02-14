<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class MessagingController extends Controller
{
    public function index()
    {
        // You can pass data related to messages if needed
        return Inertia::render('Messaging', [
            // 'messages' => $messagesData,
        ]);
    }
}
