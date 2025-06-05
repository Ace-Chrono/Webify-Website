import React, { useState } from 'react';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import { toaster } from "@/components/ui/toaster";
import { HiUpload } from "react-icons/hi";
import { VStack, Container, Heading, Box, Input, Button, FileUpload, Text } from '@chakra-ui/react';
import { useUserPresetStore } from '@/store/userPreset';
import { useAuth } from "@clerk/clerk-react";

const AccountPage = () => {
  const [newUserPreset, setNewUserPreset] = useState({
    name: "",
    settings: "",
    image: "",
    isPublished: false
  });

  const { getToken } = useAuth();

  const { createUserPreset } = useUserPresetStore();
  const handleAddUserPreset = async() => {
    const token = await getToken();

    const {success, message} = await createUserPreset(newUserPreset, token);
    if(!success) {
        toaster.create({
            title: "Error",
            description: message,
            type: "error"
        });
    } else {
        toaster.create({
            title: "Success",
            description: message,
            type: "success"
        });
    }
  };

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
          <Heading as = {"h1"} size = {"2xl"} textAlign = {"center"} mb = {8} mt={8}>
            Add Preset to Account
          </Heading>
          <Box w = {"full"} bg = "gray.700" p = {6} rounded = {"lg"} shadow = {"md"}>
            <VStack spacing = {4}>
                <Input 
                    placeholder = 'Preset Name' 
                    name = 'name' 
                    value = {newUserPreset.name}
                    onChange = {(e) => setNewUserPreset({ ...newUserPreset, name: e.target.value})}
                />
                <FileUpload.Root 
                    accept={[".json"]}
                    onFileChange= {(details) => {
                        const files = details.acceptedFiles;
                        if (files.length > 0) {
                            setNewUserPreset({ ...newUserPreset, settings: files[0] });
                        }
                    }}
                >
                    <FileUpload.HiddenInput />
                        <FileUpload.Trigger asChild>
                            <Button variant="outline" size="sm">
                                <HiUpload /> Upload file
                            </Button>
                        </FileUpload.Trigger>
                    <FileUpload.List />
                </FileUpload.Root>
                <FileUpload.Root 
                    accept={["image/*"]}
                    onFileChange= {(details) => {
                        const files = details.acceptedFiles;
                        if (files.length > 0) {
                            setNewUserPreset({ ...newUserPreset, image: files[0] });
                        }
                    }}
                >
                    <FileUpload.HiddenInput />
                        <FileUpload.Trigger asChild>
                            <Button variant="outline" size="sm">
                                <HiUpload /> Upload file
                            </Button>
                        </FileUpload.Trigger>
                    <FileUpload.List />
                </FileUpload.Root>
                <Button bg = "blue.500" onClick = {handleAddUserPreset} w = 'full'>
                    Add Preset
                </Button>
            </VStack>
          </Box>
        </SignedIn>
      </VStack>
    </Container>
  );
};

export default AccountPage;