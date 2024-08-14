<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Recipe extends Model
{
    use HasFactory;

    protected $fillable = ['id', 'title', 'servings', 'origin', 'user_id'];

    public function ingredients(): HasMany
    {
        return $this->hasMany(RecipeIngredient::class);
    }

    public function instructions(): HasMany
    {
        return $this->hasMany(RecipeInstruction::class);
    }

    public function tags(): BelongsToMany
    {
        return $this->belongsToMany(Tag::class, 'recipe_has_tags');
    }

    protected function isFavorite(): Attribute
    {
        return Attribute::make(
            get: function () {
                if (auth()->check() === false) {
                    return false;
                }

                return request()->user()->favoriteRecipes()->where(['recipe_id' => $this->id])->exists();
            },
        );
    }
}
