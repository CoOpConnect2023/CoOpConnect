<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class WelcomeEmail extends Mailable
{
    use Queueable, SerializesModels;

    public $user;  // The user object is passed to the email

    /**
     * Create a new message instance.
     *
     * @param $user
     */
    public function __construct($user)
    {
        $this->user = $user;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {


        $verificationUrl = \URL::temporarySignedRoute(
            'verification.verify',
            now()->addHours(48), // 48-hour expiration
            ['id' => $this->user->id, 'hash' => sha1($this->user->email)]
        );

         return $this->subject('Welcome to COOP CONNECT!')
                    ->html(
                        '<!DOCTYPE html>
                        <html>
                        <head>
                            <meta charset="UTF-8">
                            <meta name="viewport" content="width=device-width, initial-scale=1.0">
                            <title>Welcome Email</title>
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
                                .verify-email {
                                    margin: 20px 0;
                                    text-align: center;
                                }
                                .verify-email a {
                                    display: inline-block;
                                    padding: 10px 20px;
                                    color: white;
                                    background-color: #6E3AA7;
                                    border-radius: 5px;
                                    text-decoration: none;
                                    font-size: 16px;
                                    margin-top: 10px;
                                }
                                .reset-password {
                                    margin: 20px 0;
                                    text-align: center;
                                }
                                .reset-password a {
                                    display: inline-block;
                                    padding: 10px 20px;
                                    color: white;
                                    background-color: #6E3AA7;
                                    border-radius: 5px;
                                    text-decoration: none;
                                    font-size: 16px;
                                    margin-top: 10px;
                                }
                                .information-section {
                                    padding: 10px 0;
                                    border-top: 1px solid #ddd;
                                    margin-top: 20px;
                                }
                                .information-section h2 {
                                    font-size: 18px;
                                    color: #6E3AA7;
                                    margin: 0 0 10px;
                                }
                                .goodbye-section {
                                    padding: 20px 0;
                                    text-align: center;
                                    font-style: italic;
                                    color: #6E3AA7;
                                    border-top: 1px solid #ddd;
                                    margin-top: 20px;
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
                                    <h1>Welcome to COOP CONNECT</h1>
                                </div>
                                <div class="content">
                                    <p>Hello, ' . e($this->user->name) . '</p>
                                    <p>Welcome! We\'re thrilled to have you join us.</p>
                                    <p>Before you get started, please verify your email address by clicking the link below. Note that you need to verify your account within the next 48 hours, or it will be deleted:</p>
                                    <div class="verify-email">
                                        <a href="' . $verificationUrl . '">Verify Your Email</a>
                                    </div>
                                    <p>After verifying your email, we recommend resetting your password to secure your account. Your default password is simply password. Click the link below to reset your password:</p>
                                    <div class="reset-password">
                                        <a href="' . url('forgot-password', $this->user->reset_token) . '">Reset Your Password</a>
                                    </div>
                                    <p>If you have any questions or need assistance, please don\'t hesitate to reach out to our support team. We\'re here to help!</p>
                                </div>
                                <div class="information-section">
                                    <h2>Getting Started</h2>
                                    <p>Here are a few resources to help you get started:</p>
                                    <ul>
                                        <li><a href="' . url('/user-guide') . '">User Guide</a> - Learn how to navigate the platform once you have logged in.</li>
                                        <li><a href="' . url('/support') . '">Support</a> - Need help? Visit our support center.</li>
                                        <li><a href="' . url('/faq') . '">FAQ</a> - Find answers to common questions.</li>
                                    </ul>
                                </div>
                                <div class="information-section">
                                    <h2>What’s Next?</h2>
                                    <p>Once you have verified your email, reset your password, and logged in, you can:</p>
                                    <ul>
                                        <li>Update your profile with additional information.</li>
                                        <li>Explore our platform and start using our services.</li>
                                        <li>Connect with other users and share your experiences.</li>
                                    </ul>
                                </div>
                                <div class="goodbye-section">
                                    <p>Thank you for joining us. We look forward to seeing you thrive on our platform!</p>
                                    <p>Goodbye for now, and take care.</p>
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
