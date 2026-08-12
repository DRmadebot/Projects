from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from datetime import datetime

from database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False, index=True)
    password_hash = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    
class Certificate(Base):
    __tablename__ = "certificates"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String, nullable=False)
    authority = Column(String, nullable=False)
    expiry_date = Column(DateTime, nullable=False)
    status = Column(String, nullable=False)

    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)