import { describe, it, expect, vi, beforeEach } from 'vitest'
import { cardCacheService } from '../cardCacheService'
import { Card } from '../../types/card'

describe('cardCacheService', () => {
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
    }
  }

  // Mock localStorage
  const localStorageMock = (() => {
    let store: { [key: string]: string } = {}
    return {
      getItem: vi.fn((key: string) => store[key] || null),
      setItem: vi.fn((key: string, value: string) => {
        store[key] = value.toString()
      }),
      removeItem: vi.fn((key: string) => {
        delete store[key]
      }),
      clear: vi.fn(() => {
        store = {}
      })
    }
  })()

  // Replace global localStorage with mock
  beforeEach(() => {
    vi.stubGlobal('localStorage', localStorageMock)
    localStorageMock.clear()
  })

  describe('setCardData', () => {
    it('should store card data in localStorage', () => {
      cardCacheService.setCardData(mockCardData)
      expect(localStorage.setItem).toHaveBeenCalledTimes(1)
      const storedData = JSON.parse(localStorageMock.getItem('card_data_cache') || '{}')
      expect(storedData.data).toEqual(mockCardData)
      expect(typeof storedData.timestamp).toBe('number')
    })
  })

  describe('getCardData', () => {
    it('should return null if no data in cache', () => {
      const result = cardCacheService.getCardData()
      expect(result).toBeNull()
    })

    it('should return cached data if not expired', () => {
      const timestamp = Date.now()
      const cacheItem = {
        data: mockCardData,
        timestamp
      }
      localStorageMock.setItem('card_data_cache', JSON.stringify(cacheItem))

      const result = cardCacheService.getCardData()
      expect(result).toEqual(mockCardData)
    })

    it('should return null and clear cache if data is expired', () => {
      const timestamp = Date.now() - (11 * 60 * 1000) // 11 minutes ago
      const cacheItem = {
        data: mockCardData,
        timestamp
      }
      localStorageMock.setItem('card_data_cache', JSON.stringify(cacheItem))

      const result = cardCacheService.getCardData()
      expect(result).toBeNull()
      expect(localStorage.removeItem).toHaveBeenCalledWith('card_data_cache')
    })
  })

  describe('getCard', () => {
    it('should return null if card not found', () => {
      const result = cardCacheService.getCard('non-existent-id')
      expect(result).toBeNull()
    })

    it('should return specific card if exists in cache', () => {
      cardCacheService.setCardData(mockCardData)
      const result = cardCacheService.getCard('hSD04-001-OC')
      expect(result).toEqual(mockCardData['hSD04-001-OC'])
    })
  })

  describe('clearCache', () => {
    it('should remove cache from localStorage', () => {
      cardCacheService.setCardData(mockCardData)
      cardCacheService.clearCache()
      expect(localStorage.removeItem).toHaveBeenCalledWith('card_data_cache')
      expect(cardCacheService.getCardData()).toBeNull()
    })
  })

  describe('isValid', () => {
    it('should return false if no cache exists', () => {
      expect(cardCacheService.isValid()).toBeFalsy()
    })

    it('should return true if cache exists and not expired', () => {
      const timestamp = Date.now()
      const cacheItem = {
        data: mockCardData,
        timestamp
      }
      localStorageMock.setItem('card_data_cache', JSON.stringify(cacheItem))
      expect(cardCacheService.isValid()).toBeTruthy()
    })

    it('should return false if cache is expired', () => {
      const timestamp = Date.now() - (11 * 60 * 1000) // 11 minutes ago
      const cacheItem = {
        data: mockCardData,
        timestamp
      }
      localStorageMock.setItem('card_data_cache', JSON.stringify(cacheItem))
      expect(cardCacheService.isValid()).toBeFalsy()
    })
  })
})
