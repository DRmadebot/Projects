Title = Class{__includes = BaseState}

function Title:enter()
    sounds.title:play()
end

function Title:update(dt)
    if love.keyboard.wasPressed('enter') or love.keyboard.wasPressed('return') then
        sounds.title:stop()
        gStateMachine:change('selector')
    end
end



function Title:render()
    love.graphics.setBackgroundColor(0, 0 ,0, 255)
    love.graphics.setFont(titleFont)
    love.graphics.setColor(love.math.colorFromBytes(255,255,0))
    love.graphics.printf("Flappy Pong", 0, 10, VIRTUAL_WIDTH, 'center')
    love.graphics.setFont(mediumFont)
    love.graphics.setColor(love.math.colorFromBytes(255,128,128))
    love.graphics.printf("Press enter to start", 0, VIRTUAL_WIDTH/2, VIRTUAL_WIDTH, 'center')
end