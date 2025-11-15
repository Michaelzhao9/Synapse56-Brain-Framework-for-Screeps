import { TaskAssignments, resetTaskCache } from "@/brain/brainFramework/dispatcher/taskCache"
import { getLimb } from "@/brain/limbs/registry"
import { SynapseCreepMemory } from "@/brain/brainFramework/dispatcher/types"

/**
 * creepDispatcherBrain：
 * - 每 tick 重建 task → creep 列表，方便 limb 查询同组单位。
 * - 读取 creep memory 的 task 并转发到对应 limb。
 * creepDispatcherBrain:
 * - rebuilds task-to-creep map every tick for limb lookups.
 * - dispatches creeps to limbs based on the `task` field in memory.
 */
export const creepDispatcherBrain = {
    run(): void {
        // 重新构建 task → creeps[] 缓存 / rebuild task cache per tick
        resetTaskCache()

        for (const name in Game.creeps) {
            const creep = Game.creeps[name]
            const mem = creep.memory as SynapseCreepMemory

            // ---------- ① 如果没有 task → idle / no task means idle ----------
            if (!mem.task) {
                creep.say("idle")
                continue
            }

            // ---------- ② 将 creep 放入对应 task 组 / group by task ----------
            if (!TaskAssignments[mem.task]) {
                TaskAssignments[mem.task] = []
            }
            TaskAssignments[mem.task].push(creep)

            // ---------- ③ 根据 task 找 limb / fetch limb by task ----------
            const limb = getLimb(mem.task)
            if (!limb) {
                creep.say(`?${mem.task}`)
                continue
            }

            // ---------- ④ 执行 limb.run / run limb logic ----------
            try {
                limb.run(creep)
            } catch (err) {
                console.log(
                    `❌ [dispatcher] creep ${creep.name} (task=${mem.task}) 异常:`,
                    err
                )
            }
        }
    }
}
