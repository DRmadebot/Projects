# 🐦🏓 Flappy Pong

**A gravity-defying mashup of Flappy Bird and Pong**, built in Lua with the LÖVE 2D framework.

[![Made with LÖVE](https://img.shields.io/badge/Made%20with-L%C3%96VE-EA316E.svg?style=flat-square&logo=love&logoColor=white)](https://love2d.org/)
[![Language](https://img.shields.io/badge/Language-Lua-2C2D72.svg?style=flat-square&logo=lua)](https://www.lua.org/)
[![CS50x](https://img.shields.io/badge/CS50x-Final%20Project-A51C30.svg?style=flat-square)](https://cs50.harvard.edu/x/)
[![License](https://img.shields.io/badge/License-Educational-lightgrey.svg?style=flat-square)](#-license)

▶️ **[Watch the demo video](https://www.youtube.com/watch?v=qh_YU6wsbvQ)**

---

## 📖 Table of Contents

- [About the Project](#-about-the-project)
- [Features](#-features)
- [How to Play](#-how-to-play)
- [Controls](#-controls)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Running with LÖVE](#option-1-running-with-löve-recommended)
  - [Building a Standalone Windows Executable](#option-2-building-a-standalone-windows-executable)
- [Project Structure](#-project-structure)
- [How It Works](#-how-it-works)
- [Tech Stack](#-tech-stack)
- [Roadmap / Ideas for Improvement](#-roadmap--ideas-for-improvement)
- [Author](#-author)
- [Acknowledgments](#-acknowledgments)
- [License](#-license)

---

## 🎮 About the Project

**Flappy Pong** takes the two-paddle simplicity of *Pong* and swaps out the usual "move up and down freely" controls for *Flappy Bird*-style gravity: each paddle constantly falls and can only be launched upward with a well-timed key press. The result is a frantic, physics-driven twist on a classic — you're not just tracking the ball, you're fighting gravity to be in the right place at the right time.

Two players compete locally on the same keyboard, rallying the ball back and forth. Every paddle hit speeds the ball up a little more, so rallies get progressively harder to sustain. Miss the ball, and your opponent scores. First to reach the target score wins.

This project was built as the **final submission for [CS50x](https://cs50.harvard.edu/x/) — Harvard University's Introduction to Computer Science** — and demonstrates state-machine design, 2D collision detection, simple physics simulation, and audio/visual polish using the LÖVE 2D game framework.

## ✨ Features

- 🏐 **Classic Pong physics** — a ball that bounces off the top/bottom walls and accelerates on every paddle hit
- 🐤 **Flappy Bird-style controls** — paddles are constantly pulled down by gravity and must be "flapped" upward
- 📈 **Escalating difficulty** — the ball speeds up ~3% with every successful hit, so rallies get progressively tougher
- 🎯 **Configurable win condition** — set your own target score before each match
- 🔊 **Full sound design** — dedicated sound effects for serves, bounces, paddle hits, scoring, and match end
- 🎨 **Retro-styled visuals** — custom sprites, background art, and pixel-style fonts
- 🔁 **Full game loop** — title screen → win-score selector → serve/rally → match end → restart
- 🖥️ **Resizable window** with resolution-independent rendering (via the `push` library)

## 🕹️ How to Play

The game flows through five screens:

1. **Title Screen** — press `Enter` to begin.
2. **Win-Score Selector** — choose how many points are needed to win the match.
3. **Ready Screen** — shows who serves first; press `Enter` to launch the rally.
4. **Rally (Serve state)** — the actual gameplay. Keep the ball alive by flapping your paddle into it.
5. **Finish Screen** — announces the winner; press `Enter` to return to the title screen and play again.

**Objective:** Score points by getting the ball past your opponent's paddle, and avoid letting it past your own. Whoever reaches the chosen win score first takes the match.

## ⌨️ Controls

| Action | Key |
|---|---|
| Flap the **left** paddle (Player 1) upward | `W` |
| Flap the **right** paddle (Player 2) upward | `↑` Up Arrow |
| Confirm / Start / Advance screens | `Enter` / `Return` |
| Increase win score (selector screen) | `↑` Up Arrow |
| Decrease win score (selector screen) | `↓` Down Arrow |
| Quit the game | `Esc` |

Both paddles are constantly pulled downward by gravity — if you stop pressing your key, your paddle sinks toward the bottom of the screen, just like in Flappy Bird.

## 🚀 Getting Started

### Prerequisites

- [LÖVE 2D](https://love2d.org/) **version 11.4** or a compatible release (only needed if you're running the game from source rather than a pre-built executable)

### Option 1: Running with LÖVE (Recommended)

1. [Download and install LÖVE](https://love2d.org/) for your operating system.
2. Clone or download this repository:
   ```bash
   git clone https://github.com/DRmadebot/Projects.git
   cd Projects/Flappy_Pong
   ```
3. Run the game:
   ```bash
   love .
   ```
   > On Windows, you can also drag the `Flappy_Pong` folder directly onto `love.exe`.

### Option 2: Building a Standalone Windows Executable

1. Zip the contents of the `Flappy_Pong` folder (with `main.lua` at the **root** of the archive) and rename it to `Flappy_Pong.love`.
2. Download the LÖVE **Windows** `.zip` release from [love2d.org](https://love2d.org/).
3. From a folder containing both `love.exe` and `Flappy_Pong.love`, run:
   ```cmd
   copy /b love.exe+Flappy_Pong.love Flappy_Pong.exe
   ```
4. Copy the required `.dll` files from the LÖVE distribution into the same folder as `Flappy_Pong.exe`.
5. Launch `Flappy_Pong.exe` — no separate LÖVE installation required.

## 📁 Project Structure

```
Flappy_Pong/
├── main.lua              # Entry point — loads assets, sets up the window and state machine
├── Paddle.lua             # Paddle class: gravity, movement, and screen-boundary clamping
├── Ball.lua               # Ball class: movement, wall bouncing, scoring, and win detection
├── StateMachine.lua       # Lightweight finite-state machine driving the game screens
├── class.lua              # Third-party Lua "class" implementation (OOP support)
├── states/
│   ├── BaseState.lua      # Base/default state with no-op lifecycle methods
│   ├── Title.lua          # Title screen
│   ├── Selector.lua       # Win-score selection screen
│   ├── Play.lua           # "Ready to serve" screen
│   ├── Serve.lua          # Active gameplay / rally screen
│   └── Finish.lua         # Match-end / winner screen
├── libraries/
│   └── push.lua           # Resolution-independent rendering helper
├── fonts/                 # Custom fonts used across the UI
├── sprites/               # Ball, paddle, and background art
├── sounds/                # SFX and music (serve, bounce, score, win, title, finish)
└── README.md
```

## 🔍 How It Works

- **State machine:** `StateMachine.lua` swaps between five state objects (`Title`, `Selector`, `Play`, `Serve`, `Finish`), each implementing `enter()`, `update(dt)`, and `render()`. This keeps each screen's logic isolated and easy to extend.
- **Gravity-based paddles:** each `Paddle` accumulates downward velocity every frame (`GRAVITY = 500`) and is clamped to the top/bottom of the screen. Pressing your key sets a strong upward velocity (`JUMP_SPEED = -150`), producing the signature Flappy Bird "flap."
- **Ball physics:** the `Ball` moves on both axes, reverses vertical direction when it hits the top or bottom wall, and reverses/accelerates horizontal direction (`×1.03`) on every paddle collision — a nod to Pong's classic speed-up mechanic.
- **Scoring & win condition:** when the ball crosses a side of the screen, the opposing player scores and the ball resets toward the player who was scored on. Once a player's score reaches the chosen `winscore`, the game transitions to the `Finish` state.
- **Resolution independence:** the `push` library renders the game at a fixed virtual resolution (`600×350`) and scales it up to the actual window size (`1280×720` by default, resizable), keeping pixel art crisp at any window size.

## 🛠️ Tech Stack

**[Lua](https://www.lua.org/)** — a lightweight, high-performance scripting language originally developed in 1993 at the Pontifical Catholic University of Rio de Janeiro. Its simple syntax, table-based data structures, and small footprint make it a popular embedded language for games and applications.

**[LÖVE 2D](https://love2d.org/)** — an open-source 2D game framework for Lua, first released in 2007. It provides built-in graphics, audio, physics, and input handling, letting developers focus on gameplay rather than low-level engine code, with support for Windows, macOS, and Linux.

## 🗺️ Roadmap / Ideas for Improvement

- [ ] Single-player mode with a basic AI opponent
- [ ] On-screen key-binding customization
- [ ] Difficulty presets (starting ball speed / acceleration rate)
- [ ] Local high-score / longest-rally tracking
- [ ] Packaged builds for macOS and Linux

## 👤 Author

**Daksh Rishi**
CS50 Final Project — 2025
HarvardX / edX / CS50x

## 🙏 Acknowledgments

- [LÖVE 2D](https://love2d.org/) game framework
- The Harvard CS50 team and course staff
- Sound effects and sprites are self-created or royalty-free

## 📄 License

This project was built for educational purposes as part of CS50x. You're welcome to fork, modify, and distribute it with credit. It is **not intended for commercial use**.