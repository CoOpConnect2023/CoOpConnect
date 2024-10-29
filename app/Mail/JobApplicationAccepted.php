<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Carbon\Carbon;

class JobApplicationAccepted extends Mailable
{
    use Queueable, SerializesModels;

    public $user;
    public $jobTitle;
    public $formattedTimes; // Formatted times array
    public $message;

    public function __construct($user, $jobTitle, $times, $message)
    {
        $this->user = $user;
        $this->jobTitle = $jobTitle;
        $this->message = $message;

        // Format the times using Carbon
        $this->formattedTimes = array_map(function ($time) {
            return Carbon::parse($time)
                         ->timezone('America/New_York') // Convert to Eastern Time
                         ->format('F jS \a\t g:i A');   // Format the time
        }, $times);
    }

    public function build()
{
    return $this->subject('Your Job Application for ' . $this->jobTitle . ' Has Been Accepted')
                ->html(
                    '<!DOCTYPE html>
                    <html>
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>Job Application Accepted</title>
                        <style>
                            body {
                                font-family: Arial, sans-serif;
                                background-color: #f4f4f4;
                                color: #333;
                                margin: 0;
                                padding: 0;
                            }
                            .container {
                                max-width: 600px;
                                margin: 20px auto;
                                background-color: #ffffff;
                                padding: 20px;
                                border-radius: 8px;
                                box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
                            }
                            .header {
                                text-align: center;
                                padding-bottom: 20px;
                            }
                            .header h1 {
                                color: #6E3AA7;
                                margin: 0;
                            }
                            .content {
                                text-align: left;
                                padding: 20px 0;
                            }
                            .content p {
                                font-size: 16px;
                                line-height: 1.6;
                                margin: 0 0 10px;
                            }
                            .content a {
                                color: #6E3AA7;
                                text-decoration: none;
                                font-weight: bold;
                            }
                            .times-section {
                                padding: 10px 0;
                                border-top: 1px solid #ddd;
                                margin-top: 20px;
                            }
                            .times-section h2 {
                                font-size: 18px;
                                color: #6E3AA7;
                                margin: 0 0 10px;
                            }
                            .times-section p {
                                font-weight: bold;
                                margin: 5px 0;
                            }
                            .message-section {
                                margin-top: 20px;
                                padding: 15px;
                                background-color: #f9f9f9;
                                border-left: 4px solid #6E3AA7;
                            }
                            .footer {
                                text-align: center;
                                padding-top: 20px;
                                font-size: 12px;
                                color: #888;
                            }
                            .footer p {
                                margin: 0;
                            }
                            .button {
                                display: inline-block;
                                padding: 10px 20px;
                                margin-top: 20px;
                                font-size: 16px;
                                color: #ffffff;
                                background-color: #6E3AA7;
                                border-radius: 5px;
                                text-decoration: none;
                            }
                            .button:hover {
                                background-color: #5b2a8b;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="container">
                            <div class="header">
                                <h1>Congratulations, ' . e($this->user->name) . '!</h1>
                            </div>
                            <div class="content">
                                <p>Your application for the position of <strong>' . e($this->jobTitle) . '</strong> has been accepted!</p>
                                <p>We are excited to move forward with the next steps. Below are the available time slots for your upcoming interviews:</p>
                            </div>
                            <div class="times-section">
                                <h2>Available Time Slots</h2>'
                                    . implode('', array_map(function($time) {
                                        return '<p>' . e($time) . '</p>';
                                    }, $this->formattedTimes)) .
                            '</div>
                            <div class="message-section">
                                <p><strong>Message from the employer:</strong></p>
                                <p>' . e($this->message) . '</p>
                            </div>
                            <div class="content">
                                <p>Please confirm your availability through your account on our platform.</p>
                                <p>We look forward to speaking with you soon!</p>
                                
                            </div>
                            <div class="footer">
                                <p>&copy; ' . date('Y') . ' COOP CONNECT. All rights reserved.</p>
                            </div>
                        </div>
                    </body>
                    </html>'
                );
}
}

