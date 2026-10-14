
import pymupdf
import time

pdf_path = input("Enter the PDF file path: ")


def create_chunks(pages, max_words, max_pages):
    chunks = []
    current_chunk = []
    current_words = 0

    for page_number, text in pages:
        page_words = len(text.split())

        if current_chunk and (
            current_words + page_words > max_words
            or len(current_chunk) >= max_pages
        ):
            chunks.append(current_chunk)
            current_chunk = []
            current_words = 0

        current_chunk.append((page_number, text))
        current_words += page_words

    if current_chunk:
        chunks.append(current_chunk)

    return chunks




pages = []

with pymupdf.open(pdf_path) as document:
    for page_number, page in enumerate(document, start=1):
        pages.append((page_number, page.get_text()))

chunks = create_chunks(
    pages,
    max_words=1000,
    max_pages=5
)

print("Total pages:", len(pages))
print("Total chunks:", len(chunks))

for i, chunk in enumerate(chunks, start=1):
    print(
        f"Chunk {i}: pages "
        f"{chunk[0][0]}–{chunk[-1][0]}, "
        f"{sum(len(text.split()) for _, text in chunk)} words"
    )



import pymupdf
import requests

MODEL = "qwen3:4b"

def extract_pages(pdf_path):
    pages = []

    with pymupdf.open(pdf_path) as document:
        for page_number, page in enumerate(document, start=1):
            pages.append((page_number, page.get_text()))

    return pages


# Paste your create_chunks() function here.

pages = extract_pages(pdf_path)
chunks = create_chunks(pages, max_words=1000, max_pages=5)

chunk = chunks[0]

source_text = "\n\n".join(
    f"[Page {page_number}]\n{text}"
    for page_number, text in chunk
)

prompt = f"""
Create detailed study notes from the lecture excerpt below.

Rules:
- Use only facts explicitly supported by the source.
- Preserve important definitions and technical terminology.
- Organize related concepts under concise Markdown headings.
- Include comparison tables and bullet points when useful.
- Cite source pages as [Page N].
- Remove repetition and irrelevant copyright notices.
- Do not include your reasoning, planning, or commentary.
- Do not repeat the prompt or provide multiple drafts.
- Output only the final Markdown study notes.

Lecture excerpt:
{source_text}
"""
start_time = time.perf_counter()
response = requests.post(
    "http://localhost:11434/api/generate",
    json={
        "model": MODEL,
        "prompt": prompt,
        "stream": False,
        "think": False
    },
    timeout=600
)

response.raise_for_status()
result = response.json()
elapsed = time.perf_counter() - start_time

print(result["response"])

with open("chunk_01_notes.md", "w", encoding="utf-8") as file:
    file.write(result["response"])

print("\nNotes saved to chunk_01_notes.md")
print(f"Generation time: {elapsed:.2f} seconds")