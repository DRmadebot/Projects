Paddle = Class{}

local GRAVITY = 500
JUMP_SPEED = -150

function Paddle:init(x, y, width, height)
    self.x = x
    self.y = y
    self.width = width
    self.height = height
    self.dy = 0
end

function Paddle:update(dt)
    self.dy = self.dy + GRAVITY*dt
    self.y = self.y + self.dy*dt

    if self.y + self.height > VIRTUAL_HEIGHT then
        self.y = VIRTUAL_HEIGHT - self.height
    end 

    if self.y < 0 then
        self.y = 0
    end
end

function Paddle:render(sprite)
    love.graphics.draw(sprite, self.x, self.y)
end