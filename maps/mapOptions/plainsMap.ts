import * as ex from 'excalibur';

export const Plains = (engine: ex.Engine): ex.Scene => {
    const scene = new ex.Scene();

    // --- Tile layers ---
    // Add your tilemap / tilesets here.
    // Example (pseudo):
    // const groundLayer = new ex.Actor({ x: 0, y: 0 });
    // groundLayer.graphics.use(groundSpriteSheet.toSprite());
    // scene.add(groundLayer);

    // --- Collision / boundaries ---
    // Add fixed actors for walls, cliffs, etc.
    // const wall = new ex.Actor({
    //   x: 400, y: 300, width: 800, height: 32, collisionType: ex.CollisionType.Fixed
    // });
    // scene.add(wall);

    // --- Props / entities ---
    // Place trees, rocks, NPCs as actors
    // const tree = new ex.Actor({ x: 200, y: 200 });
    // tree.graphics.use(treeSprite);
    // scene.add(tree);

    // --- Spawn points / metadata ---
    // export or attach spawn points/waypoints to the scene as needed
    // scene.data = { playerSpawn: { x: 100, y: 100 } };

    return scene;
};

