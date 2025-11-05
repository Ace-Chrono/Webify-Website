import { Box, Flex} from '@chakra-ui/react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster"

import CreatePage from './pages/CreatePage';
import HomePage from './pages/HomePage';
import AccountPage from './pages/AccountPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PresetDetails from './pages/PresetDetailsPage';
import ImportPage from './pages/ImportPage';
import UserPresetDetails from './pages/UserPresetDetailsPage';

function App() {
  return (
    <Flex minH="100vh" 
      direction="column" 
      bg = "gray.100"
    >
      <Navbar />
      <Toaster />
        <Box flex = "1">
          <Routes>
            <Route path = "/" element = {<HomePage />} />
            <Route path = "/create" element = {<CreatePage />} />
            <Route path = "/import" element = {<ImportPage />} />
            <Route path = "/account" element = {<AccountPage />} />
            <Route path = "/preset/:id" element = {<PresetDetails />} />
            <Route path = "/userpreset/:id" element = {<UserPresetDetails />} />
          </Routes>
        </Box>
      <Footer />
    </Flex>
  );
}

export default App;
