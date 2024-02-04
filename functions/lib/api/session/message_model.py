from pydantic import BaseModel, Field


class MessageModel(BaseModel):
    content: str = Field(str)
    sender: str = Field(str)
    recipient: str = Field(str)
    sent_at: str = Field(str)


class SavedMessageModel(MessageModel):
    id: str = Field(str)

    def to_message(self) -> MessageModel:
        return MessageModel(
            content=self.content,
            sender=self.sender,
            recipient=self.recipient,
            sent_at=self.sent_at
        )
