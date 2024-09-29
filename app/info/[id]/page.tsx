import { gql } from "@apollo/client";
import client from "../../lib/apolloClient";
import { Button, Text, VStack } from "@chakra-ui/react";
import Link from "next/link";
import Image from "next/image";

// Define the GraphQL query for character details
const GET_CHARACTER = gql`
  query GetCharacter($id: ID!) {
    character(id: $id) {
      id
      name
      image
      species
      gender
      status
      location {
        name
      }
    }
  }
`;

// Server Component to fetch character details using `params`
export default async function CharacterPage({
  params,
}: {
  params: { id: string };
}) {
  const { data } = await client.query({
    query: GET_CHARACTER,
    variables: { id: params.id },
  });

  const character = data.character;

  return (
    <VStack spacing={4} justify="center" paddingTop={20}>
      <Image
        src={character.image}
        alt={character.name}
        width={300}
        height={200}
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAkACQAAD/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkKDA8MCgsOCwkJDRENDg8QEBEQCgwSExIQEw8QEBD/2wBDAQMDAwQDBAgEBAgQCwkLEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBD/wAARCAAKAAoDAREAAhEBAxEB/8QAFwAAAwEAAAAAAAAAAAAAAAAABQcICv/EACoQAAEEAAMECwAAAAAAAAAAAAIBAwQFBgcIABESMRMYITRBQlhygZbT/8QAFwEAAwEAAAAAAAAAAAAAAAAAAAECA//EABgRAQADAQAAAAAAAAAAAAAAAAABAhEh/9oADAMBAAIRAxEAPwBm5oanr/LnUnYYczBrxuqmQDMdmHDkORbGqedlk0DzTi7h4BbESRA38aGKrzXdpFdhOrHw5eZlycPVcmXQMOPuwmDdN4ujcI1BFVSDykq808F7No4bOvP1EagLWzjXVnnnmDMsIXdpb+J5rjzPsMnVIfhdkYp1sdU/qWzV+5WP7bAf/9k="
        style={{
          marginTop: "2rem",
          borderRadius: ".5rem",
          boxShadow: "2px 3px 4px #eee",
        }}
      />
      <Text fontSize="2xl" fontWeight="bold">
        {character.name}
      </Text>
      <Text>Species: {character.species}</Text>
      <Text>Gender: {character.gender}</Text>
      <Text>Status: {character.status}</Text>
      <Text>Location: {character.location.name}</Text>
      <Link href="/info">
        <Button colorScheme="yellow" mt={4}>
          Back to List
        </Button>
      </Link>
    </VStack>
  );
}
