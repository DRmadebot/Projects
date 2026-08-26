Ball = Class{}
BALL_WIDTH = 15
BALL_HEIGHT = 15
function Ball:init(x, y, width, height)
    self.x = x
    self.y = y
    self.width = width
    self.height= height
    self.dx = 0
    self.dy = 0
end

function Ball:reset()
    self.x = VIRTUAL_WIDTH/2 - self.width
    self.y = VIRTUAL_HEIGHT/2 - self.height
    if servingPlayer == 1 then
        self.dx = 200
    elseif servingPlayer == 2 then
        self.dx = -200
    end
    self.dy = math.random(-50, 50)
end

function Ball:update(dt)
    self.x = self.x + self.dx*dt
    self.y = self.y + self.dy*dt

    if ball.y < 0 or ball.y + ball.height > VIRTUAL_HEIGHT then
        sounds.bounce:play()
        ball.dy = -ball.dy
    end

    if ball.x < 0 then
        sounds.point:play()
        score2 = score2 + 1
        servingPlayer = 1
        ball:reset()
    elseif ball.x > VIRTUAL_WIDTH then
        sounds.point:play()
        score1 = score1 + 1
        servingPlayer = 2
        ball:reset()
    end

    if score1 == winscore then
        winningPlayer = 1
        servingPlayer = 2
        score1 = 0
        score2 = 0
        ball:reset()
        sounds.serve:stop()
        gStateMachine:change('finish')
    elseif score2 == winscore then
        winningPlayer = 2
        servingPlayer = 1
        score1 = 0
        score2 = 0
        ball:reset()
        sounds.serve:stop()
        gStateMachine:change('finish')
    end
end

function Ball:collides(paddle)
    if self.x > paddle.x + PADDLE_WIDTH or self.x + self.width < paddle.x then
        return false
    elseif self.y > paddle.y + PADDLE_HEIGHT or self.y + self.height < paddle.y then
        return false
    else
        sounds.paddle_hit:play()
        return true
    end
end

function Ball:render()
    love.graphics.draw(ball_image, self.x, self.y)
end

