import { registerLimb, Limb } from "./registry"
import { movementNerve } from "@/brain/nerve/movement"
import { SynapseCreepMemory } from "../brainFramework/dispatcher/types"

/**
 * build limb：根据 memory.target 建造指定工地。
 * Build limb: construct the site pointed by memory.target.
 */
export const buildLimb: Limb = {
    run(creep) {
        const mem = creep.memory as SynapseCreepMemory
        const id = mem.target

        if (!id) {
            creep.say("❌noT")
            return
        }

        const site = Game.getObjectById(id as Id<ConstructionSite>)
        if (!site) {
            creep.say("❌site")
            return
        }

        if (!creep.pos.inRangeTo(site, 3)) {
            movementNerve.goNear(creep, site, 3)
            return
        }

        creep.build(site)
    }
}

registerLimb("build", buildLimb)
