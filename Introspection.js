class Introspection extends Phaser.Scene {

    constructor() {
        super("Introspection");
    }
    init(data){
        this.coordX = data.coordX
        this.coordY = data.coordY
    }
    preload() {

    }
    create() {

        this.carteDuNiveau = this.add.tilemap("maison");
        this.tileset = this.carteDuNiveau.addTilesetImage("petit tileset","Phaser_tuilesdejeu");
        this.calque_Murs = this.carteDuNiveau.createLayer("Murs",this.tileset);
        this.calque_Murs.setCollisionByProperty({ Dur: true })

        this.calque_sortie = this.carteDuNiveau.createLayer("sortie",this.tileset);
        this.calque_sortie.setCollisionByProperty({ Dur: true })

        this.add.image(1800, 480, 'noir').setScale(1.2);

        //Config
        this.player = this.physics.add.sprite(this.coordX, this.coordY, 'perso').setScale(0.3);
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);
        this.cursors = this.input.keyboard.createCursorKeys();
        this.physics.world.setBounds(0, 0, 3840, 960);
        this.cameras.main.setBounds(0, 0, 1840, 960);
        this.cameras.main.startFollow(this.player);
        this.physics.add.collider(this.player, this.calque_Murs);
        this.physics.add.collider(this.player, this.calque_sortie,this.switchChoix, null, this );
        

        

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
    switchChoix()
    {
        this.scene.start("Fin")
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
};
