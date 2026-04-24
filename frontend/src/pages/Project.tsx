import { Button, Card, CardBody, CardHeader, Center, FormControl, FormLabel, Stack, Textarea, useDisclosure, VStack } from '@chakra-ui/react'
import DynamicTable from '../components/DynamicTable'
import Topbar from '../components/Topbar';
import { useEffect, useState } from 'react';
import { LoadingState } from '../components/LoadingState';
import { getProjects } from '../services/project.service';
import { PrimaryButton } from '../components/Buttons/PrimaryButton';
import FormModal from '../components/FormModal';
import { Textbox } from '../components/Textbox';
import CustomeTextarea from '../components/CustomTextarea';

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

    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');

    const [loading, setLoading] = useState<Boolean>(true);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [modalTitle, setModalTitle] = useState<string>('')
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

    const handleCreateProject = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(name, description);
        
        clearForm();
        onClose();
    }
    
    const formModalOpen = () => {
        setModalTitle('Create Project');
        onOpen();
    }

    const clearForm = () => {
        setName('');
        setDescription('');
    }
    

  return loading ? (<LoadingState />) : (<Center h="100vh" w="100vw">
        <Stack spacing={4} w="100%" maxW="1200px" p={4}>
            <Topbar title="Projects" />
            <Card w="100%" maxW="1600px" p={4}>
                <CardHeader>
                    <PrimaryButton value={'Create Project'} onClick={formModalOpen}/>
                </CardHeader>
                <CardBody style={{ paddingTop: "0" }}>
                    <DynamicTable columns={columns} data={projects} variant={'striped'}/>
                </CardBody>
            </Card>
        </Stack>
        <FormModal 
            isOpen={isOpen} 
            onClose={onClose} 
            title={modalTitle}
            motionPreset="slideInBottom"
        >
            <form onSubmit={handleCreateProject}>
            <VStack spacing={4}>
                <FormControl>
                    <FormLabel>Name</FormLabel>
                    <Textbox placeholder="Enter name" onChange={(e) => {
                        setName(e.target.value);
                    }} value={name} />
                </FormControl>
                <FormControl>
                    <FormLabel>Description</FormLabel>
                    <CustomeTextarea onChange={(e) => {
                        setDescription(e.target.value);
                    }} value={description} />
                </FormControl>
                <PrimaryButton type="submit" value='Save Changes' w="full" />
            </VStack>
            </form>
        </FormModal>
    </Center>)
  
}

export default Project