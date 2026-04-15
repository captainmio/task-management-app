import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/css/index.css'
import Register from './pages/Register.tsx'
import Login from './pages/Login.tsx'

import { Center, extendTheme } from '@chakra-ui/react'
import { ChakraProvider } from '@chakra-ui/react'

import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";

const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
}

const theme = extendTheme({ colors })


const router = createBrowserRouter([
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/",
    element: <Login />,
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <Center h="100vh" w="100vw">
        <RouterProvider router={router} />
      </Center>
    </ChakraProvider>
  </StrictMode>,
)
