class Past2 extends Phaser.Scene {

    constructor() {
        super("Past2");
        this.cle = false
    }
    init(data){
        this.coordX = data.coordX
        this.coordY = data.coordY
        this.score = data.score
    }
    preload() {

    }
    create() {
        this.add.image(1800, 680, 'k').setScale(1.2);

        this.add.image(1925,920,'pétales').setScale(0.95)

        this.filant = this.physics.add.sprite(300, 40, 'filante').setScale(0.2)
        this.filant.setVelocityX(1300);
        this.filant.setVelocityY(450);
        this.filant.body.setAllowGravity(false);

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
        
        this.ouvre = this.physics.add.staticGroup();
        if(this.cle == false){
            this.ouvre.create(1750,920,'clef').setScale(0.5).setAlpha(1)
        }

        this.incidence = this.physics.add.staticGroup();
        this.plate = this.physics.add.group({allowGravity : false});
        this.incidence.create(260,920,'plante').setScale(2).setAlpha(1)
        this.plate.create(260,960,'plateforme').setScale(1).setAlpha(0).setPushable(false).setSize(100,15)
        

        this.slime3 =  this.physics.add.sprite(2780, 920, 'slime').setScale(0.4).setSize(75,75)
        this.slime2 =  this.physics.add.sprite(2700, 920, 'slime').setScale(0.4).setSize(75,75)
        this.slime3.anims.play('slime_back', true);
        this.slime2.anims.play('slime', true);

        /* texte */
        this.porte = this.physics.add.staticGroup();
        this.porte.create(210,920, 'porte').setScale(0.1).setSize(100,100);
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


        this.player = this.physics.add.sprite(this.coordX, this.coordY, 'perso2').setScale(0.3);
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);
        this.cursors = this.input.keyboard.createCursorKeys();
        this.physics.world.setBounds(0, 0, 3840, 960);
        this.cameras.main.setBounds(0, 0, 3840, 960);
        this.cameras.main.startFollow(this.player);
        this.physics.add.collider(this.player, this.calque_sol); 
        this.physics.add.collider(this.player, this.calque_change1,this.switch1, null, this )
        this.physics.add.collider(this.player, this.calque_change2,this.switch2, null, this )
        this.physics.add.collider(this.slime2, this.calque_sol);
        this.physics.add.collider(this.slime3, this.calque_sol);
        this.physics.add.overlap(this.player, this.incidence, this.interaction, null, this);
        this.physics.add.overlap(this.player, this.ouvre, this.clé, null, this);
        this.physics.add.collider(this.plate, this.player);


        
        /* overlaps */ 

        this.physics.add.overlap(this.player, this.porte, this.texte, null, this);
        this.physics.add.overlap(this.player, this.porte1, this.texte1, null, this);
        this.physics.add.overlap(this.player, this.porte2, this.texte2, null, this);
        this.physics.add.overlap(this.player, this.porte3, this.texte3, null, this);
        this.physics.add.overlap(this.player, this.porte4, this.texte4, null, this);
        this.physics.add.overlap(this.player, this.porte5, this.texte5, null, this);
        this.physics.add.overlap(this.player, this.porte6);

        this.gameButton = this.add.image(1265,50,"faille3").setScrollFactor(0).setInteractive().setScale(0.04);
        this.gameButton.on("pointerdown", this.coAudio, this);
            
        this.hor = this.add.image(650, 120, 'hor').setScale(0.3).setScrollFactor(0).setAlpha(0);
        this.fadeInAndOut(this.hor,3000,5000)

        this.porte6 = this.physics.add.staticGroup();
        this.porte6 = this.add.image(2580,870,'porte').setScale(0.08).setAlpha(1)
        if (this.cursors.shift.isDown && this.cle == true){
            this.porte6.setAlpha(0)
        }

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
        this.scene.start("Zone_2",{ coordX : this.player.x, coordY : this.player.y, score : this.score, cle : this.cle})
    }
    switch1()
    {
        this.scene.start("Past1",{
            coordX: 3735,
            coordY: 850,
        }
        )
    }
    interaction()
    {
        if (this.cursors.shift.isDown){
            this.incidence.setAlpha(0)
            this.plate.setAlpha(1)
            this.plate.setVelocityY(-40)

        }
    }
    clé()
    {
        if (this.cursors.shift.isDown){
            this.ouvre.setAlpha(0)
            this.cle = true
        }
    }
    switch2()
    {
        this.scene.start("Fin",{
            spawnX: 3735,
            spawnY: 900,
        }
        )
    }
    texte()
    {
        if (this.valeur == 0){
        this.parfois = this.add.text(110, 790, 'Il était une fois, un royaume lointain.', { font: "30px SchwarzKopf New", fill: "white", align:"center" }).setAlpha(0);
        this.fadeInAndOut(this.parfois,3000,2000)
        this.valeur = 1
        }
    }
    texte1()
    {
        if (this.valeur1 == 0){
        this.parfois = this.add.text(530, 790, 'Deux sœurs s’accommoderent de cet endroit anodin.', { font: "30px SchwarzKopf New", fill: "white", align:"center" }).setAlpha(0);
        this.fadeInAndOut(this.parfois,3000,2000)
        this.valeur1 = 1
        }
    }
    texte2()
    {
        if (this.valeur2 == 0){
        this.parfois = this.add.text(1030, 790, 'Mais un jour, l’une d elles s’envola, à la recherche de l’horizon.', { font: "30px SchwarzKopf New", fill: "white", align:"center" }).setAlpha(0);
        this.fadeInAndOut(this.parfois,3000,2000)
        this.valeur2 = 1
        }
    }
    texte3()
    {
        if (this.valeur3 == 0){
        this.parfois = this.add.text(1630, 790, 'Laissant l’autre veuve de réponses à ses questions.', { font: "30px SchwarzKopf New", fill: "white", align:"center" }).setAlpha(0);
        this.fadeInAndOut(this.parfois,3000,2000)
        this.valeur3 = 1
        }
    }
    texte4()
    {
        if (this.valeur4 == 0){
        this.parfois = this.add.text(2230, 790, 'D’un être cher perdu dans l’univers et ses confins.', { font: "30px SchwarzKopf New", fill: "white", align:"center" }).setAlpha(0);
        this.fadeInAndOut(this.parfois,3000,2000)
        this.valeur4 = 1
        }
    }
    texte5()
    {
        if (this.valeur5 == 0){
        this.parfois = this.add.text(2730, 790, 'Elle erra longtemps, bravant mille dangers, pour entendre ce refrain.', { font: "30px SchwarzKopf New", fill: "white", align:"center" }).setAlpha(0);
        this.fadeInAndOut(this.parfois,3000,2500)
        this.valeur5 = 1
        }
    }
};
