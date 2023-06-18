<!DOCTYPE html>
<html>
<head>
    <title>Nuevo Ticket Creado</title>
</head>
<body>
    <h1>Nuevo Ticket Creado</h1>
    <p>Creado por: {{ $user->name }}</p>
    <p>A las: {{ now() }}</p>
    <p>Ticket: {{ $ticket->title }}</p>
    <p>Desea editar el ticket?</p>
    <a href="http://localhost:3000/detail/{{ $ticket->id }}">Editar Ticket</a>
</body>
</html>
