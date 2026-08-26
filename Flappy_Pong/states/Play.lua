Play = Class{__includes = BaseState}

PADDLE_WIDTH = 10
PADDLE_HEIGHT = 50

player1 = Paddle(10, 30, PADDLE_WIDTH, PADDLE_HEIGHT)
player2 = Paddle(VIRTUAL_WIDTH-PADDLE_WIDTH-10, VIRTUAL_HEIGHT-30, PADDLE_WIDTH, PADDLE_HEIGHT)

function Play:update(dt)
    if love.keyboard.wasPressed('enter') or love.keyboard.wasPressed('return') then
        gStateMachine:change('serve')
    end
end

function Play:render()
    player1:render(left_paddle_image)
    player2:render(right_paddle_image)
    ball:render()
    love.graphics.setColor(love.math.colorFromBytes(0,0,255))
    love.graphics.printf("Player " .. tostring(servingPlayer) .. "'s serve", 0, VIRTUAL_HEIGHT/2, VIRTUAL_WIDTH, 'center')
    love.graphics.printf("Press Enter to Start", 0, VIRTUAL_HEIGHT/2 + 20, VIRTUAL_WIDTH, 'center')
end