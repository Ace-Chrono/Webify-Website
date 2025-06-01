import { Container, VStack, Text, SimpleGrid } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import React, { useEffect } from 'react';
import { usePresetStore } from '@/store/preset';
import PresetCard from '@/components/PresetCard';

const HomePage = () => {
  const {fetchPresets, presets} = usePresetStore();

  useEffect(() =>{
    fetchPresets();
  }, [fetchPresets]);
  console.log("presets", presets)

  return (
    <Container maxW = 'container.xl' py = {12}>
      <VStack spacing = {8}>
        <Text
          fontSize = {"40px"}
          fontWeight = {"bold"}
          textAlign = {"center"}
          color = "blue.500"
        >
          Browse Presets
        </Text>

        <SimpleGrid
          columns = {{
            base: 1,
            md: 2,
            lg: 3
          }}
          spacing = {10}
          w = {"full"}
        >
          {presets.map((preset) => (
            <PresetCard key = {preset._id} preset = {preset} />
          ))}
        </SimpleGrid>

        {presets.length === 0 && (
          <Text
            fontSize = 'xl'
            textAlign = {"center"}
            fontWeight = {"bold"}
            color = 'gray.500'
          >
            No presets found{" "}
            <Link to = "/create">
              <Text 
                as = 'span'
                color = 'blue.500'
                _hover = {{ textDecoration: "underline" }}
              >
                Create a preset
              </Text>
            </Link>
          </Text>
        )}
      </VStack>
    </Container>
  )
}

export default HomePage;