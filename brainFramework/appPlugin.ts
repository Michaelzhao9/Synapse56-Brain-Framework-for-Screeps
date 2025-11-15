import { AppLifecycleCallbacks } from "@/moduleGlobal/framework/types"
import { collectCost } from "@/moduleGlobal/framework"
import { SHOW_CPU_COST_TYPE } from "@/mount/global/common"
import { brainMain } from "./brainMain"

const { BRAIN: TYPE_BRAIN } = SHOW_CPU_COST_TYPE

/**
 * 让 Brain Framework 以 createApp 插件形式运行。
 * Expose the Brain framework as a createApp plugin (creepListener style).
 * 使用方式与 creepListener 类似：app.on(brainAppPlugin())。
 * Usage mirrors creepListener: `app.on(brainAppPlugin())`.
 */
export const brainAppPlugin = (): AppLifecycleCallbacks => ({
    tickStart: () => collectCost("Brain", TYPE_BRAIN, brainMain.run),
})

/**
 * 精简版插件：直接在 tickEnd 阶段运行 brainMain，不参与 CPU 统计。
 * Lite plugin: trigger brainMain at tickEnd without CPU profiling.
 * 适合不需要 collectCost / tickStart 的场景。
 * Useful when you don't need collectCost/tickStart behavior.
 */
export const brainAppPluginLite = (): AppLifecycleCallbacks => ({
    tickEnd: () => brainMain.run(),
})
