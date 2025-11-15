/**
 * 极简 CPU 追踪器，常驻 global。
 * Minimal CPU tracker kept on the global scope.
 * begin/end 成对调用，data 里会累计每个 label 的历史消耗。
 * Call begin/end in pairs to accumulate CPU usage per label.
 */
export const cpuTracker = {
    data: {} as Record<string, number>,
    _start: 0,
    /**
     * 记录标签的起始 CPU。
     * Mark CPU start for a label.
     */
    begin(label: string) {
        this._label = label
        this._start = Game.cpu.getUsed()
    },
    /**
     * 结束标签记录并累加消耗。
     * Finish tracking for the label and accumulate usage.
     */
    end(label: string) {
        const used = Game.cpu.getUsed() - this._start
        this.data[label] = (this.data[label] || 0) + used
    },
    /**
     * 打印当前统计信息。
     * Print the aggregated CPU usage for inspection.
     */
    print() {
        console.log("----- CPU Tracker -----")
        for (const key in this.data) {
            console.log(`${key}: ${this.data[key].toFixed(2)}`)
        }
    }
}

// // console 指令：cpu() 输出 CPU 
// global.cpu = () => cpuTracker.print()
