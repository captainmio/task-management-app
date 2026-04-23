import { Card, CardBody, CardHeader, Center, Stack, Text } from '@chakra-ui/react'
import DynamicTable from '../components/DynamicTable'
import Topbar from '../components/Topbar';
import { useEffect, useState } from 'react';
import { LoadingState } from '../components/LoadingState';
import { getProjects } from '../services/project.service';

type TaskType = {
  id: number;
  name: string;
  description: string;
};

type ColumnType = {
  key: keyof TaskType; 
  label: string;
};

const Project = () => {

    const columns: ColumnType[] = [
        { key: "id", label: "ID" },
        { key: "name", label: "Name" },
        { key: "description", label: "Description" },
    ];

    const [loading, setLoading] = useState<Boolean>(true);
    const [projects, setProjects] = useState<TaskType[]>([]);


    const fetchProjects = async () => {
        setLoading(true)

        const response = await getProjects();
        if(response.success) {
            setProjects(response.data);
        }

        setLoading(false)
    }

    useEffect(() => {
      fetchProjects()
    }, [])
    

  return loading ? (<LoadingState />) : (<Center h="100vh" w="100vw">
        <Stack spacing={4} w="100%" maxW="1200px" p={4}>
            <Topbar title="Projects" />
            <Card w="100%" maxW="1600px" p={4}>
                <CardHeader>
                    <Text fontSize="2xl" fontWeight="bold">Project listing</Text>
                </CardHeader>
                <CardBody style={{ paddingTop: "0" }}>
                    <DynamicTable columns={columns} data={projects}/>
                </CardBody>
            </Card>
        </Stack>
    </Center>)
  
}

export default Project