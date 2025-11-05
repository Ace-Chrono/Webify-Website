import { Button, Container, Flex, HStack, Text } from '@chakra-ui/react';
import { BsPlusSquare } from 'react-icons/bs';
import { VscAccount } from "react-icons/vsc";
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <Container 
      maxW="100%" 
      px={4}
      color="black"
      //boxShadow="0 12px 40px rgba(0,0,0,0.1)"
    >
      <Flex
        h={16}
        alignItems="center"
        justifyContent="space-between"
        flexDir={{ base: 'column', sm: 'row' }}
      >
        <Link 
          to="/" style={{ textDecoration: 'none' }}
        >
            <Text
                fontSize={{ base: "22px", sm: "28px" }}
                fontWeight="semibold"
                color="black"
                _hover={{ color: "gray.600" }}
            >
                Webify
            </Text>
        </Link>

        <HStack spacing={4} alignItems="center">
          <Link to="/">
            <Button bg = "gray.200" _hover={{ bg: "gray.300" }}>
              Explore
            </Button>
          </Link>
          <Link to="/create">
            <Button bg = "gray.200" _hover={{ bg: "gray.300" }}>
              Publish
            </Button>
          </Link>
          <Link to="/import">
            <Button bg = "gray.200" _hover={{ bg: "gray.300" }}>
              Import
            </Button>
          </Link>
          <Link to="/account">
            <Button bg = "gray.200" _hover={{ bg: "gray.300" }}>
              <VscAccount size={24} />
            </Button>
          </Link>
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;