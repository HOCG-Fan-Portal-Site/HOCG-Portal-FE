import { Grid2 as Grid, Paper, Typography, Box, Chip } from '@mui/material';
import { Card, isHoloMemberCard, isOshiHoloMemberCard } from '../../types/card';
import styles from './CardDetail.module.css';

interface CardDetailProps {
  card: Card;
}

export const CardDetail = ({ card }: CardDetailProps) => {
  const renderCardTypeSpecificInfo = () => {
    if (isHoloMemberCard(card)) {
      return (
        <>
          <Grid size={6}>
            <Typography className={styles.infoLabel}>HP</Typography>
            <Typography className={styles.infoValue}>{card.hp}</Typography>
          </Grid>
          <Grid size={6}>
            <Typography className={styles.infoLabel}>Bloom Level</Typography>
            <Typography className={styles.infoValue}>{card.bloom_level}</Typography>
          </Grid>
          <Grid size={6}>
            <Typography className={styles.infoLabel}>Baton Touch</Typography>
            <Typography className={styles.infoValue}>{card.baton_touch?.join(' + ')}</Typography>
          </Grid>
        </>
      );
    }
    
    if (isOshiHoloMemberCard(card)) {
      return (
        <>
          <Grid size={6}>
            <Typography className={styles.infoLabel}>Life</Typography>
            <Typography className={styles.infoValue}>{card.life}</Typography>
          </Grid>
          
        </>
      );
    }
  };

  return (
    <div className={styles.detailContainer}>
      <div className={styles.contentWrapper}>
        <div className={styles.imageSection}>
          <img
            src={card.image_url}
            alt={card.image_alt || card.name}
            className={styles.cardImage}
          />
        </div>

        <Paper className={styles.infoSection}>
          <Typography className={styles.cardName}>
            {card.name}
          </Typography>
          
          <Box className={styles.tagContainer}>
            {card.tags?.map((tag, index) => (
              <Chip key={index} label={tag} className={styles.tag} />
            ))}
          </Box>

          <Grid container spacing={2} className={styles.infoGrid}>
            <Grid size={6}>
              <Typography className={styles.infoLabel}>Card Type</Typography>
              <Typography className={styles.infoValue}>{card.card_type}</Typography>
            </Grid>
            <Grid size={6}>
              <Typography className={styles.infoLabel}>Rarity</Typography>
              <Typography className={styles.infoValue}>{card.rarity}</Typography>
            </Grid>
            {card.color && (
              <Grid size={6}>
                <Typography className={styles.infoLabel}>Color</Typography>
                <Typography className={styles.infoValue}>{card.color}</Typography>
              </Grid>
            )}


            {renderCardTypeSpecificInfo()}

            {card.skills && card.skills.map((skill, index) => (
              <Grid size={12} key={index} className={styles.skillSection}>
                <div className={styles.skillHeader}>
                  <Typography className={styles.infoLabel}>
                    {skill.type}
                  </Typography>
                  {skill.icons?.main && (
                    <>
                      <Typography className={styles.infoLabelDivider}>•</Typography>
                      <Typography className={styles.infoLabel}>
                        {skill.icons.main.join(' + ')}
                      </Typography>
                    </>
                  )}
                  {skill.subtype && (
                    <>
                      <Typography className={styles.infoLabelDivider}>•</Typography>
                      <Typography className={styles.infoLabel}>
                        {skill.subtype}
                      </Typography>
                    </>
                  )}
                </div>
                {skill.name && (
                  <Typography className={styles.infoValue}>
                    {skill.name}
                  </Typography>
                )}
                <div className={styles.skillDamage}>
                  {skill.dmg && (
                    <Typography className={styles.infoValue}>
                      {skill.dmg}
                    </Typography>
                  )}
                  {skill.icons?.tokkou && (
                    <Typography className={styles.infoValue}>
                      {skill.icons.tokkou}
                    </Typography>
                  )}
                </div>

                {skill.text && (
                  <Typography className={styles.infoValue}>
                    {skill.text}
                  </Typography>
                )}
                {skill.description && (
                  <Typography className={styles.skillDescription}>
                    {skill.description}
                  </Typography>
                )}
              </Grid>
            ))}
          </Grid>
          <Grid container spacing={2} className={styles.infoGrid}>
            <Grid size={6}>
                  <Typography className={styles.infoLabel}>Product</Typography>
                  <Typography className={styles.infoValue}>{card.product}</Typography>
            </Grid>
            <Grid size={6}>
                  <Typography className={styles.infoLabel}>Card Number</Typography>
                  <Typography className={styles.infoValue}>{card.number}</Typography>
              </Grid>
          </Grid>
        </Paper>
      </div>
    </div>
  );
};
