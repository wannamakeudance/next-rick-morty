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
  Input,
  VStack,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import { useRouter } from "next/navigation";

export default function EditProfileModal({
  username,
  jobTitle,
}: {
  username: string;
  jobTitle: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [newUsername, setNewUsername] = useState(username);
  const [newJobTitle, setNewJobTitle] = useState(jobTitle);
  const router = useRouter();

  const handleSave = async () => {
    await fetch("/api/save-user", {
      method: "POST",
      body: JSON.stringify({
        username: newUsername,
        jobTitle: newJobTitle,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    setIsOpen(false);
    router.refresh(); // Trigger a re-render to show the updated user information
  };

  return (
    <>
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

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Your Profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Input
                placeholder="Username"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
              />

              <Input
                placeholder="Job Title"
                value={newJobTitle}
                onChange={(e) => setNewJobTitle(e.target.value)}
              />
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="yellow" mr={3} onClick={handleSave}>
              Save Changes
            </Button>
            <Button variant="ghost" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
