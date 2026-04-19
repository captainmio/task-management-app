import { useEffect } from "react";
import { socket } from "../services/socket.service";
import { useKanbanStore } from "../store/kanban.store";

export const useSocket = () => {
  useEffect(() => {
    const { updateTask } = useKanbanStore.getState();

    socket.on("taskUpdated", updateTask);
    socket.on("taskCreated", updateTask);

    return () => {
      socket.off("taskUpdated", updateTask);
      socket.off("taskCreated", updateTask);
    };
  }, []);
};