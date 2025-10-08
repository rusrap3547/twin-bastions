import * as ex from 'excalibur';

// 1. Background Animation Setup
// 1.1. Reserve a layer or actor for the animated background. (ex.Actor, ex.ScreenElement)
class StartButton extends ex.Actor {
    constructor() {
        super({
            x: 400,
            y: 300,
            width: 200,
            height: 50,
            color: ex.Color.Azure
        });
    }

    onInitialize(engine: ex.Engine) {
        const label = new ex.Label({
            text: 'Start Game',
            pos: ex.vec(0, 0),
            font: new ex.Font({ size: 24, color: ex.Color.Black, family: 'Arial', textAlign: ex.TextAlign.Center, baseAlign: ex.BaseAlign.Middle })
        });
        label.anchor.setTo(0.5, 0.5);
        this.graphics.use(label);
        this.on('pointerup', () => {
            engine.goToScene('game'); // Replace 'game' with your actual game scene key
        });
        this.enableCapturePointer = true;
        this.pointer.useGraphicsBounds = true;
    }
}

class mainMenu extends ex.Scene {
    private _startButton!: StartButton;

    public onInitialize(engine: ex.Engine) {
        // Background (placeholder)
        const bg = new ex.Actor({
            x: engine.halfDrawWidth,
            y: engine.halfDrawHeight,
            width: engine.drawWidth,
            height: engine.drawHeight,
            color: ex.Color.fromHex('#222244')
        });
        bg.z = 0;
        this.add(bg);

        // Title
        const title = new ex.Label({
            text: 'Twin Bastions',
            pos: ex.vec(engine.halfDrawWidth, 120),
            font: new ex.Font({ size: 48, color: ex.Color.White, family: 'Arial', textAlign: ex.TextAlign.Center, baseAlign: ex.BaseAlign.Middle })
        });
        title.anchor.setTo(0.5, 0.5);
        title.z = 1;
        this.add(title);

        // Start Button
        this._startButton = new StartButton();
        this._startButton.z = 2;
        this.add(this._startButton);
    }
}

    // 1.2. Plan where to load and initialize background assets or sprites. (ex.ImageSource, ex.Sprite, ex.Animation)

    // 1.3. Decide how the animation will update each frame (e.g., via onPreUpdate or onPostUpdate). (ex.Actor.onPreUpdate, ex.Actor.onPostUpdate)

    // 1.4. Add a placeholder actor or logic for the background animation. (ex.Actor, ex.Graphics.use())

// 2. Main Menu UI Elements
    // 2.1. Design the main menu layout (vertical/horizontal alignment, spacing). (ex.Vector, positioning)
    
    // 2.2. Create a title label actor and set its font, size, and position. (ex.Label, ex.Font, ex.FontSource)

    // 2.3. Create button actors for each menu option (e.g., "Start Game", "Options", "Exit"). (ex.Actor, ex.Label)

    // 2.4. Style each button (background, hover effect, text). (ex.Rectangle, ex.Color, ex.Actor.graphics)

    // 2.5. Position the buttons relative to the scene or each other. (ex.Vector, ex.Actor.pos)

// 3. Button Interactivity
    // 3.1. Add pointer or keyboard event listeners to each button. (ex.Actor.on('pointerup'), ex.Actor.on('pointerenter'))

    // 3.2. Define what happens when each button is clicked or activated. (event handlers, callbacks)

    // 3.3. For "Start Game", transition to the main game scene. (ex.Engine.goToScene())

    // 3.4. For "Options", open an options menu or scene. (ex.Engine.goToScene(), ex.Scene)

    // 3.5. For "Exit", close the game or return to a previous screen. (ex.Engine.stop(), window.close())

// 4. Scene Assembly
    // 4.1. Add the background animation actor to the scene. (ex.Scene.add())

    // 4.2. Add the title and button actors to the scene. (ex.Scene.add())

    // 4.3. Ensure the draw order is correct (background behind UI). (ex.Actor.z, ex.Scene.add() order)

    // 4.4. Optionally, add sound or music to the scene. (ex.Sound, ex.Scene.onInitialize())

// 5. Scene Integration
    // 5.1. Export the mainMenu scene for use in the main game file. (export default, module.exports)

    // 5.2. Register the mainMenu scene with the Excalibur game instance. (ex.Engine.addScene())
    
    // 5.3. Set the mainMenu as the starting scene when the game loads. (ex.Engine.goToScene(), ex.Engine.start())