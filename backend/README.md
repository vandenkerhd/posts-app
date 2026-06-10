# Backend - API de Posts con FastAPI

Backend desarrollado con **FastAPI** para la gestión básica de posts.
La API expone endpoints JSON para crear, listar y eliminar publicaciones, utilizando **PostgreSQL** como base de datos.

Este proyecto está estructurado con separación de responsabilidades entre rutas, esquemas, lógica de negocio y configuración de base de datos, con el objetivo de mantener un código simple, mantenible y fácil de extender.

---

## Tecnologías utilizadas

* Python
* FastAPI
* SQLAlchemy
* PostgreSQL
* Docker / Docker Compose
* Pydantic
* Uvicorn

---

## Funcionalidades principales

* Crear posts.
* Listar posts registrados.
* Eliminar posts por identificador.
* Validar datos de entrada y salida mediante schemas.
* Persistir información en PostgreSQL.
* Exponer endpoints REST en formato JSON.
* Verificar estado de la API mediante endpoint de health check.

---

## Estructura del backend

```txt
backend/
│
├── app/
│   ├── main.py          # Punto de entrada de la aplicación FastAPI
│   ├── router.py        # Definición de endpoints HTTP
│   ├── schemas.py       # Schemas de entrada y salida
│   ├── service.py       # Lógica de negocio asociada a posts
│   ├── database.py      # Configuración de conexión a PostgreSQL
│   └── models.py        # Modelos ORM
│
├── requirements.txt     # Dependencias del backend
├── .env.example         # Variables de entorno de referencia
└── .env                 # Variables locales, no versionadas
```

---

## Instalación local

Desde la raíz del proyecto, crear el entorno virtual:

```bash
python -m venv .venv
```

Activar el entorno virtual en Linux o macOS:

```bash
source .venv/bin/activate
```

Activar el entorno virtual en Windows PowerShell:

```powershell
.venv\Scripts\Activate.ps1
```

Instalar las dependencias del backend:

```bash
pip install -r backend/requirements.txt
```

---

## Variables de entorno

Crear el archivo `.env` a partir del archivo de ejemplo:

```bash
cp backend/.env.example backend/.env
```

En Windows PowerShell:

```powershell
copy backend\.env.example backend\.env
```

El archivo `.env` contiene la configuración local del proyecto y no debe subirse al repositorio.
El archivo `.env.example` se mantiene como referencia para indicar qué variables son necesarias.

Ejemplo de variables esperadas:

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/posts_db
```

---

## Levantar PostgreSQL

El proyecto utiliza Docker Compose para levantar la base de datos PostgreSQL:

```bash
docker compose up -d postgres
```

Para validar que el contenedor esté ejecutándose:

```bash
docker compose ps
```

---

## Ejecutar la API

Desde la raíz del proyecto:

```bash
fastapi dev backend/app/main.py
```

También se puede ejecutar desde la carpeta `backend`:

```bash
fastapi dev app/main.py
```

Alternativamente, usando Uvicorn desde la carpeta `backend`:

```bash
python -m uvicorn app.main:app --reload
```

---

## Endpoints disponibles

```txt
GET     /health             Verifica el estado de la API
GET     /posts              Lista todos los posts
POST    /posts              Crea un nuevo post
DELETE  /posts/{post_id}    Elimina un post por ID
```

---

## Respuestas esperadas

```txt
GET     /health             200 OK
GET     /posts              200 OK
POST    /posts              201 Created
DELETE  /posts/{post_id}    204 No Content / 404 Not Found
```

---

## Ejemplo de creación de post

Request:

```http
POST /posts
Content-Type: application/json
```

Body:

```json
{
  "name": "Mi primer post",
  "description": "Contenido del post"
}
```

Respuesta esperada:

```json
{
  "name": "Mi primer post",
  "description": "Contenido del post",
  "id": 1
}
```

---

## Decisiones técnicas

El proyecto se organizó separando responsabilidades para facilitar su mantenimiento y crecimiento:

* `main.py` inicializa la aplicación FastAPI.
* `router.py` contiene la definición de los endpoints HTTP.
* `schemas.py` define la estructura de los datos de entrada y salida.
* `service.py` centraliza la lógica asociada a la gestión de posts.
* `database.py` configura la conexión con PostgreSQL.
* `models.py` define las entidades utilizadas por SQLAlchemy.

---
