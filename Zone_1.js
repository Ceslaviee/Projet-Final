class Zone_1 extends Phaser.Scene {

    constructor() {
        super("Zone_1");
    }
    preload() {
        this.load.image("Phaser_tuilesdejeu", "doc/tileset collectable.png");
        this.load.tilemapTiledJSON("Jardin", "Json/Zone_1.json");

        this.load.spritesheet('perso', 'doc/Gaïa.png',
        { frameWidth: 32, frameHeight: 65 });
    }
    create() {
        this.carteDuNiveau = this.add.tilemap("Jardin");
        this.tileset = this.carteDuNiveau.addTilesetImage("petit tileset","Phaser_tuilesdejeu");
        const calque_tentative = this.carteDuNiveau.createLayer("tentative",this.tileset);
        

        this.player = this.physics.add.sprite(800, 1200, 'perso').setScale(0.8);
        this.player.setCollideWorldBounds(true);
        this.cursors = this.input.keyboard.createCursorKeys();
        this.physics.add.collider(this.player, calque_tentative);
        this.physics.world.setBounds(0, 0, 1600, 1600);
        this.cameras.main.setBounds(0, 0, 1600, 1600);
        this.cameras.main.startFollow(this.player);

    }
    update() {
        if (this.cursors.left.isDown && this.cursors.down.isDown) {
            this.player.setVelocityX(-260); //alors vitesse négative en X
            this.player.setVelocityY(260);
        }
        else if (this.cursors.right.isDown && this.cursors.down.isDown) {
            this.player.setVelocityX(260); //alors vitesse négative en X
            this.player.setVelocityY(260);
        }
        else if (this.cursors.left.isDown && this.cursors.up.isDown) {
            this.player.setVelocityX(-260); //alors vitesse négative en X
            this.player.setVelocityY(-260);
        }
        else if (this.cursors.right.isDown && this.cursors.up.isDown) {
            this.player.setVelocityX(260); //alors vitesse négative en X
            this.player.setVelocityY(-260);
        }

        else if (this.cursors.left.isDown) { //si la touche gauche est appuyée
            this.player.setVelocityX(-260); //alors vitesse négative en X
            this.player.setVelocityY(0);
        }
        else if (this.cursors.right.isDown) { //sinon si la touche droite est appuyée
            this.player.setVelocityX(260); //alors vitesse positive en X
            this.player.setVelocityY(0);
        }
        else if (this.cursors.up.isDown) { //sinon si la touche droite est appuyée
            this.player.setVelocityY(-260); //alors vitesse positive en X
            this.player.setVelocityX(0);
        }
        else if (this.cursors.down.isDown) { //sinon si la touche droite est appuyée
            this.player.setVelocityY(260); //alors vitesse positive en X
            this.player.setVelocityX(0);
        }
        else { // sinon
            this.player.setVelocityY(0);
            this.player.setVelocityX(0);
        }

    }
};
