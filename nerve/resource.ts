/**
 * 资源神经元：封装“靠近+交互”的最小资源操作。
 * Resource nerve: simple move-and-interact wrappers for creep resource actions.
 */
export const resourceNerve = {
    /**
     * 采集能量：先走近再 harvest。
     * Harvest energy by approaching the source first.
     */
    harvest(creep: Creep, source: Source) {
        if (!creep.pos.isNearTo(source)) {
            return creep.moveTo(source, { reusePath: 5 })
        }
        return creep.harvest(source)
    },

    /**
     * 从存储抽取资源。
     * Withdraw resources from a structure.
     */
    withdraw(creep: Creep, target: AnyStoreStructure, type: ResourceConstant = RESOURCE_ENERGY) {
        if (!creep.pos.isNearTo(target)) {
            return creep.moveTo(target, { reusePath: 5 })
        }
        return creep.withdraw(target, type)
    },

    /**
     * 向存储交付资源。
     * Transfer resources into a structure.
     */
    transfer(creep: Creep, target: AnyStoreStructure, type: ResourceConstant = RESOURCE_ENERGY) {
        if (!creep.pos.isNearTo(target)) {
            return creep.moveTo(target, { reusePath: 5 })
        }
        return creep.transfer(target, type)
    },

    /**
     * 捡起地面资源。
     * Pick up dropped resources from the ground.
     */
    pickup(creep: Creep, resource: Resource) {
        if (!creep.pos.isNearTo(resource)) {
            return creep.moveTo(resource, { reusePath: 5 })
        }
        return creep.pickup(resource)
    }
}
