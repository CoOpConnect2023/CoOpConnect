<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Models\User;
use App\Models\School;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Create an admin user with the provided details
        $selectedStatus = 'working'; // Based on the provided status

        User::create([
            'id' => 51,
            'name' => 'Admin',
            'email' => 'admin@a.ca',
            'email_verified_at' => '2024-08-21 15:45:14',
            'class' => 'A', // You can adjust this if needed
            'password' => Hash::make('A'),
            'remember_token' => Str::random(10),
            'role' => 'admin',
            'skills' => json_encode(['HTML']),
            'status' => $selectedStatus,
            'school_id' => School::inRandomOrder()->first()->id,  // Adjust if a specific school ID is needed

            'working' => $selectedStatus === 'working',
            'interviewing' => $selectedStatus === 'interviewing',
            'searching' => $selectedStatus === 'searching',
        ]);
    }
}
