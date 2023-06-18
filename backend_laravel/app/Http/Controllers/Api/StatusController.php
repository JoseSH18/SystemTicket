<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Status;
use Illuminate\Support\Facades\Validator;

class StatusController extends Controller
{
    public function index()
    {
    
        $statuses = Status::All();
        
    
        return $statuses;
    }

    public function store(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'status' => 'required|max:30',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors(),
            ], 422);
        }

        try {
            $status = new Status();
            $status->status=$request->status;
            $status->save();
        } catch (\Throwable $th) {
            return redirect()->back()->withErrors($th)->withInput();
        }
    }

    public function statusById(string $id)
    {
        $status = Status::find($id);
        return $status;
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'status' => 'required|max:30',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors(),
            ], 422);
        }
        $status = Status::findOrFail($id);
        try {
            $status->status = $request->status;
            $status->save();
        } catch (\Throwable $th) {
            return redirect()->back()->withErrors($th)->withInput();
        }
    }

    public function delete(string $id)
    {
        $status = Status::destroy($id);
        return $status;
    }
}
