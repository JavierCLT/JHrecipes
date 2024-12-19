<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <!-- Primary Meta Tags -->
        <title>{{ 'JHrecipes' }}</title>
        <meta name="description" content="Your online recipe repository. Save as many recipes as you want and share them with your loved ones" />

        <!-- Open Graph / Facebook -->
        <meta property="og:title" content="JHrecipes - Easy & Delicious Recipes">
        <meta property="og:description" content="Your online recipe repository. Save as many recipes as you want and share them with your loved ones.">
        <meta property="og:image" content="{{ asset('images/social-share.png') }}">
        <meta property="og:url" content="https://jhrecipes.com/">
        <meta property="og:type" content="website">
        <meta property="og:site_name" content="JHrecipes">

        <!-- Twitter Meta -->
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:title" content="JHrecipes - Easy & Delicious Recipes">
        <meta name="twitter:description" content="Your online recipe repository. Save as many recipes as you want and share them with your loved ones.">
        <meta name="twitter:image" content="{{ asset('images/social-share.png') }}">

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Merriweather:wght@300;400;700;900&family=Open+Sans:wght@300..800&display=swap" rel="stylesheet">

        <!-- Favicons -->
        <link rel="apple-touch-icon" sizes="180x180" href="{{ asset('images/apple-touch-icon.png') }}">
        <link rel="icon" type="image/png" sizes="32x32" href="{{ asset('images/favicon-32x32.png') }}">
        <link rel="icon" type="image/png" sizes="16x16" href="{{ asset('images/favicon-16x16.png') }}">

        <!-- Plausible (Analytics) -->
        <script defer data-domain="jhrecipes.com" src="https://plausible.io/js/script.js"></script>
        
        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.tsx', "resources/js/Pages/{$page['component']}.tsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
