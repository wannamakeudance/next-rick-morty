"use client";

import { Heading, Text, useToast, VStack } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import UserForm from "./components/UserForm";

export default function HomePage() {
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const router = useRouter();
  const cookies = document.cookie;
  const username =
    cookies
      .split(";")
      .find((c) => c.includes("username="))
      ?.split("=")[1] || "";
  if (username) {
    router.push("/info");
  }

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
        width: "70vw",
        margin: "0 auto",
      }}
      spacing={4}
      justify="center"
    >
      <Image
        style={{
          height: "100%",
          width: "100%",
          position: "fixed",
          zIndex: -1,
          objectFit: "cover",
          opacity: 0.2,
        }}
        priority
        src="/bg.jpg"
        alt="Logo"
        width={200}
        height={200}
        quality={60}
      />
      <Heading>Welcome!</Heading>
      <Text fontSize={{ base: "md", md: "lg" }} fontWeight={700}>
        Please enter your username and job title:
      </Text>
      <UserForm
        defaultValues={{ username: "", jobTitle: "" }}
        onSubmit={handleFormSubmit}
        buttonText="Save and Continue"
        isLoading={loading}
      />
    </VStack>
  );
}
