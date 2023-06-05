class Past2 extends Phaser.Scene {

    constructor() {
        super("Past2");
        this.cle = false
    }
    init(data){
        this.coordX = data.coordX
        this.coordY = data.coordY
        this.score = data.score
        this.quest = data.quest
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
        this.plate = this.physics.add.sprite(260,960,'plateforme').setScale(1).setAlpha(0).setPushable(false).setSize(100,15);
        this.plate.body.setAllowGravity(false)
        this.incidence.create(260,920,'plante').setScale(2).setAlpha(1)
        

        this.slime3 =  this.physics.add.sprite(3080, 920, 'slime').setScale(0.4).setSize(75,75)
        this.slime2 =  this.physics.add.sprite(3000, 920, 'slime').setScale(0.4).setSize(75,75)
        this.slime3.anims.play('slime_back', true);
        this.slime2.anims.play('slime', true);

        /* texte */
        this.porte = this.physics.add.staticGroup();
        this.porte.create(310,920, 'porte').setScale(0.1).setSize(100,100);
        this.porte.setVisible(false)
        /* texte1 */
        this.porte1 = this.physics.add.staticGroup();
        this.porte1.create(280,680, 'porte').setScale(0.2);
        this.porte1.setVisible(false)
        /* texte2 */
        this.porte2 = this.physics.add.staticGroup();
        this.porte2.create(1130,780, 'porte').setScale(0.2);
        this.porte2.setVisible(false)
        /* texte3 */
        this.porte3 = this.physics.add.staticGroup();
        this.porte3.create(1860,940, 'porte').setScale(0.2).setSize(75,75);
        this.porte3.setVisible(false)
        /* texte4 */        
        this.porte4 = this.physics.add.staticGroup();
        this.porte4.create(2530,480, 'porte').setScale(0.2);
        this.porte4.setVisible(false)
        /* texte5 */        
        this.porte5 = this.physics.add.staticGroup();
        this.porte5.create(2830,920, 'porte').setScale(0.2);
        this.porte5.setVisible(false)

        this.obstrue = this.physics.add.staticGroup();
        this.obstrue.create(2500, 820,'obstacle').setSize(90,350);
        this.obstrue.setVisible(false)

        this.add.sprite(2500,890,'slime').setScale(0.6)

        this.feu = this.physics.add.sprite(1785, 220, 'fire').setScale(0.7).setSize(65,65)
        this.feu1 = this.physics.add.sprite(1885, 320, 'fire').setScale(0.7).setSize(65,65)
        this.feu2 = this.physics.add.sprite(1985, 420, 'fire').setScale(0.7).setSize(65,65)

        this.collier = this.physics.add.staticGroup();
        this.collier.create(2290,530,'collier').setScale(0.2)






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
        this.physics.add.collider(this.player, this.calque_chute1,this.restar, null, this )
        this.physics.add.collider(this.slime2, this.calque_sol);
        this.physics.add.collider(this.slime3, this.calque_sol);
        this.physics.add.overlap(this.player, this.incidence, this.interaction, null, this);
        this.physics.add.overlap(this.player, this.ouvre, this.clé, null, this);
        this.physics.add.collider(this.plate, this.player);
        this.physics.add.collider(this.obstrue, this.player);
        this.physics.add.collider(this.feu, this.calque_sol);
        this.physics.add.collider(this.feu1, this.calque_sol);
        this.physics.add.collider(this.feu2, this.calque_sol);

        this.physics.add.collider(this.feu, this.calque_sol);
        this.physics.add.collider(this.player, this.feu, this.hitBomb, null, this);
        this.physics.add.collider(this.feu1, this.calque_sol);
        this.physics.add.collider(this.player, this.feu1, this.hitBomb, null, this);
        this.physics.add.collider(this.feu2, this.calque_sol);
        this.physics.add.collider(this.player, this.feu2, this.hitBomb, null, this);
        

        this.feu.setBounce(1)
        this.feu1.setBounce(1)
        this.feu2.setBounce(1)

        
        /* overlaps */ 

        this.physics.add.overlap(this.player, this.porte, this.texte, null, this);
        this.physics.add.overlap(this.player, this.porte1, this.texte1, null, this);
        this.physics.add.overlap(this.player, this.porte2, this.texte2, null, this);
        this.physics.add.overlap(this.player, this.porte3, this.texte3, null, this);
        this.physics.add.overlap(this.player, this.porte4, this.texte4, null, this);
        this.physics.add.overlap(this.player, this.porte5, this.texte5, null, this);
        this.physics.add.overlap(this.player, this.collier, this.histoire, null, this);

        this.gameButton = this.add.image(1265,50,"faille3").setScrollFactor(0).setInteractive().setScale(0.04);
        this.gameButton.on("pointerdown", this.coAudio, this);
            
        this.hor = this.add.image(650, 120, 'hor').setScale(0.3).setScrollFactor(0).setAlpha(0);
        this.fadeInAndOut(this.hor,3000,5000)

        this.gameover = this.add.image(650, 450, 'GO').setAlpha(0).setScrollFactor(0).setScale(1.05)

        this.valeur = 0
        this.valeur1 = 0
        this.valeur2 = 0
        this.valeur3 = 0
        this.valeur4 = 0
        this.valeur5 = 0

        this.lux = 0


    }
    update() {
        if (this.feu.body.velocity.y < 0){
            this.feu.anims.play('fire2',true)
        }
        else[
            this.feu.anims.play('fire',true)
        ]
        if (this.feu1.body.velocity.y < 0){
            this.feu1.anims.play('fire2',true)
        }
        else[
            this.feu1.anims.play('fire',true)
        ]
        if (this.feu2.body.velocity.y < 0){
            this.feu2.anims.play('fire2',true)
        }
        else[
            this.feu2.anims.play('fire',true)
        ]
        if (this.cursors.space.isDown){
            this.changementZone()
        }
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
        if(this.plate.y <= 730){
            this.plate.body.setVelocity(0)
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
    histoire(){
        if(this.cursors.shift.isDown){
            this.collier.setAlpha(0)
        }

    }
    hitBomb(player, feu){
        this.physics.pause();
        this.cameras.main.fadeOut(3000, 0, 0, 0)
        this.time.delayedCall(5000,this.respawn,[],this)
        }
    clé()
    {
        if (this.cursors.shift.isDown){
            this.ouvre.setAlpha(0)
            this.cle = true
            this.add.text(1750, 590, 'clef', { font: "30px SchwarzKopf New", fill: "white", align:"center" }).setAlpha(0);
        }
    }
    coAudio()
    {
        this.audio = this.sound.add('Sans_toi',{
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
    switch2()
    {
        this.scene.start("Introspection",{
            coordX: 35,
            coordY: 760,
        }
        )
    }
    texte()
    {
        if (this.valeur == 0){
        this.parfois = this.add.text(10, 790, 'Ravagé par le regret elle pris une décision', { font: "20px Times New Roman", fill: "grey", align:"center" }).setAlpha(0);
        this.fadeInAndOut(this.parfois,3000,3000)
        this.valeur = 1
        }
    }
    texte1()
    {
        if (this.valeur1 == 0){
        this.parfois = this.add.text(230, 620, 'Elle enfouirais ces souvenirs au fond de sa mémoire.', { font: "20px Times New Roman", fill: "grey", align:"center" }).setAlpha(0);
        this.fadeInAndOut(this.parfois,3000,3000)
        this.valeur1 = 1
        }
    }
    texte2()
    {
        if (this.valeur2 == 0){
        this.parfois = this.add.text(920, 680, "Et plus jamais souffrirai t'elle de sa perte", { font: "20px Times New Roman", fill: "grey", align:"center" }).setAlpha(0);
        this.fadeInAndOut(this.parfois,3000,3000)
        this.valeur2 = 1
        }
    }
    texte3()
    {
        if (this.valeur3 == 0){
        this.parfois = this.add.text(1630, 790, 'Elles répandit ses possession au quatre coins du monde', { font: "20px Times New Roman", fill: "grey", align:"center" }).setAlpha(0);
        this.fadeInAndOut(this.parfois,3000,3000)
        this.valeur3 = 1
        }
    }
    texte4()
    {
        if (this.valeur4 == 0){
        this.parfois = this.add.text(2330, 490, "Et de toutes ces péripéties seul un bracelet reste", { font: "20px Times New Roman", fill: "grey", align:"center" }).setAlpha(0);
        this.fadeInAndOut(this.parfois,3000,3000)
        this.valeur4 = 1
        }
    }
    texte5()
    {
        if (this.valeur5 == 0){
        this.parfois = this.add.text(2730, 790, 'Elle se tourna de tous et de tout telle une étoile mourante.', { font: "20px Times New Roman", fill: "grey", align:"center" }).setAlpha(0);
        this.fadeInAndOut(this.parfois,3000,3000)
        this.valeur5 = 1
        }
    }
    restar()
    {
        this.physics.pause()
        this.gameover.setAlpha(1)
        this.fadeInAndOut(this.gameover,2000,1000)
        this.time.delayedCall(3000,this.respawn,[],this)
    }
    respawn()
    {
        this.scene.restart({coordX: 97,coordY: 900,})
    }
};
