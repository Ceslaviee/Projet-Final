class Past2 extends Phaser.Scene {

    constructor() {
        super("Past2");
    }
    init(data){
        this.coordX = data.coordX
        this.coordY = data.coordY
    }
    preload() {

    }
    create() {
        this.add.image(1800, 680, 'k').setScale(1.2);
        this.carteDuNiveau = this.add.tilemap("Guerr");
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

        this.add.image(1925,940,'pétales').setScale(0.95)
        

        this.slime3 =  this.physics.add.sprite(2780, 920, 'slime').setScale(0.4).setSize(75,75)
        this.slime2 =  this.physics.add.sprite(2700, 920, 'slime').setScale(0.4).setSize(75,75)
        this.slime3.anims.play('slime_back', true);
        this.slime2.anims.play('slime', true);


        this.player = this.physics.add.sprite(this.coordX, this.coordY, 'perso2').setScale(0.3);
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);
        this.cursors = this.input.keyboard.createCursorKeys();
        this.physics.world.setBounds(0, 0, 3840, 960);
        this.cameras.main.setBounds(0, 0, 3840, 960);
        this.cameras.main.startFollow(this.player);
        this.physics.add.collider(this.player, this.calque_sol);
        this.physics.add.collider(this.player, this.calque_chute1,this.respawn1, null, this )
        this.physics.add.collider(this.player, this.calque_change1,this.switch1, null, this )
        this.physics.add.collider(this.player, this.calque_change2,this.switch2, null, this )
        this.physics.add.collider(this.slime2, this.calque_sol);
        this.physics.add.collider(this.slime3, this.calque_sol);

        this.gameButton = this.add.image(1065,845,"faille3").setScrollFactor(0).setInteractive().setScale(0.04);
        this.gameButton.on("pointerdown", this.coAudio, this);
            
        this.hor = this.add.image(650, 120, 'hor').setScale(0.3).setScrollFactor(0).setAlpha(0);
        this.fadeInAndOut(this.hor,3000,5000)


        

        

    }
    update() {
        if (this.cursors.space.isDown){
            this.changementZone()
        }
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
    coAudio()
    {
        this.audio = this.sound.add('Dead_Ends',{
            volume : 0.1,
        })
            this.audio.play()
    }
    changementZone()
    {
        this.scene.start("Zone_2",{ coordX : this.player.x, coordY : this.player.y})
    }
    switch1()
    {
        this.scene.start("Past1",{
            coordX: 3735,
            coordY: 850,
        }
        )
    }
    switch2()
    {
        this.scene.start("Fin",{
            spawnX: 3735,
            spawnY: 900,
        }
        )
    }
    respawn()
    {
        this.scene.restart({coordX: 97, coordY: 900})

    }
};
