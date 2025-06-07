import React from 'react';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import { VStack, Container, Heading, Box, Input, Button, FileUpload, Text } from '@chakra-ui/react';
import { useUser } from "@clerk/clerk-react";

const AccountPage = () => {
  const { user } = useUser();

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
          <Text fontSize="xl">Welcome, {user.firstName}!</Text>
          <Button onClick={() => user.signOut()}>Sign Out</Button>
        </SignedIn>
      </VStack>
    </Container>
  );
};

export default AccountPage;