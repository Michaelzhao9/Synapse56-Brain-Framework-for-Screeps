/**
 * dispatcher 期望的 creep memory 结构。
 * Memory contract consumed by dispatcher.
 */
export interface SynapseCreepMemory extends CreepMemory {
    task?: string      // 行为入口 / task identifier
    state?: string     // 任务阶段 / current state or step
    target?: string    // 行为参数 / payload such as object id
}
