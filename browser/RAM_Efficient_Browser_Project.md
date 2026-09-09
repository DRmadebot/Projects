# RAM-Efficient Browser — Project Specification & Learning Plan

## 1. Project Overview

Build a lightweight desktop web browser focused on **aggressive but intelligent RAM management**.

The initial implementation should use **C++ + Qt WebEngine** rather than building a browser engine from scratch. Qt WebEngine gives the project a real Chromium-based web engine while allowing the project to focus on browser UI, tab lifecycle, memory management, profiling, and performance engineering.

The central goal is:

> **Build a smooth, usable browser that uses as little RAM as reasonably possible, with an ambitious target of staying below 500 MB for controlled light workloads and below 1 GB during normal multi-tab use.**

This is intended as a **vacation-long learning project and a serious resume/portfolio project**.

---

## 2. Current Skill Level / Learning Constraint

I already have programming experience, particularly C++, Python, web development, React/TypeScript, etc., but I **do not know how browsers are built**.

Therefore this project must be approached as a learning project.

### Important rules for development

- Do not dump huge implementations on me.
- Do not blindly generate the entire project.
- Explain unfamiliar browser concepts before relying on them.
- Build the application incrementally.
- Give me manageable implementation tasks and let me attempt them.
- Prefer hints and debugging help before complete solutions.
- Explain why each component exists.
- Use measurements instead of assumptions for optimization decisions.
- Do not jump into Chromium internals before I understand the relevant browser fundamentals.

The goal is not merely to finish a browser. The goal is to understand **browser architecture, processes, memory management, and performance engineering** while building one.

---

# 3. Main Idea

The browser should behave differently from a normal browser when many tabs are open.

Instead of keeping every tab's renderer and resources alive indefinitely, the browser should intelligently manage tab lifecycle based on memory pressure and user activity.

Conceptually:

```text
                     YOUR BROWSER
                          |
              +-----------+-----------+
              |                       |
           Browser UI           Browser Logic
              |                       |
              +-----------+-----------+
                          |
                    Qt WebEngine
                          |
                       Chromium
```

The browser's main differentiating feature is its **RAM-aware tab lifecycle manager**.

---

# 4. Why Qt WebEngine Initially?

The project should initially use Qt WebEngine because it provides a practical way to learn browser development without having to implement a complete browser engine.

A browser engine already handles difficult areas such as:

- HTML parsing
- CSS
- DOM
- JavaScript
- rendering
- networking
- HTTP/HTTPS
- image decoding
- media
- web security
- browser storage

The project can therefore concentrate on:

- browser UI
- tabs
- navigation
- session state
- memory monitoring
- tab lifecycle
- performance profiling
- RAM optimization

Qt WebEngine is a **starting point**, not necessarily the final engine choice forever.

After gaining browser knowledge, deeper Chromium, WebKit, Servo, or other engine work can be investigated.

---

# 5. Why Not Start With Chromium / Firefox / Servo / Ladybird?

## Chromium

Chromium is enormous. Starting by forking it would create a huge learning burden before meaningful browser features could be implemented.

## Firefox

Firefox/Gecko is mature and interesting, but similarly introduces a large existing codebase and browser architecture before I understand the basics.

## Servo

Servo is technically interesting and could be a future direction, but it would combine learning browser architecture with learning Rust and browser-engine development.

## Ladybird

Ladybird is an exciting independent browser project, but building on or contributing deeply to a new browser engine is much larger than the initial goal.

## Initial choice

Start with **C++ + Qt WebEngine**, learn how browsers work, then investigate deeper alternatives later.

---

# 6. Browser MVP

The first usable version should support:

- [ ] Open a URL
- [ ] Address bar
- [ ] Back
- [ ] Forward
- [ ] Reload
- [ ] Stop loading
- [ ] Render normal webpages
- [ ] New tab
- [ ] Close tab
- [ ] Switch tabs
- [ ] Tab title
- [ ] Basic bookmarks
- [ ] Basic history
- [ ] Downloads
- [ ] Basic settings

The initial version does **not** need:

- account synchronization
- browser accounts
- extensions
- password manager
- advanced developer tools
- custom browser engine
- complicated themes
- unnecessary Google-specific services

Keep the first version small.

---

# 7. Initial Architecture

