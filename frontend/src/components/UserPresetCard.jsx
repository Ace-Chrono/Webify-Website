import { Box, Button, Heading, HStack, Text, Spacer } from '@chakra-ui/react'
import React from 'react'
import { toaster } from "@/components/ui/toaster"
import { usePresetStore } from '@/store/preset';

const UserPresetCard = ({userPreset}) => {
    const { createPreset } = usePresetStore();
    const handlePublish = async() => {
        const settingsBlob = new Blob(
            [JSON.stringify(userPreset.settings)], 
            { type: 'application/json' }
        );
        const settingsFile = new File([settingsBlob], "settings.json", {
            type: 'application/json'
        });

        const res = await fetch(userPreset.image); // This fetches the base64 image
        const imageBlob = await res.blob();
        const imageFile = new File([imageBlob], "image.png", {
            type: imageBlob.type || 'image/png'
        });
        const {success, message} = await createPreset({
            name: userPreset.name,
            settings: settingsFile,
            image: imageFile
        });

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
        >
            <img
                src={userPreset.image}
                alt={userPreset.name}
                style={{ height: '180px', width: '100%', objectFit: 'cover', borderRadius: '8px' }}
            />
            <Box p = {4}>
                <Heading as = 'h3' size = 'md' mb = {2}>
                    {userPreset.name}
                </Heading>
                <Button onClick = {handlePublish}>
                    Publish
                </Button>
            </Box>
            
        </Box>
  )
}

export default UserPresetCard