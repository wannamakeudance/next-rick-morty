import { Box, ChakraProvider, Flex, Heading, Text } from "@chakra-ui/react";
import { cookies } from "next/headers";
import Link from "next/link";
import { ReactNode } from "react";
import EditProfileModal from "./components/EditProfileModal";

export default function RootLayout({ children }: { children: ReactNode }) {
  const cookieStore = cookies();
  const username = cookieStore.get("username")?.value || "";
  const jobTitle = cookieStore.get("jobTitle")?.value || "";

  return (
    <html lang="en">
      <body>
        <ChakraProvider>
          <Flex
            position={"fixed"}
            width={"100vw"}
            justify="space-between"
            align="center"
            padding="1rem 2.6rem"
            bg="black"
            color="white"
            as="header"
          >
            <Link href="/info">
              <Heading
                width="60vw"
                size={{ base: "md", md: "lg" }}
                cursor="pointer"
                color={"yellow.400"}
              >
                Rick and Morty Company
              </Heading>
            </Link>

            {username && jobTitle && (
              <Flex align="center" gap="1rem">
                <Box>
                  <Text
                    fontSize={{
                      base: "sm",
                      md: "md",
                    }}
                    fontWeight={500}
                  >
                    {username}
                  </Text>
                  <Text fontSize="sm">{jobTitle}</Text>
                </Box>
                <EditProfileModal username={username} jobTitle={jobTitle} />
              </Flex>
            )}
          </Flex>
          <main>{children}</main>
        </ChakraProvider>
      </body>
    </html>
  );
}
