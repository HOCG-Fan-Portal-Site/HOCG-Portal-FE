import { Card } from '../../types/card';
import { isHoloMemberCard, isOshiHoloMemberCard, isSupportCard } from '../../types/card';
import { TypeFilterState } from './TypeFilter.types';

export const filterCards = (cards: Card[], filters: TypeFilterState): Card[] => {
  if (Object.values(filters).every((value) => !value)) {
    return cards;
  }

  return cards.filter((card) => {
    if (filters.holoMemberCard && isHoloMemberCard(card)) return true;
    if (filters.oshiHoloMemberCard && isOshiHoloMemberCard(card)) return true;
    if (filters.supportCard && isSupportCard(card)) return true;
    return false;
  });
};
