import { useParams, useNavigate } from 'react-router-dom';
import { CircularProgress, Alert } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useCardDetail } from '../hooks/useCardDetail';
import { CardDetail } from '../components/CardDetail/CardDetail';
import {
  DetailPageContainer,
  ContentContainer,
  BackButton,
  LoadingContainer,
  MessageContainer,
} from './CardDetailPage.styles';

const BackButtonComponent = ({ onClick }: { onClick: () => void }) => (
  <BackButton
    startIcon={<ArrowBackIcon />}
    onClick={onClick}
    variant="text"
    color="primary"
  >
    Back to Search
  </BackButton>
);

const LoadingState = () => (
  <LoadingContainer>
    <CircularProgress />
  </LoadingContainer>
);

const ErrorState = ({ message }: { message: string }) => (
  <MessageContainer>
    <Alert severity="error">{message}</Alert>
  </MessageContainer>
);

const NotFoundState = () => (
  <MessageContainer>
    <Alert severity="warning">Card not found</Alert>
  </MessageContainer>
);

export const CardDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { card, isLoading, error } = useCardDetail(id || '');

  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState message={error} />;
  if (!card) return <NotFoundState />;

  return (
    <DetailPageContainer>
      <BackButtonComponent onClick={() => navigate(-1)} />
      <ContentContainer>
        <CardDetail card={card} />
      </ContentContainer>
    </DetailPageContainer>
  );
};
