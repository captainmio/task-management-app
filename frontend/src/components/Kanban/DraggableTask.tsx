import { Box, Text } from "@chakra-ui/react";
import { useDraggable } from '@dnd-kit/core';
import { type Task } from "../../store/kanban.store";

type DraggableTaskProps = {
  task: Task;
};

export const DraggableTask: React.FC<DraggableTaskProps> = ({ task }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: task.id,
  });

  const style = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 1000 : 'auto',
  };

  return (
    <Box
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      p={4}
      bg="white"
      borderRadius="md"
      boxShadow={isDragging ? "lg" : "sm"}
      cursor="grab"
      _active={{
        cursor: "grabbing",
      }}
      className="kanban-task"
      minH="60px"
      w="100%"
      transition={isDragging ? "none" : "box-shadow 0.2s"}
    >
      <Text fontSize="md" fontWeight="500">{task.title}</Text>
      <Text fontSize="sm" color="gray.600">
        {task.description}
      </Text>
    </Box>
  );
};