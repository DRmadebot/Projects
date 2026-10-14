
import pymupdf

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
