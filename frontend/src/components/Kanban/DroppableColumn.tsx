import { Badge, Box, Grid, Text, Flex } from "@chakra-ui/react";
import { DraggableTask } from "./DraggableTask";
import { useDroppable } from "@dnd-kit/core";
import { type Task } from "../../store/kanban.store";

type ColumnType = {
  id: string;
  title: string;
  items: Task[];
};

const DroppableColumn: React.FC<{column: ColumnType}> = ({ column }) => {
  const { setNodeRef } = useDroppable({
    id: column.id,
  });

  return (
    <Box
      ref={setNodeRef}
      w="250px"
      p={4}
      bg="gray.50"
      borderRadius="md"
      className="kanban-column"
    >
      <Grid templateColumns="repeat(2, 1fr)" gap={2} mb={4} p={2}>
        <Box>
          <Text fontSize="lg" fontWeight="bold">{column.title}</Text>
        </Box>
        <Box textAlign="right">
          <Badge ml="1" colorScheme="blue" px={2} fontSize="0.8em">
            {column.items.length}
          </Badge>
        </Box>
      </Grid>

      <Flex direction="column" gap={3} mt={4}>
        {column.items.map((task) => (
          <DraggableTask key={task.id} task={task} />
        ))}
      </Flex>
    </Box>
  );
};

export default DroppableColumn;
