Finish = Class{__includes = BaseState}

function Finish:enter()
    sounds.finish:play()
end

function Finish:update(dt)
    if love.keyboard.wasPressed('enter') or love.keyboard.wasPressed('return') then
        sounds.finish:stop()
        gStateMachine:change('title')
    end
end

function Finish:render()
    love.graphics.setFont(finishBig)
    love.graphics.setColor(love.math.colorFromBytes(255,255,0))
    love.graphics.printf("player ".. tostring(winningPlayer) .. " has won", 0, VIRTUAL_HEIGHT/2, VIRTUAL_WIDTH, 'center')
    love.graphics.setFont(SelectorFontSmaller)
    love.graphics.setColor(love.math.colorFromBytes(255,0,0))
    love.graphics.printf("Press enter to restart", 0, VIRTUAL_HEIGHT/2 + 70, VIRTUAL_WIDTH, 'center')
end