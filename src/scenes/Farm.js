class Farm extends Phaser.Scene {
    constructor() {
        super('playFarm');
    }

    preload() {

        // this.load.spritesheet('player', './assets/PlayerRunning.png', { frameWidth: 32, frameHeight: 64 });
        // // Load an image asset to represent the ground

        this.load.spritesheet('cow', './assets/npc/cow.png', {frameWidth: 60, frameHeight: 60});
        this.load.image('platForm', './assets/scene/platform.png')
        this.load.image('platForm_long', './assets/scene/platForm_long.png')
        this.load.spritesheet('attack', './assets/player/attack.png',{frameWidth: 50, frameHeight: 46})
    }

    create() {
        let background = this.add.image(400, 300, 'background')
        background.setScale(1.5)


        const ground = this.physics.add.staticGroup();
        ground.create(400, 600, 'platForm').setScale(8).refreshBody();
        ground.create(120, 450, 'platForm_long').setScale(1).refreshBody();
        ground.create(360, 320, 'platForm_long').setScale(1).refreshBody();

        this.pixelPlayer = this.physics.add.sprite(600, 400, 'player');
        this.pixelPlayer.setCollideWorldBounds(true);
        this.physics.add.collider(this.pixelPlayer, ground);

        this.cursors = this.input.keyboard.createCursorKeys();
        // ground.create(400, 700, 'platForm').setScale(1).refreshBody();
        this.anims.create({
            key: 'attack',
            frames: this.anims.generateFrameNumbers('attack', {start: 0, end: 4}),
            frameRate: 10,// framerates
            repeat: -1
        });

        this.anims.create({
            key: 'cow_stand',
            frames: this.anims.generateFrameNumbers('cow', {start: 0, end: 3}),
            frameRate: 3,// framerates
            repeat: -1
        });
        this.cow = this.physics.add.sprite(400, 250, 'cow');
        this.cow.setScale(1.5)
        this.cow.setCollideWorldBounds(true);
        this.physics.add.collider(this.cow, ground);

        this.meat = this.add.image(50, 50, 'meat')
        this.meat.setScale(1.8)
        this.meatNumText = this.add.text(120, 50, `X ${this.game.meatNum}`, {
            fontSize: '32px',
            fill: '#e07438',
            strokeThickness: 6,
            zIndex: 1000
        }).setOrigin(0.5);
    }

    meatNum = 0
    meatNumText

    showMeatNum() {
        // console.log(this.meatNum)
        this.meatNumText.text = `X ${this.game.meatNum}`

    }


    pressingSpace = false

    update() {


        this.isInToFarm = 750 < this.pixelPlayer.x && 800 > this.pixelPlayer.x

        //
        this.cow.anims.play('cow_stand', true);
        // Player controls
        if (this.cursors.left.isDown) {
            this.pixelPlayer.setVelocityX(-160);
            this.pixelPlayer.flipX = true; // Flip the sprite to the left
        } else if (this.cursors.right.isDown) {
            this.pixelPlayer.setVelocityX(160);
            this.pixelPlayer.anims.play('run', true);

            this.pixelPlayer.flipX = false; // Use the original sprite orientation
        } else {
            this.pixelPlayer.setVelocityX(0);
            // If you have a 'stand' animation, you could switch to it here
            // this.pixelPlayer.anims.play('stand');
        }

        if (this.cursors.up.isDown && this.pixelPlayer.body.touching.down) {
            this.pixelPlayer.setVelocityY(-300);
        }

        if (this.isInToFarm) {
            this.scene.start('playScene');
        }

        // space controls
        this.isInAreaCow = 300 < this.pixelPlayer.x && 431 > this.pixelPlayer.x && this.pixelPlayer.y > 240 && this.pixelPlayer.y < 300
        if (this.cursors.space.isDown) {


            // 只进行一次的交互
            if (!this.pressingSpace) {

                // console.log('player x y ', this.pixelPlayer.x, this.pixelPlayer.y)
                // cow
                if (this.isInAreaCow) {
                    console.log('add meat')
                    this.pixelPlayer.anims.play('cooking', true);
                    this.meatNum = this.meatNum + 1
                }
            }

            // // -- 灶台持续交互
            // if (this.isInAreaStove) {
            //     this.pixelPlayer.anims.play('cooking', true);
            // }

            this.pressingSpace = true
        } else {
            this.pressingSpace = false
            this.pixelPlayer.anims.play('run', true);
        }

        // 数据展示

        this.showMeatNum()

    }

    updateCountdown() {
        console.log('this.game.survivalTime',this.game.survivalTime)
        // Check the survival time > 0
        if (this.game.survivalTime >= 0) {
            this.game.survivalTime -= 1; // Increment the survival time by 1 second
            this.timerText.text = 'Countdown:'+this.game.survivalTime
        } else {
            // Game over
            this.game.GameOver = true;
            this.releaseScenes()
            this.time.delayedCall(1000, () => {
                this.scene.start('GameOverscene'); // Replace 'gameOverScene' with your actual game over scene key
            }, [], this);
        }
    }
    releaseScenes(){

    }

}