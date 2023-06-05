<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Ticket;
use App\Models\User;
use App\Models\Priority;
use App\Models\Category;
use App\Models\Tag;
use App\Models\File;
use App\Models\Status;
use Error;
use Illuminate\Support\Facades\Auth;


class TicketController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $role = $user->roles->first()->name;
    
        if ($role === 'User') {
            $tickets = Ticket::with('user', 'agent', 'priority', 'status', 'categories', 'tags')
                ->where('id_User', $user->id)
                ->get();
        } elseif ($role === 'Agent') {
            $tickets = Ticket::with('user', 'agent', 'priority', 'status', 'categories', 'tags')
                ->where('id_Agent', $user->id)
                ->get();
        } else {
            $tickets = Ticket::with('user', 'agent', 'priority', 'status', 'categories', 'tags')->get();
        }
    
        return $tickets;
    }

    public function store(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'title' => 'required|max:30',
            'id_Priority' => 'required|numeric',
            'id_Status' => 'required|numeric',
            'text_Description' => 'required|max:100',
        ]);
    
        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator)->withInput();
        }
    
        
        try {

                $user = Auth::user();
                $ticket = new Ticket();

                $priority = Priority::find($request->id_Priority);
                $status = Status::find($request->id_Status);

                $ticket->title = $request->title;
                $ticket->text_Description = $request->text_Description;
                $ticket->priority()->associate( $priority);
                $ticket->status()->associate($status);
                $ticket->user()->associate($user);
                $ticket->save();
                $idsCategories = $request->input('ids_Categories', []);
                $idsTags = $request->input('ids_Tags', []);
                foreach ($idsCategories as $categoryId) {
                    
      
 
                    $ticket->categories()->attach($categoryId);
                   
                
                }
      
                foreach ($idsTags as $tagId) {
                   
                    $ticket->tags()->attach($tagId);
                    
                }

            

                
                
                if ($request->hasFile('file')) {
                    $files = $request->file('file');
                
                    foreach ($files as $fieldName => $file) {
                        $path = $file->store('public/files');
                        
                        $uploadedFile = new File();
                        $uploadedFile->file = $path;
                        
                        $ticket->files()->save($uploadedFile);
                    }
                }
                
                
              
            
           
        } catch (\Throwable $th) {
            
    
            return ('api.tickets.index');
        }
        
    }

    public function update(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'title' => 'required|max:30',
            'id_Priority' => 'required|numeric',
            'id_Status' => 'required|numeric',
            'text_Description' => 'required|max:100',
        ]);
    
        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator)->withInput();
        }
    
        
        try {

                $user = Auth::user();
                $ticket = new Ticket();

                $priority = Priority::find($request->id_Priority);
                $status = Status::find($request->id_Status);

                $ticket->title = $request->title;
                $ticket->text_Description = $request->text_Description;
                $ticket->priority()->associate( $priority);
                $ticket->status()->associate($status);
                $ticket->user()->associate($user);
                $ticket->save();
                $idsCategories = $request->input('ids_Categories', []);
                $idsTags = $request->input('ids_Tags', []);
                foreach ($idsCategories as $categoryId) {
                    
      
 
                    $ticket->categories()->attach($categoryId);
                   
                
                }
      
                foreach ($idsTags as $tagId) {
                   
                    $ticket->tags()->attach($tagId);
                    
                }

            

                
                
                if ($request->hasFile('file')) {
                    $files = $request->file('file');
                
                    foreach ($files as $fieldName => $file) {
                        $path = $file->store('public/files');
                        
                        $uploadedFile = new File();
                        $uploadedFile->file = $path;
                        
                        $ticket->files()->save($uploadedFile);
                    }
                }
                
                
              
            
           
        } catch (\Throwable $th) {
            
    
            return ('api.tickets.index');
        }
        
    }

    public function ticketById(string $id)
    {
        $ticket = Ticket::with('user', 'agent', 'priority', 'status', 'categories', 'tags', 'files')
        ->find($id);
        return $ticket;
    }
    public function assign(Request $request)
    {
        $ticket = Ticket::findOrFail($request->id);
        $ticket->id_Agent = $request->id_Agent;


        $ticket->save();
        return $ticket;
    }

    public function getAgents()
    {
        $agents = User::role('Agent')->get();
        return $agents;
    }

    public function getPriorities()
    {
        $priorities = Priority::All();
        return $priorities;
    }
    public function getStatuses()
    {
        $statuses = Status::All();
        return $statuses;
    }

    public function getCategories()
    {
        $categories = Category::All();
        return $categories;
    }

    public function getTags()
    {
        $tags = Tag::All();
        return $tags;
    }
}
