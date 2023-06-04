class Introspection extends Phaser.Scene {

    constructor() {
        super("Introspection");
    }
    init(data) {
        this.coordX = data.coordX
        this.coordY = data.coordY
    }
    preload() {

    }
    create() {

        this.carteDuNiveau = this.add.tilemap("maison");
        this.tileset = this.carteDuNiveau.addTilesetImage("petit tileset", "Phaser_tuilesdejeu");
        this.calque_Murs = this.carteDuNiveau.createLayer("Murs", this.tileset);
        this.calque_Murs.setCollisionByProperty({ Dur: true })
        this.calque_Murs.setVisible(false)

        this.calque_sortie = this.carteDuNiveau.createLayer("sortie", this.tileset);
        this.calque_sortie.setCollisionByProperty({ Dur: true })

        this.add.image(1800, 480, 'noir').setScale(1.2);

        this.paroles = this.physics.add.staticGroup();
        this.paroles.create(150,920, 'porte').setScale(0.1).setSize(100,100);
        this.paroles.setVisible(false)

        this.paroles1 = this.physics.add.staticGroup();
        this.paroles1.create(310,920, 'porte').setScale(0.1).setSize(100,100);
        this.paroles1.setVisible(false)

        this.paroles2 = this.physics.add.staticGroup();
        this.paroles2.create(550,920, 'porte').setScale(0.1).setSize(100,100);
        this.paroles2.setVisible(false)

        this.paroles3 = this.physics.add.staticGroup();
        this.paroles3.create(710,920, 'porte').setScale(0.1).setSize(100,100);
        this.paroles3.setVisible(false)
  
        this.paroles4 = this.physics.add.staticGroup();
        this.paroles4.create(1110,920, 'porte').setScale(0.1).setSize(100,100);
        this.paroles4.setVisible(false)

        this.paroles5 = this.physics.add.staticGroup();
        this.paroles5.create(1290,920, 'porte').setScale(0.1).setSize(100,100);
        this.paroles5.setVisible(false)

        this.paroles6 = this.physics.add.staticGroup();
        this.paroles6.create(1490,920, 'porte').setScale(0.1).setSize(100,100);
        this.paroles6.setVisible(false)

        this.levite = this.physics.add.sprite(700, 500, "snow").setScale(0.8).body.setAllowGravity(false)
        this.levite1 = this.physics.add.sprite(200, 330, "blanc").setScale(1).body.setAllowGravity(false)
        this.levite2 = this.physics.add.sprite(1290, 210, "bleu").setScale(1).body.setAllowGravity(false)
        this.levite3 = this.physics.add.sprite(1450, 630, "vert").setScale(1).body.setAllowGravity(false)
        this.levite4 = this.physics.add.sprite(930, 260, "violet").setScale(1).body.setAllowGravity(false)
        this.levite5 = this.physics.add.sprite(1750, 530, "pixel").setScale(1).body.setAllowGravity(false)
        this.levite6 = this.physics.add.sprite(430, 600, "rose").setScale(1).body.setAllowGravity(false)

        

        //Config
        this.player = this.physics.add.sprite(this.coordX, this.coordY, 'perso').setScale(0.3);
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);
        this.cursors = this.input.keyboard.createCursorKeys();
        this.physics.world.setBounds(0, 0, 3840, 960);
        this.cameras.main.setBounds(0, 0, 2040, 960);
        this.cameras.main.startFollow(this.player);
        this.physics.add.collider(this.player, this.calque_Murs);
        this.physics.add.collider(this.player, this.calque_sortie, this.switchChoix, null, this);

        
        this.physics.add.overlap(this.player, this.paroles, this.texte, null, this);
        this.physics.add.overlap(this.player, this.paroles1, this.texte1, null, this);
        this.physics.add.overlap(this.player, this.paroles2, this.texte2, null, this);
        this.physics.add.overlap(this.player, this.paroles3, this.texte3, null, this);
        this.physics.add.overlap(this.player, this.paroles4, this.texte4, null, this);
        this.physics.add.overlap(this.player, this.paroles5, this.texte5, null, this);
        this.physics.add.overlap(this.player, this.paroles6, this.texte6, null, this);

        this.down = true

        this.valeur = 0
        this.valeur1 = 0
        this.valeur2 = 0
        this.valeur3 = 0
        this.valeur4 = 0
        this.valeur5 = 0
        this.valeur6 = 0


    }
    update() {
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-90);
            this.gauche = 1
            this.player.anims.play('gauche', true).setScale(0.3).setSize(150, 150);
        }
        else if (this.cursors.right.isDown) {
            this.player.setVelocityX(90);
            this.gauche = 0
            this.player.anims.play('droite', true).setScale(0.3).setSize(150, 150);
        }
        else { // sinon
            this.player.setVelocityX(0);
            if (this.gauche == 0) {
                this.player.anims.play("idle_droite")
            }
            else {
                this.player.anims.play("idle_gauche")
            }

        }
        
        if (this.down) {
            this.levite.acceleration.y = -100
            this.levite1.acceleration.y = -100
            this.levite2.acceleration.y = -100
            this.levite3.acceleration.y = -100
            this.levite4.acceleration.y = -100
            this.levite5.acceleration.y = -100
            this.levite6.acceleration.y = -100
        }
        else {
            this.levite.acceleration.y = 100
            this.levite1.acceleration.y = 100
            this.levite2.acceleration.y = 100
            this.levite3.acceleration.y = 100
            this.levite4.acceleration.y = 100
            this.levite5.acceleration.y = 100
            this.levite6.acceleration.y = 100
        }
        if (this.down &&  this.levite.velocity.y < -60) {
            this.down = false
        }
        else if (!this.down &&  this.levite.velocity.y > 60) {
            this.down = true
        }
        

    }
    switchChoix() {
        this.scene.start("Fin")
    }
    texte()
    {
        if (this.valeur == 0){
        this.soeur = this.add.text(130, 670, 'Encel tu es la ?', { font: "20px SchwarzKopf New", fill: "white", align:"center" }).setAlpha(0);
        this.fadeInAndOut(this.soeur,3000,2000)
        this.valeur = 1
        }
    }
    texte1()
    {
        if (this.valeur1 == 0){
        this.par = this.add.text(310, 700, 'Je sais que tu es deja partie', { font: "20px SchwarzKopf New", fill: "white", align:"center" }).setAlpha(0);
        this.fadeInAndOut(this.par,3000,2000)
        this.valeur1 = 1
        }
    }
    texte2()
    {
        if (this.valeur2 == 0){
        this.soeur = this.add.text(550, 730, "L'apocalypse n'a jamais laisser qu'un sillage de larmes et de sang.", { font: "20px SchwarzKopf New", fill: "white", align:"center" }).setAlpha(0);
        this.fadeInAndOut(this.soeur,3000,2000)
        this.valeur2 = 1
        }
    }
    texte3()
    {
        if (this.valeur3 == 0){
        this.par = this.add.text(710, 760, "Pourquoi as-t'il fallu que ce soit toi et pas moi.", { font: "20px SchwarzKopf New", fill: "white", align:"center" }).setAlpha(0);
        this.fadeInAndOut(this.par,3000,2000)
        this.valeur3 = 1
        }
    }
    texte4()
    {
        if (this.valeur4 == 0){
        this.par = this.add.text(1060, 840, "Il y a tellement de choses que j'aurais voulu que tu sache", { font: "20px SchwarzKopf New", fill: "white", align:"center" }).setAlpha(0);
        this.fadeInAndOut(this.par,3000,2000)
        this.valeur4 = 1
        }
    }
    texte5()
    {
        if (this.valeur5 == 0){
        this.par = this.add.text(1260, 870, "J'aurais voulu te dire de vive voix le fond de mes pensées", { font: "20px SchwarzKopf New", fill: "white", align:"center" }).setAlpha(0);
        this.fadeInAndOut(this.par,3000,2000)
        this.valeur5 = 1
        }
    }
    texte6()
    {
        if (this.valeur6 == 0){
        this.par = this.add.text(1340, 900, "Mais cela restera à jamais qu'un souvenir appartenant à un passé d'antan", { font: "20px SchwarzKopf New", fill: "white", align:"center" }).setAlpha(0);
        this.fadeInAndOut(this.par,3000,2000)
        this.valeur6 = 1
        }
    }
    fadeInAndOut(image, duration, fadeOutDelay) {

        const initialOpacity = image.alpha;


        this.tweens.add({
            targets: image,
            alpha: 1,
            duration: duration / 2,
            onComplete: () => {

                this.time.delayedCall(fadeOutDelay, () => {

                    this.tweens.add({
                        targets: image,
                        alpha: initialOpacity,
                        duration: duration / 2,
                    });
                });
            }
        });
    }
};
