<?php

namespace App\Http\Controllers;

use App\Mail\ContactUs;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;


class ContactController extends Controller
{
    public function show()
    {
        return view('contact');
    }

    public function send(Request $request)

    {

        $data = request()->validate([

            'name' => 'required|min:3', 
            'email' => 'required|email',
            'message' => 'required|min:5',



        ]);

        Mail::to('coopconnectnoreply@gmail.com')->send(new ContactUs($data));
        
        return redirect()->back()->with('success', 'Message sent successfully');
        
    }
}