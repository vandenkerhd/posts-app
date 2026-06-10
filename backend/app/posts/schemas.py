from pydantic import BaseModel, ConfigDict


class PostBase(BaseModel):
    name: str
    description: str


class PostCreate(PostBase):
    pass


class PostRead(PostBase):
    id: int

    model_config = ConfigDict(from_attributes=True)
