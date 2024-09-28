import { gql } from "@apollo/client";
import client from "../../lib/apolloClient";
import { Button, Image, Text, VStack } from "@chakra-ui/react";
import Link from "next/link";

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
  // Use Apollo Client to fetch character details based on ID
  const { data } = await client.query({
    query: GET_CHARACTER,
    variables: { id: params.id },
  });

  // Extract character details from the response
  const character = data.character;

  return (
    <VStack spacing={4} justify="center" padding={8}>
      <Image src={character.image} alt={character.name} />
      <Text fontSize="2xl" fontWeight="bold">
        {character.name}
      </Text>
      <Text>Species: {character.species}</Text>
      <Text>Gender: {character.gender}</Text>
      <Text>Status: {character.status}</Text>
      <Text>Location: {character.location.name}</Text>
      <Link href="/info">
        <Button colorScheme="blue" mt={4}>
          Back to List
        </Button>
      </Link>
    </VStack>
  );
}
