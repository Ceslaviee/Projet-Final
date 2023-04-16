class Zone_1 extends Phaser.Scene {

    constructor() {
        super("Zone_1");
    }
    preload() {
        this.load.image("Phaser_tuilesdejeu", "doc/tileset collectable.png");
        this.load.tilemapTiledJSON("Jardin", "Json/Zone_1.json");
        this.load.image("fond_1","doc/galaxie.png")

        this.load.image('perso', 'doc/Gaïa.png',{ frameWidth: 32, frameHeight: 65 });
    }
    create() {
        this.add.image(800, 480, 'fond_1').setScale(0.47);
        this.carteDuNiveau = this.add.tilemap("Jardin");
        this.tileset = this.carteDuNiveau.addTilesetImage("petit tileset","Phaser_tuilesdejeu");
        this.calque_tentative = this.carteDuNiveau.createLayer("tentative",this.tileset);
        this.calque_tentative.setCollisionByProperty({ Dur: true })

        this.calque_switch = this.carteDuNiveau.createLayer("switch",this.tileset);
        this.calque_switch.setCollisionByProperty({ Dur: true })
        this.calque_switch.setVisible(false)

        this.player = this.physics.add.sprite(50, 900, 'perso').setScale(0.3);
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);
        this.cursors = this.input.keyboard.createCursorKeys();
        this.physics.world.setBounds(0, 0, 1600, 960);
        this.cameras.main.setBounds(0, 0, 1600, 960);
        this.cameras.main.startFollow(this.player);
        this.physics.add.collider(this.player, this.calque_tentative);
        this.physics.add.collider(this.player, this.calque_switch,this.switch1, null, this );
        

    }
    update() {
        if (this.cursors.left.isDown){ 
            this.player.setVelocityX(-160); 
        }
        else if (this.cursors.right.isDown){
            this.player.setVelocityX(160); 
        }
        else{ // sinon
            this.player.setVelocityX(0);
        }
        if (this.cursors.up.isDown && this.player.body.blocked.down){
            this.player.setVelocityY(-330);
        }

    }
    switch1() 
    {
        this.scene.start("Zone_2");
    }
};
