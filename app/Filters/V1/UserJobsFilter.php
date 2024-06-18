<?php

namespace App\Filters\V1;

use Illuminate\Http\Request;
use App\Filters\ApiFilter;

class UserJobsFilter extends ApiFilter
{
    protected $safeParams = [
        'id' => ['eq'],
        'userId' => ['eq'],
        'jobsId' => ['eq'],
    ];

    protected $columnMap = [
        'userId' => 'user_id',
        'jobsId' => 'jobs_id',
    ];

    protected $operatorMap = [
        'eq' => '=',
        'lt' => '<',
        'lte' => '<=',
        'gt' => '>',
        'gte' => '>='
    ];
}
