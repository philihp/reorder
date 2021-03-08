import { shuffle } from 'fast-shuffle'
import reorder from '..'

const a = 'a'
const b = 'b'
const c = 'c'
const d = 'd'

describe('reorder', () => {
  it('accepts zero items', () => {
    expect.assertions(2)
    const src = []
    const rank = []
    const [dst, derank] = reorder(rank, src)
    expect(dst).toBeUndefined()
    expect(derank).toBeUndefined()
  })

  it('accepts 1 item', () => {
    expect.assertions(2)
    const src = [a]
    const rank = [0]
    const [dst, derank] = reorder(rank, src)
    expect(dst).toStrictEqual([a])
    expect(derank).toStrictEqual([0])
  })

  it('accepts 2 items', () => {
    expect.assertions(2)
    const src = [b, a]
    const rank = [1, 0]
    const [dst, derank] = reorder(rank, src)
    expect(dst).toStrictEqual([a, b])
    expect(derank).toStrictEqual([1, 0])
  })

  it('accepts 3 items', () => {
    expect.assertions(2)
    const src = [b, c, a]
    const rank = [1, 2, 0]
    const [dst, derank] = reorder(rank, src)
    expect(dst).toStrictEqual([a, b, c])
    expect(derank).toStrictEqual([2, 0, 1])
  })

  it('accepts 4 items', () => {
    expect.assertions(2)
    const src = [b, d, c, a]
    const rank = [1, 3, 2, 0]
    const [dst, derank] = reorder(rank, src)
    expect(dst).toStrictEqual([a, b, c, d])
    expect(derank).toStrictEqual([3, 0, 2, 1])
  })

  it('can undo the ranking', () => {
    expect.assertions(4)
    const src = shuffle([...new Array(100)].map(() => Math.random()))
    const rank = shuffle([...new Array(100)].map((_, i) => i))
    const [trans, derank] = reorder(rank, src)
    const [dst, dederank] = reorder(derank, trans)
    expect(src).toStrictEqual(dst)
    expect(src).not.toBe(dst)
    expect(dederank).toStrictEqual(rank)
    expect(dederank).not.toBe(rank)
  })

  it('can be curried', () => {
    expect.assertions(4)
    const reverse4 = reorder([3, 2, 1, 0])
    expect(() => {
      const [reversed] = reverse4([d, c, b, a])
      expect(reversed).toStrictEqual([a, b, c, d])
    }).not.toThrow()
    expect(() => {
      const [reversed] = reverse4([d, d, b, b])
      expect(reversed).toStrictEqual([b, b, d, d])
    }).not.toThrow()
  })
})
