import { Box, Text, Stack, Heading, Button, HStack, Spacer, Container, Editable, IconButton, FileUpload } from '@chakra-ui/react';
import { LuCheck, LuPencilLine, LuX } from "react-icons/lu"
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
  const { fetchUserPreset } = useUserPresetStore();
  const { getToken } = useAuth();

  useEffect(() => {
    const getPreset = async () => {
      try {
        const token = await getToken();
        const {success, message, data} = await fetchUserPreset(id, token);

        if (success) {
          setPreset(data);
        } else {
          setError(message);
        }
      } catch (err) {
        console.error(err);
        setError("Failed to fetch preset.");
      }
    };

    getPreset();
  }, [id, getToken, fetchUserPreset]);

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

  const { updateUserPreset } = useUserPresetStore();
  const handleUpdate = async (newName, newSettings, newImage) => {
    const token = await getToken();

    let name = newName;
    if (!name) {
      name = preset.name;
    }

    let settingsFile = newSettings;
    if (!settingsFile) {
      const settingsBlob = new Blob(
        [JSON.stringify(preset.settings)],
        { type: 'application/json' }
      );
      settingsFile = new File([settingsBlob], "settings.json", {
        type: 'application/json',
      });
    }

    let imageFile = newImage;
    if (!imageFile) {
      const res = await fetch(preset.image); // This fetches the base64 image
      const imageBlob = await res.blob();
      imageFile = new File([imageBlob], "image.png", {
          type: imageBlob.type || 'image/png'
      });
    }

    const {success, message} = await updateUserPreset({
      _id: preset._id,
      name: name,
      settings: settingsFile,
      image: imageFile,
      isPublished: true,
      sourcePresetId: preset._id
    }, token);

    if (!success) {
      toaster.create({
        title: "Error",
        description: message || "Failed to update user preset",
        type: "error"
      });
      return;
    }

    toaster.create({
      title: "Success",
      description: "Preset updated successfully.",
      type: "success"
    });

    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }

  if (error) return <Text color="red.500">{error}</Text>;
  if (!preset) return <Text>Loading...</Text>;

  return (
    <Container
      color={"black"}
    >
      <Editable.Root 
        defaultValue={preset.name} mb = {8} mt={8} 
        onValueCommit={(event) => {
          const newName = event.value;
          if (newName != preset.name) {
            handleUpdate(newName, null, null);
          }
        }}>
        <Editable.Preview fontSize="3xl"/>
        <Editable.Input fontSize="3xl"/>
        <Editable.Control style={{ marginTop: '8px' }}>
          <Editable.EditTrigger asChild>
            <IconButton variant="ghost" size="sm">
              <LuPencilLine />
            </IconButton>
          </Editable.EditTrigger>
          <Editable.CancelTrigger asChild>
            <IconButton variant="outline" size="sm">
              <LuX />
            </IconButton>
          </Editable.CancelTrigger>
          <Editable.SubmitTrigger asChild>
            <IconButton variant="outline" size="sm">
              <LuCheck />
            </IconButton>
          </Editable.SubmitTrigger>
        </Editable.Control>
      </Editable.Root>
      <div style={{ position: 'relative', width: '100%', aspectRatio: '16 / 9', margin: '0 auto' }}>
        <img
          src={preset.image}
          alt={preset.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: '8px',
            display: 'block',
          }}
        />

        <Box position="absolute" top="8px" right="8px" zIndex="1">
          <FileUpload.Root 
            accept={["image/*"]}
            onFileChange= {(details) => {
              const files = details.acceptedFiles;
              if (files.length > 0) {
                handleUpdate(null, null, files[0]);
              }
            }}
          >
            <FileUpload.HiddenInput />
              <FileUpload.Trigger asChild>
                <Button variant="outline" size="xl" bg = "gray.900" color={"white"}>
                  <LuPencilLine />
                </Button>
              </FileUpload.Trigger>
            <FileUpload.List />
          </FileUpload.Root>
        </Box>
      </div>

      <HStack>
        <Link to="/">
          <Button mt={4} bg={"black"} color={"white"}>
            Return to Homepage
          </Button>
        </Link>

        <Spacer />

        <Button mt={4} bg={"black"} color={"white"} onClick={handleDelete}>
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
      <Box position="relative" width="100%" mb={8}>
        <Box position="absolute" top="8px" right="8px" zIndex="1">
          <FileUpload.Root 
            accept={[".json"]}
            onFileChange= {(details) => {
              const files = details.acceptedFiles;
              if (files.length > 0) {
                handleUpdate(null, files[0], null);
              }
            }}
          >
            <FileUpload.HiddenInput />
              <FileUpload.Trigger asChild>
                <Button variant="outline" size="xl" bg = "gray.900" color={"white"}>
                  <LuPencilLine />
                </Button>
              </FileUpload.Trigger>
            <FileUpload.List />
          </FileUpload.Root>
        </Box>

        <Box
          p={4}
          bg="gray.900"
          color="white"
          borderRadius="md"
          overflowX="auto"
          whiteSpace="pre-wrap"
          width="100%"
        >
          {JSON.stringify(preset.settings, null, 2)}
        </Box>
      </Box>
    </Container>
  );
};

export default UserPresetDetails;