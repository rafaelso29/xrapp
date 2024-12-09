import { ParticleSystem, Color4, Vector3, Texture } from "babylonjs";
const log = console.log

let fireSystem = undefined
let smokeSystem = undefined
let isOn = false

export function createFire(scene, position, scale = .7) {
    // Fire particles
    fireSystem = new ParticleSystem("fire", 400, scene);
    fireSystem.particleTexture = new Texture("textures/flare.png", scene);
    fireSystem.emitter = position;
    fireSystem.minEmitBox = new Vector3(-0.025 * scale, 0, -0.025 * scale);
    fireSystem.maxEmitBox = new Vector3(0.025 * scale, 0, 0.075 * scale);
    
    // Fire colors and behavior
    fireSystem.color1 = new Color4(1, 0.5, 0, 1);
    fireSystem.color2 = new Color4(1, 0.3, 0, 1);
    fireSystem.colorDead = new Color4(1, 0.5, 0, .1);
    fireSystem.minSize = 0.075 * scale;
    fireSystem.maxSize = 0.15 * scale;
    fireSystem.minLifeTime = 0.2;
    fireSystem.maxLifeTime = 0.4;
    fireSystem.emitRate = 100;
    fireSystem.gravity = new Vector3(0, 5, 0);
    fireSystem.direction1 = new Vector3(-0.125, 1, -0.125);
    fireSystem.direction2 = new Vector3(0.125, 1.2, 0.125);
    
    // Smoke particles
    smokeSystem = new ParticleSystem("smoke", 500, scene);
    smokeSystem.particleTexture = new Texture("textures/flare.png", scene);
    smokeSystem.emitter = position;
    smokeSystem.minEmitBox = new Vector3(-0.05 * scale, 0.125, -0.05 * scale);
    smokeSystem.maxEmitBox = new Vector3(0.05 * scale, 0.25, 0.05 * scale);
    smokeSystem.blendMode = ParticleSystem.BLENDMODE_ADD;

    // Smoke colors and behavior
    smokeSystem.color1 = new Color4(0.3, 0.05, 0.05, 0.2);
    smokeSystem.color2 = new Color4(0.1, 0.1, 0.1, 0.2);
    smokeSystem.colorDead = new Color4(0.2, 0.2, 0.2, 0);
    smokeSystem.minSize = 0.125 * scale;
    smokeSystem.maxSize = 0.375 * scale;
    smokeSystem.minLifeTime = 0.8;
    smokeSystem.maxLifeTime = 2.0;
    smokeSystem.emitRate = 200;
    smokeSystem.gravity = new Vector3(0, 1, 0);
    smokeSystem.direction1 = new Vector3(-1, 2, -1);
    smokeSystem.direction2 = new Vector3(1, 2, 1);

    // Start both systems
    // fireSystem.start();
    // smokeSystem.start();
    
    return { fireSystem, smokeSystem,
        start: () => {
            fireSystem.start()
            smokeSystem.start()
            isOn = true
        },
        stop: () => {
            fireSystem.stop()
            smokeSystem.stop()
            isOn = false
        },
        isActive: () => isOn
     };
}

