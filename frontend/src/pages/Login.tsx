import { Card, CardBody, CardHeader, Center, FormControl, FormLabel, Heading, SimpleGrid, Text, Box, HStack, CheckboxGroup, Checkbox, Stack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Textbox } from "../components/Textbox";
import { useState } from "react";
import { CancelButton } from "../components/Buttons/CancelButton";
import { PrimaryButton } from "../components/Buttons/PrimaryButton";
import PasswordField from "../components/PasswordField";

const Login = () => {
  const [username, setUsername] = useState<string | number>("");
  const [password, setPassword] = useState<string | number>("");
  return <Center>
    <Card minW={"550px"} className="register-card">
      <CardHeader>
        <Heading size="lg" textAlign="left" className="gradiant-font header-font">
          Login
        </Heading>
        <Text fontSize='sm' mt={2}>
          Need an account? <Link to="/register" className="links">Register</Link>
        </Text>
      </CardHeader>
      <CardBody style={{ paddingTop: "0" }}>
        <SimpleGrid columns={1}>
          <Box>
            <FormControl isRequired>
              <FormLabel>Username</FormLabel>
              <Textbox
                value={username}
                type="text"
                onChange={(val) => {
                  setUsername(val);
                }}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel marginTop={"20px"}>Password</FormLabel>
              <PasswordField value={password} onChange={(val: string | number) => setPassword(val)}/>
            </FormControl>
            <Stack mt={2} spacing={1}>
              <FormControl mt={4}>
                <Checkbox >Keep me logged in</Checkbox>
              </FormControl>
            </Stack>
            <HStack
              justifyContent="flex-end"
              width="100%"
              spacing={4}
              mt={4}
            >
              <PrimaryButton
                value="Login"
                onClick={() => {
                  alert("login");
                }}
              />
            </HStack>
          </Box>
        </SimpleGrid>
      </CardBody>
    </Card>
  </Center>;
};

export default Login;
