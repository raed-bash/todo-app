import { timeAgo } from "./time-ago";

const now = new Date("2026-06-15T12:00:00Z");
const ago = (s: number) => new Date(now.getTime() - s * 1000);

test("formats relative times", () => {
  expect(timeAgo(ago(10), now)).toBe("just now");
  expect(timeAgo(ago(5 * 60), now)).toBe("5 min. ago");
  expect(timeAgo(ago(3 * 3600), now)).toBe("3 hr. ago");
  expect(timeAgo(ago(24 * 3600), now)).toBe("yesterday");
  expect(timeAgo(ago(14 * 24 * 3600), now)).toBe("2 wk. ago");
});
