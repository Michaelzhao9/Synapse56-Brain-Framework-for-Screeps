/**
 * 常用几何/定位工具，供各个神经模块共享。
 * Common geometry helpers shared across nerves.
 */
type Findable =
    | Creep
    | Structure
    | Source
    | Resource
    | Tombstone
    | Ruin

export const nerveUtils = {
    /**
     * 基于路径代价寻找最近的目标。
     * Find closest-by-path target for a creep.
     */
    nearest<T extends Findable>(creep: Creep, targets: T[]): T | null {
        return creep.pos.findClosestByPath(targets) as T | null
    },
    /**
     * 判断 creep 是否在指定范围内。
     * Check if creep is within a specific range of target.
     */
    inRange(creep: Creep, target: { pos: RoomPosition }, range: number) {
        return creep.pos.getRangeTo(target.pos) <= range
    },

    /**
     * 判断 creep 是否在指定范围外。
     * Check if creep is outside the given range.
     */
    notInRange(creep: Creep, target: { pos: RoomPosition }, range: number) {
        return creep.pos.getRangeTo(target.pos) > range
    }
}
