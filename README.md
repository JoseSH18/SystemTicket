# Sistema de Soporte de Tickets
## Descripción
Este proyecto es un sistema para gestionar tickets de soporte, donde los clientes pueden registrar sus solicitudes y los administradores y agentes pueden manejarlos. Proporciona una interfaz intuitiva para seguir el estado de los tickets y facilitar la comunicación entre todas las partes involucradas.

## Características
Registro e inicio de sesión: Los usuarios pueden registrarse con sus datos y luego iniciar sesión en el sistema.

Roles de usuario: Los usuarios pueden tener uno de los siguientes roles: Usuario (predeterminado), Agente o Administrador.

Panel de administración: Los administradores tienen acceso a un panel de administración donde pueden administrar los datos del sistema, como menús, tablas y realizar operaciones CRUD.

Tickets: Los usuarios pueden crear tickets de soporte con información relevante, incluyendo título, descripción, archivos adjuntos, prioridad, estado, agente asignado, categorías y etiquetas.

Filtros: Los usuarios pueden filtrar la tabla de tickets por estado, prioridad y categoría.

Comentarios: Los usuarios pueden agregar comentarios a los tickets existentes y ver el registro de actividad y comentarios anteriores.

Administración de etiquetas, categorías y prioridades: Los administradores pueden gestionar las etiquetas, categorías y prioridades utilizadas para clasificar los tickets.

Gestión de usuarios: Los administradores pueden administrar los usuarios del sistema, incluyendo la asignación de roles y la edición de sus datos.

Logs: Los administradores tienen acceso a un registro de cambios que muestra la historia de los tickets, como quién creó o actualizó un ticket y cuándo.

Notificaciones por correo electrónico: Los administradores reciben una notificación por correo electrónico cuando se crea un nuevo ticket, con un enlace directo al formulario de edición del ticket.

# Configuración

A continuación se detallan los pasos para configurar y ejecutar el proyecto en tu entorno local:

1. Clona este repositorio en tu máquina local.
2. Asegúrate de tener instalado Laravel y React en tu entorno de desarrollo.
3. Configura el backend:
    1. Navega al directorio del backend y ejecuta **composer install** para instalar las dependencias de Laravel.
    2. Crea un archivo **.env** basado en el archivo **.env.example** y configura la conexión a la base de datos y otros ajustes necesarios.
    3. Ejecuta **php artisan migrate** para crear las tablas en la base de datos.
    4. Ejecuta **php artisan serve** para iniciar el servidor de desarrollo de Laravel.
4. Configura el frontend:
    1. Navega al directorio del frontend y ejecuta **npm install** para instalar las dependencias de React.
    2. Edita el archivo **.env** para configurar la URL del servidor de desarrollo de Laravel.
    3. Ejecuta **npm start** para iniciar la aplicación de React.
## Dependencias
Las dependencias principales utilizadas en este proyecto incluyen:

- Laravel Framework: [link a la documentación](https://laravel.com/docs/10.x)
- React: [link a la documentación](https://react.dev/learn)

Ten en cuenta que hay otras dependencias específicas utilizadas para integrar Laravel y React. Puedes encontrar una lista completa en los archivos **composer.json** y **package.json** del proyecto.
