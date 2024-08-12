<?php
namespace App\Http\Controllers\Api\V1;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\Conversation;
use App\Http\Controllers\Controller;
use App\Models\Message;
use App\Models\User;
use Illuminate\Support\Facades\Log;

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
        Log::info('Request validation passed', [
            'recipient_email' => $request->recipient_email,
            'user_id' => $request->user_id,
        ]);
        // Get the authenticated user based on user_id
        $user = User::findOrFail($request->user_id);
        // Find the recipient user by email
        $recipient = User::where('email', $request->recipient_email)->first();
        if (!$recipient) {
            Log::warning('Recipient not found', ['recipient_email' => $request->recipient_email]);
            return response()->json(['error' => 'Recipient not found'], 404);
        }
        Log::info('Recipient found', ['recipient_id' => $recipient->id, 'user_id' => $user->id]);
        // Check if a conversation already exists between these two users
        $conversation = Conversation::whereHas('users', function ($query) use ($user) {
            $query->where('user_id', $user->id);
        })
            ->whereHas('users', function ($query) use ($recipient) {
                $query->where('user_id', $recipient->id);
            })
            ->whereHas('messages', function ($query) use ($user, $recipient) {
                $query->where(function ($q) use ($user, $recipient) {
                    $q->where('user_id', $user->id)
                        ->orWhere('user_id', $recipient->id);
                })
                    ->havingRaw('COUNT(DISTINCT user_id) = 2'); // Ensure messages are from both users
            })
            ->first();
        if ($conversation) {
            Log::info('Conversation found', ['conversation_id' => $conversation->id]);
            // Create a new message
            $message = new Message();
            $message->content = $request->content;
            $message->conversation_id = $conversation->id;
            $message->user_id = $user->id;
            $message->save();
            Log::info('Message sent', ['message_id' => $message->id, 'conversation_id' => $conversation->id]);
            return response()->json(['message' => 'Message sent successfully', 'message_id' => $message->id], 200);
        }
        Log::info('No existing conversation found. Creating new conversation.');
        // If conversation does not exist, create a new one
        $newConversation = new Conversation();
        $newConversation->save();
        Log::info('New conversation created', ['conversation_id' => $newConversation->id]);
        // Attach users to the new conversation, ensuring no duplicates
        $existingUserIds = $newConversation->users->pluck('id')->toArray();
        $newUserIds = array_unique(array_merge($existingUserIds, [$user->id, $recipient->id]));
        $newConversation->users()->sync($newUserIds);
        Log::info('Users attached to new conversation', ['user_ids' => $newUserIds]);
        // Create a new message in the new conversation
        $message = new Message();
        $message->content = $request->content;
        $message->conversation_id = $newConversation->id;
        $message->user_id = $user->id;
        $message->save();
        Log::info('Message sent in new conversation', ['message_id' => $message->id, 'conversation_id' => $newConversation->id]);
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
