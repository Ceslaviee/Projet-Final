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

        this.physics.pause()
        this.time.delayedCall(3000, this.defreeze,[],this)
        
        this.add.image(1800, 480, 'fond_1').setScale(1.05).setScrollFactor(0.4);
        this.carteDuNiveau = this.add.tilemap("debut");
        this.tileset = this.carteDuNiveau.addTilesetImage("petit tileset","Phaser_tuilesdejeu");
        this.calque_herbe = this.carteDuNiveau.createLayer("herbe",this.tileset);
        this.calque_herbe.setCollisionByProperty({ Dur: true })

        this.transition = this.add.image(620, 480, 'noir').setAlpha(0)

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

        this.add.image(750, 50, 'plante2').setScale(4).setScrollFactor(0)


        //Config
        this.player = this.physics.add.sprite(this.coordX, this.coordY, 'perso').setScale(0.3);
        this.player.setCollideWorldBounds(true);
        this.cursors = this.input.keyboard.createCursorKeys();
        this.physics.world.setBounds(0, 0, 3840, 960);
        this.cameras.main.setBounds(0, 0, 3840, 960);
        this.cameras.main.startFollow(this.player);
        this.physics.add.collider(this.player, this.calque_herbe);
        this.physics.add.overlap(this.player, this.incidence, this.point, null, this);
        this.eel = this.physics.add.overlap(this.player, this.incidence1, this.tuto, null, this);
        this.physics.add.overlap(this.player, this.incidence2, this.point, null, this);
        this.physics.add.overlap(this.player, this.incidence3, this.point, null, this);
        this.physics.add.overlap(this.player, this.incidence4, this.point, null, this);
        this.physics.add.overlap(this.player, this.incidence5, this.point, null, this);
        this.physics.add.overlap(this.player, this.incidence6, this.point, null, this);

        this.TexteScore = this.add.text(640, 35, this.points, {
            fontSize : '32px', fill : "#FFFFFF"
        }).setScrollFactor(0)

        this.gauche = 0
        this.points = 1

        this.dia = this.add.text(5, 790, 'Je devrais ramasser des fleurs pour Encel', { font: "20px Times New Roman", fill: "white", align:"center" }).setAlpha(0);        
        this.fadeInAndOut(this.dia,3000,2000)

        this.valeur = 0
        this.valeur1 = 0

        this.test = 0
        this.lux = 0

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
    point(player,object)
    {
        if (this.cursors.shift.isDown){
            object.destroy()
            console.log(this.points)
            if (this.points == 7){
                this.physics.pause()
                this.cameras.main.fadeOut(5000, 0, 0, 0)
                this.time.delayedCall(5000,this.switch1,[],this)
                
            }
            else{
                this.TexteScore.setText(this.points)
                this.points += 1
                this.test += 1


            }
        }
        

    }
    coAudio()
    {
    if (this.lux == 0)
        {this.audio = this.sound.add('Sans_toi',{
            volume : 0.5,
        })
            this.lux += 1;
            this.audio.play()}
    else{
            this.audio.stop()
            this.lux = 0
        }
    }
    tuto()
    {
        if (this.test == 0)
        {this.physics.pause()
        this.time.delayedCall(3000, this.defreeze,[],this)
        this.event = this.add.text(511, 620, 'Appuyez sur Shift pour interagir.', { font: "20px Times New Roman", fill: "white", align:"center" }).setAlpha(0);
        this.fadeInAndOut(this.event, 3000, 1000)
        this.tutoriel = this.physics.add.overlap(this.player, this.incidence1, this.point, null, this);        
        this.test = 1}
        
    }
    defreeze()
    {
        this.physics.resume()
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
        this.scene.start('Maison',{
            
            coordX: 1816,
            coordY: 809,    
            score: 0
        }
        );}
}