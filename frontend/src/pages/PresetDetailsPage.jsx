import { Box, Text, Container, Heading, Button, HStack, Stack } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const PresetDetails = () => {
  const { id } = useParams();
  const [preset, setPreset] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getPreset = async () => {
      try {
        const response = await fetch(`/api/presets/${id}`);
        const result = await response.json();

        if (result.success) {
          setPreset(result.data);
        } else {
          setError("Preset not found.");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to fetch preset.");
      }
    };

    getPreset();
  }, [id]);

  if (error) return <Text color="red.500">{error}</Text>;
  if (!preset) return <Text>Loading...</Text>;

  return (
    <Container>
      <Heading size = {'3xl'} mb = {8} mt={8}> {preset.name}</Heading>
      <img
          src={preset.image}
          alt={preset.name}
          style={{
            width: '100%',               // Not full width, but fills most of the page
            aspectRatio: '16 / 9',      // Keeps 1920×1080 ratio
            objectFit: 'cover',
            borderRadius: '8px',
            display: 'block',           // Needed to center with margin
            margin: '0 auto'            // Centers the image horizontally
          }}
      />

      <HStack>
        <Link to="/">
          <Button mt={4}>
            Return to Homepage
          </Button>
        </Link>
      </HStack>

        <Box mt={8} mb={4}>
        <Text fontWeight="bold" fontSize="xl" mb={2}>
          Details:
        </Text>

        <Stack spacing={1} fontSize="md">
          <Text>
            <strong>Date Created:</strong>{' '}
            {preset.createdAt
              ? new Date(preset.createdAt).toLocaleString()
              : 'Unknown'}
          </Text>
        </Stack>
      </Box>

      <Text fontSize="xl" fontWeight="bold" mt = {8} mb={4}>Settings:</Text>
      <Box
        p={4}
        bg="gray.900"
        color="white"
        borderRadius="md"
        overflowX="auto"
        whiteSpace="pre-wrap"
        width="100%"
        mb = {8}
      >
        {JSON.stringify(preset.settings, null, 2)}
      </Box>
    </Container>
  );
};

export default PresetDetails;