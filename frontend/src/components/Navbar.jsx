import { Button, Container, Flex, HStack, Text, Drawer, Portal, Stack, useBreakpointValue } from '@chakra-ui/react';
import { IoIosOptions, IoMdClose } from "react-icons/io";
import { VscAccount } from "react-icons/vsc";
import { Link } from 'react-router-dom';

const Navbar = () => {
  const isMobile = useBreakpointValue({ base: true, sm: false });

  return (
    <Container 
      maxW="100%" 
      px={4}
      color="black"
    >
      <Flex
        h={16}
        alignItems="center"
        justifyContent="space-between"
        flexDir={{ base: 'row', sm: 'row' }}
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

        {isMobile ?  
          <Drawer.Root placement={"start"}>
            <Drawer.Trigger asChild>
              <Button bg = "gray.200" color="black" _hover={{ bg: "gray.300" }}>
                <IoIosOptions />
              </Button>
            </Drawer.Trigger>
            <Portal>
              <Drawer.Backdrop />
              <Drawer.Positioner>
                <Drawer.Content>
                  <Drawer.Header>
                    <Drawer.Title>Webify</Drawer.Title>
                    <Drawer.CloseTrigger asChild>
                      <Button m={2} bg = "white" color="black" _hover={{ bg: "gray.300" }}>
                          <IoMdClose />
                      </Button>
                    </Drawer.CloseTrigger>
                  </Drawer.Header>
                  <Drawer.Body>
                    <Stack spacing={4} alignItems="stretch" flexWrap="wrap" justifyContent="center">
                      <Link to="/">
                        <Button w="100%" bg = "white" color="black" _hover={{ bg: "gray.300" }}>
                          Explore
                        </Button>
                      </Link>
                      <Link to="/create">
                        <Button w="100%" bg = "white" color="black" _hover={{ bg: "gray.300" }}>
                          Publish
                        </Button>
                      </Link>
                      <Link to="/import">
                        <Button w="100%" bg = "white" color="black" _hover={{ bg: "gray.300" }}>
                          Import
                        </Button>
                      </Link>
                      <Link to="/privacy">
                        <Button w="100%" bg = "white" color="black" _hover={{ bg: "gray.300" }}>
                          Privacy
                        </Button>
                      </Link>
                      <Link to="/account">
                        <Button w="100%" bg = "white" color="black" _hover={{ bg: "gray.300" }}>
                          <VscAccount size={24} />
                        </Button>
                      </Link>
                    </Stack>
                  </Drawer.Body>
                  
                </Drawer.Content>
              </Drawer.Positioner>
            </Portal>
          </Drawer.Root>
        :
          <HStack spacing={4} alignItems="center" flexWrap="wrap" justifyContent="center">
            <Link to="/">
              <Button bg = "gray.200" color="black" _hover={{ bg: "gray.300" }}>
                Explore
              </Button>
            </Link>
            <Link to="/create">
              <Button bg = "gray.200" color="black" _hover={{ bg: "gray.300" }}>
                Publish
              </Button>
            </Link>
            <Link to="/import">
              <Button bg = "gray.200" color="black" _hover={{ bg: "gray.300" }}>
                Import
              </Button>
            </Link>
            <Link to="/privacy">
              <Button bg = "gray.200" color="black" _hover={{ bg: "gray.300" }}>
                Privacy
              </Button>
            </Link>
            <Link to="/account">
              <Button bg = "gray.200" color="black" _hover={{ bg: "gray.300" }}>
                <VscAccount size={24} />
              </Button>
            </Link>
          </HStack>
        }
      </Flex>
    </Container>
  );
};

export default Navbar;