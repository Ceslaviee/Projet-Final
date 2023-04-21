class Main extends Phaser.Scene {
    constructor() {
        super("Main");
    }
    preload() {
        this.load.image("bouton", "doc/étoile.png");
        this.load.image("ecran", "doc/Menu.png")
        this.load.image("fond","doc/Fond_Menu.png")
    }
    create() {
        this.add.image(550, 475, "fond").setScale(0.75);
        this.add.image(450, 475, "ecran").setScale(0.35);
        
        this.gameButton = this.add.image(435,625,"bouton").setInteractive().setScale(0.4);
        this.gameButton.on("pointerdown", this.launchGame, this);
    }
    update() {}
    launchGame()
    {
        this.scene.start('Zone_1',{
            coordX: 50,
            coordY: 840    
        }
        )

    }

}
