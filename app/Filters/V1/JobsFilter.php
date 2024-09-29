<?php

namespace App\Filters\V1;

use Illuminate\Http\Request;
use App\Filters\ApiFilter;

class JobsFilter extends ApiFilter
{
    protected $safeParams = [
        'id' => ['eq'],
        'title' => ['eq'],
        'description' => ['eq'],
        'skills' => ['eq'],
        'location' => ['eq'],
        'postingStatus' => ['eq'],
        'jobType' => ['eq'],
        'company' => ['eq'],
        'userId' => ['eq'],
        'startDate' => ['eq', 'lt', 'lte', 'gt', 'gte'], 
        'endDate' => ['eq', 'lt', 'lte', 'gt', 'gte'],
    ];

    protected $columnMap = [
        'postingStatus' => 'posting_status',
        'jobType' => 'job_type',
        'userId' => 'user_id',
        'startDate' => 'start_date',
        'endDate' => 'end_date',
    ];

    protected $operatorMap = [
        'eq' => '=',
        'lt' => '<',
        'lte' => '<=',
        'gt' => '>',
        'gte' => '>='
    ];
}
