<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Tag;
use Illuminate\Support\Facades\Validator;

class TagController extends Controller
{
    public function index()
    {
    
        $tags = Tag::All();
        
    
        return $tags;
    }

    public function store(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'tag' => 'required|max:30',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors(),
            ], 422);
        }

        try {
            $tag = new Tag();
            $tag->tag=$request->tag;
            $tag->save();
        } catch (\Throwable $th) {
            return redirect()->back()->withErrors($th)->withInput();
        }
    }

    public function tagById(string $id)
    {
        $tag = Tag::find($id);
        return $tag;
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'tag' => 'required|max:30',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors(),
            ], 422);
        }
        $tag = Tag::findOrFail($id);
        try {
            $tag->tag = $request->tag;
            $tag->save();
        } catch (\Throwable $th) {
            return redirect()->back()->withErrors($th)->withInput();
        }
    }

    public function delete(string $id)
    {
        $tag = Tag::destroy($id);
        return $tag;
    }
}
