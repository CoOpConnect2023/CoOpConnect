<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Co Op Connect</title>


    </head>
    <body>
        <h1>Co Op Connect Landing Page</h1>
<div id="components"></div>
@viteReactRefresh
@vite('resources/js/app.jsx')

    </body>
</html>
