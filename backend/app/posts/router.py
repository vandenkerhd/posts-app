from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.posts import service

from app.posts.schemas import PostCreate, PostRead


router = APIRouter(prefix="/posts", tags=["posts"])


@router.get("", response_model=list[PostRead], status_code=status.HTTP_200_OK)
def list_posts(db: Session = Depends(get_db)):
    return service.get_posts(db)


@router.post("", response_model=PostRead, status_code=status.HTTP_201_CREATED)
def create_post(post: PostCreate, db: Session = Depends(get_db)):
    return service.create_post(db, post)


@router.delete("/{post_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_post(post_id: int, db: Session = Depends(get_db)):
    deleted_post = service.delete_post(db, post_id)

    if deleted_post is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Post not found",
        )

    return None
