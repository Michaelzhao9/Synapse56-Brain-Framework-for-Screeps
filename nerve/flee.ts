/**
 * 逃跑神经元：统一封装 PathFinder 的 flee 行为。
 * Flee nerve: wraps PathFinder flee routines for reuse.
 */
export const fleeNerve = {
    /**
     * 从给定威胁目标逃跑，保持指定安全距离。
     * Run away from the provided threats while keeping a safe range.
     */
    fleeFrom(creep: Creep, threats: { pos: RoomPosition }[], range: number = 5) {
        const goals = threats.map(t => ({ pos: t.pos, range }))
        const result = PathFinder.search(creep.pos, goals, { flee: true })
        if (result.path.length) {
            creep.move(creep.pos.getDirectionTo(result.path[0]))
        }
    },

    /**
     * 当血量低于阈值时自动逃跑，常用于自保行为。
     * Auto-flee when HP ratio is lower than threshold, useful for survival logic.
     */
    fleeIfHurt(creep: Creep, threats: Creep[], threshold: number = 0.3) {
        if (creep.hits < creep.hitsMax * threshold) {
            this.fleeFrom(creep, threats)
            return true
        }
        return false
    }
}
