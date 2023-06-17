<?php
namespace App;
use Illuminate\Support\Facades\Storage;

class FileDeleter
{
    public function deleteFiles()
    {

        Storage::deleteDirectory('public/files');
    }
}