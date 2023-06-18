<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Priority;
use Illuminate\Support\Facades\Validator;

class PriorityController extends Controller
{
    public function index()
    {
    
        $priorities = Priority::All();
        
    
        return $priorities;
    }

    public function store(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'type' => 'required|max:30',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors(),
            ], 422);
        }

        try {
            $priority = new Priority();
            $priority->type=$request->type;
            $priority->save();
        } catch (\Throwable $th) {
            return redirect()->back()->withErrors($th)->withInput();
        }
    }

    public function priorityById(string $id)
    {
        $priority = Priority::find($id);
        return $priority;
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'type' => 'required|max:30',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors(),
            ], 422);
        }
        $priority = Priority::findOrFail($id);
        try {
            $priority->type = $request->type;
            $priority->save();
        } catch (\Throwable $th) {
            return redirect()->back()->withErrors($th)->withInput();
        }
    }

    public function delete(string $id)
    {
        $priority = Priority::destroy($id);
        return $priority;
    }
}
