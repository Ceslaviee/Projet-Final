class Main extends Phaser.Scene {
    constructor() {
        super("Main");
    }
    preload() {}
    create() {
        this.add.image(650, 475, "fond").setScale(0.75);
        this.add.image(650, 475, "ecran").setScale(0.41);
        this.add.image(690, 775, "coment").setScale(0.21);
        
        this.gameButton = this.add.image(475,773,"bouton").setInteractive().setScale(0.4);
        this.gameButton.on("pointerdown", this.launchGame, this);
    }
    update() {}
    launchGame()
    {
        this.scene.start('Debut',{
            coordX: 80,
            coordY: 840    
        }
        )

    }

}
