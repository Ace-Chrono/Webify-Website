import { Box, Stack, Text, Link, HStack } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box as="footer" color="white" py={8} px={4} shadow={'md'}>
      <Stack spacing={4} align="center">
        {/*
        <HStack spacing={6}>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/privacy">Privacy</Link>
        </HStack>
        */}
        <Text fontSize="sm" color="gray.400">
          © {new Date().getFullYear()} Webify. All rights reserved.
        </Text>
      </Stack>
    </Box>
  );
};

export default Footer;