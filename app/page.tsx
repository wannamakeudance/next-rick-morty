import { Heading, Input, Text, VStack, Button } from "@chakra-ui/react";

export default function HomePage() {
  return (
    <VStack
      sx={{
        height: "100vh",
        width: "80vw",
        margin: "0 auto",
      }}
      spacing={4}
      justify="center"
      as="form"
      method="POST"
      action="/api/save-user"
    >
      <Heading>Welcome!</Heading>
      <Text fontSize="lg">Please enter your username and job title:</Text>
      <Input placeholder="Username" name="username" required defaultValue="" />
      <Input placeholder="Job Title" name="jobTitle" required defaultValue="" />
      <Button type="submit" size="lg" colorScheme="yellow">
        Save and Continue
      </Button>
    </VStack>
  );
}
