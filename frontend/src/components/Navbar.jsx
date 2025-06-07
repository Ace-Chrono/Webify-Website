import { Button, Container, Flex, HStack, Text } from '@chakra-ui/react';
import { BsPlusSquare } from 'react-icons/bs';
import { VscAccount } from "react-icons/vsc";
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <Container maxW="100%" px={4} bg = "gray.900">
      <Flex
        h={16}
        alignItems="center"
        justifyContent="space-between"
        flexDir={{ base: 'column', sm: 'row' }}
      >
        <Link to="/" style={{ textDecoration: 'none' }}>
            <Text
                fontSize={{ base: "22px", sm: "28px" }}
                fontWeight="bold"
                textTransform="uppercase"
                color="blue.500"
            >
                Webify Market Place
            </Text>
        </Link>

        <HStack spacing={2} alignItems="center">
          <Link to="/">
            <Button>
              Explore
            </Button>
          </Link>
          <Link to="/create">
            <Button>
              Publish
            </Button>
          </Link>
          <Link to="/import">
            <Button>
              Import
            </Button>
          </Link>
          <Link to="/account">
            <Button>
              <VscAccount size={24} />
            </Button>
          </Link>
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;