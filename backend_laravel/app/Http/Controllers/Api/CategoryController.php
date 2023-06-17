<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Category;
use Illuminate\Support\Facades\Validator;

class CategoryController extends Controller
{
    public function index()
    {
    
        $categories = Category::All();
        
    
        return $categories;
    }

    public function store(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'category' => 'required|max:30',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors(),
            ], 422);
        }

        try {
            $category = new Category();
            $category->category=$request->category;
            $category->save();
        } catch (\Throwable $th) {
            return redirect()->back()->withErrors($th)->withInput();
        }
    }
    public function categoryById(string $id)
    {
        $category = Category::find($id);
        return $category;
    }
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'category' => 'required|max:30',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors(),
            ], 422);
        }
        $category = Category::findOrFail($id);
        try {
            $category->category = $request->category;
            $category->save();
        } catch (\Throwable $th) {
            return redirect()->back()->withErrors($th)->withInput();
        }
    }
    public function delete(string $id)
    {
        $category = Category::destroy($id);
        return $category;
    }

}
