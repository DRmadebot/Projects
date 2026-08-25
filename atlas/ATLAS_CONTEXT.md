# Atlas — Learning Project Context

## Goal

Build an offline-first personal document/knowledge assistant while learning the technologies and writing the code myself.

Core eventual idea:

- Single user type for now.
- User authenticates.
- User stores/uploads documents.
- Documents remain available locally/offline.
- A local AI model works with the user's documents.
- Eventually use embeddings/RAG so the user can ask questions about their documents.
- Online features may be added later.

The project is intended to be a substantial learning/resume project rather than a vibecoded application.

---

# Learning Philosophy

I want to actually learn and write the code myself.

Do not dump complete implementations unless I am genuinely stuck.

Preferred workflow:

1. Explain the concept.
2. Give a small task.
3. Let me implement it.
4. Review/debug it.
5. Give hints before full solutions.
6. Explain why the solution works.

AI assistance is part of the learning process, but understanding the code matters.

---

# Development Philosophy

We initially planned to use strict TDD throughout the backend.

We have now decided NOT to force TDD for every feature because it was slowing development and making the project feel unnecessarily slow.

Current approach:

> Build → understand → manually test → test important logic

We already practiced TDD enough to understand:

- Failing tests.
- Minimum implementation.
- Passing tests.
- SQLite database tests.
- FastAPI TestClient.
- Test database isolation.
- Basic TDD workflow.

Testing remains important, but we are no longer writing a test before every tiny feature.

---

# Current Stack

## Frontend

- React
- TypeScript
- Vite
- Axios
- ESLint

## Backend

- Python
- FastAPI
- Uvicorn

## Database

- SQLite

The backend was intentionally changed from the Node.js/TypeScript stack used in Tangent to Python + FastAPI to learn something new and add technical diversity.

---

# Project Structure

```text
atlas/
├── frontend/
│   ├── src/
│   │   ├── App.tsx
│   │   └── ...
│   └── ...
│
└── backend/
    ├── main.py
    ├── database.py
    ├── tests/
    │   ├── test_health.py
    │   ├── test_notes.py
    │   └── test_database.py
    ├── atlas.db
    └── venv/