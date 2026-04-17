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
  FormErrorMessage,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { Textbox } from "../components/Textbox";
import { useEffect, useState } from "react";
import { PrimaryButton } from "../components/Buttons/PrimaryButton";
import PasswordField from "../components/PasswordField";
import * as z from "zod";
import { login } from "../services/auth";
import { showNotification } from "../components/showNotification";
import { useAuthStore } from "../store/auth.store";

const loginSchema = z.object({
  username: z.string().min(1, "This field is required"),
  password: z.string().min(1, "This field is required"),
});

export type LoginValues = z.infer<typeof loginSchema>;

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string | number>("");
  const [password, setPassword] = useState<string | number>("");

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const loginAuthStore = useAuthStore((state) => state.login);
  const userStore = useAuthStore((state) => state.user);

  const onSubmit = async () => {
    setErrors({});
    const result = loginSchema.safeParse({ username, password });
    if (!result.success) {
      const formattedErrors: { [key: string]: string } = {};
      result.error.issues.forEach((issue) => {
        formattedErrors[String(issue.path[0])] = issue.message;
      });
      setErrors(formattedErrors);
    } else {
      const response = await login({
        username: username.toString(),
        password: password.toString(),
      });

      if (response.success) {
        loginAuthStore(response.user, response.token);
        navigate("/");
        showNotification("success", "Login successful!");
      } else {
        showNotification("error", response.message || "Login failed. Please check your credentials and try again.");
      }
    }
  };


  useEffect(() => {
    console.log(userStore)
  }, [userStore]);
  

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
              <FormControl isRequired isInvalid={!!errors.username}>
                <FormLabel>Username</FormLabel>
                <Textbox
                  isInvalid={!!errors.username}
                  value={username}
                  type="text"
                  onChange={(val) => {
                    setUsername(val);
                  }}
                />
                <FormErrorMessage>{errors.username}</FormErrorMessage>
              </FormControl>
              <FormControl isRequired isInvalid={!!errors.password}>
                <FormLabel marginTop={"20px"}>Password</FormLabel>
                <PasswordField
                  isInvalid={!!errors.password}
                  value={password}
                  onChange={(val: string | number) => {
                    setPassword(val)
                  }}
                />
                <FormErrorMessage>{errors.password}</FormErrorMessage>
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

