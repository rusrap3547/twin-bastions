import * as ex from 'excalibur';

export interface MapConfig {
    width: number;
    height: number;
    castlePositions: {
        player: ex.Vector;
        enemy: ex.Vector;
    };
    spawnPoints: {
        player: ex.Vector;
        enemy: ex.Vector;
    };
    battlefieldCenter: ex.Vector;
    terrain?: TerrainFeature[];
}

export interface TerrainFeature {
    position: ex.Vector;
    size: ex.Vector;
    type: 'obstacle' | 'cover' | 'decoration';
    color?: ex.Color;
}

export class BasicMap {
    public scene: ex.Scene;
    public config: MapConfig;
    public playerCastle!: ex.Actor;
    public enemyCastle!: ex.Actor;

    constructor(config: MapConfig) {
        this.config = config;
        this.scene = new ex.Scene();
        this.setupMap();
    }

    private setupMap(): void {
        // Create background
        const background = new ex.Actor({
            pos: new ex.Vector(this.config.width / 2, this.config.height / 2),
            width: this.config.width,
            height: this.config.height
        });
        background.graphics.use(new ex.Rectangle({
            width: this.config.width,
            height: this.config.height,
            color: ex.Color.fromHex('#2d5016') // Battlefield green
        }));
        background.z = -100; // Behind everything
        this.scene.add(background);

        // Add terrain features
        if (this.config.terrain) {
            this.config.terrain.forEach(feature => this.addTerrainFeature(feature));
        }

        // Create castle placeholders (to be replaced with specific faction castles)
        this.createCastlePlaceholder('player');
        this.createCastlePlaceholder('enemy');

        // Add spawn point markers (for development - can be hidden later)
        this.addSpawnMarkers();

        // Add battlefield center line
        this.addCenterLine();
    }

    private createCastlePlaceholder(side: 'player' | 'enemy'): void {
        const position = this.config.castlePositions[side];
        const castle = new ex.Actor({
            pos: position,
            width: 80,
            height: 100
        });

        castle.graphics.use(new ex.Rectangle({
            width: 80,
            height: 100,
            color: side === 'player' ? ex.Color.Blue : ex.Color.Red
        }));

        castle.body.collisionType = ex.CollisionType.Fixed;
        castle.z = 10;

        if (side === 'player') {
            this.playerCastle = castle;
        } else {
            this.enemyCastle = castle;
        }

        this.scene.add(castle);
    }

    private addTerrainFeature(feature: TerrainFeature): void {
        const terrain = new ex.Actor({
            pos: feature.position,
            width: feature.size.x,
            height: feature.size.y
        });

        const color = feature.color || ex.Color.fromHex('#8B4513'); // Brown default
        terrain.graphics.use(new ex.Rectangle({
            width: feature.size.x,
            height: feature.size.y,
            color: color
        }));

        if (feature.type === 'obstacle') {
            terrain.body.collisionType = ex.CollisionType.Fixed;
        }

        terrain.z = feature.type === 'decoration' ? -10 : 5;
        this.scene.add(terrain);
    }

    private addSpawnMarkers(): void {
        // Player spawn marker
        const playerSpawn = new ex.Actor({
            pos: this.config.spawnPoints.player,
            width: 20,
            height: 20
        });
        playerSpawn.graphics.use(new ex.Rectangle({
            width: 20,
            height: 20,
            color: ex.Color.Cyan
        }));
        playerSpawn.z = 1;
        this.scene.add(playerSpawn);

        // Enemy spawn marker  
        const enemySpawn = new ex.Actor({
            pos: this.config.spawnPoints.enemy,
            width: 20,
            height: 20
        });
        enemySpawn.graphics.use(new ex.Rectangle({
            width: 20,
            height: 20,
            color: ex.Color.Orange
        }));
        enemySpawn.z = 1;
        this.scene.add(enemySpawn);
    }

    private addCenterLine(): void {
        const centerX = this.config.battlefieldCenter.x;
        const line = new ex.Actor({
            pos: new ex.Vector(centerX, this.config.height / 2),
            width: 2,
            height: this.config.height
        });
        line.graphics.use(new ex.Rectangle({
            width: 2,
            height: this.config.height,
            color: ex.Color.fromHex('#555555')
        }));
        line.z = -5;
        this.scene.add(line);
    }

    // Method to replace castle placeholder with actual faction castle
    public setCastle(side: 'player' | 'enemy', castleActor: ex.Actor): void {
        const oldCastle = side === 'player' ? this.playerCastle : this.enemyCastle;
        this.scene.remove(oldCastle);
        
        castleActor.pos = this.config.castlePositions[side];
        this.scene.add(castleActor);
        
        if (side === 'player') {
            this.playerCastle = castleActor;
        } else {
            this.enemyCastle = castleActor;
        }
    }

    public getSpawnPoint(side: 'player' | 'enemy'): ex.Vector {
        return this.config.spawnPoints[side];
    }

    public getBattlefieldBounds(): ex.BoundingBox {
        return new ex.BoundingBox(0, 0, this.config.width, this.config.height);
    }
}

// Factory function for creating the standard battlefield layout
export function createStandardBattlefield(): BasicMap {
    const mapConfig: MapConfig = {
        width: 1200,
        height: 800,
        castlePositions: {
            player: new ex.Vector(100, 400),  // Left side
            enemy: new ex.Vector(1100, 400)   // Right side
        },
        spawnPoints: {
            player: new ex.Vector(180, 400),  // Just right of player castle
            enemy: new ex.Vector(1020, 400)   // Just left of enemy castle
        },
        battlefieldCenter: new ex.Vector(600, 400),
        terrain: [
            // Add some basic terrain features
            {
                position: new ex.Vector(400, 300),
                size: new ex.Vector(60, 40),
                type: 'obstacle'
            },
            {
                position: new ex.Vector(800, 500),
                size: new ex.Vector(60, 40),
                type: 'obstacle'
            }
        ]
    };

    return new BasicMap(mapConfig);
}