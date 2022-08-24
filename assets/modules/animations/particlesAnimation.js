import Particle from '../gameObjectsAnimated/Particle.js';

export function stars(canvas, particles) {
    for (let i = 0; i < 100; i++) {
        particles.push(new Particle({
            position: {
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height
            },
            velocity: {
                x: 0,
                y: 0.3
            },
            radius: Math.random() * 2,
            color: 'white'
        }))                    
    } 
};

export function explosion({object, color, fades}, particles) {
    for (let i = 0; i < 15; i++) {
        particles.push(new Particle({
            position: {
                x: object.position.x + object.width / 2,
                y: object.position.y + object.height / 2
            },
            velocity: {
                x: (Math.random() - 0.5) * 2,
                y: (Math.random() - 0.5) * 2
            },
            radius: Math.random() * 3,
            color: color || 'green',
            fades: fades
        }))                    
    }
}

export default function particlesAnimation(canvas, canvasContext, particles) {
    particles.forEach((particle, index) => {
        //stars animation loop
        if(particle.position.y - particle.radius >= canvas.height) {
            particle.position.x = Math.random() * canvas.width
            particle.position.y = -particle.radius
        }

        //particles update/clean
        if (particle.opacity <= 0) {
            setTimeout(() => {
                particles.splice(index, 1)
            }, 0)        
        } else particle.update(canvasContext) 
    })
}