```text
+------------------------------------------------+
|                  YOUR BROWSER                  |
+------------------------------------------------+
| UI                                             |
|  - Tabs                                        |
|  - Address bar                                 |
|  - Navigation controls                         |
|  - Bookmarks                                   |
|  - History                                     |
|  - Downloads                                   |
+------------------------------------------------+
| Browser Logic                                  |
|  - Tab Manager                                 |
|  - Session Manager                             |
|  - Cache Manager                               |
|  - Memory Manager                              |
+------------------------------------------------+
| Qt WebEngine                                   |
+------------------------------------------------+
| Chromium                                       |
+------------------------------------------------+
```

The important part is that **our code owns the browser experience and lifecycle policy**, while Qt WebEngine/Chromium handles the actual web rendering.

---

# 8. Main Feature — Adaptive RAM Management

The browser should continuously monitor memory usage and decide which tabs need to remain active.

Conceptually:

```text
                  Memory Pressure
                         |
                         v
                +----------------+
                | Memory Manager |
                +-------+--------+
                        |
            +-----------+-----------+
            |           |           |
            v           v           v
         ACTIVE       FROZEN     DISCARDED
           TAB          TAB          TAB
            |           |            |
            v           v            v
        Renderer     Reduced      Renderer
          alive      activity     released
```

The exact mechanisms should be learned and implemented based on what Qt WebEngine/Chromium actually exposes.

---

# 9. Tab Lifecycle

Tabs should conceptually have three major states.

## ACTIVE

The user is currently interacting with the tab.

```text
ACTIVE
  |
  +-- renderer alive
  +-- normal JavaScript execution
  +-- normal network activity
```

## FROZEN / SUSPENDED

The tab has been inactive for some time and should perform as little background work as possible.

Potential actions may include:

- reducing JavaScript activity
- stopping unnecessary timers
- reducing background work
- pausing resources where safe

The exact implementation should be investigated rather than assumed.

## DISCARDED

The tab remains visible in the tab bar, but its expensive page/renderer resources are released.

Conceptually:

```text
DISCARDED
  |
  +-- URL retained
  +-- tab metadata retained
  +-- renderer/page resources released
```

When the user returns:

```text
DISCARDED
     |
     v
restore URL/state
     |
     v
create/restore page
     |
     v
show tab
```

This is the most important strategy for keeping many tabs open without keeping every tab's full runtime alive.

---

# 10. RAM Budget

The browser should **not** enforce an arbitrary hard process-level memory limit that can cause crashes.

Instead, use a RAM budget as a trigger for increasingly aggressive memory management.

Initial conceptual targets:

```text
< 400 MB
    Normal operation

> 400 MB
    Start freezing/suspending background tabs

> 450 MB
    Start discarding old inactive tabs

> 480 MB
    Aggressive cleanup

~ 500 MB
    Target upper range for controlled light workloads
```

These numbers are **starting hypotheses only** and must be changed after actual benchmarking.

---

# 11. Tab Selection / Eviction Strategy

The memory manager should eventually consider:

- current memory usage
- tab last-used time
- whether the tab is active
- CPU usage
- network activity
- audio playback
- video playback
- active downloads
- unsaved form/input state
- user-defined tab priority
- recent access frequency

An LRU-like policy is a good initial concept.

Example:

```text
Tab A -> active
Tab B -> recently used
Tab C -> inactive for 5 minutes
Tab D -> inactive for 30 minutes
Tab E -> inactive for 2 hours
```

Under memory pressure:

```text
E -> discard first
D -> discard next
C -> freeze/discard
B -> keep
A -> keep
```

The actual policy should evolve as we learn more about browsers and collect benchmark data.

---

# 12. Memory Monitoring

Memory optimization must be data-driven.

Potential metrics:

- browser process RSS
- renderer memory
- GPU/process memory where measurable
- total browser memory
- memory before opening a tab
- memory after opening a tab
- memory after closing a tab
- memory after freezing a tab
- memory after discarding a tab
- memory after restoring a tab
- peak memory
- startup memory
- memory per active tab
- incremental memory per additional tab

The exact APIs and measurement tools should be investigated during development.

---

# 13. Benchmarking

Create a repeatable benchmark suite rather than relying on casual Task Manager observations.

## Example workload

### Test 1 — Startup

```text
Start browser
Measure baseline RAM
```

### Test 2 — One page

```text
Open a lightweight webpage
Measure RAM
```

### Test 3 — Five tabs

```text
Open 5 tabs
Measure RAM
```

### Test 4 — Ten tabs

```text
Open 10 tabs
Keep one active
Measure RAM
```

### Test 5 — Idle tabs

```text
Leave background tabs idle
Measure RAM over time
```

### Test 6 — Memory pressure

