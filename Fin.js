class Fin extends Phaser.Scene {

    constructor() {
        super("Fin");
    }
    preload() {
        this.load.image('fin', "doc/fin.png",{ frameWidth: 3005, frameHeight: 385})
    }
    create() {
        this.hf = this.add.image(450, 780, 'fin').setScale(0.3).setScrollFactor(0).setAlpha(0);
        this.fadeInAndOut(this.hf,3000,5000)


    }
    update() {}
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
