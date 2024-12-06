import { WebXRAnchorSystem, PointerEventTypes } from "babylonjs";
import { getLastHit } from "./hitTest.js";
import { createSphere } from "../tools.js";
import { applyShadow } from "./shadows.js";

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

        scene.onPointerObservable.add( event => {
            const lastHit = getLastHit()
            if(lastHit && anchorSystem) anchorSystem.addAnchorPointUsingHitTestResultAsync(lastHit)
        }, PointerEventTypes.POINTERDOWN)

        return anchorSystem
    } catch (error) {
        console.log(error)
        enabled = false
        return error
    }
}
