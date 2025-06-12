import { Box, Text, Code, Heading, Button, HStack, Spacer } from '@chakra-ui/react';
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
      
    </Box>
  );
};

export default UserPresetDetails;