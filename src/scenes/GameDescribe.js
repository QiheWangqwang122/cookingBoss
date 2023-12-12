class GameDescribe extends Phaser.Scene {
    constructor() {
        super('describeScene');
    }

    preload() {
        this.load.image('base_scene', './assets/description/base_scene.png')
        this.load.image('action', './assets/description/action.png')
        this.load.image('burger_recipe', './assets/description/burger_recipe.png')
        this.load.image('farm', './assets/description/farm.png')
    }

    texts = [
        "The game is aiming to finish orders by cooking burger.\nYou are the Burger Boss!\nTry to live long and finish more orders to earn higher score.\n" + "Base move is based on 4-arrow key,  interaction key is “Space”.\n" + "Some of interaction needs keep holding the spacebar, e.g. stove, vegetebales.\n",
        "How to cook a burger?\n" + "Materials including ‘Cost material’ and ’Vegetables’.\nCost material including ‘meat’ and ‘sauce’.\n" + "Use ‘Cost material’ will cost material, meat can be got in the left scene(Farm).\nSauce cannot be obtained additionally.\n",
        "So, how to add them together?\n" + "Pressing space to choose what materials you want.\nYou can see what you had added in cooking panel.\nRight side is ‘Burger Recipe’.\nPressing space on ‘Burger Recipe’,you will see the burger order\nis cooked by what kinds of materials.\nThe first of the Order List is which you should to finish.\n",
        "Some special interaction:\n" + "1. Stove： Use stove to cooking meat and add it to cooking panel.\n" + "2. Bin : When do wrong burger, use bin to throw away materials in cooking panel.\nBut it will lose score and time.\n" ,
        "3. Yellow man: He is a Big Stomach King !\nHe can eat all the burgers.\nBut he can only add score for true order.Haha.\nPress space to interact with him to submit your burger. \n" + "4.Vegetables: Choose vegetable for your burger.\nKeep pressing to add it into cooking panel. \n",
        "You can view burger recipe any time in the game.\n" + " I know you will forget it.\n",
        "Press space to attack cow to get meats. "
    ]

    create() {
        this.instruction = this.add.image(400, 230, 'base_scene')
        this.instruction.setScale(0.3)
        this.cursors = this.input.keyboard.createCursorKeys();
        this.instructions = ['action', 'base_scene', 'base_scene', 'base_scene','base_scene', 'burger_recipe', "farm"]

        let pressText = "Press left and right arrow to view instruction, space to quit."
        this.add.text(100,0,pressText,{
            fontSize: '16px',
            fill: '#e07438',
            strokeThickness: 1,
            zIndex: 1000})
        this.instructionText = this.add.text(400, 520, this.texts[0], {
            fontSize: '16px',
            fill: '#e07438',
            strokeThickness: 6,
            zIndex: 1000
        }).setOrigin(0.5);
    }

    currentSelection = 0

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.cursors.right)) {
            if (this.currentSelection === this.instructions.length - 1) {
                // this.currentSelection = 0
            } else {
                this.currentSelection++
            }
            this.instruction.destroy()
            this.instruction = this.add.image(400, 230, this.instructions[this.currentSelection])
            this.instruction.setScale(0.3)
            this.instructionText.text = this.texts[this.currentSelection]
            this.sound.play('cursorSound');
        } else if (Phaser.Input.Keyboard.JustDown(this.cursors.left)) {
            if (this.currentSelection === 0) {
                // this.currentSelection = 0
            } else {
                this.currentSelection--
            }
            this.instruction.destroy()
            this.instruction = this.add.image(400, 230, this.instructions[this.currentSelection])
            this.instruction.setScale(0.3)
            this.instructionText.text = this.texts[this.currentSelection]
            this.sound.play('cursorSound');
        } else if (Phaser.Input.Keyboard.JustDown(this.cursors.space)) {
            this.scene.start('menuScene');
        }

    }
}