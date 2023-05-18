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

        this.sadslime = this.physics.add.sprite(2700, 920, 'sadslime').setScale(0.4).setSize(75,75)
        this.slime = this.physics.add.sprite(150, 920, 'slimeR').setScale(0.4).setSize(75,75)
        this.sadslime.anims.play('sadslime', true)
        //this.slime.vaversladroite=true;
        this.slimeX = this.slime.x
        this.slimeY = this.slime.y     
        this.slimespeed = 75

        this.side = 0

        /* texte */
        this.porte = this.physics.add.staticGroup();
        this.porte.create(230,920, 'porte').setScale(0.2);
        this.porte.setVisible(false)

        /* texte1 */

        this.porte1 = this.physics.add.staticGroup();
        this.porte1.create(630,920, 'porte').setScale(0.2);
        this.porte1.setVisible(false)

        /* texte2 */

        this.porte2 = this.physics.add.staticGroup();
        this.porte2.create(1130,920, 'porte').setScale(0.2);
        this.porte2.setVisible(false)

        /* texte3 */

        this.porte3 = this.physics.add.staticGroup();
        this.porte3.create(1730,920, 'porte').setScale(0.2);
        this.porte3.setVisible(false)

        /* texte4 */        

        this.porte4 = this.physics.add.staticGroup();
        this.porte4.create(2330,920, 'porte').setScale(0.2);
        this.porte4.setVisible(false)

        /* texte5 */        

        this.porte5 = this.physics.add.staticGroup();
        this.porte5.create(2830,920, 'porte').setScale(0.2);
        this.porte5.setVisible(false)

        this.player = this.physics.add.sprite(this.coordX, this.coordY, 'perso').setScale(0.3);
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
        this.physics.add.collider(this.sadslime, this.calque_sol);

        /* overlaps */ 

        this.physics.add.overlap(this.player, this.porte, this.texte, null, this);
        this.physics.add.overlap(this.player, this.porte1, this.texte1, null, this);
        this.physics.add.overlap(this.player, this.porte2, this.texte2, null, this);
        this.physics.add.overlap(this.player, this.porte3, this.texte3, null, this);
        this.physics.add.overlap(this.player, this.porte4, this.texte4, null, this);
        this.physics.add.overlap(this.player, this.porte5, this.texte5, null, this);


        this.gameButton = this.add.image(1265,845,"faille3").setScrollFactor(0).setInteractive().setScale(0.04);
        this.gameButton.on("pointerdown", this.coAudio, this);
            
        this.hor = this.add.image(650, 120, 'hor').setScale(0.3).setScrollFactor(0).setAlpha(0);
        this.fadeInAndOut(this.hor,3000,5000)

        
        this.add.image(2780,930,'fleur').setScale(0.5)

        this.valeur = 0
        this.valeur1 = 0
        this.valeur2 = 0
        this.valeur3 = 0
        this.valeur4 = 0
        this.valeur5 = 0

        


        

        

    }
    update() {
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
        if (Phaser.Math.Distance.Between(this.slime.x, this.slime.y, this.slimeX, this.slimeY) < 1000){
            this.slime.setVelocityX(this.slimespeed)
            console.log("lol")

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
    texte()
    {
        if (this.valeur == 0){
        this.parfois = this.add.text(230, 790, 'Il était une fois, un royaume lointain.', { font: "20px SchwarzKopf", fill: "white", align:"center" }).setAlpha(0);
        this.fadeInAndOut(this.parfois,3000,2000)
        this.valeur = 1
        }
    }
    texte1()
    {
        if (this.valeur1 == 0){
        this.parfois = this.add.text(630, 790, 'Deux sœurs s’accommoderent de cet endroit anodin.', { font: "20px SchwarzKopf", fill: "white", align:"center" }).setAlpha(0);
        this.fadeInAndOut(this.parfois,3000,2000)
        this.valeur1 = 1
        }
    }
    texte2()
    {
        if (this.valeur2 == 0){
        this.parfois = this.add.text(1130, 790, 'Mais un jour, l’une d elles s’envola, à la recherche de l’horizon.', { font: "20px SchwarzKopf", fill: "white", align:"center" }).setAlpha(0);
        this.fadeInAndOut(this.parfois,3000,2000)
        this.valeur2 = 1
        }
    }
    texte3()
    {
        if (this.valeur3 == 0){
        this.parfois = this.add.text(1730, 790, 'Laissant l’autre veuve de réponses à ses questions.', { font: "20px SchwarzKopf", fill: "white", align:"center" }).setAlpha(0);
        this.fadeInAndOut(this.parfois,3000,2000)
        this.valeur3 = 1
        }
    }
    texte4()
    {
        if (this.valeur4 == 0){
        this.parfois = this.add.text(2330, 790, 'D’un être cher perdu dans l’univers et ses confins.', { font: "20px SchwarzKopf", fill: "white", align:"center" }).setAlpha(0);
        this.fadeInAndOut(this.parfois,3000,2000)
        this.valeur4 = 1
        }
    }
    texte5()
    {
        if (this.valeur5 == 0){
        this.parfois = this.add.text(2750, 790, 'Elle erra longtemps, bravant mille dangers, pour entendre ce refrain.', { font: "20px SchwarzKopf", fill: "white", align:"center" }).setAlpha(0);
        this.fadeInAndOut(this.parfois,3000,2500)
        this.valeur5 = 1
        }
    }
};
