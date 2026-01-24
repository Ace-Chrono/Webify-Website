import React, { useState } from 'react'
import { toaster } from "@/components/ui/toaster";
import { HiUpload } from "react-icons/hi";
import { useUserPresetStore } from '@/store/userPreset';
import { useAuth } from "@clerk/clerk-react";
import { VStack, HStack, Container, Heading, Box, Input, Button, FileUpload, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const ImportPage = () => {
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
    <Container
        color="black"
    >
        <VStack spacing = {8}>
            <Heading as = {"h1"} size = {"5xl"} textAlign = {"center"} mt={16} mb = {4}>
                Import Preset
            </Heading>
            <Link to="/">
                <Button
                    bg = "black"
                    color = "white"
                    _hover={{ bg: "gray.600" }}
                >
                    Explore Market Place
                </Button>
            </Link>

            <Heading
                as="h2"
                size="2xl"
                mt={16}
                mb={4}
                textAlign="center"
            >
                Import manually
            </Heading>
            <Box minW = {{ base: "0", md: "600px" }} maxW = {"full"} bg = "gray.900" mb = {8} p = {6} rounded = {"lg"} shadow = {"md"}>
            <VStack spacing = {4}>
                <Input 
                    placeholder = 'Preset Name' 
                    color = "white"
                    name = 'name' 
                    value = {newUserPreset.name}
                    onChange = {(e) => setNewUserPreset({ ...newUserPreset, name: e.target.value})}
                />

                <HStack
                    spacing={4}
                    justify={"center"}
                    align="stretch" 
                    w="full"
                >
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
                            <Button bg = "white" color = "black" _hover={{ bg: "gray.300" }} w="full">
                                {newUserPreset.settings ? newUserPreset.settings.name : "Upload JSON Settings"}
                            </Button>
                        </FileUpload.Trigger>
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
                            <Button bg = "white" color = "black" _hover={{ bg: "gray.300" }} w="full">
                                {newUserPreset.image ? newUserPreset.image.name : "Upload Image Cover"}
                            </Button>
                        </FileUpload.Trigger>
                    </FileUpload.Root>
                </HStack>

                <Button bg = "white" color = "black" onClick = {handleAddUserPreset} w = 'full' _hover={{ bg: "gray.300" }}>
                    Add Preset
                </Button>
            </VStack>
            </Box>
        </VStack>
    </Container>
  )
}

export default ImportPage

