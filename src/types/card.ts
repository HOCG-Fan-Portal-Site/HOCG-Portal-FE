// 卡片類型
export type CardType = 
  | '推しホロメン'
  | 'ホロメン'
  | 'Buzzホロメン'
  | 'サポート・イベント'
  | 'サポート・イベント・LIMITED'
  | 'サポート・アイテム'
  | 'サポート・アイテム・LIMITED'
  | 'サポート・マスコット'
  | 'サポート・ファン'
  | 'サポート・ツール';

// 稀有度
export type Rarity = 'C' | 'R' | 'RRR' | 'SP' | 'OC';

// 顏色
export type CardColor = 'purple' | 'blue' | 'red' | 'green' | 'yellow' | 'white';

// 技能類型
export type SkillType = 'キーワード' | 'アーツ' | '推しスキル' | 'SP推しスキル' | 'サポート効果';

// 技能介面
export interface Skill {
  type: SkillType;
  subtype?: string;
  text?: string;
  name?: string;
  dmg?: string;
  icons?: {
    main?: string[];
    tokkou?: string[];
  };
  description?: string;
}

// 基礎卡片介面
export interface BaseCard {
  id?: string;
  number: string;
  name: string;
  image_url: string;
  image_alt: string;
  card_type: CardType;
  tags?: string[];
  rarity: Rarity;
  product: string;
  color: CardColor;
  skills: Skill[];
}

// Hololive 成員卡片
export interface HoloMemberCard extends BaseCard {
  card_type: 'ホロメン' | 'Buzzホロメン';
  hp: string;
  bloom_level: string;
  baton_touch: string[];
  skills: Skill[];
}

// 推し成員卡片
export interface OshiHoloMemberCard extends BaseCard {
  card_type: '推しホロメン';
  life: number;
  skills: Skill[];
}

// 支援卡片
export interface SupportCard extends BaseCard {
  card_type: Extract<CardType, 
    | 'サポート・イベント' 
    | 'サポート・イベント・LIMITED'
    | 'サポート・アイテム'
    | 'サポート・アイテム・LIMITED'
    | 'サポート・マスコット'
    | 'サポート・ファン'
    | 'サポート・ツール'
  >;
}

// 卡片聯合類型
export type Card = HoloMemberCard | OshiHoloMemberCard | SupportCard;

// 卡片類型集合
const HOLO_MEMBER_TYPES = ['ホロメン', 'Buzzホロメン'] as const;

const SUPPORT_CARD_TYPES = [
  'サポート・イベント',
  'サポート・イベント・LIMITED',
  'サポート・アイテム',
  'サポート・アイテム・LIMITED',
  'サポート・マスコット',
  'サポート・ファン',
  'サポート・ツール'
] as const;

// 類型守衛函數
export const isHoloMemberCard = (card: Card): card is HoloMemberCard => {
  return HOLO_MEMBER_TYPES.includes(card.card_type as typeof HOLO_MEMBER_TYPES[number]);
};

export const isOshiHoloMemberCard = (card: Card): card is OshiHoloMemberCard => {
  return card.card_type === '推しホロメン';
};

export const isSupportCard = (card: Card): card is SupportCard => {
  return SUPPORT_CARD_TYPES.includes(card.card_type as typeof SUPPORT_CARD_TYPES[number]);
};
