class Debut extends Phaser.Scene {

    constructor() {
        super("Debut");
    }
    init(data){
        this.spawnX = data.spawnX
        this.spawnY = data.spawnY
        this.coordX = data.coordX
        this.coordY = data.coordY
    }
    preload() {
        this.load.image("Phaser_tuilesdejeu", "doc/tileset collectable.png");
        this.load.tilemapTiledJSON("debut", "Json/Debut.json");
        this.load.image("fond_1","doc/galaxie.png")
        this.load.image('perso', 'doc/Gaïa.png',{ frameWidth: 32, frameHeight: 65 });
        //this.load.audio('Dead_Ends', "son/Dead_Ends.mp3");
        this.load.image('bout', "doc/faille1.png")
        
    }
    create() {

        this.add.image(1800, 480, 'fond_1').setScale(1.2);
        this.carteDuNiveau = this.add.tilemap("debut");
        this.tileset = this.carteDuNiveau.addTilesetImage("petit tileset","Phaser_tuilesdejeu");
        this.calque_herbe = this.carteDuNiveau.createLayer("herbe",this.tileset);
        this.calque_herbe.setCollisionByProperty({ Dur: true })

        this.calque_meson = this.carteDuNiveau.createLayer("meson",this.tileset);
        this.calque_meson.setCollisionByProperty({ Dur: true })
        this.calque_meson.setVisible(false)

        //Config
        this.player = this.physics.add.sprite(this.coordX, this.coordY, 'perso').setScale(0.3);
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);
        this.cursors = this.input.keyboard.createCursorKeys();
        this.physics.world.setBounds(0, 0, 3840, 960);
        this.cameras.main.setBounds(0, 0, 3840, 960);
        this.cameras.main.startFollow(this.player);
        this.physics.add.collider(this.player, this.calque_herbe);
        this.physics.add.collider(this.player, this.calque_meson,this.switch1, null, this );


        this.gameButton = this.add.image(865,845,"bout").setScrollFactor(0).setInteractive().setScale(0.04);
        this.gameButton.on("pointerdown", this.coAudio, this);

        

    }
        
    update() {
        if (this.cursors.left.isDown){ 
            this.player.setVelocityX(-260); 
        }
        else if (this.cursors.right.isDown){
            this.player.setVelocityX(1060); 
        }
        else{ // sinon
            this.player.setVelocityX(0);
        }
        if (this.cursors.up.isDown && this.player.body.blocked.down){
            this.player.setVelocityY(-330);
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
            coordY: 840    
        }
        );}
    
    défilage()
    {

    }
}