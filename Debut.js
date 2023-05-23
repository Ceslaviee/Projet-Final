class Debut extends Phaser.Scene {

    constructor() {
        super("Debut");
    }
    init(data){
        this.coordX = data.coordX
        this.coordY = data.coordY
        this.score = data.score
    }
    preload() {
    }
    create() {

        this.add.image(1800, 480, 'fond_1').setScale(1.2);
        this.carteDuNiveau = this.add.tilemap("debut");
        this.tileset = this.carteDuNiveau.addTilesetImage("petit tileset","Phaser_tuilesdejeu");
        this.calque_herbe = this.carteDuNiveau.createLayer("herbe",this.tileset);
        this.calque_herbe.setCollisionByProperty({ Dur: true })
        
        this.calque_redem = this.carteDuNiveau.createLayer("redem",this.tileset);
        this.calque_redem.setCollisionByProperty({ Dur: true })
        this.calque_redem.setVisible(false)

        

        this.incidence = this.physics.add.staticGroup();
        this.incidence1 = this.physics.add.staticGroup();
        this.incidence2 = this.physics.add.staticGroup();
        this.incidence3 = this.physics.add.staticGroup();
        this.incidence4 = this.physics.add.staticGroup();
        this.incidence5 = this.physics.add.staticGroup();
        this.incidence6  = this.physics.add.staticGroup();

        this.incidence.create(96,383,'plante2').setScale(2).setAlpha(1)
        this.incidence1.create(511,760,'plante2').setScale(2).setAlpha(1)
        this.incidence2.create(1649,898,'plante2').setScale(2).setAlpha(1)
        this.incidence3.create(2542,830,'plante2').setScale(2).setAlpha(1)
        this.incidence4.create(3456,832,'plante2').setScale(2).setAlpha(1)
        this.incidence5.create(1919,349,'plante2').setScale(2).setAlpha(1)
        this.incidence6.create(1230,512,'plante2').setScale(2).setAlpha(1)



        //Config
        this.player = this.physics.add.sprite(this.coordX, this.coordY, 'perso').setScale(0.3);
        this.player.setCollideWorldBounds(true);
        this.cursors = this.input.keyboard.createCursorKeys();
        this.physics.world.setBounds(0, 0, 3840, 960);
        this.cameras.main.setBounds(0, 0, 3840, 960);
        this.cameras.main.zoom= 1.3;
        this.cameras.main.startFollow(this.player);
        this.physics.add.collider(this.player, this.calque_herbe);
        this.physics.add.overlap(this.player, this.incidence, this.point, null, this);
        this.physics.add.overlap(this.player, this.incidence1, this.point, null, this);
        this.physics.add.overlap(this.player, this.incidence2, this.point, null, this);
        this.physics.add.overlap(this.player, this.incidence3, this.point, null, this);
        this.physics.add.overlap(this.player, this.incidence4, this.point, null, this);
        this.physics.add.overlap(this.player, this.incidence5, this.point, null, this);
        this.physics.add.overlap(this.player, this.incidence6, this.point, null, this);




        this.gameButton = this.add.image(1265,845,"bout").setScrollFactor(0).setInteractive().setScale(0.04);
        this.gameButton.on("pointerdown", this.coAudio, this);

        this.gauche = 0
        this.points = 1

        this.dia = this.add.text(50, 790, 'Il se fait tard je ferais mieux de rentrer.', { font: "20px SchwarzKopf New", fill: "white", align:"center" }).setAlpha(0);        
        this.fadeInAndOut(this.dia,3000,2000)

        this.valeur = 0
        this.valeur1 = 0

    }
        
    update() {
        if (this.cursors.left.isDown){ 
            this.player.setVelocityX(-260); 
            this.gauche = 1
            this.player.anims.play('gauche',true).setScale(0.3).setSize(150,150);
        }
        else if (this.cursors.right.isDown){
            this.player.setVelocityX(260);
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
    point(player,object)
    {
        object.destroy()
        console.log(this.points)
        if (this.points == 7){
            this.switch1()
            
        }
        else{
            this.points += 1
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
            coordY: 840,    
            score: 0
        }
        );}
}