import {
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";

interface UserFormProps {
  defaultValues: {
    username: string;
    jobTitle: string;
  };
  onSubmit: (data: { username: string; jobTitle: string }) => void;
  buttonText: string;
  isLoading?: boolean;
}

export default function UserForm({
  defaultValues,
  onSubmit,
  buttonText,
  isLoading = false,
}: UserFormProps) {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: defaultValues,
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{
        width: "100%",
      }}
    >
      <VStack spacing={4}>
        <FormControl isInvalid={!!errors.username}>
          <Input
            background={"#201f1f"}
            color={"#fff"}
            height={14}
            placeholder="Username"
            {...register("username", {
              required: "Username is required",
              minLength: {
                value: 3,
                message: "Username must be at least 3 characters long",
              },
              maxLength: {
                value: 18,
                message: "Username must not exceed 18 characters",
              },
            })}
          />
          <FormErrorMessage>
            {errors.username && errors.username.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.jobTitle}>
          <Input
            background={"#201f1f"}
            color={"#fff"}
            height={14}
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
          isLoading={isSubmitting || isLoading}
        >
          {buttonText}
        </Button>
      </VStack>
    </form>
  );
}
