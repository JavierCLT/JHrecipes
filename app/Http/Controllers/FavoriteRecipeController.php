<?php

namespace App\Http\Controllers;

use App\Models\Recipe;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FavoriteRecipeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $recipes = $request->user()->favoriteRecipes()
            ->orderBy('title')
            ->select(['id', 'title'])
            ->get();

        return Inertia::render('FavoriteRecipes/Index', [
            'recipes' => $recipes,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'recipe_id' => ['required'],
        ]);

        $request->user()->favoriteRecipes()->attach($request->recipe_id);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Recipe $favoriteRecipe)
    {
        request()->user()->favoriteRecipes()->detach($favoriteRecipe->id);
    }
}
