<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Ticket;
use App\Models\User;
use App\Models\Priority;
use App\Models\Status;
use Illuminate\Support\Facades\Auth;


class TicketController extends Controller
{
    public function index()
    {
        $tickets = Ticket::with('user', 'agent', 'priority', 'status')->get();
        return $tickets;
    }

    public function store(Request $request)
    {
        
        try {
            $email = 'prueba@prueba.com';
            $password = '11111111';
    
            // Intentar autenticar al usuario
            $credentials = [
                'email' => $email,
                'password' => $password
            ];
            if (Auth::attempt($credentials)) {
                $user = Auth::user();
                $ticket = new Ticket();
                $ticket->text_Description = $request->text_Description;
                $ticket->id_Priority = $request->id_Priority;
                $ticket->id_Status = $request->id_Status;
                $ticket->id_User = $user->id;
    
        
                $ticket->save();
            } 
           
        } catch (\Throwable $th) {
            return ('api.tickets.index');
        }
        
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
}
