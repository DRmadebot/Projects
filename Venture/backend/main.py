from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
from database import Base, engine, SessionLocal
from models import User, Certificate
from schemas import UserCreate
from auth import hash_password, verify_password
from security import create_access_token

from fastapi.security import OAuth2PasswordBearer
from fastapi.security import OAuth2PasswordRequestForm
from security import verify_access_token
from datetime import datetime,timedelta
from pydantic import BaseModel


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/login")


def get_current_user_id(
    token: str = Depends(oauth2_scheme)
):
    return verify_access_token(token)


def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()

class CertificateCreate(BaseModel):
    name: str
    authority: str
    expiry_date: datetime


@app.get("/")
def root():
    return {"message": "ComplyEasy API is running"}


@app.post("/register")
def register(user: UserCreate, db: Session = Depends(get_db)):

    existing_user = db.query(User).filter(
        User.email == user.email
    ).first()

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )

    new_user = User(
        name=user.name,
        email=user.email,
        password_hash=hash_password(user.password)
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        "message": "User registered successfully",
        "user_id": new_user.id
    }

@app.post("/login")
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    existing_user = db.query(User).filter(
        User.email == form_data.username
    ).first()

    if not existing_user:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    if not verify_password(
        form_data.password,
        existing_user.password_hash
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    token = create_access_token(existing_user.id)

    return {
        "access_token": token,
        "token_type": "bearer"
    }

@app.get("/protected")
def protected_route(
    user_id: int = Depends(get_current_user_id)
):
    return {
        "message": "You are authenticated!",
        "user_id": user_id
    }

@app.get("/dashboard")
def dashboard(
    user_id: int = Depends(get_current_user_id),
    db: Session = Depends(get_db)
):
    certificates = db.query(Certificate).filter(
        Certificate.user_id == user_id
    ).all()

    today = datetime.utcnow()
    thirty_days_from_now = today + timedelta(days=30)

    active_certificates = 0
    expiring_soon = 0
    expired_certificates = 0

    for certificate in certificates:

        if certificate.expiry_date < today:
            certificate.status = "Expired"
            expired_certificates += 1

        elif certificate.expiry_date <= thirty_days_from_now:
            certificate.status = "Expiring Soon"
            expiring_soon += 1

        else:
            certificate.status = "Active"
            active_certificates += 1

    db.commit()

    total_certificates = len(certificates)

    if total_certificates == 0:
        compliance_score = 100
    else:
        total_score = 0

        for certificate in certificates:
            if certificate.status == "Active":
                total_score += 100
            elif certificate.status == "Expiring Soon":
                total_score += 50
            else:
                total_score += 0

        compliance_score = round(
            total_score / total_certificates
        )

    return {
        "stats": {
            "activeCertificates": active_certificates,
            "expiringSoon": expiring_soon,
            "complianceScore": compliance_score
        },

        "certificates": [
            {
                "id": certificate.id,
                "name": certificate.name,
                "authority": certificate.authority,
                "expiryDate": certificate.expiry_date.strftime("%b %d, %Y"),
                "status": certificate.status
            }
            for certificate in certificates
        ]
    }

@app.post("/certificates")
def create_certificate(
    certificate: CertificateCreate,
    user_id: int = Depends(get_current_user_id),
    db: Session = Depends(get_db)
):
    new_certificate = Certificate(
        name=certificate.name,
        authority=certificate.authority,
        expiry_date=certificate.expiry_date,
        status="Active",
        user_id=user_id
    )

    db.add(new_certificate)
    db.commit()
    db.refresh(new_certificate)

    return {
        "id": new_certificate.id,
        "name": new_certificate.name,
        "authority": new_certificate.authority,
        "expiry_date": new_certificate.expiry_date,
        "status": new_certificate.status
    }

@app.get("/certificates")
def get_certificates(
    user_id: int = Depends(get_current_user_id),
    db: Session = Depends(get_db)
):
    certificates = db.query(Certificate).filter(
        Certificate.user_id == user_id
    ).all()

    return certificates