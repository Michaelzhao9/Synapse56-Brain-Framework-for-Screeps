import { brainRunner } from "./brainRunner"
import { cpuTracker } from "./cpuTracker"

/**
 * Bio 类比：整具 Synapse56 脑袋的“心跳”。
 * Biological analogy: the heartbeat of the entire Synapse56 brain.
 * 只做两件事：
 * It does only two things:
 * 1. 在 TOTAL 标签下记录整个脑袋的 CPU。
 *    Track total CPU usage under the TOTAL label.
 * 2. 交给 brainRunner 去驱动所有神经模块。
 *    Delegate execution to brainRunner for all modules.
 */
export const brainMain = {
    run() {
        cpuTracker.begin("TOTAL")
        brainRunner.run()
        cpuTracker.end("TOTAL")
    }
}
