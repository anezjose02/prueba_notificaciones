<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    @include('template.global_css')
    <title>ADIHNC</title>
    <script type="text/javascript" src="https://sandbox.web.squarecdn.com/v1/square.js"></script>

</head>
<body>
@routes
<div id="root"></div>
@include('template.global_js')
</body>
</html>
