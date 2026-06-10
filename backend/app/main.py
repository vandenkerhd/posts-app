from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Importar modelos para que SQLAlchemy registre las tablas antes de que se ejecute create_all.
from app.db import models
from app.core.config import settings
from app.db.database import init_db
from app.posts.router import router as posts_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    init_db()
    yield


app = FastAPI(title="Posts API", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.frontend_url],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(posts_router)


@app.get("/health")
def health_check():
    return {"status": "ok"}
