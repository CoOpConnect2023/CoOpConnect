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
        'startDate' => ['eq'],
        'endDate' => ['eq'],
        'documentId' => ['eq'],



    ];

    protected $columnMap = [
        'userId' => 'user_id',
        'jobsId' => 'jobs_id',
        'documentId' => 'document_id',
        'timeSlots' => 'time_slots',
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
