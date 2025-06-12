import { Box, Button, Heading, HStack, Text, Spacer } from '@chakra-ui/react'
import React from 'react'
import { toaster } from "@/components/ui/toaster"
import { usePresetStore } from '@/store/preset';
import { useUserPresetStore } from '@/store/userPreset';
import { useAuth } from "@clerk/clerk-react";
import { Link } from 'react-router-dom';

const UserPresetCard = ({userPreset}) => {
    const { getToken } = useAuth();
    const { createPreset } = usePresetStore();
    const { updateUserPreset } = useUserPresetStore();
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
        const {success, message, data: createdPreset } = await createPreset({
            name: userPreset.name,
            settings: settingsFile,
            image: imageFile
        });

        if (!success || !createdPreset?._id) {
            toaster.create({
                title: "Error",
                description: message || "Failed to create preset",
                type: "error"
            });
            return;
        }

        const token = await getToken();

        const {success: successUpdate, message: messageUpdate} = await updateUserPreset({
            _id: userPreset._id,
            name: userPreset.name,
            settings: settingsFile,
            image: imageFile,
            isPublished: true,
            sourcePresetId: createdPreset._id
        }, token);

        console.log({ successUpdate, messageUpdate });

        if (!successUpdate) {
            toaster.create({
                title: "Error",
                description: messageUpdate || "Failed to update user preset",
                type: "error"
            });
            return;
        }

        toaster.create({
            title: "Success",
            description: "Preset published successfully.",
            type: "success"
        });

        setTimeout(() => {
            window.location.reload();
        }, 1000);
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
                <HStack spacing = {2}>
                    <Link to={`/userpreset/${userPreset._id}`}>
                        <Text
                            as="span"
                            color="blue.500"
                            _hover={{ textDecoration: 'underline' }}
                        >
                            View details
                        </Text>
                    </Link>

                    <Spacer />

                    {!userPreset.isPublished && (
                        <Button onClick = {handlePublish}>
                            Publish
                        </Button>
                    )}
                </HStack>
            </Box>
            
        </Box>
  )
}

export default UserPresetCard