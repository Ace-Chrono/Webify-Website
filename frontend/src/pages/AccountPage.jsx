import React, { useEffect } from 'react';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import { VStack, Container, Heading, Box, Button, Text, SimpleGrid } from '@chakra-ui/react';
import { useUser } from "@clerk/clerk-react";
import { useUserPresetStore } from '@/store/userPreset';
import UserPresetCard from '@/components/UserPresetCard';

const AccountPage = () => {
  const { user } = useUser();
  const {fetchUserPresets, userPresets} = useUserPresetStore();
    useEffect(() =>{
        fetchUserPresets();
    }, [fetchUserPresets]);
  console.log("User Presets", userPresets)

  return (
    <Container py={8}>
      <VStack spacing={4}>
        <SignedOut>
          <Text fontSize="xl">You are not signed in.</Text>
          <SignInButton mode="modal">
            <Button>Sign In</Button>
          </SignInButton>
        </SignedOut>

        <SignedIn>
          <UserButton afterSignOutUrl="/" />
          <Heading as = {"h1"} size = {"2xl"} textAlign = {"center"}>
            Welcome, {user.firstName}
          </Heading>
          <Heading as = {"h1"} size = {"1xl"} textAlign = {"center"} mb = {8} mt={8}>
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
          <Button onClick={() => user.signOut()}>Sign Out</Button>
        </SignedIn>
      </VStack>
    </Container>
  );
};

export default AccountPage;