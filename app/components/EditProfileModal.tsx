"use client";

import { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  VStack,
  Tooltip,
} from "@chakra-ui/react";
import { EditIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { useRouter } from "next/navigation";
import UserForm from "./UserForm";

export default function EditProfileModal({
  username,
  jobTitle,
}: {
  username: string;
  jobTitle: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();

  const handleFormSubmit = async (data: {
    username: string;
    jobTitle: string;
  }) => {
    setIsSaving(true);
    await fetch("/api/save-user", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    setIsSaving(false);
    setIsOpen(false);
    router.refresh();
  };

  const handleLogout = () => {
    // clear the cookie and redirect to the login page
    document.cookie =
      "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    location.href = "/";
  };

  return (
    <>
      {/* Edit profile */}
      <Button
        display={{
          base: "none",
          md: "inline-flex",
        }}
        size="sm"
        colorScheme="yellow"
        onClick={() => setIsOpen(true)}
      >
        Edit Profile
      </Button>
      <Tooltip label="Edit Profile">
        <EditIcon
          display={{
            base: "inline-flex",
            md: "none",
          }}
          fontSize={24}
          color={"yellow.400"}
          style={{ cursor: "pointer" }}
          onClick={() => setIsOpen(true)}
        />
      </Tooltip>
      {/* Logout */}
      <Button
        display={{
          base: "none",
          md: "inline-flex",
        }}
        size="sm"
        colorScheme="grey"
        onClick={handleLogout}
      >
        Logout
      </Button>
      <Tooltip label="Logout">
        <ArrowForwardIcon
          display={{
            base: "inline-flex",
            md: "none",
          }}
          fontSize={24}
          color={"yellow.400"}
          style={{ cursor: "pointer" }}
          onClick={handleLogout}
        />
      </Tooltip>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Your Profile</ModalHeader>
          <ModalCloseButton data-testid="edit-profile-close-button" />
          <ModalBody>
            <VStack spacing={4}>
              <UserForm
                defaultValues={{ username, jobTitle }}
                onSubmit={handleFormSubmit}
                buttonText="Save Changes"
                isLoading={isSaving}
              />
            </VStack>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
