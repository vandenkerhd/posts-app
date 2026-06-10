# Frontend - Aplicación de Posts con React

Aplicación frontend desarrollada con **React** para el challenge de posts.

La interfaz permite crear, listar, eliminar y filtrar posts de forma local, consumiendo los servicios expuestos por el backend desarrollado en FastAPI.

---

## Funcionalidades principales

* Crear posts.
* Eliminar posts.
* Listar posts.
* Filtrar posts por nombre localmente.
* Consumir endpoints REST del backend.
* Mantener el estado de posts mediante Redux.

---

## Tecnologías utilizadas

* React
* Vite
* Redux
* JavaScript
* PNPM
* API REST

---

## Estructura principal

```txt
src/
│
├── app/
│   └── store.js
│
└── features/
    └── posts/
```

Se utiliza una estructura por `feature` para mantener agrupado todo lo relacionado con posts: estado Redux, llamadas a la API y componentes.

Esta organización facilita el mantenimiento del código y permite escalar el proyecto agregando nuevas funcionalidades sin mezclar responsabilidades.

---

## Punto clave

El frontend debe llamar a `GET /posts` solo una vez cuando carga la vista principal.

Después de obtener los datos, los posts quedan almacenados en Redux.
El filtro se aplica localmente sobre los datos guardados en el estado global, sin volver a solicitar la lista completa al backend.

Esta decisión evita llamadas innecesarias a la API y mejora el rendimiento de la aplicación.

---

## Variables de entorno

Antes de levantar el frontend, se debe crear el archivo `.env` a partir del archivo `.env.example`.

Desde la carpeta `frontend`:

```bash
cp .env.example .env
```

En Windows PowerShell:

```powershell
copy .env.example .env
```

El archivo `.env` debe contener la URL base del backend:

```env
VITE_API_URL=http://localhost:8000
```

En proyectos creados con Vite, las variables de entorno que se utilizan en el navegador deben comenzar con el prefijo `VITE_`.

El archivo `.env` contiene configuración local y no debe subirse al repositorio.
El archivo `.env.example` queda como referencia para indicar qué variables necesita el proyecto.

---

## Instalación local

Primero verificar que Node.js y npm estén instalados:

```bash
node -v
npm -v
```

Si `pnpm` no está instalado, se puede instalar globalmente con:

```bash
npm install -g pnpm
```

Luego verificar la instalación:

```bash
pnpm -v
```

Desde la carpeta `frontend`, instalar las dependencias:

```bash
pnpm install
```

---

## Levantar el frontend

Desde la carpeta `frontend`, ejecutar:

```bash
pnpm dev
```

Por defecto, Vite levanta la aplicación en:

```txt
http://localhost:5173
```

---

## Conexión con el backend

El frontend consume los siguientes endpoints del backend:

```txt
GET     /posts              Lista todos los posts
POST    /posts              Crea un nuevo post
DELETE  /posts/{post_id}    Elimina un post por ID
```

Para que la aplicación funcione correctamente, el backend debe estar levantado y disponible en la URL configurada en el archivo `.env`.

Ejemplo para ambiente local:

```txt
Backend:  http://localhost:8000
Frontend: http://localhost:5173
```

---

## Flujo de funcionamiento

1. Al cargar la vista principal, el frontend consulta `GET /posts`.
2. Los posts recibidos se guardan en Redux.
3. La lista se renderiza utilizando el estado global.
4. El filtro por nombre se aplica localmente sobre los posts almacenados.
5. Al crear un post, se envía la información al backend y se actualiza la interfaz.
6. Al eliminar un post, se llama al endpoint correspondiente y se refleja el cambio en pantalla.

---

## Consideraciones de desarrollo

Si el frontend no logra conectarse con el backend, revisar:

* Que el backend esté ejecutándose.
* Que PostgreSQL esté levantado.
* Que el archivo `.env` exista dentro de la carpeta `frontend`.
* Que `VITE_API_URL` tenga la URL correcta.
* Que no existan errores de CORS.
* Que los endpoints del backend estén disponibles.

---