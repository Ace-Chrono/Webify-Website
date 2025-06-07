import { Container, VStack, Text, SimpleGrid, Heading } from '@chakra-ui/react';
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
    <Container maxW = 'container.xl'>
      <VStack spacing = {8}>
        <Heading as = {"h1"} size = {"2xl"} textAlign = {"center"} mt={8}>
          Browse Presets
        </Heading>

        <SimpleGrid
          columns = {{
            base: 1,
            md: 3,
            lg: 4
          }}
          spacing = {10}
          w = {"full"}
          mt = {4}
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