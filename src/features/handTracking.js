import { WebXRFeatureName, WebXRHandJoint, Vector3, PointerEventTypes } from "babylonjs"
import { createSphere } from "../tools.js"
import { createFire } from "../particles.js"
const log = console.log

export function enableHandTracking(fm, xr, scene){
    const xrHands = fm.enableFeature(WebXRFeatureName.HAND_TRACKING, "latest", {
        xrInput: xr.input
    })
    const spawnPoint = createSphere(scene, { diameter: .5})
    let middleProximal = undefined
    
    xrHands.onHandAddedObservable.add( hand =>{
        const side = hand.xrController.inputSource.handedness
        if(side === "left"){
            middleProximal = hand.getJointMesh(WebXRHandJoint.MIDDLE_FINGER_PHALANX_PROXIMAL);
            spawnPoint.parent = middleProximal
            spawnPoint.position = new Vector3(0, -5, 1)
        }
    })
    let firePS = undefined
    let interval = setInterval(() => {
        if(middleProximal){
            clearInterval(interval)
            firePS = createFire(scene, spawnPoint)
            scene.onPointerObservable.add(evnt => {
                firePS.isActive() ? firePS.stop() : firePS.start()
            }, PointerEventTypes.POINTERDOWN)
        }
    }, 300)
}
