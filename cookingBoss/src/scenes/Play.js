class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
        this.survivalTime = 0;
    }



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
        this.load.image('cookingPanel', './assets/panel/cooking_panel.png')
        this.load.image('orderPanel', './assets/panel/order_panel.png')
        this.load.spritesheet('currentOrder', './assets/panel/current_order.png', {frameWidth: 120, frameHeight: 120})

        // burger
        this.load.image('burger_0', './assets/burger/burger_1.png')
        this.load.image('burger_1', './assets/burger/burger_2.png')
        this.load.image('burger_2', './assets/burger/burger_3.png')
        // 灶台
        this.load.image('stove', './assets/scene/stove.png');
        // 垃圾桶
        this.load.image('bin', './assets/scene/bin.png');

        // guest
        this.load.image('guest', './assets/npc/guest.png');


        // materials
        this.load.image('sauce_1', './assets/material/sauce_1.png')
        this.load.image('sauce_2', './assets/material/sauce_2.png')
        this.load.image('sauce_3', './assets/material/sauce_3.png')
        this.load.image('tomato', './assets/material/tomato2.png')
        this.load.image('vegetable', './assets/material/vegetable.png')
        this.load.image('meat', './assets/material/tomato2.png')

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

        // tomatoes
        this.tomatoes = this.add.image(300, 400, 'tomatoes')

        // bin
        this.bin = this.add.image(480, 410, 'bin')
        this.bin.setScale(0.4)

        // guest
        this.guests = this.add.image(550, 395, 'guest')

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
        // this.ladders = this.physics.add.group();
        // Make the player collide with the ground
        this.physics.add.collider(this.pixelPlayer, building);

        // Set up cursor keys for input
        this.cursors = this.input.keyboard.createCursorKeys();
        // this.pixelPlayer.setCollideWorldBounds(true);
        // this.physics.add.collider(this.pixelPlayer, building);

        // currentOrder
        // 面板相关
        this.cookingPanel = this.add.image(750, 100, 'cookingPanel')
        this.currentArrow = this.physics.add.sprite(100, 120, 'currentOrder')
        this.currentArrow.setScale(0.5)
        this.currentArrow.body.setAllowGravity(false);
        this.anims.create({
            key: 'arrowMove',
            frames: this.anims.generateFrameNumbers('arrowMove', {start: 0, end: 2}),
            frameRate: 10,// framerates
            repeat: -1
        });
        // orderPanel
        // this.anims.create({
        //     key: 'updateOrder',
        //     frames: this.anims.generateFrameNumbers('updateOrder', {start: 0, end: 2}),
        //     frameRate: 10,// framerates
        //     repeat: -1
        // });

        // 订单面板
        this.orderPanel1 = this.add.image(50, 50, 'orderPanel')
        this.orderPanel2 = this.add.image(120, 50, 'orderPanel')
        this.orderPanel3 = this.add.image(190, 50, 'orderPanel')
        this.orderPanel4 = this.add.image(260, 50, 'orderPanel')
        this.orderPanel1.setScale(0.5)
        this.orderPanel2.setScale(0.5)
        this.orderPanel3.setScale(0.5)
        this.orderPanel4.setScale(0.5)

        // 生成订单
        this.generateOrder()
        this.generateOrder()
        this.generateOrder()
        this.generateOrder()
    }

    order_position = [[50, 50], [120, 50], [190, 50], [260, 50]]

    generateOrder() {
        let randomNum = Math.floor(Math.random() * 3);  // [0,1,2]
        let burgerPanel = this.physics.add.sprite(50, 50, 'burger_' + randomNum)
        let order = {
            type: randomNum, // [0,1,2]
            loadMartial: 'burger_' + randomNum,
            burgerPanel: burgerPanel
        }
        burgerPanel.body.setAllowGravity(false);
        // this.orderList.shift()
        this.orderList.push(order)
        // 订单列表刷新
        this.orderList.forEach((or, index) => {
            try {
                or.burgerPanel.destroy()
                or.burgerPanel = this.physics.add.sprite(this.order_position[index][0], this.order_position[index][1], or.loadMartial)
                or.burgerPanel.body.setAllowGravity(false);
            } catch (e) {
                console.log('destroy order err')
            }

        })
        console.log(this.orderList)
    }

    // add material to cooking panel and render
    // sauce_1
    // sauce_2
    // sauce_3
    // tomato
    // vegetable
    cooking_position = [[750, 55], [750, 100], [750, 145]]

    addMaterial(material) {

        let index = this.cookingList.length
        if (this.cookingList.length == 3) {
            console.log('add material err') // todo: 可弹出提示
            return;
        }

        let tmp = {
            type: material,
            loadMartial: material,
            cookingPanel: this.physics.add.sprite(this.cooking_position[index][0], this.cooking_position[index][1], material)
        }
        tmp.cookingPanel.body.setAllowGravity(false)
        this.cookingList.push(tmp)

    }

    clearCookingList() {
        try {
            this.cookingList.forEach(m => {
                m.cookingPanel.destroy()
            })

            this.cookingList = []
        } catch (e) {
            console.error(e)
        }

    }

    panelAnime() {
        // this.currentArrow.anims.play('arrowMove',true)
    }

    finishOrder() {
        // this.burgerPanels.destroy()
        this.orderList.shift()

    }

    goToFarm() {
        this.scene.start('playFarm');

    }


    // 配料表
    // type 0: burger_1 = sauce_1 + tomato + vegetable
    // type 1: burger_2 = sauce_2 + tomato + vegetable
    // type 2: burger_3 = sauce_3 + tomato + vegetable
    checkCanFinish(){
       if(this.orderList[0].type == 0) {
           // 0:
           if(!this.cookingList.find(i=>i.type == 'sauce_1')){
               return false
           }
           if(!this.cookingList.find(i=>i.type == 'tomato')){
               return false
           }
           if(!this.cookingList.find(i=>i.type == 'vegetable')){
               console.log('finish type 1')
               return true
           }
       }else if(this.orderList[0].type == 1){
           // 1:
           if(!this.cookingList.find(i=>i.type == 'sauce_2')){
               return false
           }
           if(!this.cookingList.find(i=>i.type == 'tomato')){
               return false
           }
           if(!this.cookingList.find(i=>i.type == 'vegetable')){
               console.log('finish type 2')
               return true
           }
       }else {
           // 2:
           if(!this.cookingList.find(i=>i.type == 'sauce_3')){
               return false
           }
           if(!this.cookingList.find(i=>i.type == 'tomato')){
               return false
           }
           if(!this.cookingList.find(i=>i.type == 'vegetable')){
               console.log('finish type 3')
               return true
           }
       }


        return true
    }
    isInAreaStove = false
    pressingSpace = false
    cookingList = []
    orderList = []

    update() {
        // Player movement logic
        //console.log(this.ladderSpeed);

        this.panelAnime()

        // 在特定区域内的交互
        this.isInAreaStove = 380 < this.pixelPlayer.x && 422 > this.pixelPlayer.x && this.pixelPlayer.y > 400 && this.pixelPlayer.y < 500
        this.isInAreaTomatoes = 280 < this.pixelPlayer.x && 322 > this.pixelPlayer.x && this.pixelPlayer.y > 400 && this.pixelPlayer.y < 500
        this.isInAreaBin = 460 < this.pixelPlayer.x && 500 > this.pixelPlayer.x && this.pixelPlayer.y > 400 && this.pixelPlayer.y < 500
        this.isInFinishOrder = 510 < this.pixelPlayer.x && 580 > this.pixelPlayer.x && this.pixelPlayer.y > 400 && this.pixelPlayer.y < 500

        this.isInToFarm = 0 < this.pixelPlayer.x && 50 > this.pixelPlayer.x

        // this.burgerPanels.anims.play ('updateOrder',true)
        if (this.cursors.space.isDown) {

            // 只进行一次的交互
            if (!this.pressingSpace) {
                // console.log('pressingSpace11111')
                // todo: 1. choose material 2. add into cookingList

                // finish order
                if (this.isInFinishOrder) {
                    // todo : 判断 是否可以完成订单

                    if(this.checkCanFinish()){
                        this.finishOrder()
                        this.generateOrder()
                        this.clearCookingList()
                    }


                    this.pixelPlayer.anims.play('cooking', true);
                }

                // 添加番茄
                if (this.isInAreaTomatoes) {
                    this.pixelPlayer.anims.play('cooking', true);
                    this.addMaterial('tomato')

                }

                // 垃圾桶
                if (this.isInAreaBin) {
                    this.pixelPlayer.anims.play('cooking', true);
                    this.clearCookingList()
                }
            }

            // -- 灶台持续交互
            if (this.isInAreaStove) {
                this.pixelPlayer.anims.play('cooking', true);
            }

            this.pressingSpace = true
        } else {
            this.pressingSpace = false
            this.pixelPlayer.anims.play('run', true);
        }

        // 区域进入 交互
        if(this.isInToFarm ){
            this.goToFarm()
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

