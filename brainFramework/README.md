## Synapse56 Brain Framework

> bio 类比：`brainMain` 是大脑心跳，`brainRunner` 是皮层，`coordinator` 是丘脑，
> 每个业务模块就是一束“神经”，只负责驱动自己的肌肉，彼此互不干扰。

### 快速接入（createApp 插件）

```ts
import { brainAppPlugin } from "@/brainFramework/appPlugin"

const app = createApp({ roomRunner, creepRunner })

app.on(brainAppPlugin()) // 效果等同 app.on(creepListener)
```

插件会在 `tickStart` 阶段调用 `brainMain.run()`，因此无需再手动改 `loop`。保留旧的“直接手动触发”写法也没问题：

```ts
import { brainMain } from "@/brainFramework/brainMain"

export const loop = () => brainMain.run()
```

心跳触发后会做三件事：

1. `cpuTracker` 在 `TOTAL` 标签下记录整帧花费。
2. `brainRunner` 读取 `coordinator.getContext()`（当前 tick 号、是否有敌人等）。
3. 依次遍历 `moduleRegistry` 里注册的“神经模块”，只有 `manager.shouldRun(context)` 返回 `true` 才执行 `brain.run()`，并为每个 label 记录 CPU。

### 写一个神经模块

```ts
import { mountModule } from "@/brainFramework/moduleRegistry"

mountModule({
    label: "helper",
    manager: {
        shouldRun(context) {
            return context.tick % 2 === 0
        },
    },
    brain: {
        run() {
            // 真正的业务逻辑
        },
    },
})
```

- `manager`（丘脑）只关心“要不要运行”，公共的环境信息都从 `context` 里拿。
- `brain`（神经末梢）只做纯逻辑，不关心何时被调用。

### CPU 追踪

`cpuTracker.begin(label)` / `end(label)` 会把消耗累积到 `cpuTracker.data` 中，可在 console 里暴露 `global.cpu = () => cpuTracker.print()`，随时查看各模块历史 CPU。

### 扩展建议

- 想加新的环境刺激，就往 `coordinator.getContext()` 中追加字段。
- 需要模块优先级时，给 `moduleRegistry` 的条目自行排序或加一个 `order` 字段。
- 已在 `brainRunner` 中加了 per-module `try/catch`，单个模块崩溃只会打印日志，不会拖垮整帧。
