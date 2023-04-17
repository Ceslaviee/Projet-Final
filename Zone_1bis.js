class Zone_1bis extends Phaser.Scene {

    constructor() {
        super("Zone_1bis");
    }
    init(data){
        this.spawnX = data.spawnX
        this.spawnY = data.spawnY
    }
    preload() {
        this.load.image("Phaser_tuilesdejeu", "doc/tileset collectable.png");
        this.load.tilemapTiledJSON("Jardin", "Json/Zone_1bis.json");
        this.load.image("fond_1","doc/galaxie.png")
        this.load.image('perso', 'doc/Gaïa.png',{ frameWidth: 32, frameHeight: 65 });
        this.load.image('soleil', "planetes/Soleil.png");
        this.load.audio('Dead_Ends', "son/Dead_Ends.mp3");
        this.load.spritesheet('final', "doc/final.png",{ frameWidth: 971, frameHeight: 143})
        
    }
    create() {

        
        this.add.image(1800, 480, 'fond_1').setScale(1.2);
        this.carteDuNiveau = this.add.tilemap("Jardin");
        this.tileset = this.carteDuNiveau.addTilesetImage("petit tileset","Phaser_tuilesdejeu");
        this.calque_tentative = this.carteDuNiveau.createLayer("tentative",this.tileset);
        this.calque_tentative.setCollisionByProperty({ Dur: true })
        this.hf = this.add.sprite(450, 80, 'final').setScale(0.8).setScrollFactor(0);
        

        //Audio 
        this.audio = this.sound.add('Dead_Ends',{
            volume : 0.1, loop : true
        })
        this.audio.play()

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
            const POcol = this.pickup.create(calque_point.x, calque_point.y, "soleil").setScale(0.3).body.setAllowGravity(false);
        });


        //Config
        this.player = this.physics.add.sprite(this.spawnX, this.spawnY, 'perso').setScale(0.3);
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);
        this.cursors = this.input.keyboard.createCursorKeys();
        this.physics.world.setBounds(0, 0, 3840, 960);
        this.cameras.main.setBounds(0, 0, 3840, 960);
        this.cameras.main.startFollow(this.player);
        this.physics.add.collider(this.player, this.calque_tentative);
        this.physics.add.collider(this.player, this.calque_switch,this.switch1, null, this );
        this.physics.add.collider(this.player, this.calque_chute,this.respawn, null, this );
        this.physics.add.overlap(this.player, this.pickup, this.upScore, null, this );

        this.score = 0
        this.scoreTexte = this.add.text(880, 40, this.score, {
            fontSize : '32px', fill : "#000"
        }).setScrollFactor(0)


        this.anims.create({
            key: '1',
            frames: this.anims.generateFrameNumbers('final', {start:0,end:6}),
            frameRate: 14
            
        });
        this.hf.anims.play('1', true)


        


        


        

    }
    update() {

        if (this.cursors.space.isDown){ 
            this.time.delayedCall(
                1000,

                () => {
                    this.hf.anims.playReverse('1', true)

            },[],this)
        }
        
        if (this.cursors.left.isDown){ 
            this.player.setVelocityX(-260); 
        }
        else if (this.cursors.right.isDown){
            this.player.setVelocityX(560); 
        }
        else{ // sinon
            this.player.setVelocityX(0);
        }
        if (this.cursors.up.isDown && this.player.body.blocked.down){
            this.player.setVelocityY(-330);
        }


    }

    upScore(player,pickup)
    {
        pickup.destroy()
        this.score += 1
        this.scoreTexte.setText(this.score)
    }
    switch1() 
    {
        this.audio.stop()
        this.scene.start("Zone_2",{
            
        spawnX : 97,
        spawnY : 900,
        
            
        }
        );
    }
    respawn()
    {
        this.audio.stop()
        this.scene.restart()

    }
};
