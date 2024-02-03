from pydantic import BaseModel, Field


class MessageModel(BaseModel):
    content: str = Field(str)
    sender: str = Field(str)
    recipient: str = Field(str)
    sent_at: str = Field(str)


class SavedMessageModel(MessageModel):
    id: str = Field(str)
