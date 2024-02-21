class Boid {
    constructor() {
        this.position = createVector(random(width), random(height));
        this.velocity = p5.Vector.random2D();
        this.velocity.setMag(random(2, 4));
        this.acceleration = createVector();
        this.buffer = 3;
        this.maxForce = 2;
        this.maxSpeed = 5;        
    }

    update() {
        let maxSpeed = speedSlider.value();
        this.position.add(this.velocity);
        this.velocity.add(this.acceleration);
        this.velocity.limit(maxSpeed)
        this.acceleration.mult(0);
    }

    flocking(flock) {
        let align = this.alignment(flock);
        let cohesion = this.cohesion(flock);
        let seperation = this.seperation(flock);

        align.mult(alignSlider.value());
        cohesion.mult(cohesionSlider.value());
        seperation.mult(seperationSlider.value());

        this.acceleration.add(align);
        this.acceleration.add(cohesion);
        this.acceleration.add(seperation);
    }

    alignment(flock) {
        // get average velocities of all boids around this boids perception radius
        let perceptRad = perceptSlider.value();
        let maxSpeed = speedSlider.value();
        let sumVelocities = createVector();
        let len = 0;
        for(let boid of flock) {
            let d = dist(this.position.x, this.position.y, boid.position.x, boid.position.y);
            if(boid != this && d < perceptRad){
                sumVelocities.add(boid.velocity);
                len++;
            }
        }
        if(len > 0) {
            sumVelocities.div(len);
            sumVelocities.setMag(maxSpeed);
            sumVelocities.sub(this.velocity);
            sumVelocities.limit(this.maxForce);
        }
        return sumVelocities;
    }

    cohesion(flock) {
        let perceptRad = perceptSlider.value();
        let maxSpeed = speedSlider.value();
        let sumPositions = createVector();
        let len = 0;
        for(let boid of flock) {
            let d = dist(this.position.x, this.position.y, boid.position.x, boid.position.y);
            if(boid != this && d < perceptRad){
                sumPositions.add(boid.position);
                len++;
            }
        }
        if(len > 0) {
            sumPositions.div(len);
            sumPositions.sub(this.position);
            sumPositions.setMag(maxSpeed);
            sumPositions.sub(this.velocity);
            sumPositions.limit(this.maxForce);
        }
        return sumPositions;
    }

    seperation(flock) {
        let perceptRad = perceptSlider.value();
        let maxSpeed = speedSlider.value();
        let sumPositions = createVector();
        let len = 0;
        for (let boid of flock) {
            let d = dist(this.position.x, this.position.y, boid.position.x, boid.position.y);
            if (boid !== this && d < perceptRad) {
                let diff = p5.Vector.sub(this.position, boid.position);
                diff.div(d); // Incorrect, should be diff.normalize();
                sumPositions.add(diff);
                len++;
            }
        }
        if (len > 0) {
            sumPositions.div(len);
        }
        if (sumPositions.mag() > 0) {
            sumPositions.normalize();
            sumPositions.setMag(maxSpeed);
            sumPositions.sub(this.velocity);
            sumPositions.limit(this.maxForce);
        }
        return sumPositions;
    }

    edges() {
        if (this.position.x < -this.buffer) this.position.x = width + this.buffer;
        if (this.position.y < -this.buffer) this.position.y = height + this.buffer;
        if (this.position.x > width + this.buffer) this.position.x = -this.buffer;
        if (this.position.y > height + this.buffer) this.position.y = -this.buffer;
    }

    show() {
        strokeWeight(10);
        // stroke(255);
        point(this.position.x, this.position.y);
        line(this.position.x, this.position.y, this.position.x + this.velocity.x*3, this.position.y+ this.velocity.y*3); // tail
    }
}