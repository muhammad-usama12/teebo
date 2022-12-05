import { useState } from "react";
import { Button, ButtonGroup, Heading, Text, VStack } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useNavigate } from "react-router";
import TextField from "../components/TextField";
 
import useApplicationData from "../hooks/useApplicationData";
import Header from "../components/Header";
import Footer from "../components/Footer";
 
const SignUp = () => {
 const [user, setUser] = useState({});
 const { error, setError } = useApplicationData();
 
 const navigate = useNavigate();
 
 return (
   <>
     <Header />
     <Formik
       initialValues={{ username: "", password: "" }}
       onSubmit={(values, actions) => {
         const vals = { ...values };
         actions.resetForm();
         fetch("api/auth/signup", {
           method: "POST",
           credentials: "include",
           headers: {
             "Content-Type": "application/json",
           },
           body: JSON.stringify(vals),
         })
           .catch((err) => {
             return;
           })
           .then((res) => {
             if (!res || !res.ok || res.status >= 400) {
               return;
             }
             return res.json();
           })
           .then((data) => {
             if (!data) return;
             if (data.status) {
               setError(data.status);
             } else if (data.loggedIn) {
               setUser({ ...data });
               navigate("/login");
             }
           });
       }}
     >
       <VStack
         as={Form}
         w={{ base: "90%", md: "500px" }}
         m="auto"
         justify="center"
         h="100vh"
         spacing="1rem"
       >
         <Heading>Sign Up</Heading>
         <Text as="p" color="red.500">
           {error}
         </Text>
         <TextField
           name="username"
           placeholder="Enter username"
           autoComplete="off"
           label="Username"
         />
 
         <TextField
           name="password"
           placeholder="Enter password"
           autoComplete="off"
           label="Password"
           type="password"
         />
 
         <ButtonGroup pt="1rem">
           <Button colorScheme="teal" type="submit">
             Create Account
           </Button>
         </ButtonGroup>
       </VStack>
     </Formik>
     <Footer />
   </>
 );
};
 
export default SignUp;