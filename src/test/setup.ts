import '@testing-library/jest-dom/vitest'
import { vi } from 'vitest'
import { beforeEach } from 'vitest'

// 設置全局的 fetch mock
globalThis.fetch = vi.fn()

// 重置所有的 mocks
beforeEach(() => {
  vi.clearAllMocks()
})
