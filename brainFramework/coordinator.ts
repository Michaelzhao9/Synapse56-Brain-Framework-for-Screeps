// =========================
//  类型定义：Context 基础结构
//  Context base structure definition
// =========================

export interface Context {
    tick: number
    hostiles: boolean
    [key: string]: any       // 可以扩展更多键
}

// =========================
//  上下文扩展器列表
//  Registered context extenders
// =========================

type ContextExtender = (ctx: Context) => void

const extenders: ContextExtender[] = []

// =========================
//  注册扩展器（模块可调用）
//  Register extenders (callable by modules)
// =========================

export function registerContextExtender(fn: ContextExtender) {
    extenders.push(fn)
}

// =========================
//  Coordinator 主体
//  Coordinator implementation
// =========================

export class Coordinator {
    getContext(): Context {
        // ====== 基础 context ======
        const ctx: Context = {
            tick: Game.time,
            hostiles: Object.values(Game.rooms)
                .some(r => r.find(FIND_HOSTILE_CREEPS).length > 0),
        }

        // ====== 调用扩展器 ======
        for (const fn of extenders) {
            try {
                fn(ctx)
            } catch (err) {
                console.log(`❌ ContextExtender error:`, err)
            }
        }

        return ctx
    }

    allowModule(manager: { shouldRun(context: Context): boolean }, ctx: Context) {
        return manager.shouldRun(ctx)
    }
}

export const coordinator = new Coordinator()
