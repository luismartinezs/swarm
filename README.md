# swarm

To install dependencies:

```bash
bun install
```

To run:

```bash
bun src/index.ts
```

This project was created using `bun init` in bun v1.0.2. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.

## Outline

- [x] User enters task with detailed description in a text file
- [x] User inits swarm
- [ ] Manager created
- [ ] Manager reads task from file
- [ ] Manager turns task into ordered list of subtasks
- [ ] For each subtask, manager determines worker to use
  - [ ] Fetch worker list
  - [ ] Is any existing worker suitable? If no, create new worker
- [ ] Starting from 1st subtask, manager asks worker to complete task
- [ ] Manager gathers worker output. When subtask is completed, it moves to next subtask and repeats process
- [ ] When all subtasks are completed, manager prints results to file