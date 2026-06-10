from sqlalchemy.orm import Session

from app.db.models import Post
from app.posts.schemas import PostCreate


def get_posts(db: Session) -> list[Post]:
    return db.query(Post).order_by(Post.id).all()


def create_post(db: Session, post_data: PostCreate) -> Post:
    post = Post(name=post_data.name, description=post_data.description)
    db.add(post)
    db.commit()
    db.refresh(post)
    return post


def delete_post(db: Session, post_id: int) -> Post | None:
    post = db.get(Post, post_id)

    if post is None:
        return None

    db.delete(post)
    db.commit()
    return post
