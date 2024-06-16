<?php

namespace App\Filters\V1;

use Illuminate\Http\Request;
use App\Filters\ApiFilter;

class UserCoursesFilter extends ApiFilter
{
    protected $safeParams = [
        'user_id' => ['eq'],
        'courses_id' => ['eq'],
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
