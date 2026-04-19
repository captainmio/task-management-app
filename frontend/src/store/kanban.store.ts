import { create } from "zustand";

export type Task = {
  id: string;
  title: string;
  description: string;
  status: Status;
};

export type Status = "backlog" | "todo" | "inProgress" | "review" | "done";

type Columns = Record<Status, Task[]>;

export type KanbanState = {
  columns: Record<string, Task[]>;
  setTasksFromBackend: (tasks: Task[]) => void;
  moveTask: (taskId: string, fromColumn: string, toColumn: string) => void;
  updateTask: (task: Task) => void;
};



export const useKanbanStore = create<KanbanState>((set, get) => ({
  columns: {
    backlog: [],
    todo: [],
    inProgress: [],
    review: [],
    done: [],
  },
  setTasksFromBackend: (tasks) => {
    const grouped: Columns = {
      backlog: [],
      todo: [],
      inProgress: [],
      review: [],
      done: [],
    };

    tasks.forEach((task: Task) => {
      grouped[task.status].push(task);
    });

    set({ columns: grouped });
  },
  moveTask: (taskId, fromColumn, toColumn) => 
    set((state) => {
      const fromTasks = state.columns[fromColumn];
      const task = fromTasks.find((t) => t.id === taskId);

      if (!task) return state;

      return {
        columns: {
          ...state.columns,
          [fromColumn]: fromTasks.filter((t) => t.id !== taskId),
          [toColumn]: [...state.columns[toColumn], task],
        },
      };
    }),
    updateTask: (updatedTask: Task) => {
      const state = get();

      const newColumns = { ...state.columns };

      // remove from all columns first
      (Object.keys(newColumns) as Status[]).forEach((col) => {
        newColumns[col] = newColumns[col].filter(
          (t) => t.id !== updatedTask.id
        );
      });

      // add to correct column
      newColumns[updatedTask.status].push(updatedTask);

      set({ columns: newColumns });
    },
}));
