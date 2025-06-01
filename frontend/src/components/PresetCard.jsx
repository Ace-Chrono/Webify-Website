import { Box, Button, Heading, HStack, Text, Spacer } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom';
import { VscCloudDownload } from 'react-icons/vsc';

const PresetCard = ({preset}) => {
    const handleDownload = () => {
        const json = JSON.stringify(preset.settings, null, 2); // formatted JSON
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = `${preset.name || 'preset'}.json`;
        a.click();
        URL.revokeObjectURL(url); // clean up
    };

    return (
        <Box
            shadow = 'lg'
            rounded = 'lg'
            overflow = 'hidden'
            transition = 'all 0.3s'
            _hover = {{ transform: "translateY(-5px)", shadow: "xl" }}
        >
            <img
                src={preset.image}
                alt={preset.name}
                style={{ height: '250px', width: '100%', objectFit: 'cover', borderRadius: '8px' }}
            />
            <Box p = {4}>
                <Heading as = 'h3' size = 'md' mb = {2}>
                    {preset.name}
                </Heading>
                <HStack spacing = {2}>
                    <Link to={`/preset/${preset._id}`}>
                        <Text
                            as="span"
                            color="blue.500"
                            _hover={{ textDecoration: 'underline' }}
                        >
                            View details
                        </Text>
                    </Link>

                    <Spacer />

                    <Button onClick = {handleDownload}>
                        <VscCloudDownload  />
                    </Button>
                </HStack>
            </Box>
            
        </Box>
    )
};

export default PresetCard;