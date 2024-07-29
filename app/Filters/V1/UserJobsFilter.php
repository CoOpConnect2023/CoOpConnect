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
        'resume' => ['eq'],
        'status' => ['eq'],
        'message' => ['eq'],
        'timeSlots' => ['eq'],
    ];

    protected $columnMap = [
        'userId' => 'user_id',
        'jobsId' => 'jobs_id',
        'timeSlots' => 'time_slots'
    ];

    protected $operatorMap = [
        'eq' => '=',
        'lt' => '<',
        'lte' => '<=',
        'gt' => '>',
        'gte' => '>='
    ];
}
