<?php

namespace App\Filters\V1;

use Illuminate\Http\Request;
use App\Filters\ApiFilter;

class CoursesFilter extends ApiFilter
{
    protected $safeParams = [
        'id' => ['eq'],
        'name' => ['eq'],
        'startDate' => ['eq'],
        'endDate' => ['eq'],
        'teacherID' => ['eq'],
        'schoolID' => ['eq'],
    ];

    protected $columnMap = [
        'startDate' => 'start_date',
        'endDate' => 'end_date'
    ];

    protected $operatorMap = [
        'eq' => '=',
        'lt' => '<',
        'lte' => '<=',
        'gt' => '>',
        'gte' => '>='
    ];
}
