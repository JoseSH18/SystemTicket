<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class rolseeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $role1 = Role::firstOrCreate(['name' => 'User']);
        $role2 = Role::firstOrCreate(['name' => 'Admin']);
        $role3 = Role::firstOrCreate(['name' => 'Agent']);

        $permissionTicketIndex = Permission::firstOrCreate(['name' => 'api.tickets.index']);
        $permissionTicketIndex->syncRoles([$role1, $role2, $role3]);
        Permission::firstOrCreate(['name'=>'api.tickets.store'])->assignRole($role1);
        Permission::firstOrCreate(['name'=>'api.tickets.update'])->assignRole($role3);
        Permission::firstOrCreate(['name'=>'api.tickets.update'])->assignRole($role2);
        $permissionTicketByid = Permission::firstOrCreate(['name' => 'api.tickets.ticketById']);
        $permissionTicketByid->syncRoles([$role1, $role2, $role3]);
        Permission::firstOrCreate(['name'=>'api.tickets.assign'])->assignRole($role2);
        $permissionTicketPriorities = Permission::firstOrCreate(['name' => 'api.tickets.priorities']);
        $permissionTicketPriorities->syncRoles([$role1, $role2, $role3]);
        $permissionTicketStatuses = Permission::firstOrCreate(['name' => 'api.tickets.statuses']);
        $permissionTicketStatuses->syncRoles([$role1, $role2, $role3]);
        Permission::firstOrCreate(['name'=>'api.tickets.agents'])->assignRole($role2);
        $permissionTicketTags = Permission::firstOrCreate(['name' => 'api.tickets.tags']);
        $permissionTicketTags->syncRoles([$role1, $role2, $role3]);
        $permissionTicketCategories = Permission::firstOrCreate(['name' => 'api.tickets.categories']);
        $permissionTicketCategories->syncRoles([$role1, $role2, $role3]);
        $permissionLogout = Permission::firstOrCreate(['name' => 'api.auth.logout']);
        $permissionLogout->syncRoles([$role1, $role2, $role3]);
        $permissionComment = Permission::firstOrCreate(['name' => 'api.tickets.addComment']);
        $permissionComment->syncRoles([$role1, $role2, $role3]);
        $permissionTicketDelete= Permission::firstOrCreate(['name' => 'api.tickets.delete']);
        $permissionTicketDelete->syncRoles([$role2, $role3]);
        $permissionCategoryIndex= Permission::firstOrCreate(['name' => 'api.categories.index']);
        $permissionCategoryIndex->syncRoles([$role1, $role2, $role3]);
        Permission::firstOrCreate(['name'=>'api.categories.store'])->assignRole($role2);
        Permission::firstOrCreate(['name'=>'api.categories.update'])->assignRole($role2);
        Permission::firstOrCreate(['name'=>'api.categories.categoryById'])->assignRole($role2);
        Permission::firstOrCreate(['name'=>'api.categories.delete'])->assignRole($role2);

    }
}
