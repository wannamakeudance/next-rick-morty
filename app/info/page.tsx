// app/info/page.tsx
import { gql } from "@apollo/client";
import client from "../lib/apolloClient";
import {
  Box,
  Button,
  Grid,
  Heading,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";

// GraphQL query for fetching characters
const GET_CHARACTERS = gql`
  query GetCharacters($page: Int) {
    characters(page: $page) {
      results {
        id
        name
        image
        species
        gender
      }
      info {
        count
        pages
        next
        prev
      }
    }
  }
`;

// Server Component with `searchParams` prop for handling URL parameters
export default async function InfoPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  // Extract current page from searchParams (default to page 1)
  const currentPage = searchParams.page ? parseInt(searchParams.page, 10) : 1;

  // Use Apollo Client to fetch data for the current page
  const { data } = await client.query({
    query: GET_CHARACTERS,
    variables: { page: currentPage },
  });

  // Extract relevant data for pagination
  const { results: characters, info } = data.characters;

  return (
    <VStack spacing={4} justify="center" padding={8}>
      <Heading>Rick and Morty Characters (Page {currentPage})</Heading>
      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
        {characters.map((character: any) => (
          <Link key={character.id} href={`/info/${character.id}`} passHref>
            <Box
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              cursor="pointer"
            >
              <Image src={character.image} alt={character.name} />
              <Text p={4} fontWeight="bold">
                {character.name}
              </Text>
            </Box>
          </Link>
        ))}
      </Grid>

      <Box display="flex" justifyContent="center" mt={8}>
        {info.prev && (
          <Link href={`/info?page=${currentPage - 1}`} passHref>
            <Button colorScheme="blue" mr={4}>
              Previous
            </Button>
          </Link>
        )}
        {info.next && (
          <Link href={`/info?page=${currentPage + 1}`} passHref>
            <Button colorScheme="blue">Next</Button>
          </Link>
        )}
      </Box>
    </VStack>
  );
}
