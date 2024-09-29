"use client";

import { useState } from "react";
import {
  Heading,
  Input,
  Text,
  VStack,
  Button,
  FormControl,
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

interface FormValues {
  username: string;
  jobTitle: string;
}

export default function HomePage() {
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
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
      reset();
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
      as="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Heading>Welcome!</Heading>
      <Text fontSize="lg">Please enter your username and job title:</Text>

      <FormControl isInvalid={!!errors.username}>
        <Input
          placeholder="Username"
          {...register("username", {
            required: "Username is required", // Custom error message
            minLength: {
              value: 3,
              message: "Username must be at least 3 characters long",
            },
            maxLength: {
              value: 10,
              message: "Username must not exceed 10 characters",
            },
          })}
        />
        <FormErrorMessage>
          {errors.username && errors.username.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.jobTitle}>
        <Input
          placeholder="Job Title"
          {...register("jobTitle", {
            required: "Job Title is required",
            minLength: {
              value: 2,
              message: "Job Title must be at least 2 characters long",
            },
            maxLength: {
              value: 20,
              message: "Job Title must not exceed 20 characters",
            },
          })}
        />
        <FormErrorMessage>
          {errors.jobTitle && errors.jobTitle.message}
        </FormErrorMessage>
      </FormControl>

      <Button
        type="submit"
        size="lg"
        colorScheme="yellow"
        isLoading={isSubmitting || loading}
      >
        Save and Continue
      </Button>
    </VStack>
  );
}
