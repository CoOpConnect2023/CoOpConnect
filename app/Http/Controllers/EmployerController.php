<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class EmployerController extends Controller
{
    public function home()
    {
        return Inertia::render('Employer/Home');
    }

    public function post1()
    {
        return Inertia::render('Employer/Post1');
    }

    public function post2()
    {
        return Inertia::render('Employer/Post2');
    }

    public function viewPost($id)
    {
        return Inertia::render('Employer/ViewPost', ['jobId' => $id]);
    }

    public function editPost1($id)
    {
        return Inertia::render('Employer/EditPost1', ['jobId' => $id]);
    }

    public function editPost2($id)
    {
        return Inertia::render('Employer/EditPost2', ['jobId' => $id]);
    }

    public function documents()
    {
        return Inertia::render('Employer/Document');
    }

    public function messages()
    {
        return Inertia::render('Employer/Messages/Messages');
    }

    public function interviews()
    {
        return Inertia::render('Employer/Interviews');
    }

    public function profile()
    {
        return Inertia::render('Employer/Profile');
    }

    public function settings()
    {
        return Inertia::render('Employer/Settings');
    }

    public function viewApplicants($id)
    {
        return Inertia::render('Employer/ViewApplicants', ['jobId' => $id]);
    }

    public function acceptApplicant($id)
    {
        return Inertia::render('Employer/AcceptApplicant', ['applicantId' => $id]);
    }


}
