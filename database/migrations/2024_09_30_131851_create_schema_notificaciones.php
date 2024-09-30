<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSchemaNotificaciones extends Migration
{
    protected const
        USER_ROL_ID = "user_rol_id",
        USER_ROLES = "user_roles",
        USERS = "users",
        USER_ID = "user_id",
        ADMIN_ID = "admin_id",
        IMAGES = "images",
        TASKS_STATUS = "tasks_status",
        TASKS = "tasks",
        TASKS_STATUS_ID = "tasks_status_id"
    ;

    public function up()
    {
        self::createUserRolesTable(self::USER_ROLES);
        self::createUsersTable(self::USERS);
        self::createImagesTable(self::IMAGES);
        self::createTasksStatusTable(self::TASKS_STATUS);
        self::createTasksTable(self::TASKS);
    }

    public function down()
    {
        Schema::disableForeignKeyConstraints();

        $tables =
            [
                self::USER_ROLES,
                self::USERS,
                self::IMAGES,
                self::TASKS_STATUS,
                self::TASKS
            ];

        self::dropIfExistCustom($tables);

        Schema::enableForeignKeyConstraints();
    }

    private static function dropIfExistCustom($tables)
    {
        foreach ($tables as $table) {
            Schema::dropIfExists($table);
        }
    }

    protected static function createUserRolesTable($tableName)
    {
        Schema::create($tableName, function (Blueprint $table) {
            $table->id();
            $table->string("name");
        });
    }

    protected static function createUsersTable($tableName)
    {
        Schema::create($tableName, function (Blueprint $table) {
            $table->id();
            $table->string("name");
            $table->string("last_name")->nullable();
            $table->string("second_last_name")->nullable();
            $table->string("email")->unique()->nullable();
            $table->bigInteger("phone")->nullable();
            $table->string("password")->nullable();
            $table->boolean("active")->default(true);
            $table->string("remember_token")->nullable();
            $table->string("email_verified_at")->nullable();
            $table->foreignId(self::USER_ROL_ID)->constrained(self::USER_ROLES);
            $table->timestamps();
        });
    }

    protected static function createImagesTable($tableName)
    {
        Schema::create($tableName, function (Blueprint $table) {
            $table->id();
            $table->string("url");
            $table->morphs("image");
            $table->timestamps();
        });
    }

    protected static function createTasksStatusTable($tableName){
        Schema::create($tableName, function (Blueprint $table) {
            $table->id();
            $table->string('name');
        });
    }

    protected static function createTasksTable($tableName){
        Schema::create($tableName, function (Blueprint $table) {
            $table->id();
            $table->string("title");
            $table->text('description');
            $table->foreignId(self::TASKS_STATUS_ID)->constrained(self::TASKS_STATUS);
            $table->foreignId(self::USER_ID)->constrained(self::USERS);
            $table->foreignId(self::ADMIN_ID)->constrained(self::USERS);
            $table->timestamps();
        });
    }

}
