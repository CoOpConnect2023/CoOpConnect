<?php

namespace App\Filters\V1;

use Illuminate\Http\Request;
use App\Filters\ApiFilter;

class CoursesFilter extends ApiFilter
{
    protected $safeParams = [
        'name' => ['eq'],
        'start_date' => ['eq'],
        'end_date' => ['eq'],
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
