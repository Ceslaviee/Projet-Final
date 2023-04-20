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
        // Récupérer l'opacité initiale de l'image
        const initialOpacity = image.alpha;
    
        // Augmenter progressivement l'opacité de l'image jusqu'à 1 (pleine opacité)
        this.tweens.add({
            targets: image,
            alpha: 1,
            duration: duration / 2, // La moitié de la durée totale pour augmenter l'opacité
            onComplete: () => {
                // Attendre un certain délai avant de réduire à nouveau l'opacité
                this.time.delayedCall(fadeOutDelay, () => {
                    // Réduire progressivement l'opacité de l'image jusqu'à l'opacité initiale
                    this.tweens.add({
                        targets: image,
                        alpha: initialOpacity,
                        duration: duration / 2, // La moitié de la durée totale pour réduire l'opacité
                    });
                });
            }
        });
    }
};
