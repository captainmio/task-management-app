import {
  Card,
  CardHeader,
  Heading,
  CardBody,
  Box,
  FormControl,
  FormLabel,
  Center,
  SimpleGrid,
  HStack,
  FormHelperText
} from "@chakra-ui/react";
import { useState } from "react";
import { Textbox } from "../components/Textbox";
import { PrimaryButton } from "../components/Buttons/PrimaryButton";
import { CancelButton } from "../components/Buttons/CancelButton";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState<string | number>("");
  const [lastName, setLastName] = useState<string | number>("");
  const [email, setEmail] = useState<string | number>("");
  const [username, setUsername] = useState<string | number>("");
  const [password, setPassword] = useState<string | number>("");
  const [confirmPassword, setConfirmPassword] = useState<string | number>("");

  return (
    <Center>
      <Card minW={"550px"} className="register-card">
        <CardHeader>
          <Heading size="lg" textAlign="center" className="gradiant-font header-font">
            Create an Account
          </Heading>
        </CardHeader>
        <CardBody pt={0}>
          <SimpleGrid columns={1} mt={4}>
            <Box>
              <FormControl isRequired>
                <FormLabel>First Name</FormLabel>
                <Textbox
                  value={firstName}
                  type="text"
                  onChange={(val) => {
                    setFirstName(val);
                  }}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel marginTop={"20px"}>Last Name</FormLabel>
                <Textbox
                  value={lastName}
                  type="text"
                  onChange={(val) => {
                    setLastName(val);
                  }}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel marginTop={"20px"}>Email</FormLabel>
                <Textbox
                  value={email}
                  type="email"
                  onChange={(val) => {
                    setEmail(val);
                  }}
                />
                <FormHelperText>Please provide a unique email address.</FormHelperText>
              </FormControl>
              <FormControl isRequired>
                <FormLabel marginTop={"20px"}>Username</FormLabel>
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
                <Textbox
                  value={password}
                  type="password"
                  onChange={(val) => {
                    setPassword(val);
                  }}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel marginTop={"20px"}>Confirm Password</FormLabel>
                <Textbox
                  value={confirmPassword}
                  type="password"
                  onChange={(val) => {
                    setConfirmPassword(val);
                  }}
                />
              </FormControl>
              <HStack
                justifyContent="flex-end"
                width="100%"
                spacing={4}
                mt={4}
              >
                <CancelButton
                  value="Cancel"
                  onClick={() => {
                    navigate("/");
                  }}
                />
                <PrimaryButton
                  value="Register"
                  onClick={() => {
                    alert("submit");
                  }}
                />
              </HStack>
            </Box>
          </SimpleGrid>
        </CardBody>
      </Card>
    </Center>
  );
};

export default Register;
