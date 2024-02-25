<?php
 
namespace App\Http\Controllers;

use Inertia\Inertia;

class ContactusController extends Controller
{
    public function index()
    {
        return Inertia::render('ContactUs');
    }
}