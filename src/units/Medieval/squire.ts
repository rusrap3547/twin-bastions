import * as ex from 'excalibur';

export interface MinionConfig {
    health: number;
    speed: number;
    damage: number;
    cost: number;
    armor?: number;
    range?: number;
    attackSpeed?: number;
    spriteSource?: ex.ImageSource;
}

export class Squire extends ex.Actor {
    public health: number;
    public maxHealth: number;
    public speed: number;
    public damage: number;
    public cost: number;
    public armor: number;
    public range: number;
    public attackSpeed: number;
    public lastAttackTime: number = 0;

    constructor(config: MinionConfig) {
        super({
            width: 32,
            height: 32,
            color: ex.Color.Brown
        });

        // Basic stats for first round low-level minions
        this.health = config.health;
        this.maxHealth = config.health;
        this.speed = config.speed;
        this.damage = config.damage;
        this.cost = config.cost;
        this.armor = config.armor ?? 0;
        this.range = config.range ?? 50;
        this.attackSpeed = config.attackSpeed ?? 1000; // milliseconds between attacks

        this.setupMovement();
        this.setupGraphics(config.spriteSource);
    }

    private setupMovement(): void {
        // Basic movement setup
        this.body.collisionType = ex.CollisionType.Active;
    }

    private setupGraphics(spriteSource?: ex.ImageSource): void {
        if (spriteSource) {
            const sprite = spriteSource.toSprite();
            this.graphics.use(sprite);
        } else {
            // Default rectangle graphics if no sprite provided
            const rect = new ex.Rectangle({
                width: 32,
                height: 32,
                color: ex.Color.Brown
            });
            this.graphics.use(rect);
        }
    }

    public takeDamage(damage: number): void {
        const actualDamage = Math.max(1, damage - this.armor);
        this.health -= actualDamage;
        
        if (this.health <= 0) {
            this.kill();
        }
    }

    public canAttack(): boolean {
        const currentTime = Date.now();
        return currentTime - this.lastAttackTime >= this.attackSpeed;
    }

    public attack(target: ex.Actor): void {
        if (this.canAttack()) {
            // Basic attack logic - override in subclasses for specific behavior
            this.lastAttackTime = Date.now();
            
            if (target && typeof (target as any).takeDamage === 'function') {
                (target as any).takeDamage(this.damage);
            }
        }
    }

    public moveTowards(target: ex.Vector): void {
        const direction = target.sub(this.pos).normalize();
        this.vel = direction.scale(this.speed);
    }

    public getHealthPercentage(): number {
        return this.health / this.maxHealth;
    }

    onInitialize(): void {
        // Setup any initialization logic here
    }

    onPreUpdate(engine: ex.Engine, delta: number): void {
        super.onPreUpdate(engine, delta);
        
        // Add common update logic here
        // e.g., AI behavior, status effects, etc.
    }
}

// Factory function for creating default first-round minions
export function createBasicSquire(): Squire {
    return new Squire({
        health: 50,
        speed: 30,
        damage: 10,
        cost: 25,
        armor: 2,
        range: 40,
        attackSpeed: 1500
    });
}
