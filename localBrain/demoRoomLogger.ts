// import { mountModule } from "@/brain/brainFramework/moduleRegistry"

// const LABEL = "roomLogger"

// /**
//  * 示例 localBrain：定期打印当前可视房间列表，验证 brain 框架是否工作。
//  * Sample local brain that logs visible rooms to prove the framework works.
//  */
// mountModule({
//     label: LABEL,
//     manager: {
//         shouldRun() {
//             return Object.keys(Game.rooms).length > 0
//         },
//     },
//     brain: {
//         run() {
//             const rooms = Object.keys(Game.rooms)
//             if (rooms.length === 0) return
//             console.log(`[${LABEL}] 已控房间: ${rooms.join(", ")}`)
//         },
//     },
// })
