const MOVE_SPEED=200

layer(['obj','ui'],'obj')
addLevel([
  '!^^^^^^^^^^^^   &',
  '!^^^^^^^^^^^^   &',
  '!^^^^^^^^^^^^   &',
  '!               &',
  '!               &',
  '!               &',
  '!               &',
  '!               &',
  '!               &',
  '!               &',
  '!               &',
  '!               &',
  '!               &',
],{
  width: 30,
  height: 22,
  '^': [sprite('spaceinvader'),scale(0.7),'spaceinvader'],
  '!': [sprite('wall'), 'left-wall'],
  '&': [sprite('wall'), 'right-wall'],
})
const player= add([
  sprite('spaceship'),
  pos(width()/2,height()/4),
  origin('center')
])


keyDown('left',() =>{
  player.move(-MOVE_SPEED,0)
})
keyDown('right',() =>{
  player.move(MOVE_SPEED,0)
})

function spawnBullet(p){
  add([rect(6,18),
  pos(p),
  origin('center'),
  color(0.5,0.5,1),
  'bullet'])
}
keyPress('space',()=>{
spawnBullet(player.pos.add(0,-25))

})
const BULLET_SPEED=400
action('bullet',(b)=>{
  b.move(0,-BULLET_SPEED)
  if(b.pos.y<0){
    destroy(b)
  }
})
collides('bullet','spaceinvader',(b,s)=>{
  camShake(4)
  destroy(b)
  destroy(s)
  score.value++
  score.text=score.value
})

const score = add([
  text('0'),
  pos(50,50),
  layer('ui'),
  scale(3),
  {
    value: 0,
  }
])
const TIME_LEFT=30

  const timer= add([
    text('0'),
    pos(90,50),
    scale(2),
    layer('ui'),
    {
      time: TIME_LEFT,
    },
])


timer.action(() =>  {
  timer.time -= dt()
  timer.text=timer.time.toFixed(2)
  if(timer.time<=0) {
    go('lose',score.value)
  }
})
const INVADER_SPEED =100
let CURRENT_SPEED=INVADER_SPEED
const LEVEL_DOWN = 100
action('spaceinvader',(s)=>{
  s.move(CURRENT_SPEED,0)
})

collides('spaceinvader','right-wall',()=>{
CURRENT_SPEED= -INVADER_SPEED
every('spaceinvader',(s)=>{
  s.move(0,LEVEL_DOWN)
})
})
collides('spaceinvader','left-wall',()=>{
CURRENT_SPEED= INVADER_SPEED
every('spaceinvader',(s)=>{
  s.move(0,LEVEL_DOWN)
})
})

player.overlaps('spaceinvader',()=>{
  go('lose', {score:score.value})
})

action('spaceinvader',(s)=>{
  if(s.pos.y>=height()/2){
    go('lose', {score:score.value})
  }
})