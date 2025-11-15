import { registerLimb, Limb } from "./registry"
import { movementNerve } from "@/brain/nerve/movement"
import { roomNerve } from "@/brain/nerve/room"

/**
 * claim limb：靠近房间控制器并执行 claim。
 * Claim limb: move to controller and claim it.
 */
export const claimLimb: Limb = {
    run(creep) {
        const ctrl = creep.room.controller
        if (!ctrl) {
            creep.say("❌ctrl")
            return
        }

        if (!creep.pos.isNearTo(ctrl)) {
            movementNerve.goNear(creep, ctrl)
            return
        }

        roomNerve.claim(creep, ctrl)
    }
}

registerLimb("claim", claimLimb)
