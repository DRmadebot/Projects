push = require 'libraries/push'
Class = require 'class'

sounds = {
    ['point'] = love.audio.newSource('sounds/point.mp3', 'static'),
    ['serve'] = love.audio.newSource('sounds/serve.mp3', 'static'),
    ['title'] = love.audio.newSource('sounds/title.mp3', 'static'),
    ['winscore_up'] = love.audio.newSource('sounds/winscore_up.mp3', 'static'),
    ['winscore_down'] = love.audio.newSource('sounds/winscore_down.wav', 'static'),
    ['finish'] = love.audio.newSource('sounds/finish.mp3', 'static'),
    ['bounce'] = love.audio.newSource('sounds/bounce.mp3', 'static'),
    ['paddle_hit'] = love.audio.newSource('sounds/paddle_hit.wav', 'static'),
}

sounds.title:setLooping(true)
sounds.serve:setLooping(true)
sounds.finish:setLooping(true)

servingPlayer = math.random(2)
WINDOW_WIDTH = 1280
WINDOW_HEIGHT = 720

VIRTUAL_WIDTH = 600
VIRTUAL_HEIGHT = 350
require 'Paddle'
require 'Ball'
require 'StateMachine'
require 'states/BaseState'
require 'states/Title'
require 'states/Play'
require 'states/Selector'
require 'states/Serve'
require 'states/Finish'

ball_image = love.graphics.newImage('sprites/ball.png')
left_paddle_image = love.graphics.newImage('sprites/left_paddle.png')
right_paddle_image = love.graphics.newImage('sprites/right_paddle.png')
background = love.graphics.newImage('sprites/background.png')

servingPlayer = math.random(2)

titleFont = love.graphics.newFont('fonts/titlefont2.otf', 60)
mediumFont = love.graphics.newFont('fonts/titlefont2.otf', 32)
SelectorFont = love.graphics.newFont('fonts/titlefont.otf', 32)
SelectorFontSmaller = love.graphics.newFont('fonts/titlefont.otf', 25)
finishBig = love.graphics.newFont('fonts/finishBig.ttf', 50)
scoreFont = love.graphics.newFont('fonts/scoreFont.ttf', 30)

function love.load()
    score1 = 0
    score2 = 0
    math.randomseed(os.time())
    love.graphics.setDefaultFilter('nearest', 'nearest')
    love.window.setTitle('Flappy Pong')

    push:setupScreen(VIRTUAL_WIDTH, VIRTUAL_HEIGHT, WINDOW_WIDTH, WINDOW_HEIGHT, {
        vsync = true,
        fullscreen = false,
        resizable = true
    })

    gStateMachine = StateMachine{
        ['title'] = function() return Title() end,
        ['play'] = function() return Play() end,
        ['selector'] = function() return Selector() end,
        ['serve'] = function() return Serve() end,
        ['finish'] = function() return Finish() end,
    }
    gStateMachine:change('title')
    love.keyboard.keysPressed = {}
end

function love.resize(w, h)
    push:resize(w, h)
end

function love.keypressed(key)
    love.keyboard.keysPressed[key] = true

    if key == 'escape' then
        love.event.quit()
    end
end

function love.keyboard.wasPressed(key)
    if love.keyboard.keysPressed[key] then
        return true
    else
        return false
    end
end

function love.update(dt)
    gStateMachine:update(dt)
    love.keyboard.keysPressed = {}
end

function love.draw()

    push:start()
    love.graphics.draw(background, 0, 0)
    gStateMachine:render()
    push:finish()
end