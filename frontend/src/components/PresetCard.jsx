import { Box, Button, Heading, HStack, Text, Spacer } from '@chakra-ui/react'
import React from 'react'
import { toaster } from "@/components/ui/toaster"
import { Link } from 'react-router-dom';
import { VscCloudDownload } from 'react-icons/vsc';
import { useUserPresetStore } from '@/store/userPreset';
import { useAuth } from "@clerk/clerk-react";

const PresetCard = ({preset}) => {
    const { getToken } = useAuth();
    const { createUserPreset } = useUserPresetStore();
    const handleDownload = async() => {
        const settingsBlob = new Blob(
            [JSON.stringify(preset.settings)], 
            { type: 'application/json' }
        );
        const settingsFile = new File([settingsBlob], "settings.json", {
            type: 'application/json'
        });

        const res = await fetch(preset.image); // This fetches the base64 image
        const imageBlob = await res.blob();
        const imageFile = new File([imageBlob], "image.png", {
            type: imageBlob.type || 'image/png'
        });

        const token = await getToken();

        const {success, message} = await createUserPreset({
            name: preset.name,
            settings: settingsFile,
            image: imageFile,
            isPublished: false,
        }, token);

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
        <Box
            shadow = 'lg'
            rounded = 'lg'
            overflow = 'hidden'
            transition = 'all 0.3s'
            _hover = {{ transform: "translateY(-5px)", shadow: "xl" }}
            m = {4}
            color={"white"}
        >
            <img
                src={preset.image}
                alt={preset.name}
                style={{ height: '180px', width: '100%', objectFit: 'cover', borderRadius: '8px' }}
            />
            <Box p = {4}>
                <Heading as = 'h3' size = 'md' mb = {2}>
                    {preset.name}
                </Heading>
                <HStack spacing = {2}>
                    <Link to={`/preset/${preset._id}`}>
                        <Text
                            as="span"
                            color="blue.400"
                            _hover={{ color: 'blue.600' }}
                        >
                            View details
                        </Text>
                    </Link>

                    <Spacer />

                    <Button bg = "white" _hover={{ bg: "gray.300" }} onClick = {handleDownload}>
                        Import
                    </Button>
                </HStack>
            </Box>
            
        </Box>
    )
};

export default PresetCard;