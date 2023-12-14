class Credit extends Phaser.Scene {
    constructor() {
        super('creditScene');
    }

    preload() {
        this.load.audio('attack_cow', './assets/sound/attack_cow.wav');
    }

    texts = []

    create() {

        this.cursors = this.input.keyboard.createCursorKeys();

        let pressText = "Press space to quit."
        this.add.text(300, 580, pressText, {
            fontSize: '16px',
            fill: '#e07438',
            strokeThickness: 1,
            zIndex: 1000
        })


        let creditText = [
            "              Credit",
            "\n\nProducer:         JASON WANG",
            "\nArt Software:     aseperite, texturePacker",
            "\nMusic Sources:    https://pixabay.com/",
 	    "\n                  freesound.org. (2023, 12/14 ). freesound. Retrieved from [https://freesound.org/search/?q=cite]"
        ]

        this.add.text(150, 150, creditText, {
            fontSize: '25px',
            fill: '#38e076',
            strokeThickness: 2,
            zIndex: 1000
        })
    }

    currentSelection = 0

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.cursors.space)) {
            this.scene.start('menuScene');
        }

    }
}