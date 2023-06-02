class Zone_2 extends Phaser.Scene {

    constructor() {
        super("Zone_2");
        this.quest = false
    }
    init(data){
        this.coordX = data.coordX
        this.coordY = data.coordY
        this.score = data.score
        this.cle = data.cle
        this.quest = data.quest
    }
    preload() {

    }
    create() {
        this.add.image(1800, 680, 'k2').setScale(1.2);
        this.carteDuNiveau = this.add.tilemap("Guerre");
        this.tileset = this.carteDuNiveau.addTilesetImage("petit tileset","Phaser_tuilesdejeu");
        this.calque_sol = this.carteDuNiveau.createLayer("sol",this.tileset);
        this.calque_sol.setCollisionByProperty({ Dur: true })


        this.calque_chute1 = this.carteDuNiveau.createLayer("chute1",this.tileset);
        this.calque_chute1.setCollisionByProperty({ Dur: true })
        this.calque_chute1.setVisible(false)

        this.calque_change1 = this.carteDuNiveau.createLayer("change1",this.tileset);
        this.calque_change1.setCollisionByProperty({ Dur: true })
        this.calque_change1.setVisible(false)

        this.calque_change2 = this.carteDuNiveau.createLayer("change2",this.tileset);
        this.calque_change2.setCollisionByProperty({ Dur: true })
        this.calque_change2.setVisible(false)

                
        this.porte6 = this.physics.add.staticGroup();
        this.alp = this.porte6.create(2580,950,'gandalf').setScale(0.5).setAlpha(1).setSize(120,120)
        this.remerciement = this.add.text(2580,780, 'Merci pour tout', { font: "30px SchwarzKopf New", fill: "white", align:"center" }).setAlpha(0);

        this.sadslime = this.physics.add.sprite(3000, 920, 'sadslime').setScale(0.4).setSize(75,75)
        this.slime = this.physics.add.sprite(450, 920, 'slimeR').setScale(0.4).setSize(75,75)
        this.feu = this.physics.add.sprite(1650, 320, 'fire').setScale(0.7).setSize(75,75)
        this.sadslime.anims.play('sadslime', true)
        this.slimeX = this.slime.x
        this.slimeY = this.slime.y     
        this.slimespeed = 75

        this.side = 0

        this.player = this.physics.add.sprite(this.coordX, this.coordY, 'perso').setScale(0.3);
        this.player.setCollideWorldBounds(true);

        this.cursors = this.input.keyboard.createCursorKeys();
        this.physics.world.setBounds(0, 0, 3840, 960);
        this.cameras.main.setBounds(0, 0, 3840, 960);
        this.cameras.main.startFollow(this.player);
        this.physics.add.collider(this.player, this.calque_sol);
        this.physics.add.collider(this.player, this.calque_change1,this.switch1, null, this )
        this.physics.add.collider(this.player, this.calque_change2,this.switch2, null, this )
        this.physics.add.collider(this.player, this.calque_chute1,this.respawn, null, this )
        this.physics.add.collider(this.feu, this.calque_sol);
        this.physics.add.collider(this.slime, this.calque_sol);
        this.physics.add.collider(this.sadslime, this.calque_sol);

        this.physics.add.collider(this.feu, this.calque_sol);
        this.physics.add.collider(this.player, this.feu, this.hitBomb, null, this);
        this.physics.add.collider(this.player, this.porte6);




        this.gameButton = this.add.image(1265,50,"faille3").setScrollFactor(0).setInteractive().setScale(0.04);
        this.gameButton.on("pointerdown", this.coAudio, this);
        this.slime.anims.play('animslime', true);
        this.hor = this.add.image(650, 120, 'hor').setScale(0.3).setScrollFactor(0).setAlpha(0);
        this.fadeInAndOut(this.hor,3000,5000)

        
        this.add.image(3080,930,'fleur').setScale(0.5)
        this.feu.setBounce(1)

        this.bulle = this.add.image(2660, 820, 'bulle').setScale(0.17).setAlpha(1)


        console.log(this.cle)
        if (this.cle == true){
            this.add.image(50, 50,'clef').setScrollFactor(0)
        }

        if(this.quest == false){
            this.bulle.setAlpha(0)
            this.fadeInAndOut(this.remerciement, 3000, 1000)
            this.alp.destroy()
        }      

        this.lux = 0
    }
    update() {
        if (this.feu.body.velocity.y < 0){
            this.feu.anims.play('fire2',true)
        }
        else[
            this.feu.anims.play('fire',true)
        ]
        if (this.cursors.space.isDown){
            this.changementZone()
        }
        if (this.cursors.left.isDown){
            this.player.setVelocityX(-150); 
            this.gauche = 1
            this.player.anims.play('gauche',true).setScale(0.3).setSize(150,150);
        }
        else if (this.cursors.right.isDown){
            this.player.setVelocityX(150);
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
        if (this.side == 0){
            this.slime.anims.play('animslime', true);
        }
        else {
            this.slime.anims.play('animslime_back', true);

        }
        if (Phaser.Math.Distance.Between(this.slime.x, this.slime.y, this.slimeX, this.slimeY) < 300){
            this.slime.setVelocityX(this.slimespeed)
        }

        else{
            if (this.side == 0){
                this.side = 1
            }
            else {
                this.side = 0
            }
            this.slimeX = this.slime.x
            this.slimeY = this.slime.y     
            this.slimespeed = this.slimespeed * (-1)
        }
        if (this.cursors.shift.isDown && this.cle == true){
            this.bulle.setAlpha(0)
            this.quest = true
            this.alp.destroy()
        }        
    }
    hitBomb(player, feu){
        this.physics.pause();
        this.cameras.main.fadeOut(3000, 0, 0, 0)
        this.time.delayedCall(5000,this.respawn,[],this)
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
    changementZone()
    {
        this.scene.start("Past2",{ coordX : this.player.x, coordY : this.player.y, score : this.score, ouvert : this.ouvert})
    }
    coAudio()
    {
        this.audio = this.sound.add('Dead_Ends',{
            volume : 0.3,
        })
            this.audio.play()
    }
    switch1()
    {
        this.scene.start("Zone_1",{
            coordX: 3735,
            coordY: 900,
        }
        )
    }
    switch2()
    {
        this.scene.start("Introspection",{
            coordX: 35,
            coordY: 760,
        }
        )
    }
    respawn()
    {
        this.scene.restart()
    }
};
