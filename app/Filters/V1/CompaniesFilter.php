<?php

namespace App\Filters\V1;

use Illuminate\Http\Request;
use App\Filters\ApiFilter;

class CompaniesFilter extends ApiFilter
{
    protected $safeParams = [
        'id' => ['eq'],
        'name' => ['eq', 'like'],
        'address' => ['eq', 'like'],
        'email' => ['eq', 'like'],
        'website' => ['eq', 'like'],
        'description' => ['eq', 'like'],
    ];

    protected $columnMap = [
        'name' => 'name',
        'address' => 'address',
        'email' => 'email',
        'website' => 'website',
        'description' => 'description',
    ];

    protected $operatorMap = [
        'eq' => '=',
        'lt' => '<',
        'lte' => '<=',
        'gt' => '>',
        'gte' => '>=',
        'like' => 'like',
    ];

    public function transform(Request $request)
    {
        $queryItems = [];

        foreach ($this->safeParams as $param => $operators) {
            foreach ($operators as $operator) {
                if ($request->has($param)) {
                    $queryItems[] = [
                        $this->columnMap[$param] ?? $param,
                        $this->operatorMap[$operator],
                        ($operator === 'like') ? '%' . $request->input($param) . '%' : $request->input($param)
                    ];
                }
            }
        }

        return $queryItems;
    }
}
