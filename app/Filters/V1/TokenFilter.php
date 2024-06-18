<?php

namespace App\Filters\V1;

use Illuminate\Http\Request;
use App\Filters\ApiFilter;

class TokenFilter extends ApiFilter
{
    protected $safeParams = [
        'id' => ['eq'],
        'email' => ['eq'],
        'token' => ['eq']
    ];

    protected $columnMap = [];

    protected $operatorMap = [
        'eq' => '=',
        'lt' => '<',
        'lte' => '<=',
        'gt' => '>',
        'gte' => '>='
    ];
}
