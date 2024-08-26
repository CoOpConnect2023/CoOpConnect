<?php
namespace App\Http\Controllers\Api\V1;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\Conversation;
use App\Http\Controllers\Controller;
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
        $message->viewed = false;
        $message->save();
        return response()->json(['message' => 'Message sent successfully', 'message' => $message], 201);
    }
    public function getMessages(Conversation $conversation)
    {
        $messages = Message::where('conversation_id', $conversation->id)->get();
        return response()->json($messages);
    }
    public function getUnreadMessages($user_id)
    {
        try {
            $userId = Auth::id(); // Get the current user's ID
            // Query to fetch conversations with unread messages
            $conversations = Conversation::whereHas('users', function ($query) use ($userId) {
                $query->where('user_id', $userId); // Current user is a participant
            })
                ->whereHas('messages', function ($query) use ($userId) {
                    $query->where('user_id', '!=', $userId) // Messages not sent by the current user
                        ->where('viewed', false); // Messages that have not been viewed
                })
                ->with([
                    'users',
                    'messages' => function ($query) use ($userId) {
                        $query->where('user_id', '!=', $userId) // Exclude messages sent by the current user
                            ->where('viewed', false); // Optionally fetch only unread messages
                    }
                ])
                ->orderBy('updated_at', 'desc') // Order by conversation update time
                ->get();
            return response()->json(['conversations' => $conversations]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to fetch conversations with unread messages'], 500);
        }
    }
    public function getAllMessages(Request $request)
    {
        $messages = Message::with(['conversation', 'conversation.users'])
            ->orderBy('created_at', 'desc') // Order messages by created_at descending
            ->get();
        return response()->json(['messages' => $messages]);
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
        ->first();

    if ($conversation) {
        // Check if both users have sent messages in this conversation
        $messageCount = Message::where('conversation_id', $conversation->id)
            ->whereIn('user_id', [$user->id, $recipient->id])
            ->distinct('user_id')
            ->count();

        if ($messageCount == 2) {
            // Create a new message
            $message = new Message();
            $message->content = $request->content;
            $message->conversation_id = $conversation->id;
            $message->user_id = $user->id;
            $message->save();

            return response()->json(['message' => 'Message sent successfully', 'message_id' => $message->id], 200);
        }
    }

    // Create a new conversation if no existing conversation was found
    $newConversation = new Conversation();
    $newConversation->save();

    // Attach users to the new conversation
    $newConversation->users()->sync([$user->id, $recipient->id]);

    // Create a new message in the new conversation
    $message = new Message();
    $message->content = $request->content;
    $message->conversation_id = $newConversation->id;
    $message->user_id = $user->id;
    $message->save();

    return response()->json(['message' => 'Conversation created successfully', 'conversation_id' => $newConversation->id], 200);
}
    public function markMessageAsRead(Request $request, $message_id)
    {
        try {
            $message = Message::findOrFail($message_id);
            $message->update(['viewed' => true]);
            return response()->json(['message' => 'Message marked as read successfully']);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to mark message as read'], 500);
        }
    }
}
