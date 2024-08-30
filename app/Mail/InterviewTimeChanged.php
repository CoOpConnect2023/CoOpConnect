<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class InterviewTimeChanged extends Mailable
{
    use Queueable, SerializesModels;

    public $student;
    public $jobTitle;
    public $time; // Use the provided time directly

    public function __construct($student, $jobTitle, $time)
    {
        $this->student = $student;
        $this->jobTitle = $jobTitle;

        // Format the time using Carbon without adjusting the timezone
        $this->time = \Carbon\Carbon::parse($time)->format('F jS \a\t g:i A');
    }

    public function build()
    {
        return $this->subject('Your Interview Time for ' . $this->jobTitle . ' Has Been Updated')
                    ->html(
                        '<!DOCTYPE html>
                        <html>
                        <head>
                            <meta charset="UTF-8">
                            <meta name="viewport" content="width=device-width, initial-scale=1.0">
                            <title>Interview Time Updated</title>
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
                                .time-section {
                                    padding: 10px 0;
                                    border-top: 1px solid #ddd;
                                    margin-top: 20px;
                                }
                                .time-section h2 {
                                    font-size: 18px;
                                    color: #6E3AA7;
                                    margin: 0 0 10px;
                                }
                                .time-section p {
                                    font-weight: bold;
                                    margin: 5px 0;
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
                                    color: #fff; /* Ensure the text is white for contrast */
                                    background-color: #6E3AA7; /* Purple background */
                                    border-radius: 5px;
                                    text-decoration: none;
                                    text-align: center;
                                }
                                .button:hover {
                                    background-color: #5b2a8b;
                                }
                            </style>
                        </head>
                        <body>
                            <div class="container">
                                <div class="header">
                                    <h1>Hello, ' . e($this->student->name) . '</h1>
                                </div>
                                <div class="content">
                                    <p>Your interview time for the position of <strong>' . e($this->jobTitle) . '</strong> has been updated by the employer.</p>
                                    <p>Please review the new time below and confirm your availability through your account on our platform:</p>
                                </div>
                                <div class="time-section">
                                    <h2>New Interview Time</h2>
                                    <p>' . e($this->time) . '</p>
                                </div>
                                <div class="content">
                                    <p>Please confirm your availability as soon as possible.</p>
                                    <a href="http://coop-connect.us-east-2.elasticbeanstalk.com/" style="display: inline-block; padding: 10px 20px; margin-top: 20px; font-size: 16px; color: #ffffff; background-color: #6E3AA7; border-radius: 5px; text-align: center; text-decoration: none;">View Interview Details</a>
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
