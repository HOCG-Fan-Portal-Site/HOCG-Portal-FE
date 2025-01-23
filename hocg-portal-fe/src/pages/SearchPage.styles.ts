import { styled } from '@mui/material/styles';
import { Container, Typography } from '@mui/material';

export const SearchContainer = styled(Container)(({ theme }) => ({
  minHeight: '100vh',
  padding: theme.spacing(8),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(8, 2),
  },
}));

export const SearchTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  fontWeight: 'bold',
  color: theme.palette.text.primary,
  textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
}));

export const SearchSubtitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(6),
  color: theme.palette.text.secondary,
  maxWidth: '600px',
  marginLeft: 'auto',
  marginRight: 'auto',
}));
