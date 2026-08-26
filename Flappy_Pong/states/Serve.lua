require 'Paddle'
require 'Ball'

Serve = Class{__includes = BaseState}

PADDLE_WIDTH = 10
PADDLE_HEIGHT = 50

player1 = Paddle(10, 30, PADDLE_WIDTH, PADDLE_HEIGHT)
player2 = Paddle(VIRTUAL_WIDTH-PADDLE_WIDTH-10, VIRTUAL_HEIGHT-30, PADDLE_WIDTH, PADDLE_HEIGHT)
ball = Ball(VIRTUAL_WIDTH/2 - BALL_WIDTH/2, VIRTUAL_HEIGHT/2 - BALL_HEIGHT/2, 15, 15)
ball:reset(dt)

function Serve:enter()
    sounds.serve:play()
end

function Serve:update(dt)
    ball:update(dt)
    player1:update(dt)
    player2:update(dt)
    if love.keyboard.wasPressed('w') then
        player1.dy = JUMP_SPEED
    elseif love.keyboard.wasPressed('up') then
        player2.dy = JUMP_SPEED
    end

    if ball:collides(player1) then
        ball.dx = -ball.dx*1.03
    elseif ball:collides(player2) then
        ball.dx = -ball.dx*1.03
    end
end

function Serve:render()
    love.graphics.setBackgroundColor(0,0,0,255)
    love.graphics.setFont(scoreFont)
    love.graphics.print("" .. tostring(score1), VIRTUAL_WIDTH/2 - 40, 20)
    love.graphics.print(":", VIRTUAL_WIDTH/2, 20)
    love.graphics.print("" .. tostring(score2), VIRTUAL_WIDTH/2 + 20, 20)
    player1:render(left_paddle_image)
    player2:render(right_paddle_image)
    ball:render()
end