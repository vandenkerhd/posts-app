# Posts App

Aplicación full stack para la administración de posts.

Este proyecto fue desarrollado como parte de un challenge técnico, integrando un frontend en **React** con **Redux** y un backend en **FastAPI** conectado a **PostgreSQL**.

La aplicación permite crear, listar, eliminar y filtrar posts de forma local desde la interfaz.

## Vista previa

![Vista previa de la aplicación](docs/images/posts-app-preview.png)

---

## Objetivo del proyecto

Construir una aplicación simple pero bien organizada, separando responsabilidades entre frontend y backend.

El frontend se encarga de la experiencia de usuario, gestión de estado y filtrado local de información.
El backend expone una API REST para la persistencia y administración de posts.

---

## Tecnologías utilizadas

### Frontend

* React
* Vite
* Redux
* JavaScript
* PNPM

### Backend

* Python
* FastAPI
* SQLAlchemy
* PostgreSQL
* Docker Compose
* Pydantic

---

## Estructura del proyecto

```txt
posts-app/
│
├── backend/    API REST con FastAPI y PostgreSQL
│
└── frontend/   Aplicación React con Redux
```

Cada carpeta contiene su propio README con instrucciones específicas de instalación, configuración y ejecución.

---

## Funcionalidades principales

* Crear posts.
* Listar posts.
* Eliminar posts.
* Filtrar posts por nombre localmente.
* Consumir una API REST desde React.
* Persistir datos en PostgreSQL.
* Administrar el estado del frontend con Redux.

---

## Punto clave del challenge

La lista completa de posts debe solicitarse al backend solo una vez cuando carga la vista principal.

Después de esa carga inicial, los posts quedan almacenados en Redux y el filtro por nombre se aplica localmente sobre el estado del frontend, sin volver a solicitar toda la lista al backend.

Esta decisión reduce llamadas innecesarias a la API y demuestra un manejo eficiente del estado en el frontend.

---

## Flujo general de la aplicación

1. El backend se conecta a PostgreSQL.
2. La API expone endpoints para crear, listar y eliminar posts.
3. El frontend carga la vista principal.
4. Al iniciar, React solicita la lista de posts mediante `GET /posts`.
5. Los posts recibidos se almacenan en Redux.
6. La interfaz renderiza los posts desde el estado global.
7. El filtro se aplica localmente sobre los datos ya cargados.
8. Las acciones de crear y eliminar sincronizan la información con el backend.

---

## Endpoints principales

```txt
GET     /health             Verifica el estado de la API
GET     /posts              Lista todos los posts
POST    /posts              Crea un nuevo post
DELETE  /posts/{post_id}    Elimina un post por ID
```

---

## Ejecución local

### 1. Levantar la base de datos

Desde la raíz del proyecto:

```bash
docker compose up -d postgres
```

---

### 2. Configurar y levantar el backend

Crear el archivo de variables de entorno:

```bash
cp backend/.env.example backend/.env
```

En Windows PowerShell:

```powershell
copy backend\.env.example backend\.env
```

Instalar dependencias:

```bash
pip install -r backend/requirements.txt
```

Ejecutar la API:

```bash
fastapi dev backend/app/main.py
```

La API queda disponible normalmente en:

```txt
http://localhost:8000
```

---

### 3. Configurar y levantar el frontend

Desde la carpeta `frontend`, crear el archivo `.env`:

```bash
cp .env.example .env
```

En Windows PowerShell:

```powershell
copy .env.example .env
```

El archivo `.env` debe contener:

```env
VITE_API_URL=http://localhost:8000
```

Instalar dependencias:

```bash
pnpm install
```

Levantar Vite:

```bash
pnpm dev
```

El frontend queda disponible normalmente en:

```txt
http://localhost:5173
```

---

## Consideraciones de desarrollo

Para ejecutar correctamente el proyecto, se recomienda levantar en el orden sugerido:

```txt
1. PostgreSQL
2. Backend FastAPI
3. Frontend React
```

Si el frontend no logra conectarse con el backend, revisar que:

* El backend esté ejecutándose.
* PostgreSQL esté levantado.
* Las variables de entorno estén correctamente configuradas.
* La URL `VITE_API_URL` apunte al backend.
* No existan errores de CORS.

---

## Decisiones de arquitectura

El proyecto separa claramente las responsabilidades entre frontend y backend.

En el backend, la lógica se organiza en rutas, esquemas, modelos, servicios y configuración de base de datos.

En el frontend, se utiliza una estructura por `feature`, agrupando todo lo relacionado con posts en un mismo módulo: estado Redux, llamadas a la API y componentes.

Esta organización permite que el proyecto sea más fácil de mantener, probar y extender.

---

