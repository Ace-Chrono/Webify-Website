import { usePresetStore } from '@/store/preset';
import { VStack, Container, Heading, Box, Input, Button, FileUpload, SimpleGrid, Text } from '@chakra-ui/react';
import { toaster } from "@/components/ui/toaster";
import { HiUpload } from "react-icons/hi";
import React, { useState, useEffect } from 'react';
import { useUserPresetStore } from '@/store/userPreset';
import UserPresetCard from '@/components/UserPresetCard';
import { useAuth } from "@clerk/clerk-react";

const CreatePage = () => {
    const { getToken } = useAuth();
    const [newPreset, setNewPreset] = useState({
        name: "",
        settings: "",
        image: ""
    });

    const { createPreset } = usePresetStore();
    const { createUserPreset } = useUserPresetStore();
    const handleAddPreset = async() => {
        const token = await getToken();
        const {success, message, data: createdPreset } = await createPreset(newPreset);

        if (!success) {
            toaster.create({
                title: "Error",
                description: message || "Failed to create preset",
                type: "error"
            });
            return;
        }

        const {success: successUser, message: messageUser} = await createUserPreset({
            name: newPreset.name,
            settings: newPreset.settings,
            image: newPreset.image, 
            isPublished: true,
            sourcePresetId: createdPreset._id
        }, token)

        if(!successUser) {
            toaster.create({
                title: "Error",
                description: messageUser,
                type: "error"
            });
        } else {
            toaster.create({
                title: "Success",
                description: messageUser,
                type: "success"
            });
        }

        setTimeout(() => {
            window.location.reload();
        }, 1000);
    };

    const {fetchUserPresets, userPresets} = useUserPresetStore();
    useEffect(() =>{
        fetchUserPresets();
    }, [fetchUserPresets]);
    console.log("User Presets", userPresets)

    const unpublishedPresets = userPresets.filter(preset => !preset.isPublished);

    return (
        <Container>
            <VStack spacing = {8}>
                <Heading as = {"h1"} size = {"2xl"} textAlign = {"center"} mt={8}>
                    Publish Preset
                </Heading>

                <Heading as = {"h1"} size = {"1xl"} textAlign = {"center"} mb = {8} mt={8}>
                    Publish Preset from Account
                </Heading>

                <Box maxH="640px" overflowY="auto" p={2} border="1px solid" borderColor="gray.700" borderRadius="md">
                    <SimpleGrid
                        columns = {{
                        base: 1,
                        md: 3,
                        lg: 4
                        }}
                        spacing = {10}
                        w = {"full"}
                    >
                        {unpublishedPresets.map((userPreset) => (
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
                    {unpublishedPresets.length === 0 && (
                        <Text
                            fontSize = 'xl'
                            textAlign = {"center"}
                            fontWeight = {"bold"}
                            color = 'gray.500'
                        >
                            No unpublished presets found
                        </Text>
                    )}
                </Box>

                <Heading as = {"h1"} size = {"1xl"} textAlign = {"center"} mt={8}>
                    Publish Preset Manually
                </Heading>

                <Box minW = "800px" maxW = {"full"} bg = "gray.700" m = {8} p = {6} rounded = {"lg"} shadow = {"md"}>
                    <VStack spacing = {4}>
                        <Input 
                            placeholder = 'Preset Name' 
                            name = 'name' 
                            value = {newPreset.name}
                            onChange = {(e) => setNewPreset({ ...newPreset, name: e.target.value})}
                        />
                        <FileUpload.Root 
                            accept={[".json"]}
                            onFileChange= {(details) => {
                                const files = details.acceptedFiles;
                                if (files.length > 0) {
                                    setNewPreset({ ...newPreset, settings: files[0] });
                                }
                            }}
                        >
                            <FileUpload.HiddenInput />
                                <FileUpload.Trigger asChild>
                                    <Button variant="outline" size="sm">
                                        <HiUpload /> Upload JSON Settings
                                    </Button>
                                </FileUpload.Trigger>
                            <FileUpload.List />
                        </FileUpload.Root>
                        <FileUpload.Root 
                            accept={["image/*"]}
                            onFileChange= {(details) => {
                                const files = details.acceptedFiles;
                                if (files.length > 0) {
                                    setNewPreset({ ...newPreset, image: files[0] });
                                }
                            }}
                        >
                            <FileUpload.HiddenInput />
                                <FileUpload.Trigger asChild>
                                    <Button variant="outline" size="sm">
                                        <HiUpload /> Upload Image Cover
                                    </Button>
                                </FileUpload.Trigger>
                            <FileUpload.List />
                        </FileUpload.Root>
                        <Button bg = "blue.500" onClick = {handleAddPreset} w = 'full'>
                            Publish Preset
                        </Button>
                    </VStack>
                </Box>
            </VStack>
        </Container>
    );
};

export default CreatePage;