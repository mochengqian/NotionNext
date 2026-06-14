import { resolveActiveContentTab } from '@/themes/heo/evidence.helpers'

describe('resolveActiveContentTab', () => {
  it.each([
    ['/recommended-reading/page/[page]', 'recommended-reading'],
    ['/growth-notes/page/[page]', 'growth-notes'],
    ['/technical-exploration/page/[page]', 'technical-exploration']
  ])('keeps %s on its parent content tab', (pathname, expectedTab) => {
    expect(resolveActiveContentTab({ pathname })).toBe(expectedTab)
  })
})
