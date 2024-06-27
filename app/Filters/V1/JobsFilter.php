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
    ];

    protected $columnMap = [
        'postingStatus' => 'posting_status',
        'jobType' => 'job_type',
        'userId' => 'user_id'
    ];

    protected $operatorMap = [
        'eq' => '=',
        'lt' => '<',
        'lte' => '<=',
        'gt' => '>',
        'gte' => '>='
    ];
}
