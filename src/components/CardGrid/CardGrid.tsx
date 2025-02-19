import { Grid2 as Grid, Card as MuiCard, CardMedia} from '@mui/material';
import { Card } from '../../types/card';
import { useNavigate } from 'react-router-dom';
import styles from './CardGrid.module.css';

interface CardGridProps {
  cards: Card[];
}

export const CardGrid = ({ cards }: CardGridProps) => {
  const navigate = useNavigate();
  const cardID = (card: Card) => {
    // If card already has an id, use it
    if (card.id) return card.id;
    // Otherwise generate from number and rarity
    return `${card.number}_${card.rarity}`;
  };

  return (
    <div className={styles.gridContainer}>
      <Grid container spacing={2}>
        {cards.map((card) => (
          <Grid size={4} key={cardID(card)}>
            <MuiCard 
              className={styles.cardItem}
              onClick={() => navigate(`/card/${cardID(card)}`)}
            >
              <CardMedia
                component="img"
                className={styles.cardMedia}
                image={card.image_url}
                alt={card.image_alt || card.name}
              />
            </MuiCard>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};
