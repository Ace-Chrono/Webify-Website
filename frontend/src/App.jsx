import { Box } from '@chakra-ui/react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster"

import CreatePage from './pages/CreatePage';
import HomePage from './pages/HomePage';
import AccountPage from './pages/AccountPage';
import Navbar from './components/Navbar';
import Footer from './components/footer';
import PresetDetails from './pages/PresetDetailsPage';
import ImportPage from './pages/ImportPage';

function App() {
  return (
    <Box minH={"100vh"} bg = "gray.800">
      <Navbar />
      <Toaster />
      <Routes>
        <Route path = "/" element = {<HomePage />} />
        <Route path = "/create" element = {<CreatePage />} />
        <Route path = "/import" element = {<ImportPage />} />
        <Route path = "/account" element = {<AccountPage />} />
        <Route path = "/preset/:id" element = {<PresetDetails />} />
      </Routes>
      <Footer />
    </Box>
  );
}

export default App;
