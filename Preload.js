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
        this.load.tilemapTiledJSON("Guerr", "Json/Past2.json");
        this.load.tilemapTiledJSON("debut", "Json/Debut.json");
        this.load.tilemapTiledJSON("filles","Json/Filles.json");
        this.load.image("Phaser_tuilesdejeu", "doc/tileset collectable.png");

        

        /* preload Sons */
        this.load.audio('Sans_toi', "son/Sans_toi.mp3");


        /* preload assets */
        this.load.image("bouton", "doc/étoile.png");
        this.load.image("ecran", "doc/Menu.png");
        this.load.image('bout', "doc/faille1.png");
        this.load.image('souleil', "planetes/SoleilP.png");
        this.load.image('boute', "doc/faille2.png");
        this.load.image('mais1', "doc/maison_1.png");
        this.load.image('mais2',"doc/Maison_2.png");
        this.load.image('mais3',"doc/Maison_3.png");
        this.load.image('soleil', "planetes/Soleil.png");
        this.load.image("porte", "doc/étoile.png");
        this.load.image("faille3","doc/faille3.png");
        this.load.image('fin', "doc/fin.png")
        this.load.image("k","doc/k.png")
        this.load.image('pétales',"doc/pétales.png");
        this.load.image('plante',"doc/plante.png")
        this.load.image('plateforme',"doc/plateforme.png")
        this.load.image('plante2',"doc/plante2.png")
        this.load.image('filante','doc/filante.png')
        this.load.image('clef','doc/clef.png')
        this.load.image('gandalf', 'doc/slime2_back.png')
        this.load.image('bulle', 'doc/quete.png')
        this.load.image('snow','doc/snowball.png')
        this.load.image('cred','doc/Credits.png')
        this.load.image('coussin','doc/coussin.png')
        this.load.image('coussin2','doc/rouge-coussin.png')
        this.load.image('GO','doc/souvenir.png')
        this.load.image('chapitres','doc/Chapitres.png')
        this.load.image('prélude','doc/Prélode.png')
        this.load.image('Aphélion','doc/Aphélion.png')
        this.load.image('Périhélie','doc/Périhélie.png')
        this.load.image('horizon','doc/hoziron.png')
        this.load.image('fondu','doc/bleu_fonc.png')
        this.load.image('obstacle','doc/arbre.png')
        this.load.image('collier','doc/collier.png')
        this.load.image('adieu','doc/voila.png')
        this.load.image('masoeur','doc/adieu.png')
        

        /* preload planetes */
        this.load.image('blanc','planetes/blanc.png')
        this.load.image('bleu','planetes/bleu.png')
        this.load.image('pixel','planetes/pixel.png')
        this.load.image('rose','planetes/rose.png')
        this.load.image('rouge','planetes/rouge.png')
        this.load.image('vert','planetes/vert.png')
        this.load.image('violet','planetes/violet.png')

        /* preload Textes */
        this.load.image("coment","doc/Commencement.png");


        /* preload Backgrounds */
        this.load.image("fond_1","doc/galaxie.png");
        this.load.image("fond","doc/Fond_Menu.png");
        this.load.image('hor', "doc/horizon.png");
        this.load.image("k2","doc/k2.png");
        this.load.image("fond_2","doc/galaxie2.png");
        this.load.image("fond_final","doc/rose.png");
        this.load.image("fleur","doc/fleur.png");
        this.load.image("hf_fleur","doc/hf_fleur.png");
        this.load.image("noir","doc/noir.png")

        /* preload Animations */
        this.load.image('perso', 'doc/Gaïa.png',{ frameWidth: 32, frameHeight: 65 });
        this.load.spritesheet("slime", "doc/slime.png",{frameWidth : 262, frameHeight: 192});
        this.load.spritesheet("slime_back", "doc/slime_back.png",{frameWidth : 262, frameHeight: 192});
        this.load.spritesheet("sadslime", "doc/sadslime.png",{frameWidth : 262, frameHeight: 192});
        this.load.spritesheet("slimeR", "doc/slime2.png",{frameWidth : 262, frameHeight: 192});
        this.load.spritesheet("slimeRed", "doc/slime2_back.png",{frameWidth : 262, frameHeight: 192});
        this.load.spritesheet('stop', 'doc/idle.png',{frameWidth : 161, frameHeight: 217});
        this.load.spritesheet('marche', 'doc/animation2.png',{frameWidth : 160, frameHeight: 230});
        this.load.spritesheet('fire','doc/fire.png',{frameWidth : 210, frameHeight: 158})
        this.load.spritesheet('fire2','doc/feu.png',{frameWidth : 210, frameHeight: 158})
        this.load.image('perso2', 'doc/Gala.png',{ frameWidth: 32, frameHeight: 65 });
        
        
    }
    create() {  

        console.log("Gloire a Yoshinori Kitase")

        this.anims.create({
            key: 'fire',
            frames: this.anims.generateFrameNumbers('fire', {start:0,end:5}),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'fire2',
            frames: this.anims.generateFrameNumbers('fire2', {start:0,end:5}),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key: 'animslime',
            frames: this.anims.generateFrameNumbers('slimeR', {start:0,end:1}),
            frameRate: 1,
            repeat: -1
        })

        this.anims.create({
            key: 'slime',
            frames: this.anims.generateFrameNumbers('slime', {start:0,end:1}),
            frameRate: 1,
            repeat: -1
        })

        this.anims.create({
            key: 'slime_back',
            frames: this.anims.generateFrameNumbers('slime_back', {start:0,end:1}),
            frameRate: 1,
            repeat: -1
        })

        this.anims.create({
            key: 'sadslime',
            frames: this.anims.generateFrameNumbers('sadslime', {start:0,end:4}),
            frameRate: 1,
            repeat: -1
        })

        this.anims.create({
            key: 'animslime_back',
            frames: this.anims.generateFrameNumbers('slimeRed', {start:0,end:1}),
            frameRate: 1,
            repeat: -1
        })


        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('stop', {start:0,end:1}),
            frameRate: 1,
            repeat: -1
        })


        this.anims.create({
            key: 'gauche',
            frames: this.anims.generateFrameNumbers('marche', {start:19,end:11}),
            frameRate: 5,
            repeat: -1
        })


        this.anims.create({
            key: 'droite',
            frames: this.anims.generateFrameNumbers('marche', {start:0,end:8}),
            frameRate: 5,
            repeat: -1
        })


        this.anims.create({
            key: 'idle_droite',
            frames: this.anims.generateFrameNumbers('marche', {start:9,end:9}),
            frameRate: 1,
            repeat: -1
        })


        this.anims.create({
            key: 'idle_gauche',
            frames: this.anims.generateFrameNumbers('marche', {start:10,end:10}),
            frameRate: 1,
            repeat: -1
        })

        
        this.scene.start('Main')
    }   
}