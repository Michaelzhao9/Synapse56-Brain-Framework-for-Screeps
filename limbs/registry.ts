/** limb 接口：每个 task 对应一个 run 方法。Interface for task-specific limbs. */
export interface Limb {
    run(creep: Creep): void
}

const limbRegistry: Record<string, Limb> = {}

/** 注册一个 task 的行为树 / Register limb implementation for a task. */
export function registerLimb(task: string, limb: Limb): void {
    limbRegistry[task] = limb
}

/** dispatcher 根据 task 找 limb 并执行 / Fetch limb by task for dispatcher. */
export function getLimb(task: string): Limb | undefined {
    return limbRegistry[task]
}
