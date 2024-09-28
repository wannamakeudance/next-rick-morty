// components/EditProfileModal.tsx
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
    try {
      // Send updated user data to the API route
      const response = await fetch("/api/save-user", {
        method: "POST",
        body: JSON.stringify({
          username: newUsername,
          jobTitle: newJobTitle,
        }),
        headers: {
          "Content-Type": "application/json", // Ensure correct content type is set
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      // Close the modal and refresh the page to reflect changes
      setIsOpen(false);
      router.refresh(); // Trigger a re-render to show the updated user information
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

  return (
    <>
      {/* Trigger Button to Open Modal */}
      <Button size="sm" colorScheme="yellow" onClick={() => setIsOpen(true)}>
        Edit Profile
      </Button>

      {/* Chakra UI Modal for Editing User Profile */}
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Your Profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              {/* Username Input Field */}
              <Input
                placeholder="Username"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
              />

              {/* Job Title Input Field */}
              <Input
                placeholder="Job Title"
                value={newJobTitle}
                onChange={(e) => setNewJobTitle(e.target.value)}
              />
            </VStack>
          </ModalBody>
          <ModalFooter>
            {/* Save Changes Button */}
            <Button colorScheme="blue" mr={3} onClick={handleSave}>
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
