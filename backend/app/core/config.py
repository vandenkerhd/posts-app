import os
from pathlib import Path

from dotenv import load_dotenv
from pydantic import BaseModel


BACKEND_DIR = Path(__file__).resolve().parents[2]
load_dotenv(BACKEND_DIR / ".env")


class Settings(BaseModel):
    database_url: str
    frontend_url: str


settings = Settings(
    database_url=os.environ["DATABASE_URL"],
    frontend_url=os.environ["FRONTEND_URL"],
)