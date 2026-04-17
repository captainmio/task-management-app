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

  // Convert store columns to component format
  const columnData: ColumnType[] = [
    { id: "todo", title: "To Do", items: columns?.todo || [] },
    { id: "progress", title: "In Progress", items: columns?.progress || [] },
    { id: "done", title: "Done", items: columns?.done || [] },
  ];

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
      if (tasks.some((task) => task.id === activeId)) {
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
        <Grid templateColumns="repeat(2, 1fr)" gap={2} mb={4} p={2}>
          <Box>
            <Text fontSize="2xl" fontWeight="bold">
              Dashboard
            </Text>
          </Box>
          <Box textAlign="right">
            <Badge ml="1" colorScheme="green" px={2} fontSize="0.8em">
              Welcome, User!
            </Badge>
          </Box>
        </Grid>
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