<?php

namespace App\Imports;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class UsersImport implements ToModel, WithHeadingRow
{
    public function model(array $row)
    {
        return new User([
            'name' => $row['name'],
            'email' => $row['email'],
            'class' => $row['class'],
            'role' => $row['role'],
            'status' => $row['status'],
            'description' => $row['description'],
            'school_id' => $row['school_id'],
            'skills' => json_encode(explode(',', $row['skills'])), // Example for skills as array
            'positiontitle' => $row['positiontitle'],
        ]);
    }
}
