import { ReactNode } from "react";
import { cookies } from "next/headers"; // Import headers to get URL
import { Box, Flex, Heading, Text, ChakraProvider } from "@chakra-ui/react";
import Link from "next/link";
import EditProfileModal from "./components/EditProfileModal";

// Root Layout Component with Path Check
export default function RootLayout({ children }: { children: ReactNode }) {
  const cookieStore = cookies();
  const username = cookieStore.get("username")?.value || "";
  const jobTitle = cookieStore.get("jobTitle")?.value || "";

  return (
    <html lang="en">
      <body>
        <ChakraProvider>
          {/* Header Bar */}
          <Flex
            as="header"
            justify="space-between"
            align="center"
            bg="blue.600"
            color="white"
            padding="1rem 2rem"
          >
            <Link href="/info">
              <Heading size="lg" cursor="pointer">
                My Application
              </Heading>
            </Link>

            {/* Display Username and Job Title if available */}
            {username && jobTitle && (
              <Flex align="center" gap="1rem">
                <Box>
                  <Text fontSize="md">
                    Welcome, <strong>{username}</strong>!
                  </Text>
                  <Text fontSize="sm">{jobTitle}</Text>
                </Box>

                {/* Edit Profile Modal */}
                <EditProfileModal username={username} jobTitle={jobTitle} />
              </Flex>
            )}
          </Flex>

          {/* Main Content */}
          <main>{children}</main>
        </ChakraProvider>
      </body>
    </html>
  );
}
