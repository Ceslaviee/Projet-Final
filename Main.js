class Main extends Phaser.Scene {
    constructor() {
        super("Main");
    }
    preload() {}
    create() {
        this.add.image(650, 475, "fond").setScale(0.75);
        this.add.image(650, 475, "ecran").setScale(0.41);
        
        
        this.gameButton = this.add.image(640, 775, "coment").setInteractive().setScale(0.21);
        this.gameButton.on("pointerdown", this.launchGame, this);
    }
    update() {}
    launchGame()
    {
        this.scene.start('Past2',{
            coordX: 80,
            coordY: 840,    
            score: 0
        }
        )

    }

}
