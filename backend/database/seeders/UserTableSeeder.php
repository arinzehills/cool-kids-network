<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'first_name' => 'Admin',
            'last_name' => 'aUser',
            'country' => 'Nigeria',
            'email' => 'admin@example.com',
            'password' => Hash::make('password'),  // Replace with a secure password
            'role' => User::ROLE_MAINTAINER,       // Using the constant from the User model
        ]);

        // Creating users with different roles
        User::create([
            'first_name' => 'Cool Kid User',
            'last_name' => 'Cool Kid User',
            'email' => 'coolkid@example.com',
            'country' => 'Nigeria',
            'password' => Hash::make('password'),
            'role' => User::ROLE_COOL_KID,  // Using the constant from the User model
        ]);

        User::create([
            'first_name' => 'Cooler Kid User',
            'last_name' => 'Cooler Kid User',
            'email' => 'coolerkid@example.com',
            'country' => 'Nigeria',
            'password' => Hash::make('password'),
            'role' => User::ROLE_COOLER_KID,  // Using the constant from the User model
        ]);

        User::create([
            'first_name' => 'Coolest Kid User',
            'last_name' => 'Cooler Kid User',
            'email' => 'coolestkid@example.com',
            'country' => 'Nigeria',
            'password' => Hash::make('password'),
            'role' => User::ROLE_COOLEST_KID,  // Using the constant from the User model
        ]);
    }
}
