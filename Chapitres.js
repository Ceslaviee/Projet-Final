class Chapitres extends Phaser.Scene {
    constructor() {
        super("Chapitres");
    }
    preload() {}
    create() {
        this.add.image(650, 475, "fond").setScale(0.75);
        this.add.image(650, 475, "fondu").setScale(0.41);

        //Prélude
        this.gameButton = this.add.image(640, 275, "prélude").setInteractive().setScale(0.21);
        this.gameButton.on("pointerdown", this.launchPre, this);

        //Aphélion
        this.gameButton = this.add.image(640, 350, "Aphélion").setInteractive().setScale(0.21);
        this.gameButton.on("pointerdown", this.launchAph, this);

        //Horizon
        this.gameButton = this.add.image(640, 425, "horizon").setInteractive().setScale(0.21);
        this.gameButton.on("pointerdown", this.launchHor, this);

        //Périhélie
        this.gameButton = this.add.image(640, 500, "Périhélie").setInteractive().setScale(0.21);
        this.gameButton.on("pointerdown", this.launchPer, this);

        //Chapitres
        this.gameButton = this.add.image(1140, 150, "chapitres").setInteractive().setScale(0.21);
        this.gameButton.on("pointerdown", this.launchChapitres, this);
    }
    update() {
        
    }

    launchChapitres()
    {
        this.scene.start('Main')
    }
    launchPre(){
        this.scene.start('Debut',{
            coordX: 80,
            coordY: 910,    
            score: 0
        })
    }
    launchAph(){
        this.scene.start('Zone_1',{
            coordX: 50,
            coordY: 840    
        })
    }
    launchHor(){
        this.scene.start('Zone_2',{
            
            coordX: 97,
            coordY: 900,
            
                
            })
    }    
    launchPer(){
        this.scene.start('Introspection',{
            coordX: 35,
            coordY: 760,
        })
    }

}
