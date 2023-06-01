class Main extends Phaser.Scene {
    constructor() {
        super("Main");
    }
    preload() {}
    create() {
        this.add.image(650, 475, "fond").setScale(0.75);
        this.add.image(650, 475, "ecran").setScale(0.41);

        this.gameButton = this.add.image(170, 775, "chapitres").setInteractive().setScale(0.21);
        this.gameButton.on("pointerdown", this.launchChapitres, this);
        
        this.gameButton = this.add.image(1140, 775, "cred").setInteractive().setScale(0.21);
        this.gameButton.on("pointerdown", this.launchCredits, this);
        
        this.gameButton = this.add.image(640, 775, "coment").setInteractive().setScale(0.21);
        this.gameButton.on("pointerdown", this.launchGame, this);
    }
    update() {}
    launchCredits()
    {
        this.scene.start('Credits')
    }
    launchChapitres()
    {
        this.scene.start('Chapitres')
    }
    launchGame()
    {
        this.scene.start('Debut',{
            coordX: 80,
            coordY: 910,    
            score: 0
        }
        )

    }

}
