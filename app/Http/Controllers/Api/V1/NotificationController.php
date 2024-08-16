<?php

namespace App\Http\Controllers\Api\V1;

use App\Models\Notification;
use App\Http\Requests\V1\StoreNotificationRequest;
use App\Http\Requests\V1\UpdateNotificationRequest;
use App\Http\Controllers\Controller;
use App\Http\Resources\V1\NotificationResource;
use App\Http\Resources\V1\NotificationCollection;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use App\Filters\V1\NotificationFilter;

class NotificationController extends Controller
{
    /**
     * Display a listing of the resource with filtering.
     */
    public function index(Request $request)
    {
        $filter = new NotificationFilter();
        $filterItems = $filter->transform($request);  // [['column', 'operator', 'value']]

        $userId = Auth::id();
        $query = Notification::where('to_user_id', $userId)
                             ->where('viewed', 0);  // Only include notifications where viewed is 0 (unread)

        if ($filterItems) {
            $query->where($filterItems);
        }

        return new NotificationCollection($query->get());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreNotificationRequest $request)
    {
        try {
            // Log the incoming request data
            Log::info('Received notification request data:', $request->all());

            // Attempt to create the notification
            $notification = Notification::create($request->all());

            // Log the successful creation of the notification
            Log::info('Notification created successfully:', $notification->toArray());

            return new NotificationResource($notification);
        } catch (\Exception $e) {
            // Log any exceptions that occur
            Log::error('Error creating notification:', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
                'request_data' => $request->all(),
            ]);

            // Return a JSON response with the error message and 422 status code
            return response()->json(['error' => 'Unprocessable Content', 'details' => $e->getMessage()], 422);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Notification $notification)
    {
        return new NotificationResource($notification);
    }

    /**
     * Display notifications for the authenticated user.
     */
    public function showForUser()
    {
        $userId = Auth::id();
        $notifications = Notification::where('to_user_id', $userId)->get();
        return new NotificationCollection($notifications);
    }

    /**
     * Get all notifications for a given user where 'viewed' is set to 0.
     */
    public function getUnviewedNotifications()
    {
        $userId = Auth::id();
        $unviewedNotifications = Notification::where('to_user_id', $userId)
                                             ->where('viewed', 0)
                                             ->get();
        return new NotificationCollection($unviewedNotifications);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateNotificationRequest $request, Notification $notification)
    {
        $notification->update($request->all());
        return new NotificationResource($notification);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Notification $notification)
    {
        $notification->delete();
        return response()->noContent();
    }
}
