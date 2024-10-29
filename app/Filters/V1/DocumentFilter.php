<?php

namespace App\Filters\V1;

use Illuminate\Http\Request;
use App\Filters\ApiFilter;

class DocumentFilter extends ApiFilter
{
    protected $safeParams = [
        'id' => ['eq'],
        'userId' => ['eq'],
        'title' => ['eq'],
        'path' => ['eq'],
        'type' => ['eq'],
        'visible' => ['eq'],
    ];

    protected $columnMap = [
        'userId' => 'user_id',
    ];

    protected $operatorMap = [
        'eq' => '=',
        'lt' => '<',
        'lte' => '<=',
        'gt' => '>',
        'gte' => '>=',
    ];
}
