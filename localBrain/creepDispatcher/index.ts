import { mountModule } from "@/brain/brainFramework/moduleRegistry"
import { creepDispatcherManager } from "./manager"
import { creepDispatcherBrain } from "./brain"

const LABEL = "creepDispatcher"

/**
 * 统一 Creep 行为调度器：
 * Unified creep dispatcher module:
 * - 按 task 分类 creep（为了给 localBrain 用）
 *   Group creeps by `task` for localBrain consumers.
 * - 调用 limb.run() 执行对应任务行为
 *   Dispatch into limb.run() for task-specific logic.
 */
mountModule({
    label: LABEL,
    manager: creepDispatcherManager,
    brain: creepDispatcherBrain,
})
