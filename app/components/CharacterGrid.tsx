"use client";

import {
  Box,
  Button,
  Grid,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import Image from "next/image";
import { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

interface Character {
  id: string;
  name: string;
  image: string;
  species: string;
  gender: string;
}

interface Info {
  count: number;
  pages: number;
  next: number | null;
  prev: number | null;
}

interface CharacterGridProps {
  characters: Character[];
  info: Info;
  currentPage: number;
}

export default function CharacterGrid({
  characters,
  info,
  currentPage,
}: CharacterGridProps) {
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    null
  );
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleCharacterClick = (character: Character) => {
    setSelectedCharacter(character);
    onOpen();
  };

  return (
    <VStack spacing={4} justify="center" padding={8}>
      <Grid
        templateColumns={{
          base: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
          lg: "repeat(4, 1fr)",
        }}
        gap={6}
      >
        {characters.map((character) => (
          <Box
            key={character.id}
            boxShadow="md"
            _hover={{ boxShadow: "lg" }}
            borderRadius="lg"
            overflow="hidden"
            cursor="pointer"
            onClick={() => handleCharacterClick(character)} // Set the character and open the modal
          >
            <Image
              width={300}
              height={300}
              src={character.image}
              alt={character.name}
              priority
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAkACQAAD/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkKDA8MCgsOCwkJDRENDg8QEBEQCgwSExIQEw8QEBD/2wBDAQMDAwQDBAgEBAgQCwkLEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBD/wAARCAAKAAoDAREAAhEBAxEB/8QAFwAAAwEAAAAAAAAAAAAAAAAABQcICv/EACoQAAEEAAMECwAAAAAAAAAAAAIBAwQFBgcIABESMRMYITRBQlhygZbT/8QAFwEAAwEAAAAAAAAAAAAAAAAAAAECA//EABgRAQADAQAAAAAAAAAAAAAAAAABAhEh/9oADAMBAAIRAxEAPwBm5oanr/LnUnYYczBrxuqmQDMdmHDkORbGqedlk0DzTi7h4BbESRA38aGKrzXdpFdhOrHw5eZlycPVcmXQMOPuwmDdN4ujcI1BFVSDykq808F7No4bOvP1EagLWzjXVnnnmDMsIXdpb+J5rjzPsMnVIfhdkYp1sdU/qWzV+5WP7bAf/9k="
            />
            <Text fontSize={{ base: "xs", md: "md" }} p={4} fontWeight="bold">
              {character.name}
            </Text>
          </Box>
        ))}
      </Grid>

      <Box display="flex" justifyContent="center" mt={8}>
        {info.prev && (
          <Button
            as="a"
            href={`/info?page=${currentPage - 1}`}
            colorScheme="yellow"
            mr={4}
          >
            Previous
          </Button>
        )}
        {info.next && (
          <Button
            as="a"
            href={`/info?page=${currentPage + 1}`}
            colorScheme="yellow"
          >
            Next
          </Button>
        )}
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedCharacter?.name}</ModalHeader>
          <ModalCloseButton data-testid="charactor-modal-close-button" />
          <ModalBody>
            {selectedCharacter && (
              <VStack spacing={4}>
                <Image
                  width={300}
                  height={300}
                  src={selectedCharacter.image}
                  alt={selectedCharacter.name}
                  priority
                />
                <Text fontSize="md">
                  <strong>Species:</strong> {selectedCharacter.species}
                </Text>
                <Text fontSize="md">
                  <strong>Gender:</strong> {selectedCharacter.gender}
                </Text>
              </VStack>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="yellow" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </VStack>
  );
}
