<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\Document;
use App\Models\UserDocument;
use Illuminate\Database\Eloquent\Factories\Factory;

class UserDocumentFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = UserDocument::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),               // Create a new user
            'document_id' => Document::factory(),       // Create a new document
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
