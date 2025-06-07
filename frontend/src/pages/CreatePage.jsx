import { usePresetStore } from '@/store/preset';
import { VStack, Container, Heading, Box, Input, Button, FileUpload, SimpleGrid } from '@chakra-ui/react';
import { toaster } from "@/components/ui/toaster"
import { HiUpload } from "react-icons/hi"
import React, { useState, useEffect } from 'react';
import { useUserPresetStore } from '@/store/userPreset';
import PresetCard from '@/components/PresetCard';

const CreatePage = () => {
    const [newPreset, setNewPreset] = useState({
        name: "",
        settings: "",
        image: ""
    });

    const { createPreset } = usePresetStore();
    const handleAddPreset = async() => {
        const {success, message} = await createPreset(newPreset);
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

    const {fetchUserPresets, userPresets} = useUserPresetStore();
    useEffect(() =>{
        fetchUserPresets();
    }, [fetchUserPresets]);
    console.log("User Presets", userPresets)

    return (
        <Container maxW={"container.sm"}>
            <VStack spacing = {8}>
                <Heading as = {"h1"} size = {"2xl"} textAlign = {"center"} mt={8}>
                    Publish Preset
                </Heading>

                <Heading as = {"h1"} size = {"1xl"} textAlign = {"center"} mb = {8} mt={8}>
                    Publish Preset from Account
                </Heading>

                <SimpleGrid
                    columns = {{
                    base: 1,
                    md: 2,
                    lg: 3
                    }}
                    spacing = {10}
                    w = {"full"}
                >
                    {userPresets.map((preset) => (
                    <PresetCard key = {preset._id} preset = {preset} />
                    ))}
                </SimpleGrid>

                <Heading as = {"h1"} size = {"1xl"} textAlign = {"center"} mt={8}>
                    Publish Preset Manually
                </Heading>

                <Box w = {"full"} bg = "gray.700" m = {8} p = {6} rounded = {"lg"} shadow = {"md"}>
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
                                    setNewPreset({ ...newPreset, image: files[0] });
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