import { Box, Text, Stack, Heading, Button, HStack, Spacer, Container } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';
import { toaster } from "@/components/ui/toaster";
import { usePresetStore } from '@/store/preset';
import { useUserPresetStore } from '@/store/userPreset';
import { useNavigate } from 'react-router-dom';

const UserPresetDetails = () => {
  const { id } = useParams();
  const [preset, setPreset] = useState(null);
  const [error, setError] = useState(null);
  const { getToken } = useAuth();

  useEffect(() => {
    const getPreset = async () => {
      try {
        const token = await getToken();
        console.log("Token:", token);
        const response = await fetch(`/api/userpresets/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
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
  }, [id, getToken]);

  const { deletePreset } = usePresetStore();
  const { deleteUserPreset } = useUserPresetStore();
  const navigate = useNavigate();

  const handleDelete = async () => {
    const token = await getToken();

    if (preset.isPublished) {
      const { success, message } = await deletePreset(preset.sourcePresetId);

      if (!success) {
        toaster.create({
            title: "Error",
            description: message || "Failed to delete preset",
            type: "error"
        });
        return;
      }
    }

    console.log(preset.isPublished);

    const {success: successDelete, message: messageDelete } = await deleteUserPreset(id, token);

    if(!successDelete) {
      toaster.create({
          title: "Error",
          description: messageDelete,
          type: "error"
      });
    } else {
      toaster.create({
          title: "Success",
          description: messageDelete,
          type: "success"
      });
    }

    navigate('/');
  }

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

        <Spacer />

        <Link to="/">
            <Button mt={4}>
            Edit
          </Button>
        </Link>

        <Button mt={4} onClick={handleDelete}>
          Delete
        </Button>
      </HStack>

       <Box mt={8} mb={4}>
        <Text fontWeight="bold" fontSize="xl" mb={2}>
          Details:
        </Text>

        <Stack spacing={1} fontSize="md">
          <Text>
            <strong>Published:</strong>{' '}
            {preset.isPublished ? 'Yes' : 'No'}
          </Text>
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

export default UserPresetDetails;