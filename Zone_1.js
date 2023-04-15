class Zone_1 extends Phaser.Scene {

    constructor() {
        super("Zone_1");
    }
    preload() {
        this.load.image("Phaser_tuilesdejeu", "doc/tileset collectable.png");
        this.load.tilemapTiledJSON("Jardin", "Json/Zone_1.json");

        this.load.image('perso', 'doc/Gaïa.png',{ frameWidth: 32, frameHeight: 65 });
    }
    create() {
        this.carteDuNiveau = this.add.tilemap("Jardin");
        this.tileset = this.carteDuNiveau.addTilesetImage("petit tileset","Phaser_tuilesdejeu");
        this.calque_tentative = this.carteDuNiveau.createLayer("tentative",this.tileset);
        this.calque_tentative.setCollisionByProperty({ Dur: true })

        this.player = this.physics.add.sprite(0, 0, 'perso').setScale(0.8);
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);
        this.cursors = this.input.keyboard.createCursorKeys();
        this.physics.add.collider(this.player, this.calque_tentative);
        this.physics.world.setBounds(0, 0, 1600, 960);
        this.cameras.main.setBounds(0, 0, 1600, 960);
        this.cameras.main.startFollow(this.player);
        this.physics.add.collider(this.player, this.calque_tentative);
        

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
};
