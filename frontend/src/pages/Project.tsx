import { Card, CardBody, CardHeader, Center, Stack, Text } from '@chakra-ui/react'
import { Breadcrumbs } from '../components/Breadcrumbs'
import DynamicTable from '../components/DynamicTable'
import Topbar from '../components/Topbar';

type TaskType = {
  id: number;
  title: string;
  status: string;
  dueDate: string;
};

type ColumnType = {
  key: keyof TaskType; 
  label: string;
};

const Project = () => {

    const links = [
        { link: "/projects", label: "Projects" },
    ]

    const columns: ColumnType[] = [
        { key: "id", label: "ID" },
        { key: "title", label: "Task Title" },
        { key: "status", label: "Status" },
        { key: "dueDate", label: "Due Date" },
    ];

    const data: TaskType[] = [
        { id: 1, title: "Setup project", status: "Done", dueDate: "2026-04-25" },
        { id: 2, title: "Build UI", status: "In Progress", dueDate: "2026-04-28" },
        { id: 3, title: "API integration", status: "To Do", dueDate: "2026-05-01" },
    ];

  return (
    <Center h="100vh" w="100vw">
        <Stack spacing={4} w="100%" maxW="1200px" p={4}>
            <Topbar title="Projects" />
            <Card w="100%" maxW="1600px" p={4}>
                <Breadcrumbs links={links} />
                <CardHeader>
                    <Text fontSize="2xl" fontWeight="bold">Project listing</Text>
                </CardHeader>
                <CardBody style={{ paddingTop: "0" }}>
                    <DynamicTable columns={columns} data={data}/>
                </CardBody>
            </Card>
        </Stack>
    </Center>
  )
}

export default Project