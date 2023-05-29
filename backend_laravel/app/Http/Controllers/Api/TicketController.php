<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Ticket;

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
            $ticket = new Ticket();
            $ticket->text_Description = $request->text_Description;
            $ticket->id_Priority = $request->id_Priority;
            $ticket->id_Status = $request->id_Status;
            $ticket->id_User = $request->id_User;
            $ticket->id_Agent = $request->id_Agent;
    
            $ticket->save();
        } catch (\Throwable $th) {
            return ('api.tickets.index');
        }
        
    }
}
