import './App.css';
import Navbar from './components/Navbar';
import Routes from './Routes';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, Box, CssBaseline } from '@material-ui/core';
import theme from './theme';
import { UserContextProvider } from './contexts/UserContext';

function App() {
  return (
    <BrowserRouter>
      <UserContextProvider>
        <CssBaseline />
        <Box minHeight="100vh">
          <ThemeProvider theme={theme}>
            <Navbar />
            <Routes />
          </ThemeProvider>
        </Box>
      </UserContextProvider>
    </BrowserRouter>
  );
}

export default App;
