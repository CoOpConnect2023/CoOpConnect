<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Carbon\Carbon;

class StudentAcceptedInterview extends Mailable
{
    use Queueable, SerializesModels;

    public $studentName;
    public $employerName;
    public $jobTitle;
    public $acceptedTime;
    public $message;

    /**
     * Create a new message instance.
     *
     * @param $studentName
     * @param $employerName
     * @param $jobTitle
     * @param $acceptedTime
     * @param $message
     */
    public function __construct($studentName, $employerName, $jobTitle, $acceptedTime, $message)
    {
        $this->studentName = $studentName;
        $this->employerName = $employerName;
        $this->jobTitle = $jobTitle;
        $this->acceptedTime = $acceptedTime;
        $this->message = $message;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->subject('Interview Accepted: ' . $this->jobTitle)
                    ->html(
                        '<!DOCTYPE html>
                        <html>
                        <head>
                            <meta charset="UTF-8">
                            <meta name="viewport" content="width=device-width, initial-scale=1.0">
                            <title>Interview Accepted</title>
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
                                .footer {
                                    text-align: center;
                                    padding-top: 20px;
                                    font-size: 12px;
                                    color: #888;
                                }
                                .footer p {
                                    margin: 0;
                                }
                            </style>
                        </head>
                        <body>
                            <div class="container">
                                <div class="header">
                                    <h1>Interview Accepted</h1>
                                </div>
                                <div class="content">
                                    <p>Dear ' . e($this->employerName) . ',</p>
                                    <p>The student <strong>' . e($this->studentName) . '</strong> has accepted your interview request for the position <strong>' . e($this->jobTitle) . '</strong>.</p>
                                    <p>The interview is scheduled for <strong>' . e($this->acceptedTime) . '</strong>.</p>

                                    <p>Please connect with the student on the platform. A calendar event has been added to your calendar.</p>
                                </div>
                                 <div class="content">
                                    <p>If you have any questions or need further assistance, feel free to reach out to our support team.</p>
                                    <p>Best regards,<br>The COOP Connect Team</p>
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
