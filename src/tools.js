import { MeshBuilder, PBRMaterial, Color3} from "babylonjs";
import { ShadowOnlyMaterial } from "babylonjs-materials";

export function createSphere(scene, options){
    const sphere = MeshBuilder.CreateSphere("sphere", options, scene)
    const mat = new PBRMaterial("sphereMat", scene)    
    mat.albedoColor = Color3.Random()
    mat.roughness = .6
    mat.metallic = .1
    sphere.material = mat
    return sphere
}

export function createArGround(scene){
    const ground = MeshBuilder.CreateGround("ground", {width: 10, height: 10}, scene)
    ground.receiveShadows = true
    const mat = new ShadowOnlyMaterial("shadowMat", scene)
    ground.material = mat
    return ground
}

// animation tools
export function playAnim(animationGroups, animName){
    const animation = animationGroups.find(anim => anim.name === animName);
    if(!animation)return console.log("no animation found")
    animation.play()
}
export function stopAnim(animationGroups, animName){
    const animation = animationGroups.find(anim => anim.name === animName);
    if(!animation)return console.log("no animation found")
    animation.stop()
}