<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class StudentDeclinedInterview extends Mailable
{
    use Queueable, SerializesModels;

    public $studentName;
    public $employerName;
    public $jobTitle;


    /**
     * Create a new message instance.
     *
     * @param $studentName
     * @param $employerName
     * @param $jobTitle
     * 
     */
    public function __construct($studentName, $employerName, $jobTitle)
    {
        $this->studentName = $studentName;
        $this->employerName = $employerName;
        $this->jobTitle = $jobTitle;

    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->subject('Interview Declined: ' . $this->jobTitle)
                    ->html(
                        '<!DOCTYPE html>
                        <html>
                        <head>
                            <meta charset="UTF-8">
                            <meta name="viewport" content="width=device-width, initial-scale=1.0">
                            <title>Interview Declined</title>
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
                                    <h1>Interview Declined</h1>
                                </div>
                                <div class="content">
                                    <p>Dear ' . e($this->employerName) . ',</p>
                                    <p>The student <strong>' . e($this->studentName) . '</strong> has declined your interview request for the position <strong>' . e($this->jobTitle) . '</strong>.</p>

                                    <p>Please consider other candidates or reach out to the student on COOP Connect for further inquiries.</p>
                                </div>
                                <div class="footer">
                                    <p>If you have any questions, feel free to reach out to our support team.</p>
                                    <p>Best regards,<br>Your Company Team</p>
                                </div>
                                <div class="footer">
                                    <p>&copy; ' . date('Y') . ' COOP Connect. All rights reserved.</p>
                                </div>
                            </div>
                        </body>
                        </html>'
                    );
    }
}
