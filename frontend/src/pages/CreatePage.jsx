import { usePresetStore } from '@/store/preset';
import { VStack, Container, Heading, Box, Input, Button, FileUpload, SimpleGrid, Text, HStack } from '@chakra-ui/react';
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
        const getUserPresets = async () => {
            const token = await getToken();
            console.log("Token:", token);
            fetchUserPresets(token);
        }  
        getUserPresets();
    }, [fetchUserPresets, getToken]);
    console.log("User Presets", userPresets)

    const unpublishedPresets = userPresets.filter(preset => !preset.isPublished);

    return (
        <Container
            color="black"
        >
            <VStack spacing = {8}>
                <Heading as = {"h1"} size = {"5xl"} fontWeight = "semibold" textAlign = {"center"} mt={16}>
                    Publish Preset
                </Heading>

                <Heading
                    as="h2"
                    size="2xl"
                    mt={16}
                    mb={4}
                    textAlign="center"
                >
                    Publish from account
                </Heading>

                <Box minW="400px" minH={'64px'} maxH="640px" alignContent={'center'} overflowY="auto" p={2} border="1px solid" bg = "gray.950" borderRadius="xl" shadow={'md'}>
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
                    {unpublishedPresets.length === 0 && (
                        <Text
                            fontSize = 'xl'
                            textAlign = {"center"}
                            fontWeight = {"semibold"}
                            color = "white"
                        >
                            No unpublished presets found
                        </Text>
                    )}
                </Box>

                <Heading
                    as="h2"
                    size="2xl"
                    mt={16}
                    mb={4}
                    textAlign="center"
                >
                    Publish manually
                </Heading>

                <Box minW = "600px" maxW = {"full"} bg = "gray.900" mb = {8} p = {6} rounded = {"xl"} shadow = {"md"}>
                    <VStack spacing = {4}>
                        <Input 
                            placeholder = 'Preset Name' 
                            color = "white"
                            name = 'name' 
                            value = {newPreset.name}
                            onChange = {(e) => setNewPreset({ ...newPreset, name: e.target.value})}
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
                                        setNewPreset({ ...newPreset, settings: files[0] });
                                    }
                                }}
                            >
                                <FileUpload.HiddenInput />
                                <FileUpload.Trigger asChild>
                                    <Button bg = "white" color = "black" _hover={{ bg: "gray.300" }} w="full">
                                        {newPreset.settings ? newPreset.settings.name : "Upload JSON Settings"}
                                    </Button>
                                </FileUpload.Trigger>
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
                                    <Button bg = "white" color = "black" _hover={{ bg: "gray.300" }} w="full">
                                        {newPreset.image ? newPreset.image.name : "Upload Image Cover"}
                                    </Button>
                                </FileUpload.Trigger>
                            </FileUpload.Root>
                        </HStack>
                        
                        <Button bg = "white" color = "black" _hover={{ bg: "gray.300" }} onClick = {handleAddPreset} w = 'full'>
                            Publish Preset
                        </Button>
                    </VStack>
                </Box>
            </VStack>
        </Container>
    );
};

export default CreatePage;