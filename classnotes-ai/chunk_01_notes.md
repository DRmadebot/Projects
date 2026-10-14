We are given a lecture excerpt from 5 pages. We need to create detailed study notes following the rules.

 Steps:
 1. Identify the facts explicitly supported by the source (the lecture excerpt).
 2. Preserve important definitions and technical terminology.
 3. Organize related concepts under concise Markdown headings.
 4. Include comparison tables and bullet points when useful.
 5. Cite source pages as [Page N].
 6. Remove repetition and irrelevant copyright notices and URLs.
 7. Do not include reasoning, planning, or commentary.
 8. Output only the final Markdown study notes.

 Let's go through each page and extract the facts:

 Page 1:
   - Title: "Transport Layer 3-1"
   - Chapter: "Chapter 3"
   - Title: "Transport Layer"
   - Copyright notice and URL (to be removed per rule 6)

 Page 2:
   - Title: "Transport Layer 3-2"
   - Chapter: "Chapter 3: Transport Layer"
   - Goals: 
        * understand principles behind transport layer services:
            - multiplexing, demultiplexing
            - reliable data transfer
            - flow control
            - congestion control
        * learn about Internet transport layer protocols:
            - UDP: connectionless transport
            - TCP: connection-oriented reliable transport
            - TCP congestion control

 Page 3:
   - Title: "Transport Layer 3-3"
   - Chapter 3 outline:
        3.1 transport-layer services
        3.2 multiplexing and demultiplexing
        3.3 connectionless transport: UDP
        3.4 principles of reliable data transfer
        3.5 connection-oriented transport: TCP
            - segment structure
            - reliable data transfer
            - flow control
            - connection management
        3.6 principles of congestion control
        3.7 TCP congestion control

 Page 4:
   - Title: "Transport Layer 3-4"
   - Transport services and protocols:
        * provide logical communication between app processes running on different hosts
        * transport protocols run in end systems:
            - send side: breaks app messages into segments, passes to network layer
            - rcv side: reassembles segments into messages, passes to app layer
        * more than one transport protocol available to apps
            - Internet: TCP and UDP
        * Diagram: logical end-end transport (a layered diagram from application to physical)

 Page 5:
   - Title: "Transport Layer 3-5"
   - Only copyright notice and URL (to be removed)

 We'll structure the notes:

 Headings:
   - We'll have a main heading: "Chapter 3: Transport Layer"
   - Then, we can break down the content by the sections that are covered in the lecture.

 Important facts:

 1. Goals of the chapter (from Page 2):
    - Understand principles of transport layer services: multiplexing, demultiplexing, reliable data transfer, flow control, congestion control.
    - Learn about Internet transport layer protocols: UDP (connectionless transport), TCP (connection-oriented reliable transport), and TCP congestion control.

 2. Chapter Outline (from Page 3):
    - We have a detailed outline of the chapter.

 3. Transport services and protocols (from Page 4):
    - Definition: Transport protocols provide logical communication between application processes running on different hosts.
    - Transport protocols run in end systems (hosts).
        - Send side: breaks application messages into segments and passes to network layer.
        - Receive side: reassembles segments into messages and passes to application layer.
    - There are multiple transport protocols available to applications (e.g., Internet uses TCP and UDP).

 4. We note that the lecture excerpt does not provide detailed content beyond the outline and the above.

 We'll organize:

   # Chapter 3: Transport Layer

   ## Goals
   - Understand principles behind transport layer services:
        - Multiplexing
        - Demultiplexing
        - Reliable data transfer
        - Flow control
        - Congestion control
   - Learn about Internet transport layer protocols:
        - UDP: connectionless transport
        - TCP: connection-oriented reliable transport
        - TCP congestion control [Page 2]

   ## Chapter Outline
   - 3.1 Transport-layer services
   - 3.2 Multiplexing and demultiplexing
   - 3.3 Connectionless transport: UDP
   - 3.4 Principles of reliable data transfer
   - 3.5 Connection-oriented transport: TCP
        - Segment structure
        - Reliable data transfer
        - Flow control
        - Connection management
   - 3.6 Principles of congestion control
   - 3.7 TCP congestion control [Page 3]

   ## Transport Services and Protocols
   - **Definition**: Transport protocols provide logical communication between application processes running on different hosts [Page 4].
   - **Execution in End Systems**: 
        - Send side: breaks application messages into segments and passes to the network layer.
        - Receive side: reassembles segments into messages and passes to the application layer [Page 4].
   - **Available Protocols**: 
        - Internet uses TCP and UDP as the primary transport protocols [Page 4].

   We note that the lecture excerpt does not provide more detailed content (like the segment structure, etc.) beyond what is in the outline and the above.

   We avoid adding any information not in the source.

   Also, we remove the copyright notices and URLs.

   We don't include a table for the two protocols (UDP vs TCP) because the source does not provide a table. The source only says they are different: UDP is connectionless, TCP is connection-oriented and reliable.

   However, we can create a bullet point comparison for the two protocols as per the source (which says: UDP: connectionless transport; TCP: connection-oriented reliable transport). But note: the source does not provide a table. We are to use only facts explicitly supported.

   Let's see: the source says on Page 2: "UDP: connectionless transport" and "TCP: connection-oriented reliable transport". So we can have a bullet point for each.

   But the rule says: "Include comparison tables and bullet points when useful". Since the source doesn't have a table, we can do a simple bullet list for the differences.

   However, note: the source does not explicitly state a comparison table. So we'll do a concise bullet list without making it a table (since the rule says "when useful", and we have the two protocols described). But the source does not have a table, so we avoid creating a table? The rule says: "Include comparison tables and bullet points when useful". We have two protocols, so we can do:

        **Key Transport Protocols**:
        - UDP: Connectionless transport protocol [Page 2]
        - TCP: Connection-oriented reliable transport protocol [Page 2]

   But note: the source says "TCP: connection-oriented reliable transport", so we can write that.

   However, the problem says: "Use only facts explicitly supported by the source". We don't have any extra facts.

   Let's stick to the facts we have.

   We'll structure the notes without adding any extra information.

   Final structure:

   # Chapter 3: Transport Layer

   ## Goals
   - Understand principles behind transport layer services:
     - Multiplexing
     - Demultiplexing
     - Reliable data transfer
     - Flow control
     - Congestion control
   - Learn about Internet transport layer protocols:
     - UDP: connectionless transport [Page 2]
     - TCP: connection-oriented reliable transport [Page 2]
     - TCP congestion control [Page 2]

   ## Chapter Outline
   - 3.1 Transport-layer services
   - 3.2 Multiplexing and demultiplexing
   - 3.3 Connectionless transport: UDP
   - 3.4 Principles of reliable data transfer
   - 3.5 Connection-oriented transport: TCP
     - Segment structure
     - Reliable data transfer
     - Flow control
     - Connection management
   - 3.6 Principles of congestion control
   - 3.7 TCP congestion control [Page 3]

   ## Transport Services and Protocols
   - **Definition**: Transport protocols provide logical communication between application processes running on different hosts [Page 4].
   - **End System Execution**:
     - Send side: breaks application messages into segments and passes to network layer [Page 4]
     - Receive side: reassembles segments into messages and passes to application layer [Page 4]
   - **Available Protocols**: Internet uses TCP and UDP [Page 4]

   We do not add any tables because the source does not provide a table. We have a bullet list for the goals and the chapter outline.

   Note: The source does not mention "segments" in detail until the chapter outline (3.5) but we don't have that detail in the excerpt. So we don't add extra.

   Also, we don't include the diagram (it's a diagram, not text).

   Let's write in Markdown.

   Important: We must cite the page numbers for each fact.

   We have:

      Goals: [Page 2]
      Chapter Outline: [Page 3]
      Transport Services and Protocols: [Page 4]

   But note: the source says on Page 4: "Transport services and protocols" is the title.

   We output only the notes.

   Let's write:

   Note: The rule says "Do not include your reasoning, planning, or commentary." So we output the Markdown without any extra text.

   We'll write:

   # Chapter 3: Transport Layer

   ## Goals
   - Understand principles behind transport layer services:
     - Multiplexing [Page 2]
     - Demultiplexing [Page 2]
     - Reliable data transfer [Page 2]
     - Flow control [Page 2]
     - Congestion control [Page 2]
   - Learn about Internet transport layer protocols:
     - UDP: connectionless transport [Page 2]
     - TCP: connection-oriented reliable transport [Page 2]
     - TCP congestion control [Page 2]

   ## Chapter Outline
   - 3.1 Transport-layer services [Page 3]
   - 3.2 Multiplexing and demultiplexing [Page 3]
   - 3.3 Connectionless transport: UDP [Page 3]
   - 3.4 Principles of reliable data transfer [Page 3]
   - 3.5 Connection-oriented transport: TCP
     - Segment structure [Page 3]
     - Reliable data transfer [Page 3]
     - Flow control [Page 3]
     - Connection management [Page 3]
   - 3.6 Principles of congestion control [Page 3]
   - 3.7 TCP congestion control [Page 3]

   ## Transport Services and Protocols
   - **Definition**: Transport protocols provide logical communication between application processes running on different hosts [Page 4].
   - **End System Execution**:
     - Send side: breaks application messages into segments and passes to network layer [Page 4]
     - Receive side: reassembles segments into messages and passes to application layer [Page 4]
   - **Available Protocols**: Internet uses TCP and UDP [Page 4]

   But note: the rule says "Preserve important definitions and technical terminology". We have the term "segments" (which is used in the context of the transport layer).

   However, the source does not explicitly say "segments" in the text we have? Let me check:

      Page 4: "send side: breaks app messages into segments" -> so it uses the term "segments".

   So we are safe.

   We don't have a table because the source doesn't provide one. We have bullet points.

   Also, note: the rule says "Remove repetition". We don't have repetition in the above.

   Let's check if we have the same fact multiple times? We have the goals and the chapter outline as separate.

   This should be the final output.

   Important: The rule says "Do not include your reasoning, planning, or commentary." So we output only the above.

   We write in Markdown.

   Note: The page numbers are in brackets after the fact.

   Let's do it.

   One more thing: the source says on Page 2: "our goals" (with a checkmark) but we can ignore the checkmark and just list the goals.

   We output:

   # Chapter 3: Transport Layer

   ## Goals
   - Understand principles behind transport layer services:
     - Multiplexing [Page 2]
     - Demultiplexing [Page 2]
     - Reliable data transfer [Page 2]
     - Flow control [Page 2]
     - Congestion control [Page 2]
   - Learn about Internet transport layer protocols:
     - UDP: connectionless transport [Page 2]
     - TCP: connection-oriented reliable transport [Page 2]
     - TCP congestion control [Page 2]

   ## Chapter Outline
   - 3.1 Transport-layer services [Page 3]
   - 3.2 Multiplexing and demultiplexing [Page 3]
   - 3.3 Connectionless transport: UDP [Page 3]
   - 3.4 Principles of reliable data transfer [Page 3]
   - 3.5 Connection-oriented transport: TCP
     - Segment structure [Page 3]
     - Reliable data transfer [Page 3]
     - Flow control [Page 3]
     - Connection management [Page 3]
   - 3.6 Principles of congestion control [Page 3]
   - 3.7 TCP congestion control [Page 3]

   ## Transport Services and Protocols
   - **Definition**: Transport protocols provide logical communication between application processes running on different hosts [Page 4].
   - **End System Execution**:
     - Send side: breaks application messages into segments and passes to network layer [Page 4]
     - Receive side: reassembles segments into messages and passes to application layer [Page 4]
   - **Available Protocols**: Internet uses TCP and UDP [Page 4]

   This is the output.

   Note: We used the term "application" (not "app") for consistency with the source (the source uses "app" but we can write it as "application" for formality? However, the source says "app messages"). But the rule says: preserve important definitions and technical terminology. The source uses "app" (short for application) so we can use "application" or "app"? 

   Let's check the source: 
        Page 4: "breaks app messages" -> so it uses "app"

   But in academic writing, it's common to write "application". However, the rule says: "Use only facts explicitly supported by the source". The source uses "app", so we can write it as "app" to be precise? 

   However, the problem says: "Preserve important definitions and technical terminology". The term "application" is the full term. But in the context of the lecture, they use "app" as an abbreviation.

   We'll use "application" for clarity and because the rule says "preserve", but note: the source uses "app". We have two choices.

   Since the source uses "app", and the rule says "only facts explicitly supported", we can write it as "app" to be consistent with the source.

   Alternatively, we can write it as "application" because the context is clear. The rule says: "Preserve important definitions and technical terminology". The term "application" is the standard term.

   Let me see: the source says "application processes" in the diagram? Actually, the text says: "application messages". 

   But the lecture excerpt is from a slide that says: "app messages". So we write "app" to be precise.

   However, the rule does not require us to use the exact string from the source? It says: "Use only facts explicitly supported by the source". So we can write the fact as it is.

   We'll write: "application" is the full term and it's standard. But the source uses "app". 

   Since the problem says "create", and we are to output the facts, I think it's safe to write "application" because the slide says "app" meaning application.

   But to be safe, we can write: "application" as it is the standard term.

   Alternatively, we can write: "app" as the source does.

   I think the problem expects "application" because the slide is from a course and they use "app" as shorthand.

   Let me see the original problem: it says "app messages". So we write "app messages".

   We'll write: "app" as in the source.

   So:

        - Send side: breaks app messages into segments and passes to network layer [Page 4]

   Similarly, "receive side: reassembles segments into messages and passes to app layer" -> but the source says "application layer".

   Actually, the source says: "passes to application layer" (it's a bit ambiguous).

   But in the slide, it's written as "app messages" and "app layer"? 

   We don't have the exact text. The problem says: "Create a Markdown document".

   Given the constraints, I'll write it as "application" for clarity.

   However, the rule says: "Use only facts explicitly supported by the source". So if the source says "app", we should use "app".

   Let's do it as "app" to be precise.

   Final decision: use "app" as in the source.

   So:

        - Send side: breaks app messages into segments and passes to network layer [Page 4]
        - Receive side: reassembles segments into messages and passes to app layer [Page 4]

   But wait, the source says "app layer" or "application layer"? The slide says "app" for both.

   We'll output:

        - Send side: breaks app messages into segments and passes to network layer [Page 4]
        - Receive side: reassembles segments into messages and passes to app layer [Page 4]

   This is the most precise.

   So the output is as above.

   Let's write the Markdown.

   Note: The bullet points are indented with two spaces? In Markdown, we can use 2 spaces for indentation.

   But we are writing for a Markdown document.

   We'll write it as:

   # Chapter 3: Transport Layer

   ## Goals
   - Understand principles behind transport layer services:
     - Multiplexing [Page 2]
     - Demultiplexing [Page 2]
     - Reliable data transfer [Page 2]
     - Flow control [Page 2]
     - Congestion control [Page 2]
   - Learn about Internet transport layer protocols:
     - UDP: connectionless transport [Page 2]
     - TCP: connection-oriented reliable transport [Page 2]
     - TCP congestion control [Page 2]

   ## Chapter Outline
   - 3.1 Transport-layer services [Page 3]
   - 3.2 Multiplexing and demultiplexing [Page 3]
   - 3.3 Connectionless transport: UDP [Page 3]
   - 3.4 Principles of reliable data transfer [Page 3]
   - 3.5 Connection-oriented transport: TCP
     - Segment structure [Page 3]
     - Reliable data transfer [Page 3]
     - Flow control [Page 3]
     - Connection management [Page 3]
   - 3.6 Principles of congestion control [Page 3]
   - : TCP congestion control [Page 3]   -> wait, I think it's "3.7 TCP congestion control"

   Correction: in the chapter outline, it's 3.7.

   So:

   - 3.7 TCP congestion control [Page 3]

   But in the bullet, we have to indent the sub-bullets.

   We'll write it as:

   ## Chapter Outline
   - 3.1 Transport-layer services [Page 3]
   - 3.2 Multiplexing and demultiplexing [Page 3]
   - 3.3 Connectionless transport: UDP [Page 3]
   - 3.4 Principles of reliable data transfer [Page 3]
   - 3.5 Connection-oriented transport: TCP
     - Segment structure [Page 3]
     - Reliable data transfer [Page 3]
     - Flow control [Page 3]
     - Connection management [Page 3]
   - 3.6 Principles of congestion control [Page 3]
   - 3.7 TCP congestion control [Page 3]

   This is the output.

   Let's output it.

   Note: The rule says "Do not include your reasoning, planning, or commentary." So we don't add anything else.

   Final output.
</think>

# Chapter 3: Transport Layer

## Goals
- Understand principles behind transport layer services:
  - Multiplexing [Page 2]
  - Demultiplexing [Page 2]
  - Reliable data transfer [Page 2]
  - Flow control [Page 2]
  - Congestion control [Page 2]
- Learn about Internet transport layer protocols:
  - UDP: connectionless transport [Page 2]
  - TCP: connection-oriented reliable transport [Page 2]
  - TCP congestion control [Page 2]

## Chapter Outline
- 3.1 Transport-layer services [Page 3]
- 3.2 Multiplexing and demultiplexing [Page 3]
- 3.3 Connectionless transport: UDP [Page 3]
- 3.4 Principles of reliable data transfer [Page 3]
- 3.5 Connection-oriented transport: TCP
  - Segment structure [Page 3]
  - Reliable data transfer [Page 3]
  - Flow control [Page 3]
  - Connection management [Page 3]
- 3.6 Principles of congestion control [Page 3]
- 3.7 TCP congestion control [Page 3]

## Transport Services and Protocols
- **Definition**: Transport protocols provide logical communication between application processes [Page 4]
- **End System Execution**:
  - Send side: breaks app messages into segments and passes to network layer [Page 4]
  - Receive side: reassembles segments into messages and passes to app layer [Page 4]
- **Available Protocols**: Internet uses TCP and UDP [Page 4]