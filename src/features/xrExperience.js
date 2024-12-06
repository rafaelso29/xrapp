import { enableHitTest } from "./hitTest.js";
import { enableAnchorSystem } from "./anchorSystem.js";
import { enableLightEstimation } from "./lightEstimation.js";

export async function enableXrExperience(scene){
    try {
        const xr = await scene.createDefaultXRExperienceAsync({
            uiOptions: { sessionMode: "immersive-ar" },
            optionalFeatures: true
        })    
        const fm = xr.baseExperience.featuresManager;
        enableLightEstimation(fm, scene)      
        enableHitTest(fm, scene)
        enableAnchorSystem(fm, scene)        
        
    } catch (error) {
        console.log(error)
    }
}
