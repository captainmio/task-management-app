import { create } from "zustand";

export type Task = {
  id: string;
  title: string;
  description: string;
};

export type KanbanState = {
  columns: Record<string, Task[]>;
  moveTask: (taskId: string, fromColumn: string, toColumn: string) => void;
};



export const useKanbanStore = create<KanbanState>((set) => ({
  columns: {
    todo: [
      { id: "1", title: "Task 1", description: "Description of Task 1" },
      { id: "2", title: "Task 2", description: "Description of Task 2" },
    ],
    progress: [
      { id: "3", title: "Task 3", description: "Description of Task 3" },
    ],
    done: [
      { id: "4", title: "Task 4", description: "Description of Task 4" },
    ],
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
}));
