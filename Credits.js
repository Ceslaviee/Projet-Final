class Credits extends Phaser.Scene {
    constructor() {
        super("Credits");
    }
    preload() {}
    create() {
        this.add.image(650, 475, "noir").setScale(0.75);

        this.Clement = this.add.text(210, 90, "Aide à la programmation : Clément l'éclair jaune.", { font: "40px SchwarzKopf New", fill: "white", align:"center" })
        this.Cesar = this.add.text(210, 140, 'Reférent Biblique : César', { font: "40px SchwarzKopf New", fill: "white", align:"center" })
        this.Cesar = this.add.text(210, 190, 'Aide au visuel : Marisa', { font: "40px SchwarzKopf New", fill: "white", align:"center" })
        this.Gaelle = this.add.text(210, 240, 'Collaboratrice : Gaelle.', { font: "40px SchwarzKopf New", fill: "white", align:"center" })
        this.Alexandre = this.add.text(210, 290, 'Carry Prog : Alexandre', { font: "40px SchwarzKopf New", fill: "white", align:"center" })
        this.Lisa = this.add.text(210, 340, 'Figurante : Lisa', { font: "40px SchwarzKopf New", fill: "white", align:"center" })
        this.Liam = this.add.text(210, 390, 'Némésis : Liam', { font: "40px SchwarzKopf New", fill: "white", align:"center" })
        this.Guénolé = this.add.text(210, 440, 'Support 2D : Guénolé', { font: "40px SchwarzKopf New", fill: "white", align:"center" })
        this.jose = this.add.text(210, 490, 'Support : José Daniel Production', { font: "40px SchwarzKopf New", fill: "white", align:"center" })
        this.prof = this.add.text(210, 540, "Aide quotidienne : Les professeurs de l'ESMA ", { font: "40px SchwarzKopf New", fill: "white", align:"center" })

        this.gameButton = this.add.image(1140, 775, "cred").setInteractive().setScale(0.21);
        this.gameButton.on("pointerdown", this.launchCredits, this);
    }
    update() {
        
    }

    launchCredits()
    {
        this.scene.start('Main')
    }
}
