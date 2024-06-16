<?php

namespace App\Filters\V1;

use Illuminate\Http\Request;
use App\Filters\ApiFilter;

class ReflectionsFilter extends ApiFilter
{
    protected $safeParams = [
        'content' => ['eq'],
        'user_id' => ['eq'],
        'jobs_id' => ['eq'],
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
