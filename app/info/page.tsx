import { gql } from "@apollo/client";
import client from "../lib/apolloClient";
import { Box, Button, Grid, Heading, Text, VStack } from "@chakra-ui/react";
import Link from "next/link";
import Image from "next/image";

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
      <Grid
        templateColumns={{
          base: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
          lg: "repeat(4, 1fr)",
        }}
        gap={6}
      >
        {characters.map((character: any) => (
          <Link key={character.id} href={`/info/${character.id}`} passHref>
            <Box
              boxShadow="md"
              _hover={{
                boxShadow: "lg",
              }}
              borderRadius="lg"
              overflow="hidden"
              cursor="pointer"
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
              <Text
                fontSize={{
                  base: "xs",
                  md: "md",
                }}
                p={4}
                fontWeight="bold"
              >
                {character.name}
              </Text>
            </Box>
          </Link>
        ))}
      </Grid>

      <Box display="flex" justifyContent="center" mt={8}>
        {info.prev && (
          <Link href={`/info?page=${currentPage - 1}`} passHref>
            <Button colorScheme="yellow" mr={4}>
              Previous
            </Button>
          </Link>
        )}
        {info.next && (
          <Link href={`/info?page=${currentPage + 1}`} passHref>
            <Button colorScheme="yellow">Next</Button>
          </Link>
        )}
      </Box>
    </VStack>
  );
}
