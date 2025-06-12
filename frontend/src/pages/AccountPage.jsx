import React, { useEffect } from 'react';
import { SignedIn, SignedOut, SignInButton, SignOutButton, UserButton } from '@clerk/clerk-react';
import { VStack, Container, Heading, Box, Button, Text, SimpleGrid, HStack } from '@chakra-ui/react';
import { useUser, useClerk} from "@clerk/clerk-react";
import { useUserPresetStore } from '@/store/userPreset';
import UserPresetCard from '@/components/UserPresetCard';

const AccountPage = () => {
  const { user } = useUser();
  const { openUserProfile } = useClerk();
  const {fetchUserPresets, userPresets} = useUserPresetStore();
    useEffect(() =>{
        fetchUserPresets();
    }, [fetchUserPresets]);
  console.log("User Presets", userPresets)

  return (
    <Container py={8} maxW="container.lg">
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
                <Text fontSize="lg">Username: {user.username || "Not set"}</Text>
                <Text fontSize="lg">Email: {user.emailAddresses[0]?.emailAddress}</Text>
                <Text fontSize="lg">
                  Date Joined: {new Date(user.createdAt).toLocaleDateString()}
                </Text>
                <Text fontSize="lg">User ID: {user.id}</Text>
                <Button onClick={() => openUserProfile()} mt = {4}>
                  Edit Account Info
                </Button>
              </Box>
              <Heading as = {"h1"} size = {"2xl"} textAlign = {"center"} mb = {4} mt={4}>
                Presets
              </Heading>
              <Box maxH="640px" overflowY="auto" p={2} border="1px solid" borderColor="gray.700" borderRadius="md" mb = {8}>
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
                      fontWeight = {"bold"}
                      color = 'gray.500'
                  >
                    No user presets found
                  </Text>
                )}
              </Box>
              <SignOutButton redirectUrl="/" >
                <Button>Sign Out</Button>
              </SignOutButton>
            </>
          )}
          
        </SignedIn>
      </VStack>
    </Container>
  );
};

export default AccountPage;