<?php

namespace App\Filters\V1;

use Illuminate\Http\Request;
use App\Filters\ApiFilter;

class NotificationFilter extends ApiFilter
{
    protected $safeParms = [
        'from_user_id' => ['eq'],
        'to_user_id' => ['eq'],
        'viewed' => ['eq'],
        'type' => ['eq'],
        'created_at' => ['eq', 'lt', 'gt'],
    ];

    protected $columnMap = [
        'fromUserId' => 'from_user_id',
        'toUserId' => 'to_user_id',
        'createdAt' => 'created_at',
    ];

    protected $operatorMap = [
        'eq' => '=',
        'lt' => '<',
        'gt' => '>',
    ];

    
}
