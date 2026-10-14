# TasteMatch — Project & Learning Plan

## Project goal

Build a resume-quality personalized movie/TV recommendation engine using Java/Spring Boot.

The core idea:

> Recommendations are based primarily on the user's own watch history and feedback, rather than generic popularity.

The system should learn the user's taste over time and explain why each recommendation was made.

---

# Learning rules

1. No vibecoding.
2. Code will be given in small pieces and explained before/after use.
3. The user will handwrite the code.
4. Prefer understanding over speed.
5. Debug the user's implementation rather than replacing the whole project.
6. Each phase ends with a working milestone and a handoff summary.
7. New technologies are introduced only when needed.
8. Keep the architecture simple enough to finish in ~1 month.

The user already knows C/C++ and has backend experience with Flask/FastAPI, so basic programming and HTTP concepts do not need beginner-level treatment.

---

# Target stack

## Backend
- Java 21 LTS
- Spring Boot
- Maven
- Spring Web
- Spring Data JPA
- PostgreSQL

## Frontend
- React
- TypeScript

## Data
- TMDB API for movie/TV metadata

## DevOps
- Git + GitHub
- Docker
- Docker Compose
- Beginner-friendly cloud deployment

## Recommendation system
Start with content-based filtering, then add:
- user taste profiles
- weighted feature similarity
- cosine similarity
- feedback-based updating
- recommendation explanations
- novelty / "Surprise Me"

---

# High-level architecture

```text
React + TypeScript
        |
        | HTTP / JSON
        v
Spring Boot REST API
        |
        +----------------------+
        |                      |
        v                      v
PostgreSQL             Recommendation Engine
        |                      |
        +----------+-----------+
                   |
                   v
                TMDB API
```

---

# Development phases

## Phase 0 — Java/Spring environment

### Learn
- JDK vs JRE
- Java 21 LTS
- Maven basics
- Spring Boot project structure
- Spring Boot application lifecycle
- REST basics in Spring

### Build
A minimal endpoint:

`GET /api/hello`

Expected response:

```json
{
  "message": "TasteMatch API is running"
}
```

### Deployment milestone
Deploy the minimal Spring Boot application before the project becomes complicated.

### Done when
- Java version is correct
- Maven works
- Spring Boot app runs locally
- `/api/hello` works
- app is in Git
- app is containerized
- app is deployed

---

## Phase 1 — Spring Boot fundamentals

### Learn
- packages
- classes
- annotations
- controllers
- services
- dependency injection
- DTOs
- request/response flow
- HTTP methods
- JSON serialization

### Build
A temporary in-memory movie API.

Example:

```text
GET    /api/movies
GET    /api/movies/{id}
POST   /api/movies
DELETE /api/movies/{id}
```

No database yet.

### Done when
We understand the complete request flow:

```text
HTTP request
    ↓
Controller
    ↓
Service
    ↓
Response
```

---

## Phase 2 — PostgreSQL + JPA

### Learn
- relational database design
- primary keys
- foreign keys
- SQL basics
- JPA
- Hibernate
- entities
- repositories
- relationships

### Initial entities

```text
User
Movie
WatchEntry
```

Later:

```text
Rating
Genre
Person
MoviePerson
```

### Build
Persistent watch history.

Example:

```text
User
  |
  +-- WatchEntry --> Movie
  |
  +-- WatchEntry --> Movie
  |
  +-- WatchEntry --> Movie
```

### Done when
The application can restart without losing data.

---

## Phase 3 — Movie metadata / TMDB integration

### Learn
- external REST APIs
- API keys
- environment variables
- Java HTTP client / Spring HTTP client
- JSON mapping
- external API failure handling

### Build
Search and import movies/TV shows from TMDB.

Example:

```text
User searches:
"Inception"

       ↓

TasteMatch backend

       ↓

TMDB API

       ↓

Movie metadata

       ↓

Database
```

### Important
Do not store the TMDB API key in Git.

Use environment variables.

---

## Phase 4 — Watch history + feedback

### Build

The user can:

- add watched movie/show
- rate it
- change rating
- remove it
- mark it as disliked
- optionally mark it as a favorite

Possible rating model:

```text
1–5 stars
```

or:

```text
Loved
Liked
Okay
Disliked
```

Prefer numeric ratings because they provide richer data.

---

# Phase 5 — Recommendation engine v1

## Goal

Recommend unseen movies based on content similarity.

### Movie representation

Each movie becomes a feature representation containing things such as:

```text
genres
keywords
overview/plot
actors
director
language
release year
runtime
```

### First algorithm

Content-based filtering.

Use:

- TF-IDF for text
- feature weighting
- cosine similarity

Conceptually:

```text
Movie A
   ↓
Feature vector

Movie B
   ↓
Feature vector

        ↓

Cosine similarity

        ↓

Similarity score
```

### First recommendation

Given one movie:

> "Find movies most similar to this movie."

This is intentionally simple.

---

# Phase 6 — Personalized taste profile

This is where the project becomes more interesting.

Instead of comparing a candidate to one movie:

```text
Candidate
    ↕
One watched movie
```

we compare it to the user's entire history:

```text
                  Watched movie
                       |
Watched movie ---- User Taste ---- Watched movie
                       |
                  Watched movie

                       ↓

              Candidate ranking
```

The system should weight highly-rated movies more strongly.

For example:

```text
5-star movie  → strong positive signal
4-star movie  → positive signal
3-star movie  → weak signal
2-star movie  → negative signal
1-star movie  → strong negative signal
```

---

# Phase 7 — Explainable recommendations

Every recommendation should explain itself.

Example:

