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
import { useState, useEffect } from "react";
import { Textbox } from "../components/Textbox";
import { PrimaryButton } from "../components/Buttons/PrimaryButton";
import { CancelButton } from "../components/Buttons/CancelButton";
import { useNavigate } from "react-router-dom";
import z from "zod";
import { register } from "../services/auth";

const Register = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState<string | number>("");
  const [lastName, setLastName] = useState<string | number>("");
  const [email, setEmail] = useState<string | number>("");
  const [username, setUsername] = useState<string | number>("");
  const [password, setPassword] = useState<string | number>("");
  const [confirmPassword, setConfirmPassword] = useState<string | number>("");

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const registerSchema = z.object({
    firstName: z.string().min(1, "This field is required"),
    lastName: z.string().min(1, "This field is required"),
    email: z.string().email("Please enter a valid email address"),
    username: z.string().min(1, "This field is required"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string()
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], 
  });

  const handleRegister = async () => {
    const result = registerSchema.safeParse({ firstName, lastName, email, username, password, confirmPassword });
    console.log(result.success)

    if (!result.success) {
      const formattedErrors: { [key: string]: string } = {};
      result.error.issues.forEach((issue) => {
        formattedErrors[String(issue.path[0])] = issue.message;
      });
      setErrors(formattedErrors);
    } else {
      const response = await register({
        first_name: String(firstName),
        last_name: String(lastName),
        email: String(email),
        username: String(username),
        password: String(password)
      })

      console.log('Response:', response);

    }

  }

  useEffect(() => {
    console.log(errors)
  }, [errors]);
  



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
                  onClick={handleRegister}
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
