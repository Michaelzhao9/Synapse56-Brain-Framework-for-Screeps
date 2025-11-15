// 按 task 自动缓存 creep 列表 / Cache creeps per task automatically.
export const TaskAssignments: Record<string, Creep[]> = {}

// 每 tick 清空（下一次 dispatcher.run() 时重新填充）/ Reset every tick and repopulate inside dispatcher.
export function resetTaskCache(): void {
    for (const key in TaskAssignments) {
        TaskAssignments[key] = []
    }
}
