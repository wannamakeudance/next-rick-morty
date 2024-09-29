"use client";

import { useState } from "react";
import { VStack, Heading, Text, useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import UserForm from "./components/UserForm";

export default function HomePage() {
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const router = useRouter();

  // Handle form submission
  const handleFormSubmit = async (data: {
    username: string;
    jobTitle: string;
  }) => {
    setLoading(true);
    try {
      const response = await fetch("/api/save-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast({
          title: "Submission Failed",
          description: `Error: ${errorData.message}`,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        setLoading(false);
        return;
      }
      location.href = "/info";
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again later.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <VStack
      sx={{
        height: "100vh",
        width: "80vw",
        margin: "0 auto",
      }}
      spacing={4}
      justify="center"
    >
      <Heading>Welcome!</Heading>
      <Text fontSize="lg">Please enter your username and job title:</Text>
      <UserForm
        defaultValues={{ username: "", jobTitle: "" }}
        onSubmit={handleFormSubmit}
        buttonText="Save and Continue"
        isLoading={loading}
      />
    </VStack>
  );
}
