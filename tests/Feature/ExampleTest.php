<?php

namespace Tests\Feature;

use App\Models\Conversation;
// use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class ExampleTest extends TestCase
{
    public function testGetUsersEndpoint()
    {
        $conversation = Conversation::factory()->create();
        $response = $this->getJson('/routes/api/createconversation');
        $response->assertJson([$conversation->toArray(), ]);
    }
}