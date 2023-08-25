import { getTruncatedText } from "../src/dom"
import { describe, test, expect } from "vitest"

describe("getTruncatedText function", () => {
  test("should return the same text when text doesn't contain 'mock'", () => {
    const input = "?test=NIRVANA_NEVERMIND_on"
    const result = getTruncatedText(input)
    expect(result).toBe(input)
  })

  test("should return text without 'mock'", () => {
    const input = "?mock_test=FOO_FIGHTERS_on"
    const result = getTruncatedText(input)
    expect(result).not.toBe(input)
  })

  test("should have max. length 60 with mock", () => {
    const input =
      "?mock_test=LONG_LONG_LONG_VERY_LONG_STRING_LONG_LONG_LONG_VERY_LONG_STRING_STRING_STRING"
    const result = getTruncatedText(input)
    expect(result.length).toBeLessThanOrEqual(60)
  })

  test("should have max. length 60 without mock", () => {
    const inputWithoutMock =
      "?LONG_LONG_LONG_VERY_LONG_STRING_LONG_LONG_LONG_VERY_LONG_STRING_STRING_STRING_STRING_STRING"
    const resultWithoutMock = getTruncatedText(inputWithoutMock)
    expect(resultWithoutMock.length).toBeLessThanOrEqual(60)
  })

  test("if query contains 'mock', it shouldn't contain '='", () => {
    const input = "?mock_test=BLUE_OCTOBER"
    const result = getTruncatedText(input)
    expect(result).to.not.contain("=")
  })
})
