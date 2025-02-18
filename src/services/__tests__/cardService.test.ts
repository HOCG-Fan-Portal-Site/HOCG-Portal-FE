import { describe, it, expect, vi, beforeEach } from 'vitest'
import { cardService } from '../cardService'
import { cardCacheService } from '../cardCacheService'
import { Card } from '../../types/card'

// Mock cardCacheService
vi.mock('../cardCacheService', () => ({
  cardCacheService: {
    getCardData: vi.fn(),
    setCardData: vi.fn(),
  },
}))

describe('cardService', () => {
  const mockCardData: Record<string, Card> = {
    "hSD04-001-OC": {
      number: "hSD04-001",
      name: "癒月ちょこ",
      image_url: "https://hololive-official-cardgame.com/wp-content/images/cardlist/hSD04/hSD04-001_OC.png",
      image_alt: "癒月ちょこ",
      card_type: "推しホロメン" as const,
      rarity: "OC",
      product: "スタートデッキ 紫 癒月ちょこ",
      color: "purple",
      life: 5,
      skills: [
        {
          type: "推しスキル",
          text: "[ホロパワー：2消費]パープルマイク[ターンに1回]このターンの間、自分の紫センターホロメンのアーツ+20。",
        },
        {
          type: "SP推しスキル",
          text: "[ホロパワー：1消費]カードチェンジ[ゲームに1回]自分のデッキを2枚引いた後、手札1枚をアーカイブする。",
        }
      ]
    },
    "hSD04-002-C": {
      number: "hSD04-002",
      name: "癒月ちょこ",
      image_url: "https://hololive-official-cardgame.com/wp-content/images/cardlist/hSD04/hSD04-002_C.png",
      image_alt: "癒月ちょこ",
      card_type: "ホロメン" as const,
      tags: [
      "JP",
      "2期生",
      "料理"
    ],
    "rarity": "C",
    "product": "スタートデッキ 紫 癒月ちょこ",
    "color": "purple",
    "hp": "100",
    "bloom_level": "Debut",
    "baton_touch": [
      "any"
    ],
    "skills": [
      {
        "type": "アーツ",
        "name": "魔界の保健医",
        "dmg": "30",
        "icons": {
          "main": [
            "any"
          ]
        }
      }
    ]
  },
  }

  beforeEach(() => {
    vi.clearAllMocks()
    // Reset fetch mock
    global.fetch = vi.fn()
  })

  describe('getAllCardData', () => {
    it('should return cached data if available', async () => {
      // Setup cache mock to return data
      vi.mocked(cardCacheService.getCardData).mockReturnValue(mockCardData)

      const result = await cardService.getAllCardData()

      expect(result).toEqual(mockCardData)
      expect(cardCacheService.getCardData).toHaveBeenCalledTimes(1)
      expect(global.fetch).not.toHaveBeenCalled()
    })

    it('should fetch data from server if cache is empty', async () => {
      // Setup cache mock to return null
      vi.mocked(cardCacheService.getCardData).mockReturnValue(null)
      
      // Setup fetch mock
      global.fetch = vi.fn().mockResolvedValue({
        json: () => Promise.resolve(mockCardData),
      })

      const result = await cardService.getAllCardData()

      expect(result).toEqual(mockCardData)
      expect(cardCacheService.getCardData).toHaveBeenCalledTimes(1)
      expect(global.fetch).toHaveBeenCalledTimes(1)
      expect(cardCacheService.setCardData).toHaveBeenCalledWith(mockCardData)
    })

    it('should handle fetch errors gracefully', async () => {
      // Setup cache mock to return null
      vi.mocked(cardCacheService.getCardData).mockReturnValue(null)
      
      // Setup fetch mock to throw error
      global.fetch = vi.fn().mockRejectedValue(new Error('Network error'))

      await expect(cardService.getAllCardData()).rejects.toThrow('Network error')
    })
  })
})
