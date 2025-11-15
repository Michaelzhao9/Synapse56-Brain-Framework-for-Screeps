import { registerLimb, Limb } from "./registry"
import { movementNerve } from "@/brain/nerve/movement"
import { resourceNerve } from "@/brain/nerve/resource"
import { SynapseCreepMemory } from "../brainFramework/dispatcher/types"

/**
 * harvest limb：读取 memory.target，移动到 source 并执行采集。
 * Harvest limb: moves to the source stored in memory.target and harvests.
 */
export const harvestLimb: Limb = {
    run(creep) {
        const mem = creep.memory as SynapseCreepMemory
        const id = mem.target

        if (!id) {
            creep.say("❌noT")
            return
        }

        const source = Game.getObjectById(id as Id<Source>)
        if (!source) {
            creep.say("❌src")
            return
        }

        // 移动靠近 source / move near source
        if (!creep.pos.isNearTo(source)) {
            movementNerve.goNear(creep, source)
            return
        }

        // 执行动作 / perform harvest action
        resourceNerve.harvest(creep, source)
    }
}

registerLimb("harvest", harvestLimb)
