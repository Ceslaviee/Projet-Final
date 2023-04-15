class Main extends Phaser.Scene {
    constructor() {
        super("Main");
    }
    preload() {
        this.load.image("bouton", "doc/Gaïa.png");
        this.load.image("ecran", "doc/Menu.png")
        this.load.image("fond","doc/Fond_Menu.png")
    }
    create() {
        this.add.image(1150, 475, "fond").setScale(0.75);
        this.add.image(1150, 475, "ecran").setScale(0.35);
        
        this.gameButton = this.add.image(385,325,"bouton").setInteractive().setScale(0.9);
        this.gameButton.on("pointerdown", this.launchGame, this);
    }
    update() {}
    launchGame()
    {
        console.log("Launch Game");
        this.scene.start('Zone_1')
    }

}
