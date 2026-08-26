Selector = Class{__includes = BaseState}

local BOX_WIDTH = 200
local BOX_HEIGHT = 100

local BOX_X =  VIRTUAL_WIDTH/2 - (BOX_WIDTH/2)
local BOX_Y = VIRTUAL_HEIGHT/2 - (BOX_HEIGHT/2)

winscore = 1

function Selector:update(dt)
    if love.keyboard.wasPressed('up') then
        sounds.winscore_up:stop()
        sounds.winscore_up:play()
        winscore = winscore + 1
    elseif love.keyboard.wasPressed('down') then
        sounds.winscore_down:stop()
        sounds.winscore_down:play()
        if winscore > 1 then
            winscore = winscore - 1
        else
            winscore = winscore
        end
    elseif love.keyboard.wasPressed('enter') or love.keyboard.wasPressed('return') then
        gStateMachine:change('play')
    end
end

function Selector:render()
    love.graphics.setBackgroundColor(0, 0, 0, 20)
    love.graphics.setColor(love.math.colorFromBytes(255,153,204))
    love.graphics.setFont(SelectorFont)
    love.graphics.printf("Score needed to win: " .. winscore, 0, 30, VIRTUAL_WIDTH, 'center')
    love.graphics.setFont(SelectorFontSmaller)
    love.graphics.setColor(love.math.colorFromBytes(255,0,0))
    love.graphics.printf("Press 'up arrow' to increase and 'down arrow' to decrease", 0, VIRTUAL_HEIGHT/2 + 80, VIRTUAL_WIDTH, 'center')
    love.graphics.setColor(love.math.colorFromBytes(0, 128, 0))
    love.graphics.printf("Press 'enter' when ready to begin", 0, VIRTUAL_HEIGHT/2 + 100, VIRTUAL_WIDTH, 'center')

end