```text
91% match

Why?

+ Similar to movies you rated highly
+ Strong overlap with your preferred genres
+ Similar themes to movies you liked
+ Director matches a pattern in your watch history
```

This is a major resume differentiator.

---

# Phase 8 — Recommendation feedback loop

After recommending a movie:

```text
Recommendation
      ↓
User watches it
      ↓
User rates it
      ↓
Taste profile updates
      ↓
Future recommendations change
```

This makes the system adaptive rather than static.

---

# Phase 9 — "Surprise Me"

Do not simply recommend the nearest neighbors.

Introduce controlled exploration.

Example:

```text
Normal recommendation:
92% similarity

Surprise recommendation:
73% similarity
but shares several features with highly-rated movies
and introduces something new.
```

This gives the system a meaningful product feature beyond ordinary similarity search.

---

# Phase 10 — React frontend

Only after the backend and recommendation engine are understood.

Main screens:

```text
Home
  ├── Recommendations
  ├── Surprise Me
  └── Recent activity

My Library
  ├── Watched
  ├── Favorites
  └── Ratings

Movie Details
  ├── Metadata
  ├── Why recommended?
  └── Add/rate

Taste Profile
  ├── Genre preferences
  ├── Themes
  └── Taste statistics
```

---

# Phase 11 — Authentication

Add proper users.

Learn:

- password hashing
- authentication
- sessions/JWT
- authorization
- Spring Security

Do this after the core recommendation system works.

---

# Phase 12 — Docker + production deployment

The goal is to understand deployment, not just make Docker files appear.

Final local architecture:

```text
Docker Compose
    |
    +-- Backend container
    |
    +-- PostgreSQL container
    |
    +-- Frontend container
```

Production deployment will depend on the provider selected later.

---

# Phase 13 — Testing and resume polish

Add:

- unit tests
- integration tests
- API tests
- validation
- error handling
- logging

Create:

- architecture diagram
- database ER diagram
- recommendation algorithm explanation
- setup instructions
- deployment instructions
- screenshots/demo

---

# Suggested 1-month schedule

## Days 1–2
Phase 0

## Days 3–5
Phase 1

## Days 6–9
Phase 2

## Days 10–12
Phase 3

## Days 13–15
Phase 4

## Days 16–20
Phase 5 + 6

## Days 21–23
Phase 7 + 8

## Days 24–25
Phase 9

## Days 26–28
Phase 10 + authentication

## Days 29–30
Docker, deployment, tests, README, polish

This is flexible. If a phase takes longer, we adjust rather than rushing.

---

# Git strategy

Use small meaningful commits.

Examples:

```text
initial project setup
add hello endpoint
add movie controller
add movie service
add movie dto
add postgres configuration
add movie entity
add movie repository
add watch history
integrate tmdb search
add movie feature extraction
implement cosine similarity
add user taste profile
add recommendation ranking
add recommendation explanations
add surprise recommendations
dockerize backend
add docker compose
deploy production backend
```

---

# Chat handoff system

At the end of every phase, create/update a section called:

`## Current State`

It should contain:

- what was learned
- what was built
- important files
- database schema if applicable
- API endpoints
- current bugs
- next task
- concepts that should NOT be re-explained

When moving to a new chat, paste the relevant handoff section plus this project plan.

---

# Current State

## Phase
Phase 0 — Environment setup

## Completed
- JDK installed
- `java --version` works
- `javac --version` works
- Basic Java `Main.java` program compiled and executed successfully
- User is comfortable with C/C++ syntax
- User has previous Flask/FastAPI backend experience

## Java version currently installed

```text
Java 26.0.2
```

We intend to use Java 21 LTS for the project.

Java 26 does not need to be uninstalled immediately.

## Current learning level

The user does NOT need beginner explanations of:
- variables
- loops
- functions/methods
- basic OOP
- C/C++-style syntax

The user DOES need explanations of:
- Java-specific features
- Maven
- Spring Boot
- Spring architecture
- JPA/Hibernate
- Docker
- deployment

## Current project status

No Spring Boot project has been created yet.

## Immediate next task

Set up Java 21 LTS and Maven, then create the minimal Spring Boot project.

First application milestone:

```text
GET /api/hello
```

Response:

```json
{
  "message": "TasteMatch API is running"
}
```

After that, containerize and deploy this minimal application before adding the database or recommendation system.

---

# Handoff template

Copy this section into a new chat when changing chats:

```text
PROJECT: TasteMatch

Goal:
Personalized movie/TV recommendation engine that learns from the user's own watch history and ratings.

User background:
- Knows C/C++
- Has backend experience with Flask/FastAPI
- New to Java/Spring
- Wants to learn, not vibecode
- Handwrites the provided code
- Wants to learn Docker and deployment
- Project timeline: ~1 month

Current phase:
[PHASE]

Completed:
- ...

What I learned:
- ...

Important files:
- ...

Current database/schema:
- ...

Current API:
- ...

Current bugs:
- ...

Important decisions:
- ...

Next task:
- ...

Do not re-explain:
- ...

Project plan:
Follow the TasteMatch project plan and continue from the current phase.
```

---

# Definition of success

The finished project should demonstrate that the developer understands:

1. Java
2. Spring Boot
3. REST APIs
4. PostgreSQL
5. JPA/Hibernate
6. External API integration
7. Recommendation algorithms
8. Personalization
9. Explainable recommendations
10. React
11. Docker
12. Deployment
13. Testing
14. Git/GitHub

The recommendation engine is the project's technical centerpiece.
Docker/deployment demonstrates engineering maturity.
The frontend demonstrates product usability.
