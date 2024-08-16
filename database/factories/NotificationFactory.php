<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Notification;
use App\Models\User;

class NotificationFactory extends Factory
{
    protected $model = Notification::class;

    public function definition()
    {
        $type = $this->faker->randomElement(['Interview Scheduled', 'Application Accepted', 'Application Rejected']);
        $interviewDate = $type === 'Interview Scheduled' ? $this->faker->dateTimeBetween('now', '+1 week') : null;

        return [
            'from_user_id' => User::factory(),
            'to_user_id' => User::factory(),
            'viewed' => $this->faker->boolean,
            'content' => $this->faker->sentence,
            'type' => $type,
            'interview_date' => $interviewDate,
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
