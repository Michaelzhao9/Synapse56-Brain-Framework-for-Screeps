/**
 * 战斗神经元：统一 creep 战斗动作。
 * Combat nerve: shared helpers for melee/ranged routines.
 */
export const combatNerve = {
    /**
     * 近战攻击：靠近后 attack，范围内直接打。
     * Melee attack that moves into range first.
     */
    attack(creep: Creep, target: Creep | Structure) {
        if (!creep.pos.isNearTo(target)) {
            creep.moveTo(target, { reusePath: 3 })
        } else {
            creep.attack(target)
        }
    },

    /**
     * 远程攻击：3 格内射击，超出则逼近。
     * Ranged attack within 3 tiles, otherwise close the gap.
     */
    ranged(creep: Creep, target: Creep | Structure) {
        const d = creep.pos.getRangeTo(target)
        if (d > 3) creep.moveTo(target, { reusePath: 3 })
        if (d <= 3) creep.rangedAttack(target)
    },

    /**
     * 风筝策略：2 格内后退，3 格外靠近，中间射击。
     * Kiting behavior: flee when too close, advance when too far.
     */
    kite(creep: Creep, target: Creep) {
        const d = creep.pos.getRangeTo(target)
        if (d <= 2) {
            const path = PathFinder.search(creep.pos, { pos: target.pos, range: 3 }, { flee: true }).path
            if (path.length) creep.move(creep.pos.getDirectionTo(path[0]))
        } else if (d > 3) {
            creep.moveTo(target, { reusePath: 3 })
        } else {
            creep.rangedAttack(target)
        }
    }
}
