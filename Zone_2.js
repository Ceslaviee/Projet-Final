class Zone_2 extends Phaser.Scene {

    constructor() {
        super("Zone_2");
    }
    init(data){
        this.coordX = data.coordX
        this.coordY = data.coordY
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

        this.slime = this.physics.add.sprite(150, 920, 'slime').setScale(0.4).setSize(75,75)
        //this.slime.vaversladroite=true;
        this.slimeX = this.slime.x
        this.slimeY = this.slime.y     
        this.slimespeed = 250

        this.gauche = 0

        this.player = this.physics.add.sprite(this.coordX, this.coordY, 'perso').setScale(0.3);
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
        this.physics.add.collider(this.slime, this.calque_sol);

        this.gameButton = this.add.image(865,845,"faille3").setScrollFactor(0).setInteractive().setScale(0.04);
        this.gameButton.on("pointerdown", this.coAudio, this);
            
        this.hor = this.add.image(450, 120, 'hor').setScale(0.3).setScrollFactor(0).setAlpha(0);
        this.fadeInAndOut(this.hor,3000,5000)

        


        

        

    }
    update() {
        if (this.cursors.space.isDown){
            this.changementZone()
        }
        if (this.cursors.left.isDown){ 
            this.player.setVelocityX(-360); 
        }
        else if (this.cursors.right.isDown){
            this.player.setVelocityX(360); 
        }
        else{ // sinon
            this.player.setVelocityX(0);
            this.player.anims.play('anim1', true);
        }
        if (this.cursors.up.isDown && this.player.body.blocked.down){
            this.player.setVelocityY(-330);
        }
        if (this.gauche == 0){
            this.slime.anims.play('animslime', true);
        }
        else {
            this.slime.anims.play('animslime_back', true);
        }
        if (Phaser.Math.Distance.Between(this.slime.x, this.slime.y, this.slimeX, this.slimeY) < 1000){
            this.slime.setVelocityX(this.slimespeed)
            this.gauche += 0
            console.log("lol")

        }
        else if (Phaser.Math.Distance.Between(this.slime.x, this.slime.y, this.slimeX, this.slimeY) > 1000){
            this.slime.setVelocityX(this.slimespeed * (-1))
            this.gauche -= 1
            console.log("lol1")
        }

        else{
            this.gauche += 1
            this.slimeX = this.slime.x
            this.slimeY = this.slime.y     
            this.slimespeed = this.slimespeed * (-1)
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
    changementZone()
    {
        this.scene.start("Past2",{ coordX : this.player.x, coordY : this.player.y})
    }
    coAudio()
    {
        this.audio = this.sound.add('Dead_Ends',{
            volume : 0.1,
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
        this.scene.start("Fin",{
            coordX: 3735,
            coordY: 900,
        }
        )
    }
    respawn1()
    {
        this.scene.restart({coordX: 97, coordY: 900})

    }
};
