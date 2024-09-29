<?php

namespace App\Http\Controllers\Api\V1;

use App\Models\Company;
use App\Http\Requests\V1\StoreCompaniesRequest;
use App\Http\Requests\V1\UpdateCompaniesRequest;
use App\Http\Controllers\Controller;
use App\Http\Resources\V1\CompaniesResource;
use App\Http\Resources\V1\CompaniesCollection;
use Illuminate\Http\Request;
use App\Filters\V1\CompaniesFilter;
use App\Mail\InterviewTimeChanged;
use App\Models\User;
use Illuminate\Support\Facades\Mail;

class CompaniesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $filter = new CompaniesFilter();
        $filterItems = $filter->transform($request);  //[['column,', 'operator', 'value']]
        return new CompaniesCollection(Company::where($filterItems)->get());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCompaniesRequest $request)
    {
        return new CompaniesResource(Company::create($request->all()));
    }

    /**
     * Display the specified resource.
     */
    public function show(Company $company)
    {
        return new CompaniesResource($company);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCompaniesRequest $request, Company $company)
    {
        $company->update($request->all());
        return new CompaniesResource($company);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Company $company)
    {
        // Capture the resource before deleting it
        $deletedCompany = new CompaniesResource($company);

        // Delete the company
        $company->delete();

        // Return the deleted resource
        return response()->json([
            'message' => 'Company deleted successfully',
            'data' => $deletedCompany
        ], 200);
    }



}
