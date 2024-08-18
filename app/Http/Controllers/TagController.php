<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class TagController extends Controller
{
    public function index(Request $request)
    {
        $tags = $request->user()->tags()->whereHas('recipes')->orderBy('name')->get();

        return Inertia::render('Tags/Index', [
            'tags' => $tags,
        ]);
    }
}
