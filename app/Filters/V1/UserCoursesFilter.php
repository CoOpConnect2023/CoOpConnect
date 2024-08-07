<?php

namespace App\Filters\V1;

use Illuminate\Http\Request;
use App\Filters\ApiFilter;

class UserCoursesFilter extends ApiFilter
{
    protected $safeParams = [
        'id' => ['eq'],
        'userId' => ['eq'],
        'coursesId' => ['eq'],
    ];

    protected $columnMap = [
        'userId' => 'user_id',
        'coursesId' => 'courses_id',
    ];

    protected $operatorMap = [
        'eq' => '=',
        'lt' => '<',
        'lte' => '<=',
        'gt' => '>',
        'gte' => '>='
    ];
}
