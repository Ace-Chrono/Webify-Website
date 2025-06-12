import { Container, VStack, Text, SimpleGrid, Heading, ButtonGroup, IconButton, Pagination } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import React, { useEffect } from 'react';
import { usePresetStore } from '@/store/preset';
import PresetCard from '@/components/PresetCard';
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { useState } from 'react';

const HomePage = () => {
  const {fetchPresets, presets} = usePresetStore();

  const [page, setPage] = useState(1);
  const pageSize = 20;
  const startRange = (page - 1) * pageSize;
  const endRange = startRange + pageSize;
  const visiblePresets = presets.slice(startRange, endRange);

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
          {visiblePresets.map((preset) => (
            <PresetCard key = {preset._id} preset = {preset} />
          ))}
        </SimpleGrid>

        <Pagination.Root
          count={presets.length}
          pageSize={pageSize}
          page={page}
          onPageChange={(e) => setPage(e.page)}
        >
          <ButtonGroup variant="ghost" size="sm" justifyContent="center" w="full">
            <Pagination.PrevTrigger asChild>
              <IconButton aria-label="Previous Page">
                <HiChevronLeft />
              </IconButton>
            </Pagination.PrevTrigger>

            <Pagination.Items
              render={(pageItem) => (
                <IconButton
                  key={pageItem.value}
                  aria-label={`Page ${pageItem.value}`}
                  isActive={pageItem.value === page}
                  onClick={() => setPage(pageItem.value)}
                >
                  {pageItem.value}
                </IconButton>
              )}
            />

            <Pagination.NextTrigger asChild>
              <IconButton aria-label="Next Page">
                <HiChevronRight />
              </IconButton>
            </Pagination.NextTrigger>
          </ButtonGroup>
        </Pagination.Root>

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