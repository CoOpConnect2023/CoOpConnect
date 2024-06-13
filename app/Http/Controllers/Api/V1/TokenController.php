<?php

namespace App\Http\Controllers\Api\V1;

use App\Models\Token;
use App\Http\Requests\V1\StoreTokenRequest;
use App\Http\Requests\V1\UpdateTokenRequest;
use App\Http\Controllers\Controller;
use App\Http\Resources\V1\TokenResource;
use App\Http\Resources\V1\TokenCollection;
use Illuminate\Http\Request;
use App\Filters\V1\TokenFilter;

class TokenController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $filter = new TokenFilter();
        $filterItems = $filter->transform($request);  //[['column,', 'operator', 'value']]
        return new TokenCollection(Token::where($filterItems)->get());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTokenRequest $request)
    {
        return new TokenResource(Token::create($request->all()));
    }

    /**
     * Display the specified resource.
     */
    public function show(Token $token)
    {
        return new TokenResource($token);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTokenRequest $request, Token $token)
    {
        $token->update($request->all());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Token $token)
    {
        //
    }
}