```text
Increase memory pressure
Observe memory manager
Measure RAM
```

### Test 7 — Restoration

```text
Discard inactive tab
Open it again
Measure restoration time and RAM
```

### Test 8 — Heavy websites

Use JavaScript-heavy modern websites and measure:

- RAM
- CPU
- responsiveness
- page functionality

---

# 14. Performance Comparison

Eventually compare the browser against established browsers under the **same workload and conditions**.

Potential comparison targets:

- Chrome
- Firefox
- Our Browser

Example:

```text
                         RAM Usage

Browser          1 tab    5 tabs    10 tabs
--------------------------------------------
Chrome             X        X          X
Firefox            X        X          X
Our Browser        X        X          X
```

Never invent benchmark numbers.

All final numbers must come from reproducible measurements.

---

# 15. Initial Performance Targets

These are goals, not guaranteed specifications.

| Scenario | Initial Target |
|---|---:|
| Startup | < 150 MB |
| 1 simple page | < 250 MB |
| 2 active pages | < 350 MB |
| 5 tabs, 1 active | < 400 MB |
| 10 tabs, 1 active | < 450 MB |
| Controlled light workload | < 500 MB |
| Normal heavier usage | < 1 GB where reasonably achievable |

Modern websites can legitimately consume significant memory. The goal is not to break webpages merely to hit a number.

The actual objective is:

> **Minimize unnecessary memory consumption while preserving smoothness, functionality, and reasonable browser security.**

---

# 16. Development Roadmap

## Phase 0 — Learn Browser Fundamentals

Before serious implementation, learn:

- what a browser does
- browser process
- renderer process
- GPU process
- network services/processes
- tabs
- frames
- DOM
- JavaScript engine
- rendering pipeline
- browser storage
- HTTP/HTTPS
- cookies
- cache
- process isolation
- IPC

The goal is conceptual understanding, not memorization.

---

## Phase 1 — Minimal Browser

Build:

```text
Window
  |
  +-- Address bar
  |
  +-- Web view
```

Features:

- enter URL
- load page
- back
- forward
- reload

No RAM optimization yet.

The first milestone is simply:

> **A small C++ application that can load and display a webpage.**

Then understand the chain:

```text
C++ application
      |
      v
     Qt
      |
      v
Qt WebEngine
      |
      v
  Chromium
      |
      v
 Web page
```

---

## Phase 2 — Tabs

Implement:

- new tab
- close tab
- switch tab
- tab titles
- loading indicators

Then begin measuring memory.

At this point the browser is allowed to be inefficient.

---

## Phase 3 — Basic Browser Features

Add:

- history
- bookmarks
- downloads
- basic settings
- session persistence if useful

Keep these features lightweight.

---

## Phase 4 — Memory Monitor

Build an internal memory monitoring system.

Potential UI:

```text
Memory
----------------
Browser: 112 MB
Tab 1:    154 MB
Tab 2:     92 MB
Tab 3:     87 MB
GPU:       41 MB
----------------
Total:    486 MB
```

Whether exact per-tab memory reporting is possible should be investigated rather than assumed.

---

## Phase 5 — Tab Freezing / Suspension

Implement the first memory-saving strategy.

Conceptually:

```text
ACTIVE
  |
  v
inactive
  |
  v
freeze/suspend
```

Measure the effect.

---

## Phase 6 — Tab Discarding

Implement:

```text
ACTIVE
   |
   v
inactive
   |
   v
frozen
   |
   v
discarded
```

Retain enough information to restore the tab.

Measure:

- RAM saved
- restoration time
- user experience
- state preservation

---

## Phase 7 — Adaptive Memory Manager

Create a real memory-pressure policy.

Initial concept:

```text
if memory < threshold:
    normal operation

if memory > threshold_1:
    freeze candidates

if memory > threshold_2:
    discard low-priority tabs

if memory > threshold_3:
    aggressive cleanup
```

Eventually make the policy smarter than simple fixed timeouts.

---

## Phase 8 — Benchmarking

Build reproducible tests and compare against Chrome/Firefox.

Measure:

- RAM
- CPU
- startup time
- page load time
- tab restoration time
- responsiveness
- functionality

---

## Phase 9 — Deeper Optimization

Only after profiling should deeper optimization begin.

Potential areas:

- WebEngine configuration
- cache behavior
- preloading
- background services
- process lifetime
- renderer reuse
- GPU configuration
- unnecessary browser features
- network behavior
- application-level allocations

Do not assume any of these are bottlenecks until measurements show that they matter.

