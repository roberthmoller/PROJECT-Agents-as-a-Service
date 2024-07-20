from typing import Optional, Dict

from pydantic import BaseModel, Field


class MessageContentModel(BaseModel):
    content: str = Field(description="The content of the message.")
    role: Optional[str] = Field(None, description="The role of the sender of the message.")  # defaults to user


class MessageModel(MessageContentModel):
    sender: str = Field(description="The identifier of the sender of the message.")
    sent_at: str = Field(description="The date and time the message was sent.")


class SavedMessageModel(MessageModel):
    id: str = Field(description="The unique identifier of the message.")

    def to_message(self) -> MessageModel:
        return MessageModel(
            content=self.content,
            sender=self.sender,
            sent_at=self.sent_at
        )
