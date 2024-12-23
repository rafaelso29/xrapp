import { WebXRState } from "babylonjs";
import { createCharacter } from "../character.js";

export function enableXrStateChangeCallback(xr, scene){
    xr.baseExperience.onStateChangedObservable.add( state => {
        if(state === WebXRState.IN_XR) {
            // create character
            createCharacter("./models/bear.glb", scene, {x: 0, y: 0, z: 1})
        }
    })
}

