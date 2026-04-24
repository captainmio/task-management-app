import { Spinner, Text, VStack } from "@chakra-ui/react"
import React from 'react';


export const LoadingState: React.FC = () => {
  return (
    <VStack color="red">
      <Spinner color="colorPalette.600" />
      <Text color="colorPalette.600">Loading...</Text>
    </VStack>
  )
}
