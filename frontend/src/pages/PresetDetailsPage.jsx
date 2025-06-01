import { Box, Text, Code, Heading, Button } from '@chakra-ui/react';
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
    <Box p={8}>
      <Heading mb={4}>{preset.name}</Heading>

      <Text fontWeight="bold" mb={2}>Settings:</Text>
      <Box
        p={4}
        bg="gray.100"
        borderRadius="md"
        overflowX="auto"
        whiteSpace="pre-wrap"
      >
        <Code whiteSpace="pre" bg="blue.500">
          {JSON.stringify(preset.settings, null, 2)}
        </Code>
      </Box>
      <Link to="/">
        <Button mt={4} bg="gray.100">
          Return to Homepage
        </Button>
      </Link>
    </Box>
  );
};

export default PresetDetails;