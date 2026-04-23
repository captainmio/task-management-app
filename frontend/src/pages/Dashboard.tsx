import {
  DndContext,
  closestCenter,
} from "@dnd-kit/core";
import { type DragEndEvent } from "@dnd-kit/core";
import {
  Badge,
  Box,
  Card,
  CardBody,
  CardHeader,
  Center,
  Flex,
  Grid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { PrimaryButton } from "../components/Buttons/PrimaryButton";
import DroppableColumn from "../components/Kanban/DroppableColumn";
import { useKanbanStore, type Task } from "../store/kanban.store";
import { useAuthStore } from "../store/auth.store";
import { useEffect } from "react";
import { getTasksByProjectId } from "../services/task.service";
import Topbar from "../components/Topbar";

/* -----------------------------
   Types
----------------------------- */
type ColumnType = {
  id: string;
  title: string;
  items: Task[];
};


const Dashboard = () => {
  const { columns, moveTask } = useKanbanStore();
  const user = useAuthStore((state) => state.user)
  const token = useAuthStore((state) => state.token)
  const setTasksFromBackend = useKanbanStore(
  (s) => s.setTasksFromBackend
);

  // Convert store columns to component format
  const columnData: ColumnType[] = [
    { id: "todo", title: "To Do", items: columns?.todo || [] },
    { id: "inProgress", title: "In Progress", items: columns?.inProgress || [] },
    { id: "done", title: "Done", items: columns?.done || [] },
  ];

  const fetchTasks = async () => {
    const projectId = 1
    const response = await getTasksByProjectId(projectId);

    if(response.success) {
      return setTasksFromBackend(response.data);
    }
  };

  useEffect(() => {
    console.log(user, token)
    fetchTasks();
  }, []);

  /* -----------------------------
     Handle Drag End
  ----------------------------- */
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    // Find which column the task is coming from
    let fromColumn = "";
    for (const [columnKey, tasks] of Object.entries(columns)) {
      if (tasks.some((task: {id: string}) => task.id === activeId)) {
        fromColumn = columnKey;
        break;
      }
    }

    if (fromColumn && fromColumn !== overId) {
      moveTask(activeId, fromColumn, overId);
    }
  };

  return (
    <Center h="100vh" w="100vw">
      <Stack spacing={4} w="100%" maxW="1200px" p={4}>
        <Topbar title="Tasks" />
        <Card w="100%" maxW="1600px" p={4}>
          <CardHeader>
            <PrimaryButton
              value="Create New Task"
              onClick={() => alert("Create Task")}
            />
          </CardHeader>
          <CardBody style={{ paddingTop: "0" }}>
            <DndContext
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <Flex gap={4} p={4}>
                {columnData.map((col) => (
                  <DroppableColumn key={col.id} column={col} />
                ))}
              </Flex>
            </DndContext>
          </CardBody>
        </Card>
      </Stack>
    </Center>
  );
};

export default Dashboard;