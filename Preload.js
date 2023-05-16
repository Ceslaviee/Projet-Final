class Preload extends Phaser.Scene {
    constructor() {
        super("Preload");
    }
    preload() {
        /* preload Tileset et Maps */
        this.load.tilemapTiledJSON("maison", "Json/Maison.json");
        this.load.tilemapTiledJSON("jar", "Json/Past_1.json");
        this.load.tilemapTiledJSON("Jardin", "Json/Zone_1.json");
        this.load.tilemapTiledJSON("Guerre", "Json/Zone_2.json");
        this.load.image("Phaser_tuilesdejeu", "doc/tileset collectable.png");

        /* preload Sons */
        this.load.audio('Dead_Ends', "son/Dead_Ends.mp3");

        /* preload assets */
        this.load.image("bouton", "doc/étoile.png");
        this.load.image("ecran", "doc/Menu.png");
        this.load.image('bout', "doc/faille1.png");
        this.load.image('souleil', "planetes/SoleilP.png");
        this.load.image('boute', "doc/faille2.png");
        this.load.image('mais3',"doc/Maison_3.png");
        this.load.image('soleil', "planetes/Soleil.png");
        this.load.image('mais2',"doc/Maison_2.png");
        this.load.image("porte", "doc/étoile.png");
        this.load.image("faille3","doc/faille3.png");
        this.load.image('fin', "doc/fin.png")

        /* preload Textes */
        this.load.image('prélude', "doc/prélude.png");
        this.load.image("coment","doc/Commencement.png");


        /* preload Backgrounds */
        this.load.image("fond_1","doc/galaxie.png");
        this.load.image("fond","doc/Fond_Menu.png");
        this.load.image('hor', "doc/horizon.png");
        this.load.image("k2","doc/k2.png");
        this.load.image("fond_2","doc/galaxie2.png");
        this.load.image("fond_final","doc/rose.png")

        /* preload Animations */
        this.load.image('perso', 'doc/Gaïa.png',{ frameWidth: 32, frameHeight: 65 });
        this.load.spritesheet("slime", "doc/slime.png",{frameWidth : 262, frameHeight: 192});
        this.load.spritesheet("slimeR", "doc/slime2.png",{frameWidth : 262, frameHeight: 192});
        this.load.spritesheet("slimeRed", "doc/slime2_back.png",{frameWidth : 262, frameHeight: 192});
        this.load.spritesheet('cligne', 'doc/blinkD.png',{frameWidth : 161, frameHeight: 217});
        
        
    }
    create() {  

        this.anims.create({
            key: 'anim1',
            frames: this.anims.generateFrameNumbers('cligne', {start:0,end:4}),
            frameRate: 1,
            repeat: -1
        })

        this.anims.create({
            key: 'animslime',
            frames: this.anims.generateFrameNumbers('slimeR', {start:0,end:1}),
            frameRate: 1,
            repeat: -1
        })

        this.anims.create({
            key: 'animslime_back',
            frames: this.anims.generateFrameNumbers('slimeRed', {start:0,end:1}),
            frameRate: 1,
            repeat: -1
        })

        this.player = this.physics.add.sprite(this.coordX, this.coordY, 'cligne').setScale(0.43).setSize(150,150);
        this.player.setCollideWorldBounds(true);

        
        this.scene.start('Main')
    }   
}