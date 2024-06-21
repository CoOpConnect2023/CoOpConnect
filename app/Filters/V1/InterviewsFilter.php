<?php

namespace App\Filters\V1;

use Illuminate\Http\Request;
use App\Filters\ApiFilter;

class InterviewsFilter extends ApiFilter
{
    protected $safeParams = [
        'id' => ['eq'],
        'title' => ['eq'],
        'start_date' => ['eq'],
        'end_date' => ['eq'],
        'status' => ['eq'],
        'description' => ['eq'],
        'intervieweeId' => ['eq'],
        'interviewerId' => ['eq'],
    ];

    protected $columnMap = [
        'startDate' => 'start_date',
        'endDate' => 'end_date',
        'intervieweeId' => 'interviewee_id',
        'interviewerId' => 'interviewer_id',
    ];

    protected $operatorMap = [
        'eq' => '=',
        'lt' => '<',
        'lte' => '<=',
        'gt' => '>',
        'gte' => '>='
    ];
}
