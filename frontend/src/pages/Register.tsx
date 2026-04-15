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
} from "@chakra-ui/react";
import { useState } from "react";
import { Textbox } from "../components/Textbox";
import { PrimaryButton } from "../components/Buttons/PrimaryButton";
import { CancelButton } from "../components/Buttons/CancelButton";

const Register = () => {
  // return <div>Register</div>;

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
          <Heading size="lg" textAlign="center" className="gradiant-font">
            CREATE AN ACCOUNT
          </Heading>
        </CardHeader>
        <CardBody>
          <SimpleGrid columns={1} mt={4}>
            <Box>
              <FormControl>
                <FormLabel>First Name</FormLabel>
                <Textbox
                  value={firstName}
                  type="text"
                  onChange={(val) => {
                    setFirstName(val);
                  }}
                />
                <FormLabel marginTop={"20px"}>Last Name</FormLabel>
                <Textbox
                  value={lastName}
                  type="text"
                  onChange={(val) => {
                    setLastName(val);
                  }}
                />
                <FormLabel marginTop={"20px"}>Email</FormLabel>
                <Textbox
                  value={email}
                  type="email"
                  onChange={(val) => {
                    setEmail(val);
                  }}
                />
                <FormLabel marginTop={"20px"}>Username</FormLabel>
                <Textbox
                  value={username}
                  type="text"
                  onChange={(val) => {
                    setUsername(val);
                  }}
                />
                <FormLabel marginTop={"20px"}>Password</FormLabel>
                <Textbox
                  value={password}
                  type="password"
                  onChange={(val) => {
                    setPassword(val);
                  }}
                />
                <FormLabel marginTop={"20px"}>Confirm Password</FormLabel>
                <Textbox
                  value={confirmPassword}
                  type="password"
                  onChange={(val) => {
                    setConfirmPassword(val);
                  }}
                />
                <HStack
                  justifyContent="flex-end"
                  width="100%"
                  spacing={4}
                  mt={4}
                >
                  <CancelButton
                    value="Cancel"
                    onClick={() => {
                      alert("cancel");
                    }}
                  />
                  <PrimaryButton
                    value="Register"
                    onClick={() => {
                      alert("submit");
                    }}
                  />
                </HStack>
              </FormControl>
            </Box>
          </SimpleGrid>
        </CardBody>
      </Card>
    </Center>
  );
};

export default Register;
