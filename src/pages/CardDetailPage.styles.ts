import { styled } from '@mui/material/styles';
import { Container, Button } from '@mui/material';

export const DetailPageContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(4),
}));

export const ContentContainer = styled('div')(({ theme }) => ({
  padding: theme.spacing(4),
  maxWidth: '1200px',
  margin: '0 auto',
  background: 'transparent',
  borderRadius: theme.shape.borderRadius,
}));

export const BackButton = styled(Button)(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));

export const LoadingContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  marginTop: theme.spacing(4),
}));

export const MessageContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));
