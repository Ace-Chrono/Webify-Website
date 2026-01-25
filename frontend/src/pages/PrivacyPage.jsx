import {
  Container,
  VStack,
  Heading,
  Text,
} from "@chakra-ui/react";
import React from "react";

const PrivacyPage = () => {
  return (
    <Container color="black">
      <VStack spacing={8} align="stretch">
        <Heading
          as="h1"
          size="5xl"
          fontWeight="semibold"
          textAlign="center"
          mt={16}
        >
          Privacy Policy
        </Heading>

        <Text fontSize="md" textAlign="center" color="gray.600" mt={8} mb={4}>
          Effective Date: December 19, 2025
        </Text>
        
        <VStack
          spacing={6}
          bg="gray.950"
          color="white"
          borderRadius="xl"
          shadow="md"
          p={8}
          align="stretch"
        >
          <Heading as="h2" size="lg" mt={4}>
            Information We Collect
          </Heading>
          <Text mt={2}>
            This extension does not collect, store, or share any personally
            identifiable information such as names, email addresses, passwords,
            or payment details.
          </Text>

          <Heading as="h2" size="lg" mt={4}>
            Local Data Storage
          </Heading>
          <Text mt={2}>
            Any theme presets created or imported by users are stored locally
            using Chrome Local Storage. This data remains on the user’s device
            and is not shared with third parties.
          </Text>

          <Heading as="h2" size="lg" mt={4}>
            Host Permissions
          </Heading>
          <Text mt={2}>
            Host permissions are used only to retrieve user-created theme presets
            from our backend service when the user is logged in. No additional
            browsing data or personal information is accessed.
          </Text>

          <Heading as="h2" size="lg" mt={4}>
            Third-Party Sharing
          </Heading>
          <Text mt={2}>
            We do not sell, transfer, or disclose user data to third parties.
            All data usage is strictly limited to the core functionality of
            customizing website themes.
          </Text>

          <Heading as="h2" size="lg" mt={4}>
            Contact
          </Heading>
          <Text mt={2}>
            If you have any questions about this Privacy Policy, please contact
            us at <strong>richardszhao@gmail.com</strong>.
          </Text>
        </VStack>
      </VStack>
    </Container>
  );
};

export default PrivacyPage;