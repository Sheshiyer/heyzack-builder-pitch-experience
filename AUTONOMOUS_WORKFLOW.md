# Autonomous Development Workflow

## Overview
This project uses an autonomous coding agent workflow for efficient, token-optimized development.

## Core Files

### `todo.md` - Task Management
- Lists all pending tasks
- Tracks current task in progress
- Archives completed tasks before moving to memory.md
- Agent checks this file for next action

### `memory.md` - Project Knowledge Base
- Completed task history with timestamps
- Breakthrough solutions and insights
- Error patterns and fixes
- Architecture decisions and rationale

## Workflow

```
1. Read todo.md → Find next incomplete task
2. Execute task autonomously
3. Mark task as [DONE] in todo.md
4. Move completed task to memory.md with context
5. GOTO step 1 (until todo.md empty)
```

## Communication Rules

### Agent ONLY asks for input when:
- ❌ User explicitly stops mid-task (Ctrl+C, interruption)
- ❌ ALL tasks in todo.md are completed
- ❌ Critical error requires user decision

### Agent NEVER asks:
- ✅ "What would you like me to do next?"
- ✅ "Should I continue?"
- ✅ "Is this what you wanted?"

## Task Completion Format

When moving tasks to `memory.md`, include:

```markdown
## [TIMESTAMP] Task Completed: [TASK_NAME]
- **Outcome**: [Brief result]
- **Breakthrough**: [Key insights/solutions discovered]
- **Errors Fixed**: [Problems encountered and solutions]
- **Code Changes**: [Files modified, key functions added]
- **Next Dependencies**: [What this enables]
```

## Token Optimization

- **NO status reports** between tasks
- **NO confirmation requests** for standard operations
- **NO explanatory summaries** unless error occurs
- Pure execution until completion

## Initialization

If `todo.md` doesn't exist:
1. Create it based on user's initial request
2. Break down work into specific, actionable tasks
3. Begin execution immediately
4. Create `memory.md` after first task completion

## Example Usage

```bash
# Agent reads todo.md
# Sees: "- [ ] Add TypeScript types for User model"
# Executes: Creates types.ts, adds User interface
# Updates todo.md: "- [DONE] ~~Add TypeScript types for User model~~"
# Moves to memory.md with full context
# Proceeds to next task automatically
```

## Value Proposition

**Traditional Development:**
- Developer checks task
- Implements solution
- Reports status
- Asks "what's next?"
- Waits for confirmation

**Autonomous Development:**
- Agent reads todo.md
- Implements solution
- Updates memory.md
- Continues to next task
- Zero interruptions

**Result**: 3-5x faster execution, minimal token waste, continuous progress.

## Getting Started

1. Agent creates `todo.md` from initial request
2. Agent creates `memory.md` for tracking
3. Agent begins autonomous execution
4. User receives updates only when all tasks complete or critical decisions needed

**The agent's value is in autonomous, efficient execution, not conversational interaction during active development.**
