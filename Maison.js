class Maison extends Phaser.Scene {

    constructor() {
        super("Maison");
    }
    init(data){
        this.coordX = data.coordX
        this.coordY = data.coordY
    }
    preload() {

        
    }
    create() {
        this.add.image(490, 690, 'fond_1')
 
        this.carteDuNiveau = this.add.tilemap("filles");
        this.tileset = this.carteDuNiveau.addTilesetImage("petit tileset","Phaser_tuilesdejeu");
        this.calque_Murs = this.carteDuNiveau.createLayer("Murs",this.tileset);
        this.calque_Murs.setCollisionByProperty({ Dur: true })

        this.calque_sortie = this.carteDuNiveau.createLayer("sortie",this.tileset);
        this.calque_sortie.setCollisionByProperty({ Dur: true })

        this.encel = this.physics.add.staticGroup();
        this.encel.create(450,920, 'porte').setScale(0.1).setSize(100,100);
        this.encel.setVisible(false)

        this.encel1 = this.physics.add.staticGroup();
        this.encel1.create(1610,920, 'porte').setScale(0.1).setSize(100,100);
        this.encel1.setVisible(false)

        this.add.image(50, 750, 'coussin').setScale(0.1)
        this.add.image(1050, 750, 'coussin2').setScale(0.1)

        //Config
        this.player = this.physics.add.sprite(this.coordX, this.coordY, 'perso').setScale(0.3);
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);
        this.cursors = this.input.keyboard.createCursorKeys();
        this.physics.world.setBounds(0, 0, 3840, 960);
        this.cameras.main.setBounds(0, 0, 1840, 960);
        this.cameras.main.startFollow(this.player);
        this.physics.add.collider(this.player, this.calque_Murs);
        this.physics.add.collider(this.player, this.calque_sortie,this.switch1, null, this );
        this.physics.add.overlap(this.player, this.encel, this.texte, null, this);
        this.physics.add.overlap(this.player, this.encel1, this.texte1, null, this);


        this.valeur = 0
        this.valeur1 = 0
        

    }
        
    update() {
        if (this.cursors.left.isDown){ 
            this.player.setVelocityX(-160); 
            this.gauche = 1
            this.player.anims.play('gauche',true).setScale(0.3).setSize(150,150);
        }
        else if (this.cursors.right.isDown){
            this.player.setVelocityX(160);
            this.gauche = 0
            this.player.anims.play('droite',true).setScale(0.3).setSize(150,150);
        }
        else{ // sinon
            this.player.setVelocityX(0);
            if (this.gauche == 0){
                this.player.anims.play("idle_droite")
            }
            else{
                this.player.anims.play("idle_gauche")
            }

        }
        if (this.cursors.up.isDown && this.player.body.blocked.down){
            this.player.setVelocityY(-330);
        }

    }
    texte()
    {
        if (this.valeur == 0){
        this.soeur = this.add.text(490, 730, 'Encel ?', { font: "30px SchwarzKopf New", fill: "white", align:"center" }).setAlpha(0);
        this.fadeInAndOut(this.soeur,3000,2000)
        this.valeur = 1
        }
    }
    texte1()
    {
        if (this.valeur1 == 0){
        this.par = this.add.text(1410, 730, 'Encel je suis rentrer et j ai une surprise.', { font: "30px SchwarzKopf New", fill: "white", align:"center" }).setAlpha(0);
        this.fadeInAndOut(this.par,3000,2000)
        this.valeur1 = 1
        }
    }
    coAudio()
    {
        this.audio = this.sound.add('Dead_Ends',{
            volume : 0.1,
        })
            this.audio.play()
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
    switch1() 
    {
        this.scene.start('Zone_1',{
            coordX: 50,
            coordY: 840    
        }
        );
    }

}
