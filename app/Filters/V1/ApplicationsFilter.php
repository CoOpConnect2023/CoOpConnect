<?php

namespace App\Filters\V1;

use Illuminate\Http\Request;
use App\Filters\ApiFilter;

class ApplicationsFilter extends ApiFilter
{
    protected $safeParams = [
        'id' => ['eq'],
        'user_id' => ['eq'],
        'job_id' => ['eq'],
    ];

    protected $columnMap = [
        'user_id' => 'user_id',
        'job_id' => 'job_id'
    ];

    protected $operatorMap = [
        'eq' => '=',
        'lt' => '<',
        'lte' => '<=',
        'gt' => '>',
        'gte' => '>='
    ];
}
