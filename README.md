# Proyecto Backend en NestJS

Este documento te guiará para clonar el repositorio, instalar las dependencias necesarias y poner en marcha el servidor de desarrollo.

## Requisitos

Asegúrate de tener instalados los siguientes programas en tu computadora:

- [Node.js](https://nodejs.org/) (versión 14 o superior)
- [npm](https://www.npmjs.com/) (se instala automáticamente con Node.js)
- [Git](https://git-scm.com/)

## Clonar el Repositorio

Para comenzar, necesitas clonar el repositorio a tu máquina local. Abre una terminal y ejecuta el siguiente comando:

```bash
git clone https://github.com/tu-usuario/Estructuras-de-datos--Back.git
```
Reemplaza tu-usuario por tu nombre de usuario en Github

Ahora, navega al proyecto e instala las dependencias:

```bash
cd Estructuras-de-datos--Back.git
yarn install
```
## Configuración de entorno:
Crea un archivo .env en la raíz del proyecto y configura las variables de entorno necesarias. Aquí tienes un ejemplo de lo que podría contener:
```bash
DB_HOST = localhost
DB_PORT = 3306
DB_USERNAME = tu-usuario
DB_PASSWORD = tu-contraseña
DB_DATABASE = tu-base-de-datos
JWT_SECRET = una-clave-secreta
```
Este .env contiene principalmente informacion sobre la conección a la base de datos.

## Ejecuta el servidor de desarrollo

Por ultimo, una vez configurado todo, solo resta escribir el comando
```bash
yarn start:dev
```
Este comando iniciará el servidor en modo de desarrollo y podrás ver la salida en la terminal. El servidor estará disponible en http://localhost:3000.

## Nota:
El servidor cuenta con un prefijo para todas las peticiones que realices. Esta es api/v1, y se encuentra definida en el archivo main.ts. Cada peticion que realices deberá llevar este prefijo.
