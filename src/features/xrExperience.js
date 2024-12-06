import { enableHitTest } from "./hitTest.js";
import { enableAnchorSystem } from "./anchorSystem.js";

export async function enableXrExperience(scene){
    try {
        const xr = await scene.createDefaultXRExperienceAsync({
            uiOptions: { sessionMode: "immersive-ar" },
            optionalFeatures: true
        })
    
        const fm = xr.baseExperience.featuresManager;        
        enableHitTest(fm, scene)
        enableAnchorSystem(fm, scene)
        
    } catch (error) {
        console.log(error)
    }
}
