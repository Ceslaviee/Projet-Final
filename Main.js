class Main extends Phaser.Scene {
    constructor() {
        super("Main");
    }
    preload() {}
    create() {
        this.add.image(450, 475, "fond").setScale(0.75);
        this.add.image(450, 475, "ecran").setScale(0.41);
        this.add.image(490, 775, "coment").setScale(0.21);
        
        this.gameButton = this.add.image(275,773,"bouton").setInteractive().setScale(0.4);
        this.gameButton.on("pointerdown", this.launchGame, this);
    }
    update() {}
    launchGame()
    {
        this.scene.start('Debut',{
            coordX: 50,
            coordY: 840    
        }
        )

    }

}
