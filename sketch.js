var flock = []
let alignSlider, cohesionSlider;


function setup() {
    let canvas = createCanvas(840, 460);
    canvas.position(10, 10);

    label = createDiv('alignment');
    label.position(10, 500);  
    alignSlider = createSlider(0, 3, 0.5, 0.1);
    alignSlider.parent(label);

    label = createDiv('cohesion');
    label.position(15, 530);  
    cohesionSlider = createSlider(0, 3, 0.5, 0.1);
    cohesionSlider.parent(label);

    label = createDiv('seperation');
    label.position(15, 560);  
    seperationSlider = createSlider(0, 3, 0.5, 0.1);
    seperationSlider.parent(label);

    label = createDiv('perception radius');
    label.position(15, 590);  
    perceptSlider = createSlider(0, 500, 50, 20);
    perceptSlider.parent(label);

    label = createDiv('speed');
    label.position(10, 620);  
    speedSlider = createSlider(0, 10, 6, 0.5);
    speedSlider.parent(label);


    for(let i=0;i<100;i++){
        flock.push(new Boid());
    }
}

function draw() {
    background(200);
    for(let boid of flock) {
        boid.show();
        boid.edges();
        boid.flocking(flock);
        boid.update();
    }
}