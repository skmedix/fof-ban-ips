<?php

/*
 * This file is part of fof/ban-ips.
 *
 * Copyright (c) 2019 FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

use Flarum\Database\Migration;
use Illuminate\Database\Schema\Blueprint;

return Migration::createTable('banned_ips', function (Blueprint $table) {
    $table->increments('id');
    $table->unsignedInteger('creator_id');
    $table->string('address')->unique();
    $table->string('reason')->nullable();
    $table->unsignedInteger('user_id')->nullable();
    $table->timestamp('created_at');
    $table->timestamp('deleted_at')->nullable();

    $table->foreign('user_id')->references('id')->on('users')->onDelete('set null');
});
