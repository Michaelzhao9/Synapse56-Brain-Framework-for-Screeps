import { registerLimb, Limb } from "./registry"
import { movementNerve } from "@/brain/nerve/movement"
import { roomNerve } from "@/brain/nerve/room"

/**
 * upgrade limb：保持 3 格距离并升级控制器。
 * Upgrade limb: stay within range 3 and call upgradeController.
 */
export const upgradeLimb: Limb = {
    run(creep) {
        const ctrl = creep.room.controller
        if (!ctrl) {
            creep.say("❌ctrl")
            return
        }

        if (!creep.pos.inRangeTo(ctrl, 3)) {
            movementNerve.goNear(creep, ctrl, 3)
            return
        }

        roomNerve.upgrade(creep, ctrl)
    }
}

registerLimb("upgrade", upgradeLimb)
