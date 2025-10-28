import * as ex from 'excalibur';
import { game } from '../src/main';

const mainMenu = new ex.Scene {
    {
        onInitialize(engine) {
            // register this scene on the engine/global game instance
            game.addScene('mainMenu', this);

            const cx = engine.drawWidth / 2;
            const cy = engine.drawHeight / 2;

            const title = new ex.Label({
                text: 'Twin Bastions',
                pos: ex.vec(cx, cy - 120),
                color: ex.Color.White,
                textAlign: ex.TextAlign.Center,
                font: new ex.Font({ size: 48 })
            });

            const startButton = new ex.Label({
                text: 'Start',
                pos: ex.vec(cx, cy),
                color: ex.Color.Yellow,
                textAlign: ex.TextAlign.Center,
                font: new ex.Font({ size: 32 })
            });

            startButton.cursor = 'pointer';
            startButton.on('pointerdown', () => {
                // replace 'play' with whatever scene name you use for gameplay
                game.goToScene('play');
            });

            this.add(title);
            this.add(startButton);
        }
    }
}