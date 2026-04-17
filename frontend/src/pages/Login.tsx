import {
  Card,
  CardBody,
  CardHeader,
  Center,
  FormControl,
  FormLabel,
  Heading,
  SimpleGrid,
  Text,
  Box,
  HStack,
  Checkbox,
  Stack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Textbox } from "../components/Textbox";
import { useState } from "react";
import { PrimaryButton } from "../components/Buttons/PrimaryButton";
import PasswordField from "../components/PasswordField";
import * as z from "zod";
import { login } from "../services/auth";

const loginSchema = z.object({
  username: z.string().min(1, "This field is required"),
  password: z.string().min(1, "This field is required"),
});

export type LoginValues = z.infer<typeof loginSchema>;

const Login = () => {
  const [username, setUsername] = useState<string | number>("");
  const [password, setPassword] = useState<string | number>("");

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const onSubmit = () => {
    const result = loginSchema.safeParse({ username, password });
    if (!result.success) {
      const formattedErrors: { [key: string]: string } = {};
      result.error.issues.forEach((issue) => {
        formattedErrors[String(issue.path[0])] = issue.message;
      });
      setErrors(formattedErrors);
    } else {
      const response = login({
        username: username.toString(),
        password: password.toString(),
      });

      console.log('Response:', response);
    }
  };

  return (
    <Center>
      <Card minW={"550px"} className="register-card">
        <CardHeader>
          <Heading
            size="lg"
            textAlign="left"
            className="gradiant-font header-font"
          >
            Login
          </Heading>
          <Text fontSize="sm" mt={2}>
            Need an account?{" "}
            <Link to="/register" className="links">
              Register
            </Link>
          </Text>
        </CardHeader>
        <CardBody style={{ paddingTop: "0" }}>
          <SimpleGrid columns={1}>
            <Box>
              <FormControl isRequired>
                <FormLabel>Username</FormLabel>
                <Textbox
                  isInvalid={!!errors.username}
                  value={username}
                  type="text"
                  onChange={(val) => {
                    setUsername(val);
                  }}
                />
                {errors.username?.length > 0 && (
                  <Text color="red.500" fontSize="sm" mt={1}>
                    {errors.username}
                  </Text>
                )}
              </FormControl>
              <FormControl isRequired>
                <FormLabel marginTop={"20px"}>Password</FormLabel>
                <PasswordField
                  isInvalid={!!errors.password}
                  value={password}
                  onChange={(val: string | number) => {
                    console.log('password value:', val);
                    setPassword(val)
                  }}
                />
                {errors.password?.length > 0 && (
                  <Text color="red.500" fontSize="sm" mt={1}>
                    {errors.password}
                  </Text>
                )}
              </FormControl>
              <Stack mt={2} spacing={1}>
                <FormControl mt={4}>
                  <Checkbox>Keep me logged in</Checkbox>
                </FormControl>
              </Stack>
              <HStack justifyContent="flex-end" width="100%" spacing={4} mt={4}>
                <PrimaryButton value="Login" onClick={() => onSubmit()} />
              </HStack>
            </Box>
          </SimpleGrid>
        </CardBody>
      </Card>
    </Center>
  );
};

export default Login;
