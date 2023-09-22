const PI2 = Math.PI *2
const random = (min, max) =>Math.random() * (max - min + 1) + min | 0
const timestamp = _ => new Date().getTime()

// container

class Birthday {
    constructor(){
        this.resize()

        this.fireworks = []
        this.counter = 0
    }

    resize() {
        this.width = canvas.width = window.innerWidth
        let center = this.width / 2 | 0
        this.spawnA = center - center / 4 | 0
        this.spawnB = center + center / 4 | 0

        this.height = canvas.height = window.innerHeight
        this.spawnc = this.height * .1
        this.spawnD = this.height * .5



    }
    onclick(evt){
        let x = evt.clientX || evt.touches && evt.touches[0].pageX
        let y = evt.clientY || evt.touches && evt.touches[0].pageY

        let count = random(3,5)
        for(let i = 0; i <  count; i++) this.fireworks.push(new Firework(random(this.spawnA,this.spawnB),
        this.height,
        x,
        y,
        random(0, 260),
        random(30, 110)))
        this.counter = -1


    }
    update(delta){
        ctx.globalCompositeOperation = 'hard-light'
        ctx.fillStyle = `rgba(20,20,20,${ 7 * delta })`
        ctx.fillRect(0, 0, this.width, this.height)
    
        ctx.globalCompositeOperation = 'lighter'
        for(let firework of this.fireworks) firework.update(delta)
    
        this.counter += delta * 3
        if(this.counter >=1){
            this.fireworks.push(new Firework(
                random(this.spawnA, this.spawnB),
                this.height,
                random(0, this.width),
                random(this.spawnc, this.spawnD),
                random(0, 360),
                random(30, 110)))
                this.counter = 0

                
    }
    
    
    
    
    // removed 
    if(this.fireworks.length > 1000) this.fireworks = this.fireworks.filter(firework => !firework.dead)
   
}


}
class Firework{
    constructor(x, y, targetX, targetY, shade, offsprings){
        this.dead = false
        this.offsprings = offsprings

        this.x = x
        this.y = y
        this.targetX = targetX
        this.targetY = targetY

        this.shade = shade
        this.history =[]
    }
    update(delta){
        if(this.dead) return

        let xDiff = this.targetX - this.x
        let yDiff = this.targetY - this.y

        
        
    }
    
}



    let canvas = document.getElementById('birthday')
    let ctx = canvas.getContext('2d')    

    let then = timestamp()
    
    let birthday = new Birthday
    window.onresize = ()=> birthday.resize()
    document.onclick = evt => birthday.onclick(evt)
    document.ontouchstart = evt => birthday.onclick(evt);

    (function loop(){
        requestAnimationFrame(loop)
        
        let now = timestamp()
        let delta = now - then

        then = now
        birthday.update(delta /1000)
    })()