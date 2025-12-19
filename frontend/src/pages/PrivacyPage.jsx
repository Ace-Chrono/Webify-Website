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
        {/* Page Title */}
        <Heading
          as="h1"
          size="5xl"
          fontWeight="semibold"
          textAlign="center"
          mt={16}
        >
          Privacy Policy
        </Heading>

        <Text fontSize="md" textAlign="center" color="gray.600">
          Effective Date: December 19, 2025
        </Text>

        {/* Content Box */}
        <VStack
          spacing={6}
          bg="gray.950"
          color="white"
          borderRadius="xl"
          shadow="md"
          p={8}
          align="stretch"
        >
          <Heading as="h2" size="lg">
            Information We Collect
          </Heading>
          <Text>
            This extension does not collect, store, or share any personally
            identifiable information such as names, email addresses, passwords,
            or payment details.
          </Text>

          <Heading as="h2" size="lg">
            Local Data Storage
          </Heading>
          <Text>
            Any theme presets created or imported by users are stored locally
            using Chrome Local Storage. This data remains on the user’s device
            and is not shared with third parties.
          </Text>

          <Heading as="h2" size="lg">
            Host Permissions
          </Heading>
          <Text>
            Host permissions are used only to retrieve user-created theme presets
            from our backend service when the user is logged in. No additional
            browsing data or personal information is accessed.
          </Text>

          <Heading as="h2" size="lg">
            Third-Party Sharing
          </Heading>
          <Text>
            We do not sell, transfer, or disclose user data to third parties.
            All data usage is strictly limited to the core functionality of
            customizing website themes.
          </Text>

          <Heading as="h2" size="lg">
            Contact
          </Heading>
          <Text>
            If you have any questions about this Privacy Policy, please contact
            us at <strong>richardszhao@gmail.com</strong>.
          </Text>
        </VStack>
      </VStack>
    </Container>
  );
};

export default PrivacyPage;