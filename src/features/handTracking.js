import { WebXRFeatureName, WebXRHandJoint } from "babylonjs"
import { createSphere } from "../tools.js"
const log = console.log

export function enableHandTracking(fm, xr, scene){
    const xrHands = fm.enableFeature(WebXRFeatureName.HAND_TRACKING, "latest", {
        xrInput: xr.input
    })
    const sphere = createSphere(scene, {diameter: .05})

    xrHands.onHandAddedObservable.add( hand =>{
        const side = hand.xrController.inputSource.handedness
        log(side)
        if(side === "left"){
            const indxFinger = hand.getJointMesh(WebXRHandJoint.INDEX_FINGER_TIP);

            sphere.position = indxFinger.getAbsolutePosition()
        }
    })

}
