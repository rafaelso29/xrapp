import { WebXRState } from "babylonjs";
import { enableHitTest } from "./hitTest.js";
import { enableAnchorSystem } from "./anchorSystem.js";
import { enableLightEstimation } from "./lightEstimation.js";
import { enableXrStateChangeCallback } from "./xrStateChange.js";
import { enableHandTracking } from "./handTracking.js";

export async function enableXrExperience(scene){
    try {
        const xr = await scene.createDefaultXRExperienceAsync({
            uiOptions: { sessionMode: "immersive-ar" },
            optionalFeatures: true
        })    
        const fm = xr.baseExperience.featuresManager;

        // enableXrStateChangeCallback(xr, scene)
        // enableLightEstimation(fm, scene)
        enableHitTest(fm, scene)
        enableHandTracking(fm,  xr, scene)
        // enableAnchorSystem(fm, scene)     
        
    } catch (error) {
        console.log(error)
    }
}
