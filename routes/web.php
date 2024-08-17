<?php

use App\Http\Controllers\FavoriteRecipeController;
use App\Http\Controllers\RecipeController;
use App\Http\Controllers\TagController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::redirect('/', '/recipes')
    ->name('home');

Route::middleware('auth')->group(function () {
    Route::resource('/recipes', RecipeController::class);
    Route::resource('/favorite-recipes', FavoriteRecipeController::class)
        ->only(['index', 'store', 'destroy']);
    Route::get('/tags', [TagController::class, 'index'])->name('tags.index');
});

// New routes
Route::get('/legal', function () {
    return Inertia::render('LegalInformation');
})->name('legal');

Route::get('/contact', function () {
    return Inertia::render('Contact');
})->name('contact');

require __DIR__.'/auth.php';
