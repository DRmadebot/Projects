# Flappy Pong
## Video Demo : https://www.youtube.com/watch?v=qh_YU6wsbvQ
## Description

**Flappy Pong** is a 2D arcade-style game that combines elements of two classic video games: Flappy Bird and Pong. In this game, the player controls a flappy paddle that must continuously bounce a ball while avoiding obstacles. The aim is to survive as long as possible, maintaining ball control while reacting to the increasing difficulty over time. With its fast-paced action and simple yet challenging mechanics, Flappy Pong is a fun and addictive arcade experience.

This project was developed as the final submission for CS50x – Introduction to Computer Science, offered by Harvard University. As part of the course, students are tasked with creating a project that demonstrates their understanding of programming concepts, algorithms, and game development. In this case, the project combines a blend of classic game mechanics with new, creative twists that make it unique and fun to play.

## How to Play

- Set a **Winscore** that you must reach in order to finish the game.
- Use the **W** to move the left paddle up and the **UP** arrow key to move the right paddle up.
- Keep the ball bouncing off your paddle.
- Avoid missing the ball — letting it pass will result in a point gain for the other player.
- Try to acheive the winscore before your opponent.



## Features

- Classic Pong physics with Flappy Bird-style controls
- Increasing difficulty and game speed over time
- Score tracking
- Retro-styled graphics and sound effects
- Game over and restart functionality

## How to Run

### Option 1: Using LÖVE (Recommended for Developers)

1. [Download LÖVE](https://love2d.org/) (version 11.4 or compatible).
2. Download or clone this repository.
3. Open a terminal and navigate to the project folder.
4. Run the game using:

   ```bash
   love .
   ```

### Option 2: Windows Executable (No Installation Required)

> *(Only applicable if you’ve built the .exe file)*

1. Run the `Flappy_Pong.exe` file.
2. Ensure the required `.dll` files are in the same folder.
3. No need to install LÖVE separately.

## Installation / Build Instructions

To build a standalone executable for Windows:

1. Zip the project contents with `main.lua` at the root level and rename the archive to `Flappy_Pong.love`.
2. Download the LÖVE Windows `.zip` release from [love2d.org](https://love2d.org/).
3. Run the following command in Command Prompt (from the folder containing `love.exe` and `Flappy_Pong.love`):

   ```cmd
   copy /b love.exe+Flappy_Pong.love Flappy_Pong.exe
   ```

4. Include all required `.dll` files from the LÖVE distribution in the same folder as `Flappy_Pong.exe`.

## Files and Structure

```
Flappy_Pong/
├── main.lua
├── Paddle.lua
├── Ball.lua
├── StateMachine.lua
├── class.lua
├── fonts/
├── libraries/
├── sounds/
├── sprites/
├── states/
└── README.md
```
## About Lua

Lua is a lightweight, high-performance scripting language designed for embedding in applications. Its simplicity and flexibility make it a popular choice for game development, embedded systems, and web applications. Originally developed in 1993 by a team at the Pontifical Catholic University of Rio de Janeiro, Lua’s design focuses on being small, fast, and easy to extend.

The language supports procedural, object-oriented, and functional programming paradigms, offering developers a versatile tool for a wide range of tasks. One of Lua's most powerful features is its powerful and easy-to-use table data structure, which serves as the primary building block for arrays, dictionaries, and objects.

Lua is frequently used in game engines like LÖVE and Corona SDK, allowing developers to create complex games with minimal performance overhead. With its straightforward syntax, efficient memory management, and strong community support, Lua has become a staple for developers seeking an embedded scripting solution.

## About LÖVE 2D

LÖVE 2D (commonly known as Love2D) is an open-source game development framework designed to make it easy for developers to create 2D games in Lua. It provides a simple and intuitive interface, empowering both beginners and experienced programmers to bring their game ideas to life with minimal effort. Released in 2007, LÖVE has grown into a widely used tool for indie game development.

The framework includes built-in support for essential game elements like graphics, audio, physics, and input handling, allowing developers to focus on creative aspects without worrying about the low-level implementation. LÖVE 2D's reliance on Lua as its scripting language makes it lightweight and highly flexible, while its strong performance ensures smooth gameplay experiences even on lower-end systems.

LÖVE's vibrant community contributes a wealth of tutorials, libraries, and examples, making it an ideal choice for those looking to quickly prototype or fully develop 2D games. Its cross-platform capabilities (Windows, macOS, Linux, and mobile) make LÖVE a versatile tool for game developers worldwide.

## Author

**Daksh Rishi**
CS50 Final Project – 2025  
HarvardX / edX / CS50x

## Acknowledgments

- LÖVE 2D Game Framework
- Harvard CS50 Team
- Sound and sprite assets are either self-created or royalty-free.

## License

This project is for educational purposes as part of CS50x. Feel free to fork, modify, or distribute with credit. This project is for educational purposes as part of CS50x, and it is not intended for commercial use.
