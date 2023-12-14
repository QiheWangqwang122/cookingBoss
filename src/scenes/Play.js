class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
        this.survivalTime = 0;
    }


    preload() {
        // preload sounds
        this.load.audio('bgm', './assets/sound/bgm.m4a');
        this.load.audio('cook_meat', './assets/sound/cook_meat.wav');
        this.load.audio('submit_burger', './assets/sound/submit_burger.mp3');
        this.load.audio('take_item', './assets/sound/take_item.wav');

        //  preload images
        this.load.spritesheet('player', './assets/player/common.png', {frameWidth: 50, frameHeight: 44});
        this.load.spritesheet('cooking', './assets/player/cooking.png', {frameWidth: 50, frameHeight: 44});
        // // Load an image asset to represent the ground
        // this.load.image('kitchen_bg', './assets/kitchin.png');
        // this.load.spritesheet('pot_front', './assets/menu_bg.png',{frameWidth:100,frameHeight:100});

        this.load.image('kitchen_car', './assets/scene/kitchen_car.png')
        this.load.image('background', './assets/scene/total_scene.png')
        this.load.image('tomatoes', './assets/scene/tomatoes.png')
        this.load.image('vegetables', './assets/scene/vegetables.png')
        this.load.image('purple_vegetables', './assets/material/purple_vegetables.png')
        this.load.image('building1', './assets/scene/building1.png');
        this.load.image('building2', './assets/scene/building2.png');
        this.load.image('building3', './assets/scene/building3.png');
        this.load.image('building4', './assets/scene/building4.png');
        this.load.image('building5', './assets/scene/building5.png');
        this.load.image('left_scene', './assets/scene/left_scene.png');
        this.load.image('shop', './assets/scene/SHOP.png')

        // panel
        this.load.image('cookingPanel', './assets/panel/cooking_panel.png')
        this.load.image('orderPanel', './assets/panel/order_panel.png')
        this.load.spritesheet('currentOrder', './assets/panel/current_order.png', {frameWidth: 120, frameHeight: 120})
        this.load.image('burgerMenu', './assets/panel/burger_menu.png')

        // burger
        this.load.image('burger_0', './assets/burger/burger_1.png')
        this.load.image('burger_1', './assets/burger/burger_2.png')
        this.load.image('burger_2', './assets/burger/burger_3.png')

        // stove
        this.load.image('stove', './assets/scene/stove.png');

        // bin
        this.load.image('bin', './assets/scene/bin.png');

        // guest
        this.load.image('guest', './assets/npc/guest.png');

        // tips
        this.load.image('tips', './assets/scene/tips.png');

        // materials
        this.load.image('sauce_1', './assets/material/sauce_1.png')
        this.load.image('sauce_2', './assets/material/sauce_2.png')
        this.load.image('sauce_3', './assets/material/sauce_3.png')
        this.load.image('tomato', './assets/material/tomato2.png')
        this.load.image('vegetable', './assets/material/vegetable.png')
        this.load.image('meat', './assets/material/meat.png')
        this.load.image('purple_vegetable', './assets/material/purple_vegetable.png')

        this.load.image('sauce_1_down', './assets/material/sauce_1_down.png')
        this.load.image('sauce_3_down', './assets/material/sauce_3_down.png')
        this.load.atlas('scoreAtlas', './assets/atlas/scoreAtlas.png', './assets/atlas/scoreAtlas.json');
    }

    create() {

        // let scene =  this.add.sprite(400, 300, 'kitchen_bg')
        let background = this.add.image(400, 300, 'background')
        background.setScale(1.5)

        this.left_scene = this.add.image(50, 505, 'left_scene')
        this.tips = this.add.image(700, 385, 'tips')

        // scene physic item
        const building = this.physics.add.staticGroup();
        building.create(60, 575, 'building1').setScale(1.5).refreshBody();
        building.create(196, 562, 'building2').setScale(1.5).refreshBody();
        building.create(435, 525, 'building3').setScale(2).refreshBody();
        // building.create(688, 563, 'building4').setScale(1.5).refreshBody();
        building.create(735, 580, 'building5').setScale(3.5).refreshBody();
        // building.refreshBody();
        this.kitchen_car = this.add.image(420, 310, 'kitchen_car')

        // atlas effect used for add score
       this.emitter = this.add.particles(100, 100, 'scoreAtlas', {
            frame: { frames: ['scoreAtlas-2.png', 'scoreAtlas-0.png', 'scoreAtlas-1.png'], cycle: true },
            lifespan: 3000,
            speed: {min: 50, max: 50},
            scale: {start: 0.8, end: 0},
            gravityY: 0,
            blendMode: 'ADD',
            emitting: false
        });

        // used for test explode effect
        // this.input.on('pointerdown', pointer => {
        //     this. emitter.explode(16);
        // });


        // action items (area)
        // stove
        this.stove = this.add.image(400, 410, 'stove')

        this.sauce_1_down = this.add.image(380, 350, 'sauce_1_down')
        this.sauce_3_down = this.add.image(420, 350, 'sauce_3_down')
        // tomatoes / vegetables
        this.tomatoes = this.add.image(300, 400, 'tomatoes')
        this.vegetables = this.add.image(250, 400, 'vegetables')
        this.purple_vegetables = this.add.image(350, 400, 'purple_vegetables')


        // bin
        this.bin = this.add.image(480, 410, 'bin')
        this.bin.setScale(0.4)

        // guest
        // this.guests = this.add.image(550, 395, 'guest')

        // shop
        // this.shop = this.add.image(700, 385, 'shop')


        // player  amine / control
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
        this.pixelPlayer = this.physics.add.sprite(100, 400, 'player');  // make player physical
        this.pixelPlayer.setCollideWorldBounds(true); // world bound limit
        // this.ladders = this.physics.add.group();
        // Make the player collide with the ground
        this.physics.add.collider(this.pixelPlayer, building); // binding physic player with scene (ground)

        // Set up cursor keys for input
        this.cursors = this.input.keyboard.createCursorKeys();
        // this.pixelPlayer.setCollideWorldBounds(true);
        // this.physics.add.collider(this.pixelPlayer, building);


        // adjust scene and material position / scale
        // currentOrder
        // panels
        this.cookingPanel = this.add.image(750, 100, 'cookingPanel')

        this.meat = this.add.image(580, 50, 'meat')
        this.meat.setScale(1.8)
        this.meatNumText = this.add.text(650, 50, `X ${this.game.meatNum}`, {
            fontSize: '32px',
            fill: '#e07438',
            strokeThickness: 6,
            zIndex: 1000
        }).setOrigin(0.5);
        this.sauce_1 = this.add.image(580, 100, 'sauce_1')
        this.sauce_1.setScale(1)
        this.sauce_1NumText = this.add.text(650, 105, `X ${this.game.sauce_1_num}`, {
            fontSize: '32px',
            fill: '#e07438',
            strokeThickness: 6,
            zIndex: 1000
        }).setOrigin(0.5);

        this.sauce_3 = this.add.image(576, 155, 'sauce_3')
        this.sauce_3.setScale(1)
        this.sauce_3NumText = this.add.text(650, 160, `X ${this.game.sauce_3_num}`, {
            fontSize: '32px',
            fill: '#e07438',
            strokeThickness: 6,
            zIndex: 1000
        }).setOrigin(0.5);
        // order panel
        this.orderPanel1 = this.add.image(50, 50, 'orderPanel')
        this.orderPanel2 = this.add.image(120, 50, 'orderPanel')
        this.orderPanel3 = this.add.image(190, 50, 'orderPanel')
        this.orderPanel4 = this.add.image(260, 50, 'orderPanel')
        this.orderPanel1.setScale(0.5)
        this.orderPanel2.setScale(0.5)
        this.orderPanel3.setScale(0.5)
        this.orderPanel4.setScale(0.5)

        // score
        this.score = this.add.text(400, 50, `SCORE : ${this.game.score}`, {
            fontSize: '24px',
            fill: '#e07438',
            strokeThickness: 6,
            zIndex: 1000
        }).setOrigin(0.5);
        this.cooking_line = this.add.text(0, 0, '', {
            fontSize: '16px',
            fill: '#1d8600',
            strokeThickness: 5,
            zIndex: 1000
        }).setOrigin(1);
        // generateOrder
        if (this.orderList.length != 4) {
            this.generateOrder()
            this.generateOrder()
            this.generateOrder()
            this.generateOrder()
        }
        // try refresh cooking list and order list, when go into this scene second time
        this.refreshShowCookingList()
        this.refreshShowOrderList()


        //===============GameOverEvent==============
        this.timerText = this.add.text(16, this.sys.game.config.height / 5, 'Countdown:' + this.game.survivalTime, {
            fontSize: '32px',
            fill: '#fff'
        });
        this.time.addEvent({
            delay: 1000,
            callback: this.updateCountdown,
            callbackScope: this,
            loop: true
        });
    }

    // order position adjust
    order_position = [[50, 50], [120, 50], [190, 50], [260, 50]]

    // random generate order
    generateOrder() {
        let randomNum = Math.floor(Math.random() * 3);  // [0,1,2]
        let burgerPanel = this.physics.add.sprite(50, 50, 'burger_' + randomNum)
        let order = {
            type: randomNum, // [0,1,2]
            loadMartial: 'burger_' + randomNum,
            burgerPanel: burgerPanel
        }
        burgerPanel.body.setAllowGravity(false);
        this.orderList.push(order)


        // refresh order list when finished
        this.orderList.forEach((or, index) => {
            try {
                or.burgerPanel.destroy()
                or.burgerPanel = this.physics.add.sprite(this.order_position[index][0], this.order_position[index][1], or.loadMartial)
                or.burgerPanel.body.setAllowGravity(false);
            } catch (e) {
                // in fact, it won't happen. but i worried about it.
                console.warn('destroy order fail')
            }
        })

    }

    // add material to cooking panel and render
    // materials in used:
    // sauce_1
    // sauce_2
    // sauce_3
    // tomato
    // vegetable
    // purple_vegetable
    // meat

    // image position for cooking panel
    cooking_position = [[750, 55], [750, 100], [750, 145]]

    addMaterial(material) {

        let index = this.cookingList.length
        if (this.cookingList.length == 3) {
            this.showNotice('cooking list is full !')  // add material fail warning
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

    refreshShowCookingList() {
        this.cookingList.forEach((i, index) => {
            try {
                i.cookingPanel.destroy()
                i.cookingPanel = this.physics.add.sprite(this.cooking_position[index][0], this.cooking_position[index][1], i.type)
                i.cookingPanel.body.setAllowGravity(false)
            } catch (e) {
                console.log('destroy order warn')
            }

        })
    }

    refreshShowOrderList() {
        this.orderList.forEach((or, index) => {
            try {
                or.burgerPanel.destroy()
                or.burgerPanel = this.physics.add.sprite(this.order_position[index][0], this.order_position[index][1], or.loadMartial)
                or.burgerPanel.body.setAllowGravity(false);
            } catch (e) {
                console.log('destroy order warn')
            }

        })
    }

    // when cook meat, limit condition is: meatNum>0 , cooking panel used <3.
    cookMeat() {
        if (this.game.meatNum > 0 && this.cookingList.length < 3) {
            this.game.meatNum--
            this.addMaterial('meat')
            this.sound.play('cook_meat')
            this.showNotice('cook meat successful!')
        } else {
            this.showNotice('cannot add meat')
        }
    }

    useSauce1() {
        if (this.game.sauce_1_num > 0 && this.cookingList.length < 3) {
            this.game.sauce_1_num--
            this.sauce_1NumText
            this.addMaterial('sauce_1')
        } else {
            this.showNotice('cannot add sauce')
        }
    }

    // useSauce2() {
    //     if (this.game.sauce_2_num > 0 && this.cookingList.length < 3) {
    //         this.game.sauce_2_num--
    //         this.addMaterial('sauce_2')
    //     } else {
    //         this.showNotice('cannot add sauce')
    //     }
    // }

    useSauce3() {
        if (this.game.sauce_3_num > 0 && this.cookingList.length < 3) {
            this.game.sauce_3_num--
            this.addMaterial('sauce_3')
        } else {
            this.showNotice('cannot add sauce')
        }
    }

    showMaterialNum() {
        // console.log(this.meatNum)
        this.meatNumText.text = `X ${this.game.meatNum}`
        this.sauce_1NumText.text = `X ${this.game.sauce_1_num}`
        this.sauce_3NumText.text = `X ${this.game.sauce_3_num}`
        this.score.text = `SCORE : ${this.game.score}`
    }

    // when throw all material to bin
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
        this.addTime(20)
        this.addScore(100)
        this.game.cookedBurgers +=1
    }

    goToFarm() {
        this.scene.start('playFarm');
    }


    // 配料表
    // type 0: burger_1 = sauce_1 + purple_vegetable + meat
    // type 1: burger_2 = meat + tomato + vegetable
    // type 2: burger_3 = sauce_3 + tomato + purple_vegetable
    checkCanFinish() {
        if (this.orderList[0].type == 0) {
            // 0:
            if (!this.cookingList.find(i => i.type == 'sauce_1')) {
                return false
            }
            if (!this.cookingList.find(i => i.type == 'purple_vegetable')) {
                return false
            }
            if (this.cookingList.find(i => i.type == 'meat')) {
                // console.log('finish type 1')
                return true
            }
        } else if (this.orderList[0].type == 1) {
            // 1:
            if (!this.cookingList.find(i => i.type == 'tomato')) {
                return false
            }
            if (!this.cookingList.find(i => i.type == 'vegetable')) {
                return false
            }
            if (this.cookingList.find(i => i.type == 'meat')) {
                // console.log('finish type 2')
                return true
            }
        } else {
            // 2:
            if (!this.cookingList.find(i => i.type == 'sauce_3')) {
                return false
            }
            if (!this.cookingList.find(i => i.type == 'meat')) {
                return false
            }
            if (this.cookingList.find(i => i.type == 'purple_vegetable')) {
                // console.log('finish type 3')
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
        // refresh panel
        this.panelAnime()

        // Judge that the character is in an area or not. If true ,action can be done.
        this.isInAreaStove = 380 < this.pixelPlayer.x && 422 > this.pixelPlayer.x && this.pixelPlayer.y > 400 && this.pixelPlayer.y < 500
        this.isInAreaTomatoes = 280 < this.pixelPlayer.x && 322 > this.pixelPlayer.x && this.pixelPlayer.y > 400 && this.pixelPlayer.y < 500
        this.isInAreaVegetables = 230 < this.pixelPlayer.x && 272 > this.pixelPlayer.x && this.pixelPlayer.y > 400 && this.pixelPlayer.y < 500
        this.isInAreaPurpleVegetables = 350 < this.pixelPlayer.x && 372 > this.pixelPlayer.x && this.pixelPlayer.y > 400 && this.pixelPlayer.y < 500
        this.isInAreaBin = 460 < this.pixelPlayer.x && 500 > this.pixelPlayer.x && this.pixelPlayer.y > 400 && this.pixelPlayer.y < 500
        this.isInFinishOrder = 510 < this.pixelPlayer.x && 580 > this.pixelPlayer.x && this.pixelPlayer.y > 400 && this.pixelPlayer.y < 500
        this.isInAreaTips = 680 < this.pixelPlayer.x && 720 > this.pixelPlayer.x && this.pixelPlayer.y > 300 && this.pixelPlayer.y < 450
        this.isInAreaSauce1 = 360 < this.pixelPlayer.x && 390 > this.pixelPlayer.x && this.pixelPlayer.y > 300 && this.pixelPlayer.y < 350
        this.isInAreaSauce3 = 400 < this.pixelPlayer.x && 440 > this.pixelPlayer.x && this.pixelPlayer.y > 300 && this.pixelPlayer.y < 400
        this.isInToFarm = 0 < this.pixelPlayer.x && 50 > this.pixelPlayer.x

        // input space action
        if (this.cursors.space.isDown) {

            // the action which play just once
            if (!this.pressingSpace) {

               // take object sound
                // check finish order
                if (this.isInFinishOrder) {
                    // finish order
                    if (this.checkCanFinish()) {
                        this.finishOrder()
                        this.generateOrder()
                        this.clearCookingList()
                        this.sound.play('submit_burger')
                    } else {
                        this.showNotice("He doesn't like this burger!")
                    }


                    this.pixelPlayer.anims.play('cooking', true);
                }else {
                    this.sound.play('take_item')
                }

                // add tomato to cooking list
                if (this.isInAreaTomatoes) {
                    this.pixelPlayer.anims.play('cooking', true);  // cooking animation
                    this.animeCooking(5, _ => this.addMaterial('tomato')) // cooking need 5s ,then add material
                }

                // add vegetable to cooking list
                if (this.isInAreaVegetables) {
                    this.pixelPlayer.anims.play('cooking', true);
                    this.animeCooking(5, _ => this.addMaterial('vegetable'))
                }
                if (this.isInAreaPurpleVegetables) {
                    this.pixelPlayer.anims.play('cooking', true);

                    this.animeCooking(5, _ => this.addMaterial('purple_vegetable'))
                }

                // bin: throw all material in cooking list
                if (this.isInAreaBin) {
                    this.pixelPlayer.anims.play('cooking', true);
                    if (this.game.score > 30) {
                        this.addScore(-30)   //  punishment for throw material away  -- score
                    }
                    if( this.game.survivalTime >10){
                        this.addTime(-10)  //  punishment for throw material away -- survive time
                    }
                    this.clearCookingList()
                }

                // stove : cooking meat and add into cooking list
                if (this.isInAreaStove) {
                    this.pixelPlayer.anims.play('cooking', true);
                    this.animeCooking(8, _ => this.cookMeat())
                    // this.cookMeat()
                }
                if (this.isInAreaSauce1) {
                    console.log('use sauce_1')
                    this.pixelPlayer.anims.play('cooking', true);
                    this.useSauce1()
                }
                if (this.isInAreaSauce3) {
                    console.log('use sauce_3')
                    this.pixelPlayer.anims.play('cooking', true);
                    this.useSauce3()
                }
                if (this.isInAreaTips) {
                    console.log('show tips')
                    this.showTips()
                }


            }

            // -- Constant interaction
            // if (this.isInAreaStove) {
            //     this.pixelPlayer.anims.play('cooking', true);
            //
            // }

            this.pressingSpace = true
        } else {

            this.pressingSpace = false
            // when don't press space , reset animation
            this.pixelPlayer.anims.play('run', true);
            // reset tip
            this.closeTips()
            this.destroyCookingLine()

        }

        // go to other area
        if (this.isInToFarm) {
            this.goToFarm()
        }


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


        }

        if (this.cursors.up.isDown && this.pixelPlayer.body.touching.down) {
            this.pixelPlayer.setVelocityY(-300);
        }
        this.showMaterialNum()

        try{
            if (this.sound.sounds.length > 0 && this.sound.sounds[0].isPlaying) {

            } else {
                this.sound.play('bgm')
            }
        }catch (e) {
            console.warn('play bgm err')
        }


        // this.showSurvivalTime()
    }

    addScore(num) {
        this.game.score += num
        let text = ''
        if (num > 0) {
            text = '+' + num
        } else {
            text = num
        }
        let x = this.pixelPlayer.x
        let y = this.pixelPlayer.y - 50
        this.emitter.x = x
        this.emitter.y = y
        this.emitter.explode(16);
        this.showNotice(text)
    }


    addTime(second = 0) {
        this.game.survivalTime += second
    }

    burgerMenu

    // cooking burger tips
    showTips() {
        this.burgerMenu = this.add.image(380, 350, 'burgerMenu')

    }

    cook_time = 5
    cooking_line
    cooking = false
    cookingInterval
    // when cooking material, show seconds it needs
    // material : meat / tomato / vegetable / purple_vegetable
    animeCooking(time, successCb = () => {
    }) {
        // show cooking green_line
        this.cook_time = time // s
        console.log(this.cooking_line)
        this.cooking_line.x = this.pixelPlayer.x + 5
        this.cooking_line.y = this.pixelPlayer.y - 25
        this.cooking_line.text = this.cook_time
        this.cook_time--
        this.cookingInterval = setInterval(() => {
            this.cooking_line.text = this.cook_time
            this.cook_time--
            if (this.cook_time < 0) {
                this.cooking_line.text = ''
                successCb()

                clearInterval(this.cookingInterval)
            }
        }, 1000)
    }

    // reset action timer
    destroyCookingLine() {
        try {
            this.cook_time = 5
            this.cooking_line.text = ''
            clearInterval(this.cookingInterval)
        } catch (e) {

        }

    }

    // display tips :off
    closeTips() {
        try {
            this.burgerMenu.destroy()
        } catch (e) {

        }
    }

    // display tips :on
    showNotice(text) {
        let x = this.pixelPlayer.x
        let y = this.pixelPlayer.y - 50
        try {
            this.notice.destroy()
        } catch (e) {

        }

        this.notice = this.add.text(x, y, text, {
            fontSize: '16px',
            fill: '#ffffff',
            strokeThickness: 1,
            zIndex: 1000
        }).setOrigin(1);

        setTimeout(_ => {
            this.notice.text = ''
        }, 1000)
    }

    updateCountdown() {
        // console.log('this.game.survivalTime', this.game.survivalTime)
        // Check the survival time > 0
        if (this.game.survivalTime > 0) {
            this.game.survivalTime -= 1; // Increment the survival time by 1 second
            this.timerText.text = 'Countdown:' + this.game.survivalTime
        } else {
            // Game over
            this.game.GameOver = true;
            this.releaseScenes()
            this.scene.start('GameOverscene');

        }
    }

    // destory game
    releaseScenes() {
        this.physics.pause();
        this.sound.stopAll();
        this.pixelPlayer.anims.stop();
    }


}

