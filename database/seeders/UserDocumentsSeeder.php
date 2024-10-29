<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\UserDocument;

class UserDocumentsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create 10 user document records using the factory
        UserDocument::factory()->count(10)->create();
    }
}
