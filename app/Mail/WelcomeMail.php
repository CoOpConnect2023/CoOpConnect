<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class WelcomeMail extends Mailable
{
    use Queueable, SerializesModels;

    private string $subject;
    private string $body;

    /**
     * Create a new message instance.
     */
    public function __construct(string $title, string $body)
    {
        $this->subject = 'Welcome to laracoding.com EmailDemo';
        // Optionally, you can also set a default subject in the constructor
    }

    /**
     * Get the message envelope.
     */
    public function build(): void
    {
        $this->subject($this->subject); // Set the subject
        $this->view('emails.welcome')
             ->with(['title' => $this->title, 'body' => $this->body]);
    }
}
