class GameOver extends Phaser.Scene {
    constructor() {
        super('GameOverscene');
    }

    init(data) {
        // Data passed from another scene includes the player's score

    }

    preload() {
        this.load.atlas('burgerAtlas', './assets/atlas/burgerAtlas.png', './assets/atlas/burgerAtlas.json');
    }

    create() {
        // Check for high score in local storage
        this.highScore = localStorage.getItem('highScore') ? parseInt(localStorage.getItem('highScore'), 10) : 0;
        if (this.playerScore > this.highScore) {
            this.highScore = this.playerScore;
            this.sys.game.registry.set('highScore', this.highScore);
            // newHighScore = true;
        }

        // Add Game Over text
        this.add.text(400, 200,this.game.score>1000? 'You are the Burger Boss':'You are a bad cook', {fontSize: '35px', fill: '#fff'})
            .setOrigin(0.5, 0.5);


        // Instructions to restart
        this.add.text(400, 450, 'Press "R" back to Menu', {fontSize: '24px', fill: '#fff'})
            .setOrigin(0.5, 0.5);

        // Display score
        this.add.text(400, 300, `score: ${this.game.score}`, {fontSize: '32px', fill: '#fff'}).setOrigin(0.5, 0.5);

        // Display burger
        this.add.image(380, 350, 'burger_0')

        // Display score
        this.add.text(400, 400, `You have cooked Burgers: ${this.game.cookedBurgers}`, {
            fontSize: '32px',
            fill: '#fff'
        }).setOrigin(0.5, 0.5);

        this.emitter = this.add.particles(100, 100, 'burgerAtlas', {
            frame: {frames: [], cycle: true},
            lifespan: 2000,
            speed: {min: 50, max: 50},
            scale: {start: 1.5, end: 0},
            gravityY: 150,
            blendMode: 'ADD',
            emitting: false
        });
        this.randomXY() ;
        this.emitter.explode(8);
        this.time.addEvent({
            delay: 2000,
            callback: () => { this.randomXY() ; this.emitter.explode(16);},
            callbackScope: this,
            loop: true
        });

        // Set up the "R" key to restart the game
        this.input.keyboard.on('keydown-R', () => {
            this.scene.start('menuScene'); // Assuming 'Menu' is the name of your menu scene
        });
    }

    randomXY() {
        // 100 - 700
        // 100 - 500
        let x = Math.floor(Math.random() * 401) + 100;
        let y = Math.floor(Math.random() * 401) + 100;
        this.emitter.x = x
        this.emitter.y = y
    }
}