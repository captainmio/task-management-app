import { Spinner, Text, VStack } from "@chakra-ui/react"


export const LoadingState = () => {
  return (
    <VStack color="red">
      <Spinner color="colorPalette.600" />
      <Text color="colorPalette.600">Loading...</Text>
    </VStack>
  )
}
