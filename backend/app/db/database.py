import logging
from time import sleep

from sqlalchemy import create_engine
from sqlalchemy.exc import OperationalError
from sqlalchemy.orm import DeclarativeBase, Session, sessionmaker

from app.core.config import settings


engine = create_engine(settings.database_url)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
logger = logging.getLogger(__name__)


class Base(DeclarativeBase):
    pass


def init_db(max_retries: int = 10, retry_delay: int = 1) -> None:
    for attempt in range(1, max_retries + 1):
        try:
            Base.metadata.create_all(bind=engine)
            return
        except OperationalError:
            if attempt == max_retries:
                raise

            logger.warning(
                "Database is not ready yet. Retrying in %s second(s)... [%s/%s]",
                retry_delay,
                attempt,
                max_retries,
            )
            sleep(retry_delay)


def get_db():
    db: Session = SessionLocal()
    try:
        yield db
    finally:
        db.close()
