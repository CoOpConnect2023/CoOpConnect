<?php

namespace App\Filters\V1;

use Illuminate\Http\Request;
use App\Filters\ApiFilter;

class SchoolFilter extends ApiFilter
{
    protected $safeParams = [
        'id' => ['eq'],
        'name' => ['eq'],
        'location' => ['eq'],
        'description' => ['eq'],
        'principalName' => ['eq'],

    ];



    protected $operatorMap = [
        'eq' => '=',
        'lt' => '<',
        'lte' => '<=',
        'gt' => '>',
        'gte' => '>='
    ];
}
