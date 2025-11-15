/**
 * creepDispatcher manager：
 * 总是运行（无前置条件），因为 dispatcher 需要遍历所有 creep。
 * Always returns true so dispatcher runs every tick.
 */
export const creepDispatcherManager = {
    shouldRun(): boolean {
        return true
    }
}
