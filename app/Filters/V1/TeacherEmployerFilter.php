<?php

namespace App\Filters\V1;

use Illuminate\Http\Request;
use App\Filters\ApiFilter;

class TeacherEmployerFilter extends ApiFilter
{
    protected $safeParams = [
        'teacherId' => ['eq'],
        'employerId' => ['eq'],
        'created_at' => ['eq', 'lt', 'lte', 'gt', 'gte'],
        'updated_at' => ['eq', 'lt', 'lte', 'gt', 'gte'],
    ];

    protected $columnMap = [
        'teacherId' => 'teacher_id',
        'employerId' => 'employer_id',
    ];

    protected $operatorMap = [
        'eq' => '=',
        'lt' => '<',
        'lte' => '<=',
        'gt' => '>',
        'gte' => '>=',
    ];
}
