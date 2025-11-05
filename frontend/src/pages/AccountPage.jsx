import React, { useEffect } from 'react';
import { SignedIn, SignedOut, SignInButton, SignOutButton, UserButton } from '@clerk/clerk-react';
import { VStack, Container, Heading, Box, Button, Text, SimpleGrid, HStack } from '@chakra-ui/react';
import { useUser, useClerk, useAuth } from "@clerk/clerk-react";
import { useUserPresetStore } from '@/store/userPreset';
import UserPresetCard from '@/components/UserPresetCard';

const AccountPage = () => {
  const { user } = useUser();
  const { openUserProfile } = useClerk();
  const { getToken } = useAuth();
  const {fetchUserPresets, userPresets} = useUserPresetStore();
  useEffect(() =>{
    const getUserPresets = async () => {
      const token = await getToken();
      console.log("Token:", token);
      fetchUserPresets(token);
    }  
    getUserPresets();
  }, [fetchUserPresets, getToken]);
  console.log("User Presets", userPresets)

  return (
    <Container 
      py={8}
      color="black"
    >
      <VStack spacing={4} align="start">
        <SignedOut>
          <Text fontSize="xl">You are not signed in.</Text>
          <SignInButton mode="modal" mt = {4}>
            <Button>Sign In</Button>
          </SignInButton>
        </SignedOut>

        <SignedIn>
          {user && (
            <>
              <HStack>
                <UserButton afterSignOutUrl="/" />
                <Heading as = {"h1"} size = {"3xl"}>
                  Welcome, {user.firstName}
                </Heading>
              </HStack>
              <Box mt={4} textAlign="left">
                <VStack align="start" spacing={3}>
                  <Heading as="h2" size="xl">Account Info</Heading>
                  <HStack>
                    <Text fontWeight="semibold">Username:</Text>
                    <Text>{user.username || "Not set"}</Text>
                  </HStack>
                  <HStack>
                    <Text fontWeight="semibold">Email:</Text>
                    <Text>{user.emailAddresses[0]?.emailAddress}</Text>
                  </HStack>
                  <HStack>
                    <Text fontWeight="semibold">Date Joined:</Text>
                    <Text>{new Date(user.createdAt).toLocaleDateString()}</Text>
                  </HStack>

                  <Button 
                    onClick={() => openUserProfile()} 
                    mt = {4}
                    color={"white"}
                    bg={"black"}
                    _hover={{ bg: "gray.600" }}
                  >
                    Edit Account Info
                  </Button>
                </VStack>

                
                
              </Box>
              <Heading as = {"h1"} size = {"2xl"} textAlign = {"center"} mb = {4} mt={4}>
                Presets
              </Heading>
              <Box minW="400px" minH={'64px'} maxH="640px" alignContent={'center'} overflowY="auto" p={2} border="1px solid" bg="gray.900" borderRadius="xl" mb = {8} shadow={"md"}>
                <SimpleGrid
                  columns = {{
                  base: 1,
                  md: 3,
                  lg: 4
                  }}
                  spacing = {10}
                  w = {"full"}
                >
                  {userPresets.map((userPreset) => (
                    <UserPresetCard key = {userPreset._id} userPreset = {userPreset} />
                  ))}
                </SimpleGrid>
                {userPresets.length === 0 && (
                  <Text
                      fontSize = 'xl'
                      textAlign = {"center"}
                      fontWeight = {"semibold"}
                      color = 'white'
                  >
                    No user presets found
                  </Text>
                )}
              </Box>
              <SignOutButton redirectUrl="/" >
                <Button
                  color={"white"}
                  bg={"black"}
                  _hover={{ bg: "gray.600" }}
                >
                  Sign Out
                </Button>
              </SignOutButton>
            </>
          )}
          
        </SignedIn>
      </VStack>
    </Container>
  );
};

export default AccountPage;