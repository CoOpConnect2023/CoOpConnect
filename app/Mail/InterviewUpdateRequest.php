<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Carbon\Carbon;

class InterviewUpdateRequest extends Mailable
{
    use Queueable, SerializesModels;

    public $employer;
    public $student;
    public $jobTitle;
    public $time;

    /**
     * Create a new message instance.
     *
     * @param $student
     * @param $employer
     * @param $jobTitle
     * @param $time
     */
    public function __construct($employer, $student, $jobTitle, $time)
    {
        $this->employer = $employer;
        $this->student = $student;
        $this->jobTitle = $jobTitle;

        // Format the time using Carbon without adjusting the timezone
        $this->time = Carbon::parse($time)->format('F jS \a\t g:i A');
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->subject('Request to Confirm New Interview Time for ' . e($this->jobTitle))
                    ->html(
                        '<!DOCTYPE html>
                        <html>
                        <head>
                            <meta charset="UTF-8">
                            <meta name="viewport" content="width=device-width, initial-scale=1.0">
                            <title>Interview Time Request</title>
                            <style>
                                body {
                                    font-family: Arial, sans-serif;
                                    background-color: #f4f4f4;

                                    margin: 0;
                                    padding: 0;
                                }
                                .container {

                                    margin: 20px auto;
                                    background-color: #ffffff;
                                    padding: 20px;
                                    border-radius: 8px;
                                    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
                                }
                                .header {
                                    text-align: center;
                                    padding-bottom: 20px;
                                    color: #333;
                                }
                                .header h1 {
                                    color: #6E3AA7;
                                    margin: 0;
                                    color: #333;
                                }
                                .content {
                                    text-align: left;
                                    padding: 20px 0;
                                    color: #333;
                                }
                                .content p {
                                    font-size: 16px;
                                    line-height: 1.6;
                                    margin: 0 0 10px;
                                    color: #333;
                                }
                                .content a {
                                    color: #6E3AA7;
                                    text-decoration: none;
                                    font-weight: bold;
                                    color: #333;
                                }
                                .time-section {
                                    padding: 10px 0;
                                    border-top: 1px solid #ddd;
                                    margin-top: 20px;
                                    color: #333;
                                }
                                .time-section h2 {
                                    font-size: 18px;
                                    color: #6E3AA7;
                                    margin: 0 0 10px;
                                    color: #333;
                                }
                                .time-section p {
                                    font-weight: bold;
                                    margin: 5px 0;
                                    color: #333;
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
        padding: 12px 24px;
        margin-top: 20px;
        font-size: 16px;
        color: #fff !important; /* Ensures the text remains white */
        font-weight: 600;
        background-color: #6E3AA7;
        border-radius: 5px;
        text-decoration: none;
        text-align: center;
        box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
    }
    .button:hover {
        background-color: #5b2a8b;
    }
</style>
                        </head>
                        <body>
                            <div class="container">
                                <div class="header">
                                    <h1>Hello, ' . e($this->employer->name) . '</h1>
                                </div>
                                <div class="content">
                                    <p>We would like to inform you ' . e($this->student->name) . ' has requested the interview for  <strong>' . e($this->jobTitle) . '</strong> be rescheduled.</p>
                                    <p>Please review the new proposed interview time below and confirm your availability.</p>
                                </div>
                                <div class="time-section">
                                    <h2>New Interview Time</h2>
                                    <p>' . e($this->time) . '</p>
                                </div>
                                <div class="content">
                                    <p>Please confirm your availability at your earliest convenience.</p>
                                    <a href="' . config('app.url') . '" class="button">View Interview Details</a>
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
