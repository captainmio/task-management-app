import { Grid, Box, Badge, Text, Button, Stack, SimpleGrid, VStack } from '@chakra-ui/react'
import { useAuthStore } from "../store/auth.store";
import { logout } from '../services/auth.service';

interface TopbarProps { 
    title: string 
}

const Topbar: React.FC<TopbarProps> = ({ title } ) => {
    const user = useAuthStore((state) => state.user)

    const handleLogout = async () => {
        const response = await logout();
        if (response.success) {
            useAuthStore.getState().logout();
        }
    }

    return (
        <Grid templateColumns="repeat(2, 1fr)" gap={2}>
            <Box>
                <Text fontSize="2xl" fontWeight="bold">
                    {title}
                </Text>
            </Box>
            <Box textAlign="right">
                <VStack align={'end'}>
                    <Badge ml="1" colorScheme="green" px={2} fontSize="0.8em">
                        Welcome, {user?.first_name}
                    </Badge>
                    <Button size="sm" onClick={handleLogout}>Logout</Button>
                </VStack>
            </Box>
        </Grid>
    )
}

export default Topbar