import React from 'react';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import { Container, VStack, Text, Button } from '@chakra-ui/react';

const AccountPage = () => {
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
          <Text fontSize="xl">Welcome back!</Text>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </VStack>
    </Container>
  );
};

export default AccountPage;