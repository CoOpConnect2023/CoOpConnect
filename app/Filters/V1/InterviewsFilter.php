<?php

namespace App\Filters\V1;

use Illuminate\Http\Request;
use App\Filters\ApiFilter;

class InterviewsFilter extends ApiFilter
{
    protected $safeParams = [
        'id' => ['eq'],
        'interviewDate' => ['eq'],
        'duration' => ['eq'],
        'status' => ['eq'],
        'description' => ['eq'],
        'intervieweeId' => ['eq'],
        'interviewerId' => ['eq'],
    ];

    protected $columnMap = [
        'interviewDate' => 'interview_date',
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
