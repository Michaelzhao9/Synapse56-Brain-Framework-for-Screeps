/**
 * 房间控制器相关的原子操作集合。
 * Room controller primitives used by higher-level limbs/brains.
 * 这些方法不做决策，只封装移动+执行的最小动作，方便在任何 limb 中复用。
 * They intentionally avoid decision making so limbs can reuse consistent micro-behaviors.
 */

export const roomNerve = {
    /**
     * 升级控制器：仅处理靠近+upgrade，不做能量/任务判断。
     * Upgrade controller: only handles move + upgrade without any strategy checks.
     */
    upgrade(creep: Creep, ctrl: StructureController) {
        // 3 格升级距离
        if (!creep.pos.inRangeTo(ctrl, 3)) {
            creep.moveTo(ctrl, { range: 3, reusePath: 5 })
            return
        }
        creep.upgradeController(ctrl)
    },

    /**
     * 占领控制器：用于过房或新据点的 claim。
     * Claim controller: capture a room when entering new territory.
     */
    claim(creep: Creep, ctrl: StructureController) {
        if (!creep.pos.isNearTo(ctrl)) {
            creep.moveTo(ctrl, { reusePath: 5 })
            return
        }
        creep.claimController(ctrl)
    },

    /**
     * 预定控制器：延长 remote 房维护时间。
     * Reserve controller: extend reservation for remote rooms.
     */
    reserve(creep: Creep, ctrl: StructureController) {
        if (!creep.pos.isNearTo(ctrl)) {
            creep.moveTo(ctrl, { reusePath: 5 })
            return
        }
        creep.reserveController(ctrl)
    },

    /**
     * 攻击控制器：打掉敌方 claim。
     * Attack controller: disrupt hostile ownership.
     */
    attack(creep: Creep, ctrl: StructureController) {
        if (!creep.pos.isNearTo(ctrl)) {
            creep.moveTo(ctrl, { reusePath: 5 })
            return
        }
        creep.attackController(ctrl)
    },

    /**
     * 签名控制器：写入自定义文本。
     * Sign controller: leave custom text on the controller.
     */
    sign(creep: Creep, ctrl: StructureController, text: string) {
        if (!creep.pos.isNearTo(ctrl)) {
            creep.moveTo(ctrl, { reusePath: 5 })
            return
        }
        creep.signController(ctrl, text)
    }
}
