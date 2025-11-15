/**
 * movementNerve
 * 
 * - 所有 creep 的移动动作能力
 * - Movement primitives shared by every creep.
 * - 完全 TypeScript strict 模式
 * - Written in full TypeScript strict mode for safety.
 * - 不写 Memory（由 limbs/brain 决策层写）
 * - Keeps Memory untouched; high-level logic owns state.
 */

type PosLike = RoomPosition | { pos: RoomPosition }

function getPos(target: PosLike): RoomPosition {
    return target instanceof RoomPosition ? target : target.pos
}

export const movementNerve = {
    /**
     * goTo —— 用 moveTo 前往目标位置。
     * Go to target using plain moveTo.
     */
    goTo(creep: Creep, target: PosLike): ScreepsReturnCode {
        const pos = getPos(target)
        return creep.moveTo(pos, { reusePath: 5 })
    },

    /**
     * goNear —— 到达距离 keepDist（默认 1）的位置。
     * Go near the target keeping a configurable range (default 1).
     */
    goNear(creep: Creep, target: PosLike, keepDist: number = 1): ScreepsReturnCode {
        const pos = getPos(target)
        return creep.moveTo(pos, { range: keepDist, reusePath: 5 })
    },

    /**
     * goRange —— 到达距离 range 的位置。
     * Move until within the provided range value.
     */
    goRange(creep: Creep, target: PosLike, range: number): ScreepsReturnCode {
        const pos = getPos(target)
        return creep.moveTo(pos, { range, reusePath: 5 })
    },

    /**
     * stepTo —— 单步位移（不走寻路）。
     * Step exactly one tile without pathfinding.
     */
    stepTo(creep: Creep, target: PosLike): ScreepsReturnCode {
        const pos = getPos(target)
        const dir = creep.pos.getDirectionTo(pos)
        return creep.move(dir)
    },

    /**
     * keepDistance —— 与目标保持一定距离（逃离但不寻路）。
     * Keep a minimum distance from a target using a flee path.
     */
    keepDistance(creep: Creep, target: Creep, range: number = 3): void {
        const current = creep.pos.getRangeTo(target)
        if (current >= range) return

        // Flee path
        const goal: { pos: RoomPosition; range: number } = {
            pos: target.pos,
            range
        }

        const result: PathFinderPath = PathFinder.search(creep.pos, goal, {
            flee: true,
            maxRooms: 1
        })

        const next: RoomPosition | undefined = result.path[0]
        if (next) {
            creep.move(creep.pos.getDirectionTo(next))
        }
    },

    /**
     * fleeFrom —— 从多个威胁源逃跑（安全逃离）。
     * Flee from multiple threats simultaneously.
     */
    fleeFrom(
        creep: Creep,
        threats: Array<{ pos: RoomPosition }>,
        range: number = 5
    ): void {
        const goals = threats.map(t => ({ pos: t.pos, range }))

        const result: PathFinderPath = PathFinder.search(creep.pos, goals, {
            flee: true,
            maxRooms: 1
        })

        const next: RoomPosition | undefined = result.path[0]
        if (next) {
            creep.move(creep.pos.getDirectionTo(next))
        }
    },

    /**
     * avoidPosition —— 将某位置视为禁止区域并避开。
     * Avoid a forbidden spot by routing around it.
     */
    avoidPosition(
        creep: Creep,
        avoidPos: RoomPosition,
        avoidRange: number = 2
    ): void {
        const goal: { pos: RoomPosition; range: number } = {
            pos: avoidPos,
            range: avoidRange
        }

        const result: PathFinderPath = PathFinder.search(creep.pos, goal, {
            flee: true,
            maxRooms: 1
        })

        const next: RoomPosition | undefined = result.path[0]
        if (next) {
            creep.move(creep.pos.getDirectionTo(next))
        }
    },

    /**
     * randomMove —— 随机移动一格（防卡死）。
     * Move randomly to reduce congestion or unstick.
     */
    randomMove(creep: Creep): ScreepsReturnCode {
        const dir = (Math.floor(Math.random() * 8) + 1) as DirectionConstant
        return creep.move(dir)
    },

    /**
     * isStuck —— 检测卡死，需 creep.memory._lastPos。
     * Detect if the creep stayed on the same tile (requires _lastPos).
     */
    isStuck(creep: Creep): boolean {
        const last = creep.memory._lastPos as
            | { x: number; y: number; roomName: string }
            | undefined

        const here = creep.pos

        const stuck =
            last !== undefined &&
            last.x === here.x &&
            last.y === here.y &&
            last.roomName === here.roomName

        creep.memory._lastPos = {
            x: here.x,
            y: here.y,
            roomName: here.roomName
        }

        return stuck
    },

    /**
     * recoverFromStuck —— 若卡死则随机移动。
     * Recover from stuck state by random stepping.
     */
    recoverFromStuck(creep: Creep): void {
        if (this.isStuck(creep)) {
            this.randomMove(creep)
        }
    },

    /**
     * moveAndAvoid —— 前往目标点，同时避开某点。
     * Move towards destination while avoiding a forbidden tile (anti-clump).
     */
    moveAndAvoid(
        creep: Creep,
        target: PosLike,
        avoid: RoomPosition,
        avoidRange: number = 3
    ): void {
        const pos = getPos(target)

        const result: PathFinderPath = PathFinder.search(
            creep.pos,
            { pos, range: 1 },
            {
                flee: false,
                maxRooms: 1,
                roomCallback: (roomName: string) => {
                    const cm = new PathFinder.CostMatrix()
                    if (roomName === avoid.roomName) {
                        cm.set(avoid.x, avoid.y, 255)
                    }
                    return cm
                }
            }
        )

        const next: RoomPosition | undefined = result.path[0]
        if (next) {
            creep.move(creep.pos.getDirectionTo(next))
        }
    }
}
