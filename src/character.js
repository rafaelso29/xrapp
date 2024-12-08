import { SceneLoader, Vector3 } from "babylonjs";

let characterMeshes = undefined;
let characterIsMade = false
let animations = undefined

export function getCharacterMeshes(){
    if(!characterIsMade) return false
    return characterMeshes
}
export function isCharacterMade(){
    return characterIsMade
}
export function getAnimations(){
    if(!animations) return false
    return animations
}
export async function createCharacter(directory, scene, position){
    const {meshes, animationGroups} = await SceneLoader.ImportMeshAsync(null, false, directory, scene);

    characterMeshes = meshes
    animations = animationGroups

    meshes[0].position = new Vector3(position.x, position.y, position.z)
    characterMeshes[0].scaling = new Vector3(.5,.5,.5)

    characterIsMade = true
    return {meshes, animationGroups};
}

