import { moduleRegistry } from "./moduleRegistry"
import { coordinator } from "./coordinator"
import { cpuTracker } from "./cpuTracker"

/**
 * bio 类比：大脑皮层，遍历每根“神经”并驱动它。
 * Biological analogy: the cortex iterating through each neural bundle.
 * 每个神经模块在运行前后都会留下 CPU 轨迹。
 * Each module leaves CPU footprints before/after execution.
 */
export class BrainRunner {
    run() {
        const context = coordinator.getContext()

        for (const mod of moduleRegistry) {
            cpuTracker.begin(mod.label)

            if (coordinator.allowModule(mod.manager, context)) {
                try {
                    mod.brain.run()
                } catch (err) {
                    console.log(`[brainRunner] 模块 ${mod.label} 异常：`, err)
                }
            }

            cpuTracker.end(mod.label)
        }
    }
}

export const brainRunner = new BrainRunner()
