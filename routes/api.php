<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MessagingController;
use App\Http\Controllers\ConversationController;
use App\Http\Controllers\DocumentsController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/sendmessage', [MessagingController::class, 'sendMessage']);
Route::get('/getmessages', [MessagingController::class, 'fetchMessages']);
Route::post('/createconversation', [ConversationController::class, 'createConversation']);
Route::get('/fetchconversationid', [ConversationController::class, 'fetchConversationId']);

Route::post('/uploaddocs', [DocumentsController::class, 'upload']);
Route::get('/fetchdocs', [DocumentsController::class, 'fetchDoc']);
Route::delete("/deletedoc/{doc_id}", [DocumentsController::class, "deleteDoc"]);