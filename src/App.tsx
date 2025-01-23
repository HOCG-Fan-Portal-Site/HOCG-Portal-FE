import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { SearchPage } from './pages/SearchPage';
import { CardDetailPage } from './pages/CardDetailPage';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#6AA6AA',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/card/:id" element={<CardDetailPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
