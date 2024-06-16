<?php

namespace App\Filters\V1;

use Illuminate\Http\Request;
use App\Filters\ApiFilter;

class JobsFilter extends ApiFilter
{
    protected $safeParams = [
        'title' => ['eq'],
        'description' => ['eq'],
        'skills' => ['eq'],
        'location' => ['eq'],
        'postingStatus' => ['eq'],
        'jobType' => ['eq'],
        'company' => ['eq']
    ];

    protected $columnMap = [
        'postingStatus'=> 'posting_status',
        'jobType' => 'job_type'
    ];

    protected $operatorMap = [
        'eq' => '=',
        'lt' => '<',
        'lte' => '<=',
        'gt' => '>',
        'gte' => '>='
    ];
}
