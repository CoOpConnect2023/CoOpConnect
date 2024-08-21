<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\User;
use Carbon\Carbon;

class DeleteUnverifiedUsers extends Command
{
    protected $signature = 'users:delete-unverified';
    protected $description = 'Delete users who have not verified their email within 48 hours';

   public function handle()
    {
        $unverifiedUsers = User::whereNull('email_verified_at')
                               ->where('created_at', '<', Carbon::now()->subHours(48))
                               ->delete();

        $this->info('Deleted unverified users.');
    }
}