---

# 17. Future Directions

After the initial browser is understood and working, investigate other engines/architectures.

## Deeper Chromium work

Potentially investigate Chromium internals and whether some engine-level optimizations are possible.

## WebKit

Investigate WebKit/WPE/WebKitGTK as an alternative engine and compare architecture and memory behavior.

## Servo

Learn Rust and investigate Servo as a different browser-engine foundation.

## Ladybird

Study independent browser-engine architecture and potentially contribute/experiment later.

## Custom engine experiments

Only as a very long-term learning project.

None of these are part of the initial scope.

---

# 18. Things Explicitly Out of Scope Initially

Do NOT begin by:

- forking Chromium
- forking Firefox
- writing an HTML engine
- writing a CSS engine
- writing a JavaScript engine
- implementing a custom renderer
- optimizing without profiling
- enforcing a dangerous hard memory limit
- disabling random browser components without measuring their impact
- sacrificing browser security solely for RAM savings
- generating the entire application blindly

---

# 19. Resume / Portfolio Goal

The final project should demonstrate systems/performance engineering, not just GUI development.

Potential resume description:

> **Developed a memory-efficient C++ desktop browser with adaptive tab lifecycle management, RAM-pressure detection, and automatic background tab suspension/discarding; benchmarked memory usage against mainstream browsers under controlled multi-tab workloads.**

Only add actual percentage improvements and numerical results after they have been measured.

The GitHub repository should eventually contain:

- architecture documentation
- benchmark methodology
- memory measurements
- performance graphs
- optimization experiments
- before/after results
- design decisions
- known limitations
- reproducible benchmark instructions

---

# 20. Engineering / Learning Workflow

Every significant optimization should follow this process:

```text
Problem
   |
   v
Measure
   |
   v
Hypothesis
   |
   v
Implement change
   |
   v
Benchmark
   |
   v
Compare
   |
   +----> Keep
   |
   +----> Revert
```

Example:

```text
Problem:
Background tabs consume too much RAM.

Measure:
10 tabs = 1.2 GB.

Hypothesis:
Inactive renderers/resources are responsible for much of the memory.

Change:
Discard inactive tabs after a policy threshold.

Measure again:
10 tabs = measured result.

Result:
Calculate actual reduction.

Decision:
Keep/revert based on memory savings and usability.
```

---

# 21. First Learning Session

Do not begin by writing hundreds of lines of code.

Start by learning:

1. What happens when a browser opens a webpage?
2. What is a browser process?
3. What is a renderer process?
4. Why do browsers use multiple processes?
5. What does Qt WebEngine provide?
6. How does a Qt application embed a web view?
7. Where does RAM usage come from?

Then create the smallest possible C++/Qt WebEngine application that loads a webpage.

Once that works, inspect the processes and memory usage.

That observation becomes the foundation for the rest of the project.

---

# 22. Final Vision

The long-term vision is a browser that feels like a normal modern browser but behaves much more aggressively when resources are limited.

Example:

```text
                    RAM Budget
                       500 MB
                         |
                         v
              +---------------------+
              |    Memory Manager   |
              +----------+----------+
                         |
          +--------------+--------------+
          |              |              |
          v              v              v
       ACTIVE         FROZEN        DISCARDED
        tabs            tabs           tabs
          |              |              |
          v              v              v
     Full runtime    Minimal work    Metadata only
     resources       / paused        / no renderer
          |              |              |
          +--------------+--------------+
                         |
                         v
                  Smooth browsing
```

The browser should make intelligent tradeoffs instead of simply allowing every open tab to consume memory indefinitely.

The ultimate success criterion is not simply:

> "It uses less RAM."

It is:

> **"It uses less RAM because it intelligently decides what actually needs to be alive."**

---

# 23. Rule for the Next Chat

When continuing this project in another chat, treat this document as the project specification and learning plan.

The assistant should act as a **teacher/mentor and engineering partner**, not a code generator.

Start from browser fundamentals and the minimal Qt WebEngine application. Explain concepts, assign small implementation tasks, review my attempts, help debug them, and only provide complete code when genuinely necessary.

The project should evolve from:

```text
Learn browser basics
        |
        v
Minimal browser
        |
        v
Tabs
        |
        v
Measurement
        |
        v
Memory profiling
        |
        v
Tab suspension
        |
        v
Tab discarding
        |
        v
Adaptive RAM manager
        |
        v
Benchmarking
        |
        v
Deep optimization
```

**Do not skip the learning.**
