/**
 * 一个“神经模块”由两部分组成：
 * A brain module contains two parts:
 * - manager：丘脑，结合 context 决定要不要激活。
 * - manager: decides whether to run based on context (thalamus).
 * - brain：实际执行体，负责驱动某一块肌肉或行为。
 * - brain: executor performing behavior (cortex).
 */
export interface BrainModule {
    manager: {
        shouldRun(context: any): boolean
    }
    brain: {
        run(): void
    }
    /** 用于 log / cpu 追踪的标签名。Label used for logging/CPU tracking. */
    label: string
}

export const moduleRegistry: BrainModule[] = []

/** 将模块挂上脑干，brainRunner 每 tick 会顺序执行。 Hook module so brainRunner runs it each tick. */
export function mountModule(module: BrainModule) {
    moduleRegistry.push(module)
}
