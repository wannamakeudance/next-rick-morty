// app/page.tsx
import { Heading, Input, Text, VStack, Button } from "@chakra-ui/react";

// SSR-compatible component without "use client"
export default function HomePage() {
  return (
    <VStack
      spacing={4}
      justify="center"
      height="100vh"
      as="form"
      method="POST"
      action="/api/save-user" // Form will submit to the server-side API route
    >
      <Heading>Welcome!</Heading>
      <Text fontSize="lg">Please enter your username and job title:</Text>

      {/* Username Input Field */}
      <Input
        placeholder="Username"
        name="username"
        required
        defaultValue="" // SSR forms must use `defaultValue`
      />

      {/* Job Title Input Field */}
      <Input
        placeholder="Job Title"
        name="jobTitle"
        required
        defaultValue="" // SSR forms must use `defaultValue`
      />

      {/* Submit Button */}
      <Button type="submit" colorScheme="blue">
        Save and Continue
      </Button>
    </VStack>
  );
}
