<?php

namespace App\Filters\V1;

use Illuminate\Http\Request;
use App\Filters\ApiFilter;

class UserDocumentsFilter extends ApiFilter
{
    // Specify safe parameters that can be used for filtering
    protected $safeParams = [
        'id' => ['eq'],                // Filter by document ID
        'userId' => ['eq'],            // Filter by user ID
        'documentId' => ['eq'],        // Filter by document ID
        'createdDate' => ['eq', 'lt', 'gt'],  // Filter by creation date
    ];

    // Map the query parameter names to the actual database column names
    protected $columnMap = [
        'userId' => 'user_id',         // Map userId to the user_id column
        'documentId' => 'document_id', // Map documentId to the document_id column
        'createdDate' => 'created_at', // Map createdDate to the created_at column
    ];

    // Define the operators that can be used in the filter
    protected $operatorMap = [
        'eq' => '=',   // Equal to
        'lt' => '<',   // Less than
        'lte' => '<=', // Less than or equal to
        'gt' => '>',   // Greater than
        'gte' => '>=', // Greater than or equal to
    ];
}
