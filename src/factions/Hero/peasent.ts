export interface MinionOptions {
    name?: string;
    health?: number;
    maxHealth?: number;
    attack?: number;
    speed?: number;
    level?: number;
    sprite?: string;
}

export class Minion {
    name: string;
    health: number;
    maxHealth: number;
    attack: number;
    speed: number;
    level: number;
    sprite?: string;

    constructor(opts: MinionOptions = {}) {
        this.name = opts.name ?? 'Minion';
        this.maxHealth = opts.maxHealth ?? opts.health ?? 50;
        this.health = opts.health ?? this.maxHealth;
        this.attack = opts.attack ?? 5;
        this.speed = opts.speed ?? 1;
        this.level = opts.level ?? 1;
        this.sprite = opts.sprite;
    }

    takeDamage(amount: number) {
        this.health = Math.max(0, this.health - amount);
    }

    isAlive(): boolean {
        return this.health > 0;
    }
}

export class Peasant extends Minion {
    constructor(opts: MinionOptions = {}) {
        super({
            name: 'Peasant',
            maxHealth: 20,
            attack: 1,
            speed: 1.2,
            ...opts
        });
    }
}