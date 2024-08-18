<?php

namespace App\Http\Controllers;

use App\Http\Requests\RecipeRequest;
use App\Models\Recipe;
use App\Models\Tag;
use Exception;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class RecipeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $recipes = $request->user()->recipes()
            ->when($request->searchQuery, function (Builder $query, string $searchQuery) {
                $query->where(function (Builder $searchQueryBuilder) use ($searchQuery) {
                    $searchQueryBuilder
                        ->orWhereLike('title', '%'.$searchQuery.'%')
                        ->orWhereLike('origin', '%'.$searchQuery.'%')
                        ->orWhereHas('tags', function (Builder $tagsQuery) use ($searchQuery) {
                            $tagsQuery->whereLike('name', '%'.$searchQuery.'%');
                        })
                        ->orWhereHas('ingredients', function (Builder $tagsQuery) use ($searchQuery) {
                            $tagsQuery->whereLike('description', '%'.$searchQuery.'%');
                        });
                });
            })
            ->when($request->tags, function (Builder $query, string $tags) {
                $query->whereHas('tags', function (Builder $tagsQuery) use ($tags) {
                    $tagsQuery->where('name', $tags);
                });
            });

        $recipes = $recipes
            ->orderBy('title')
            ->select(['id', 'title'])
            ->get();

        return Inertia::render('Recipes/Index', [
            'recipes' => $recipes,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(RecipeRequest $request)
    {
        try {
            DB::beginTransaction();

            $recipe = $request->user()->recipes()->create([
                'title' => $request->title,
                'servings' => $request->servings,
                'origin' => $request->origin,
                'is_perfected' => $request->is_perfected,
            ]);

            $tagWords = explode(',', $request->tags);

            foreach ($tagWords as $tagWord) {
                $tag = $request->user()->tags()->firstOrCreate(['name' => trim($tagWord)]);

                $recipe->tags()->attach($tag);
            }

            $ingredients = collect(explode(PHP_EOL, $request->ingredients));
            $recipe->ingredients()
                ->createMany($ingredients->map(
                    fn ($ingredient) => ['description' => trim($ingredient)]
                )
                );

            $instructions = collect(explode(PHP_EOL, $request->instructions));
            $recipe->instructions()
                ->createMany($instructions->map(
                    fn ($instruction, $index) => ['step_number' => $index + 1, 'description' => trim($instruction)]
                )
                );

            DB::commit();

            return redirect()->back();
        } catch (Exception $e) {
            DB::rollBack();

            return redirect()->back()->withErrors(['error' => $e->getMessage()]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Recipe $recipe)
    {
        Gate::authorize('view', $recipe);

        $recipe->load(['ingredients', 'instructions', 'tags'])->append('is_favorite');

        return $recipe;
    }

    /**
     * Edit the specified resource.
     */
    public function edit(Recipe $recipe)
    {
        Gate::authorize('update', $recipe);

        $recipe->load(['ingredients', 'instructions', 'tags']);

        return Inertia::render('Recipes/Edit', [
            'recipe' => $recipe,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(RecipeRequest $request, Recipe $recipe)
    {
        Gate::authorize('update', $recipe);

        try {
            DB::beginTransaction();

            $recipe->update([
                'title' => $request->title,
                'servings' => $request->servings,
                'origin' => $request->origin,
                'is_perfected' => $request->is_perfected,
            ]);

            
            $tags = collect(explode(',', $request->tags))
                ->map(fn ($tagWord) => request()->user()->tags()->firstOrCreate(['name' => trim($tagWord)]))
                ->map(fn ($tag) => $tag->id)
                ->toArray();

            $recipe->tags()->sync($tags);

            $recipe->ingredients()->delete();
            $ingredients = collect(explode(PHP_EOL, $request->ingredients))
                ->map(fn ($ingredient) => ['description' => trim($ingredient)]);

            $recipe->ingredients()
                ->createMany($ingredients);

            $recipe->instructions()->delete();
            $instructions = collect(explode(PHP_EOL, $request->instructions))
                ->map(
                    fn ($instruction, $index) => [
                        'step_number' => $index + 1,
                        'description' => trim($instruction),
                    ]
                );

            $recipe->instructions()->createMany($instructions);

            DB::commit();

            return response()->json($recipe);
        } catch (Exception $e) {
            DB::rollBack();

            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Recipe $recipe)
    {
        Gate::authorize('delete', $recipe);

        try {
            DB::beginTransaction();

            $recipe->delete();

            DB::commit();

            return redirect()->back();
        } catch (Exception $e) {
            DB::rollBack();

            return redirect()->back()->withErrors(['message' => $e->getMessage()]);
        }
    }
}
