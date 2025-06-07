import React, { useState } from 'react'
import { toaster } from "@/components/ui/toaster";
import { HiUpload } from "react-icons/hi";
import { useUserPresetStore } from '@/store/userPreset';
import { useAuth } from "@clerk/clerk-react";
import { VStack, Container, Heading, Box, Input, Button, FileUpload, Text } from '@chakra-ui/react';
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
    <Container maxW={"container.sm"}>
        <VStack spacing = {8}>
            <Heading as = {"h1"} size = {"2xl"} textAlign = {"center"} mb = {8} mt={8}>
                Import Preset
            </Heading>

            <Heading as = {"h1"} size = {"1xl"} textAlign = {"center"} mb = {8} mt={8}>
                Import Published Presets
            </Heading>
            <Link to="/">
                <Button>
                    Explore Market Place
                </Button>
            </Link>
            <Heading as = {"h1"} size = {"1xl"} textAlign = {"center"} mb = {8} mt={8}>
                Import Preset Manuallly
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
        </VStack>
    </Container>
  )
}

export default ImportPage

