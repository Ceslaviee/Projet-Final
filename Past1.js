class Past1 extends Phaser.Scene {

    constructor() {
        super("Past1");
    }
    init(data){
        this.coordX = data.coordX
        this.coordY = data.coordY
        this.score = data.score
    }
    preload() {
    }
    create() {

        
        this.add.image(1800, 480, 'fond_2').setScale(1.2);
        this.carteDuNiveau = this.add.tilemap("jar");
        this.tileset = this.carteDuNiveau.addTilesetImage("petit tileset","Phaser_tuilesdejeu");
        this.calque_tentative = this.carteDuNiveau.createLayer("tentative",this.tileset);
        this.calque_tentative.setCollisionByProperty({ Dur: true })

        //Calque
        this.calque_switch = this.carteDuNiveau.createLayer("switch",this.tileset);
        this.calque_switch.setCollisionByProperty({ Dur: true })
        this.calque_switch.setVisible(false)

        this.calque_chute = this.carteDuNiveau.createLayer("chute",this.tileset);
        this.calque_chute.setCollisionByProperty({ Dur: true })
        this.calque_chute.setVisible(false)

        this.calque_point = this.carteDuNiveau.getObjectLayer("point")
        this.pickup = this.physics.add.group({
            gravity : false
        })
        this.calque_point.objects.forEach(calque_point => {
            const POcol = this.pickup.create(calque_point.x, calque_point.y, "souleil").setScale(0.3).body.setAllowGravity(false);
        });

        this.add.image(130,760, 'mais2').setScale(0.17);
        this.porte = this.physics.add.staticGroup();
        this.porte.create(125,850, 'porte').setScale(0.2);


        this.porte = this.physics.add.staticGroup();
        this.porte.create(350,920, 'porte').setScale(0.1).setSize(100,100);
        this.porte.setVisible(false)

        
        this.porte1 = this.physics.add.staticGroup();
        this.porte1.create(1000,720, 'porte').setScale(0.1).setSize(100,100);
        this.porte1.setVisible(false)

        
        this.porte2 = this.physics.add.staticGroup();
        this.porte2.create(1450,920, 'porte').setScale(0.1).setSize(100,100);
        this.porte2.setVisible(false)

        this.porte3 = this.physics.add.staticGroup();
        this.porte3.create(2550,920, 'porte').setScale(0.1).setSize(100,100);
        this.porte3.setVisible(false)






        //Config
        this.player = this.physics.add.sprite(this.coordX, this.coordY, 'marche').setScale(0.33).setSize(150,150);
        this.player.setCollideWorldBounds(true);

        



        this.cursors = this.input.keyboard.createCursorKeys();
        this.physics.world.setBounds(0, 0, 3840, 960);
        this.cameras.main.setBounds(0, 0, 3840, 960);
        this.cameras.main.startFollow(this.player);
        this.physics.add.collider(this.player, this.calque_tentative);
        this.physics.add.collider(this.player, this.calque_switch,this.switch1, null, this );
        this.physics.add.collider(this.player, this.calque_chute,this.respawn, null, this );
        this.physics.add.overlap(this.player, this.pickup, this.upScore, null, this );
        this.physics.add.overlap(this.player, this.porte, this.entree, null, this);
        this.physics.add.overlap(this.player, this.porte, this.texte, null, this);
        this.physics.add.overlap(this.player, this.porte1, this.texte1, null, this);
        this.physics.add.overlap(this.player, this.porte2, this.texte2, null, this);
        this.physics.add.overlap(this.player, this.porte3, this.texte3, null, this);
        this.scoreTexte = this.add.text(880, 40, this.score, {
            fontSize : '32px', fill : "#000"
        }).setScrollFactor(0)

        this.gameButton = this.add.image(1265,845,"boute").setInteractive().setScale(0.04).setScrollFactor(0);
        this.gameButton.on("pointerdown", this.coAudio, this);
        
        this.lux = 0
        this.valeur = 0
        this.valeur1 = 0
        this.valeur2 = 0
        this.valeur3 = 0
    }
        
    update() {
        if (this.cursors.space.isDown){
            this.changementZone()
        }
        if (this.cursors.left.isDown){ 
            this.player.setVelocityX(-190); 
            this.gauche = 1
            this.player.anims.play('gauche',true).setScale(0.3).setSize(150,150);
        }
        else if (this.cursors.right.isDown){
            this.player.setVelocityX(190);
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
    coAudio()
    {
        this.audio = this.sound.add('Sans_toi',{
            volume : 0.5,
        })
            this.audio.play()
    }
    upScore(player,pickup)
    {
        pickup.destroy()
        this.score += 1
        this.scoreTexte.setText(this.score)
    }
    changementZone()
    {
        this.scene.start("Zone_1",{ coordX : this.player.x, coordY : this.player.y, score : this.score})


    }
    texte()
    {
        if (this.valeur == 0){
        this.parfois = this.add.text(310, 720, 'Il était une fois deux soeurs...', { font: "30px Times New Roman", fill: "grey", align:"center" }).setAlpha(0);
        this.fadeInAndOut(this.parfois,3000,2000)
        this.valeur = 1
        }
    }
    texte1()
    {
        if (this.valeur1 == 0){
        this.parfois = this.add.text(1000, 520, 'Elles reignaient ensemble sur ce royaume', { font: "30px Times New Roman", fill: "grey", align:"center" }).setAlpha(0);
        this.fadeInAndOut(this.parfois,3000,2000)
        this.valeur1 = 1
        }
    }
    texte2()
    {
        if (this.valeur2 == 0){
        this.parfois = this.add.text(1210, 720, 'Mais un jour une disparu', { font: "30px Times New Roman", fill: "grey", align:"center" }).setAlpha(0);
        this.fadeInAndOut(this.parfois,3000,2000)
        this.valeur2 = 1
        }
    }
    texte3()
    {
        if (this.valeur3 == 0){
        this.parfois = this.add.text(2410, 720, "Ainsi le royaume se retrouva orphelin, privé de l'une de ses reines.", { font: "30px Times New Roman", fill: "grey", align:"center" }).setAlpha(0);
        this.fadeInAndOut(this.parfois,3000,2000)
        this.valeur3 = 1
        }
    }
    entree()
    {
        if (this.cursors.shift.isDown){
            this.scene.start("Maison",{

                coordX: 1816,
                coordY: 809,
            }
            );
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
    switch1() 
    {
        this.scene.start("Past2",{
            
        coordX: 97,
        coordY: 900,
        
            
        }
        );
    }
    respawn()
    {
        this.scene.restart({coordX: 50, coordY: 840 })

    }
};
