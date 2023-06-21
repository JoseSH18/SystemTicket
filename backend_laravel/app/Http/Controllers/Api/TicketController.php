<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Ticket;
use App\Models\User;
use App\Models\Priority;
use App\Models\Tag;
use App\Models\File;
use App\Models\Status;
use App\Models\Comment;
use App\Models\Log;
use Error;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Mail;
use App\Mail\NuevoTicketCreado;

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
            'file' => 'required|array|min:1',
            'file.*' => 'file',
            'ids_Categories' => 'required|array|min:1',
            'ids_Tags' => 'required|array|min:1',
        ]);
    
        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors(),
            ], 422);
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
                        $uploadedFile->file = basename($path); // Obtener solo el nombre del archivo
                
                        $ticket->files()->save($uploadedFile);
                    }
                }
                
                
                try {
                    $this->sendEmail($ticket);
                   
                } catch (\Throwable $th) {
                    // Agregar esta línea para registrar el mensaje de la excepción
                    \Log::error('Error al enviar el correo electrónico: ' . $th->getMessage());

                    return response()->json([
                        'error' => 'Ocurrió un error al enviar el correo electrónico.',
                        'exception' => $th->getMessage(),
                    ], 500);
                }
                $log = new Log();
                $log->message = "El usuario " . $user->name . " " . $user->last_Name . " " . $user->second_Last_Name . " ha creado un nuevo Ticket llamado " . $ticket->title;
                $log->save();

        } catch (\Throwable $th) {
            
    
            return response()->json([
                'error' => 'Ocurrió un error al crear un ticket',
                'exception' => $th->getMessage(),
            ], 500);
        }
        
    }

    public function update(Request $request, $id)
    {

 
        $validator = Validator::make($request->all(), [
            'title' => 'required|max:30',
            'id_Priority' => 'required|numeric',
            'id_Status' => 'required|numeric',
            'text_Description' => 'required|max:100',
            'ids_Categories' => 'required|array|min:1',
            'ids_Tags' => 'required|array|min:1',
        ]);
    
        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors(),
            ], 422);
        }
        
        try {

                $ticket = Ticket::findOrFail($id);


                $priority = ($request->id_Priority) ? Priority::find($request->id_Priority) : null;
                $ticket->priority()->associate($priority);
                $status = ($request->id_Status) ? Status::find($request->id_Status) : null;
                $ticket->status()->associate($status);
            
                if($request->id_Agent != ''){
                    $agent = User::find($request->id_Agent);
                    $ticket->agent()->associate($agent);
                }
                $ticket->title = $request->title;
                $ticket->text_Description = $request->text_Description;
                $ticket->save();
                $idsCategories = $request->input('ids_Categories', []);
                $idsTags = $request->input('ids_Tags', []);
                $ticket->categories()->detach();
                $ticket->tags()->detach();
                foreach ($idsCategories as $categoryId) {
                    
      
 
                    $ticket->categories()->attach($categoryId);
                   
                
                }
      
                foreach ($idsTags as $tagId) {
                   
                    $ticket->tags()->attach($tagId);
                    
                }

                $oldFileIds = $request->input('oldFiles', []);
                
                if (empty($oldFileIds)) {
                    // Obtener los IDs de todos los archivos asociados al ticket
                    $ticketFileIds = $ticket->files()->pluck('id')->toArray();
                
                    // Eliminar los archivos asociados al ticket
                    $ticket->files()->delete();
                
                    // Eliminar los archivos físicos del storage
                    foreach ($ticketFileIds as $fileId) {
                        $file = File::find($fileId);
                    
                        if ($file) {
                            Storage::delete($file->file);
                        }
                    }
                } else {
                    // El código existente para eliminar archivos relacionados con `$request->oldFiles`
                    $ticketFileIds = $ticket->files()->pluck('id')->toArray();
                    $filesToDelete = array_diff($ticketFileIds, $oldFileIds);
                    var_dump($filesToDelete);
                    $ticket->files()->whereIn('id', $filesToDelete)->delete();
                    foreach ($filesToDelete as $fileId) {
                        $file = File::find($fileId);
                    
                        if ($file) {
                            Storage::delete($file->file);
                        }
                    }
                }
                if ($request->hasFile('file')) {
                    $files = $request->file('file');
                
                    foreach ($files as $fieldName => $file) {
                        $path = $file->store('public/files');
                
                        $uploadedFile = new File();
                        $uploadedFile->file = basename($path); // Obtener solo el nombre del archivo
                
                        $ticket->files()->save($uploadedFile);
                    }
                }
                

              
                $log = new Log();
                $log->message = "El agente " . $agent->name . " " . $agent->last_Name . " " . $agent->second_Last_Name . " ha editado un Ticket llamado " . $ticket->title;
                $log->save();
        } catch (\Throwable $th) {
            
            return response()->json([
                'error' => 'Ocurrió un error al editar un ticket',
                'exception' => $th->getMessage(),
            ], 500);
        }
        
    }

    public function ticketById(string $id)
    {
        $ticket = Ticket::with('user', 'agent', 'priority', 'status', 'categories', 'tags', 'files', 'comments')
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



    public function getTags()
    {
        $tags = Tag::All();
        return $tags;
    }
    public function addComment(Request $request)
    {
        $user = Auth::user();
        $comment = new Comment();
        $ticket = Ticket::findOrFail($request->id_Ticket);

        $comment->comment = $request->comment;
        $comment->id_Ticket = $request->id_Ticket;
        $comment->author = $user->name . ' ' . $user->last_Name . ' ' . $user->second_Last_Name;
        $ticket->comments()->save($comment);

        return $ticket;
    }
    public function delete(string $id)
    {
        $ticket = Ticket::destroy($id);
        return $ticket;
    }
    public function sendEmail(Ticket $ticket)
    {
        $user = Auth::user();
        $admin = User::whereHas('roles', function ($query) {
            $query->where('name', 'Admin');
        })->first();
        Mail::to($admin->email)->send(new NuevoTicketCreado($user, $ticket));

        return "Ticket creado y correo enviado correctamente.";
    }
    public function getLogs(){
        try {
            $logs = Log::All();
            return $logs;
        } catch (\Throwable $th) {
            return response()->json([
                'error' => 'Ocurrió un error al obtener los logs',
                'exception' => $th->getMessage(),
            ], 500);
        }
       
    }
}
