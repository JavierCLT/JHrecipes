<?php

namespace App\Console\Commands;

use App\Models\Recipe;
use App\Models\RecipeIngredient;
use App\Models\RecipeInstruction;
use App\Models\Tag;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class DatabaseConvert extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:database-convert';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        DB::connection('old')->table('recipes')->orderBy('RecipeID')->lazy()->each(function (object $item) {
            Recipe::create([
                'id' => $item->RecipeID,
                'user_id' => 1,
                'title' => $item->Title,
                'servings' => $item->Servings,
                'origin' => $item->Origin,
            ]);
        });

        DB::connection('old')->table('instructions')->orderBy('InstructionID')->lazy()->each(function (object $item) {
            RecipeInstruction::create([
                'id' => $item->InstructionID,
                'recipe_id' => $item->RecipeID,
                'step_number' => $item->StepNumber,
                'description' => $item->Description,
            ]);
        });

        DB::connection('old')->table('ingredients')->orderBy('IngredientID')->lazy()->each(function (object $item) {
            RecipeIngredient::create([
                'id' => $item->IngredientID,
                'recipe_id' => $item->RecipeID,
                'description' => $item->Description,
            ]);
        });

        DB::connection('old')->table('tags')->orderBy('TagID')->lazy()->each(function (object $item) {
            Tag::create([
                'id' => $item->TagID,
                'user_id' => 1,
                'name' => $item->TagName,
            ]);
        });

        DB::connection('old')->table('recipetags')->orderBy('RecipeID')->lazy()->each(function (object $item) {
            DB::table('recipe_has_tags')->insert([
                'tag_id' => $item->TagID,
                'recipe_id' => $item->RecipeID,
            ]);
        });
    }
}
