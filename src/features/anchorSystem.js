import { WebXRAnchorSystem, PointerEventTypes, SlerpToRef, Vector3 } from "babylonjs";
import { getLastHit } from "./hitTest.js";
import { createSphere, playAnim, stopAnim } from "../tools.js";
import { applyShadow } from "./shadows.js";
import { getAnimations, getCharacterMeshes, isCharacterMade } from "../character.js";
const log = console.log

let enabled = false
export function enableAnchorSystem(fm, scene){
    try {
        const anchorSystem = fm.enableFeature(WebXRAnchorSystem, "latest")
        
        anchorSystem.onAnchorAddedObservable.add( anchor => {
            const sphere = createSphere(scene, {diameter: .06})
            applyShadow(sphere)
            anchor.attachedNode = sphere
        })
        enabled = true

        let renderer
        scene.onPointerObservable.add( event => {
            const lastHit = getLastHit()
            // if(lastHit && anchorSystem) anchorSystem.addAnchorPointUsingHitTestResultAsync(lastHit)
            if(!lastHit || !isCharacterMade()) return log("lasthit or character is not ready")
            const meshes = getCharacterMeshes()
            if(!meshes) return console.log("character meshes not found")
            console.log(lastHit)
            scene.onBeforeRenderObservable.remove(renderer)
            renderer = scene.onBeforeRenderObservable.add( () => {
                // getCharacterMeshes[0]
                const distance = Vector3.Distance(meshes[0].position, lastHit.position)
                log(distance)
                if(distance < .05)  {
                    scene.onBeforeRenderObservable.remove(renderer)
                    return stopAnim(getAnimations(), "walking")
                }
                meshes[0].lookAt(lastHit.position)
                Vector3.SlerpToRef(meshes[0].position, lastHit.position, 0.06, meshes[0].position)
                playAnim(getAnimations(), "walking")
            })
        }, PointerEventTypes.POINTERDOWN)

        return anchorSystem
    } catch (error) {
        console.log(error)
        enabled = false
        return error
    }
}
