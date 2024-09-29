import { gql } from "@apollo/client";
import client from "../lib/apolloClient";
import { Heading, VStack } from "@chakra-ui/react";
import CharacterGrid from "../components/CharacterGrid";

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

export default async function InfoPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const currentPage = searchParams.page ? parseInt(searchParams.page, 10) : 1;

  const { data } = await client.query({
    query: GET_CHARACTERS,
    variables: { page: currentPage },
  });

  const { results: characters, info } = data.characters;

  return (
    <VStack spacing={4} justify="center" padding={8}>
      <Heading
        mt="20"
        fontSize={{
          base: "md",
          lg: "xl",
        }}
      >
        Rick and Morty Characters - Page {currentPage}
      </Heading>

      {/* Pass server-rendered data to the client component */}
      <CharacterGrid
        characters={characters}
        info={info}
        currentPage={currentPage}
      />
    </VStack>
  );
}
