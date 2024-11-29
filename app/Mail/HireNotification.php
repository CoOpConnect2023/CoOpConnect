<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Carbon\Carbon;

class HireNotification extends Mailable
{
    use Queueable, SerializesModels;

    public $applicant;
    public $jobTitle;
    public $message;

    /**
     * Create a new message instance.
     *
     * @param $applicant
     * @param $jobTitle
     * @param $message
     */
    public function __construct($applicant, $jobTitle, $message)
    {
        $this->applicant = $applicant;
        $this->jobTitle = $jobTitle;
        $this->message = $message;
    }

    public function build()
    {
        return $this->subject('Congratulations! You have been hired for ' . $this->jobTitle)
                    ->html(
                        '<!DOCTYPE html>
                        <html>
                        <head>
                            <meta charset="UTF-8">
                            <meta name="viewport" content="width=device-width, initial-scale=1.0">
                            <title>Congratulations</title>
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
                                    <h1>Congratulations, ' . e($this->applicant->name) . '!</h1>
                                </div>
                                <div class="content">
                                    <p>We are pleased to inform you that you have been hired for the position of <strong>' . e($this->jobTitle) . '</strong>.</p>
                                    <p>Here’s a message from the employer:</p>
                                    <blockquote>' . e($this->message) . '</blockquote>
                                    <p>We look forward to your success in this new role. Please coordinate with the employer for next steps.</p>
                                </div>
                                <div class="footer">
                                    <p>&copy; ' . date('Y') . ' CoopConnect. All rights reserved.</p>
                                </div>
                            </div>
                        </body>
                        </html>'
                    );
    }
}
