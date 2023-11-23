class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
        this.survivalTime = 0;
    }

    // some settings:
    materials = [1, 2, 3, 4]  // 初步4种材料
    orderList = [] // 订单-最多四个 ，后续可能再添加

    preload() {

        this.load.spritesheet('player', './assets/player/common.png', {frameWidth: 50, frameHeight: 44});
        this.load.spritesheet('cooking', './assets/player/cooking.png', {frameWidth: 50, frameHeight: 44});
        // // Load an image asset to represent the ground
        // this.load.image('kitchen_bg', './assets/kitchin.png');
        // this.load.spritesheet('pot_front', './assets/menu_bg.png',{frameWidth:100,frameHeight:100});


        this.load.image('background', './assets/scene/total_scene.png')
        this.load.image('tomatoes', './assets/scene/tomatoes.png')
        this.load.image('building1', './assets/scene/building1.png');
        this.load.image('building2', './assets/scene/building2.png');
        this.load.image('building3', './assets/scene/building3.png');
        this.load.image('building4', './assets/scene/building4.png');
        this.load.image('building5', './assets/scene/building5.png');

        // panel
        this.load.image('cookingPanel','./assets/panel/cooking_panel.png')
        this.load.image('orderPanel','./assets/panel/order_panel.png')


        // burger
        this.load.image('burger_1','./assets/burger/burger_1.png')
        this.load.image('burger_2','./assets/burger/burger_2.png')
        this.load.image('burger_3','./assets/burger/burger_3.png')
        // 灶台
        this.load.image('stove', './assets/scene/stove.png');
        // 垃圾桶
        this.load.image('bin', './assets/scene/bin.png');

    }

    create() {
        // let scene =  this.add.sprite(400, 300, 'kitchen_bg')
        let background = this.add.image(400, 300, 'background')
        background.setScale(1.5)
        // scene 场景刚体
        const building = this.physics.add.staticGroup();
        building.create(60, 575, 'building1').setScale(1.5).refreshBody();
        building.create(196, 562, 'building2').setScale(1.5).refreshBody();
        building.create(435, 525, 'building3').setScale(2).refreshBody();
        building.create(688, 563, 'building4').setScale(1.5).refreshBody();
        building.create(765, 535, 'building5').setScale(1.5).refreshBody();
        // building.refreshBody();


        // 交互物品
        // stove
        this.stove = this.add.image(400, 410, 'stove')
        this.tomatoes = this.add.image(300, 400, 'tomatoes')
        this. bin =this.add.image(480, 410, 'bin')
        this. bin.setScale(0.4)
        // player 相关
        this.anims.create({
            key: 'run',
            frames: this.anims.generateFrameNumbers('player', {start: 0, end: 2}),
            frameRate: 10,// framerates
            repeat: -1
        });
        this.anims.create({
            key: 'cooking',
            frames: this.anims.generateFrameNumbers('cooking', {start: 0, end: 6}),
            frameRate: 10,// framerates
            repeat: -1
        });

        // Create the player sprite and set physics properties
        this.pixelPlayer = this.physics.add.sprite(100, 400, 'player');
        this.pixelPlayer.setCollideWorldBounds(true);
        this.ladders = this.physics.add.group();
        // Make the player collide with the ground
        this.physics.add.collider(this.pixelPlayer, building);

        // Set up cursor keys for input
        this.cursors = this.input.keyboard.createCursorKeys();
        this.pixelPlayer.setCollideWorldBounds(true);
        this.physics.add.collider(this.pixelPlayer, building);


        // 面板相关
        this.cookingPanel = this.add.image(750, 100, 'cookingPanel')

        // 订单面板
        this.orderPanel1 = this.add.image(50, 50, 'orderPanel')
        this.orderPanel2 = this.add.image(120, 50, 'orderPanel')
        this.orderPanel3 = this.add.image(190, 50, 'orderPanel')
        this.orderPanel4 = this.add.image(260, 50, 'orderPanel')
        this.orderPanel1.setScale(0.5)
        this.orderPanel2.setScale(0.5)
        this.orderPanel3.setScale(0.5)
        this.orderPanel4.setScale(0.5)
    }

    generateOrder(){
        let randomNum = 1
        let order = {
            type:randomNum, // 1 2 3 4
            loadMartial:'burger_' + randomNum
        }
        this.orderList.push(order)
    }

    addMaterial(){

    }
    finishOrder() {

    }
    isInAreaStove = false
    pressingSpace = false
    cookingList = []
    orderList = []
    update() {
        // Player movement logic
        //console.log(this.ladderSpeed);

        // 在特定区域内的交互
        this.isInAreaStove = 380 < this.pixelPlayer.x &&  422 > this.pixelPlayer.x && this.pixelPlayer.y > 400 && this.pixelPlayer.y < 500
        this.isInAreaTomatoes = 280 < this.pixelPlayer.x &&  322 > this.pixelPlayer.x && this.pixelPlayer.y > 400 && this.pixelPlayer.y < 500
        this.isInAreaBin = 460 < this.pixelPlayer.x &&  500 > this.pixelPlayer.x && this.pixelPlayer.y > 400 && this.pixelPlayer.y < 500
        if ( this.cursors.space.isDown) {

            // 只进行一次的交互
            if(!this.pressingSpace) {
                // console.log('pressingSpace11111')
                // todo: 1. choose material 2. add into cookingList

                // 添加番茄
                if( this.isInAreaTomatoes) {
                    this.pixelPlayer.anims.play('cooking', true);
                    this.cookingList.push('tomato')
                }

                // 垃圾桶
                if( this.isInAreaBin) {
                    this.pixelPlayer.anims.play('cooking', true);
                    this.cookingList = []
                }
            }

            // -- 灶台持续交互
            if(this.isInAreaStove ) {
                this.pixelPlayer.anims.play('cooking', true);
            }

            this.pressingSpace = true
        }else {
            this.pressingSpace = false
        }




        //



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


    }

    updateCountdown() {

        // this.survivalTime += 1; // Increment the survival time by 1 second
        // let highScore = localStorage.getItem('highScore') ? parseInt(localStorage.getItem('highScore'), 10) : 0;
        // sessionStorage.setItem('survivalTime',this.survivalTime)
        // // Update the timer text to reflect the new survival time
        // this.timerText.setText('Survived: ' + this.survivalTime + 's');
        //
        // // Check if the current survival time is greater than the high score
        // if (this.survivalTime > highScore) {
        //     console.log(this.survivalTime,highScore);
        //     localStorage.setItem('highScore', this.survivalTime.toString()); // Store the new high score
        // }
    }


    created_arr = []
    level = 1


    checkGameOver(player, ladder) {
        // Stop all movements
        this.physics.pause();
        player.setTint(0xff0000); // Optionally tint the player red to indicate damage

        // Stop the player's animations
        player.anims.stop();
        this.GameOver = true;
        // Transition to the Game Over scene after a short delay
        this.time.delayedCall(1000, () => {
            this.scene.start('GameOverscene'); // Replace 'gameOverScene' with your actual game over scene key
        }, [], this);
    }


}

