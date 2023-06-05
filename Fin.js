class Fin extends Phaser.Scene {

    constructor() {
        super("Fin");
    }
    preload() {

    }
    create() {
        this.add.image(650,380,'fond_final').setScale(0.4)
        this.add.image(620,440,'masoeur').setScale(0.35)
        this.hfin = this.add.image(650,780,'End').setScale(0.3).setAlpha(0);
        this.fadeInAndOut(this.hfin,12000,10000)
        this.hf = this.add.image(650, 780, 'fin').setScale(0.3).setScrollFactor(0).setAlpha(0);
        this.fadeInAndOut(this.hf,2000,5000)



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
