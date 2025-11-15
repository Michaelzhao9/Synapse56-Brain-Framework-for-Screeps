# Synapse56-Brain-Framework-for-Screeps


🧠 SynapseAI
A Modern Modular Creep AI Framework for Screeps
Task-State Driven. Layered. Extensible. Inspired by Overmind — Simplified and Modernized.
📌 Overview

SynapseAI is a modular, task-driven AI framework for Screeps
that adopts a clear behavioral pipeline and layered architecture to achieve:

Low CPU overhead

High modularity

Full cross-room behavior reuse

Minimal memory footprint

Easy extensibility

SynapseAI draws inspiration from the structural ideas behind frameworks like Overmind,
but removes role hierarchies, class-heavy structures, and deep inheritance,
replacing them with a lighter, cleaner task/state-driven model and a decoupled behavior pipeline.

It is designed to be intuitive, scalable, and extremely easy to maintain.

🧩 Key Philosophy
✔ 1. Behavior Is Data (task/state/target)

Each creep is fully described by just three fields:

task: string    // behavior category
state: string   // behavior stage
target?: string // objectId or roomName


This minimal structure replaces:

class inheritance

creep roles

overlord chains

role-specific run() blocks

making behavior reusable and declarative.

✔ 2. Behavior Pipeline: cleanly separated layers
localBrain → dispatcher → limb → nerve


localBrain assigns tasks and manages strategy

dispatcher selects limbs based on task

limbs implement state-based behavior

nerve provides atomic movement/resource/room actions

Each layer focuses on one responsibility,
making the system predictable and easy to extend.

✔ 3. Cross-Room Behavior by Design

Since limbs only depend on task/state/target and not on fixed room logic,
SynapseAI allows any creep to operate in any room.

This enables:

remote mining

multi-room upgrading

long-range logistics

expansion & claim chains

cross-room automation

with minimal configuration.

✔ 4. CPU Efficiency

SynapseAI keeps CPU low by design:

One-pass O(N) dispatcher

No repeated filter operations

Cached task assignments

Small memory footprint

No deep recursion or class chains

The result is a framework that remains light even at large empire scales.

💡 Relation to Overmind

SynapseAI borrows good ideas from Overmind (such as modularity, high-level room control, task grouping),
but intentionally avoids the parts that tend to become heavy or hard to maintain over time:

Overmind Concept	SynapseAI Equivalent	Improvement
Role classes	task/state/target	No inheritance, easier to extend
Overlords/Zergs	localBrain + dispatcher	Clearer boundaries
Multi-layer class chains	Functional layered pipeline	Reduced complexity
Role-run loops	Single dispatcher loop	Lower CPU usage
Per-role logic	Reusable limbs	Code reuse, less duplication

SynapseAI is not meant to replace Overmind,
but rather to provide a lightweight, modernized version of many of the same concepts,
optimized for clarity, modularity, and long-term scalability.

📁 Folder Structure
brain/
  limbs/
    harvest.ts
    upgrade.ts
    build.ts
    claim.ts
    registry.ts

  nerve/
    movement.ts
    resource.ts
    room.ts

  dispatcher/
    taskCache.ts

localBrain/
  upgrade/
  remote/
  claim/
  build/
  ...

⚙ Components Overview
🧠 localBrain（Task Management）

Handles:

Task assignment

State initialization

Target selection

Worker slot counts

Mission lifecycle management

Does not execute creep actions.

🚚 Dispatcher（Behavior Routing）

Runs once per tick

Categorizes creeps by task

Executes the correct limb

Populates TaskAssignments[task] for localBrain

🦾 Limbs（Behavior Logic）

Limbs are state-driven behavior modules:

harvest

upgrade

build

claim

Composite limbs (like remote mining) combine multiple states and call atomic limbs.

⚡ Nerve（Atomic Actions）

Nerve contains the lowest-level action primitives:

movementNerve → goTo, goNear, flee

resourceNerve → harvest, withdraw, transfer

roomNerve → upgrade, claim, reserve

Limbs call nerve methods to perform all actions.

🧪 Example
creep.memory.task = "upgrade"
creep.memory.state = "getEnergy"
creep.memory.target = controllerId


Dispatcher:

limbRegistry["upgrade"].run(creep)


localBrain:

const workers = TaskAssignments["upgrade"]
if (workers.length < 3) spawnRequest("upgrade")

🎯 Design Goals

Extremely modular

Room-agnostic behaviors

Minimal creep memory usage

Clear behavior pipeline

Expandable behavior tree system

Lower maintenance cost

Clean code separation

Optimized for long-term scaling

SynapseAI is designed as a modern, flexible architecture suitable for both
small-scale automation and large empire-level AI systems.
