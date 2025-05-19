# Test info

- Name: select question and check code
- Location: /Users/aviralgarg/code/sde/frontend/e2e/basic.spec.ts:5:1

# Error details

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: 'Check' })
    - locator resolved to <button id="check-btn">Check</button>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is not stable
    - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is not stable
    - retrying click action
      - waiting 100ms
    55 × waiting for element to be visible, enabled and stable
       - element is not stable
     - retrying click action
       - waiting 500ms

    at /Users/aviralgarg/code/sde/frontend/e2e/basic.spec.ts:12:53
```

# Page snapshot

```yaml
- complementary:
  - list:
    - listitem:
      - button "1. Sort an Array"
    - listitem:
      - button "2. Two Sum"
    - listitem:
      - button "3. Two Sum II – Input Array Is Sorted"
    - listitem:
      - button "4. Meeting Rooms"
    - listitem:
      - button "5. Intersection of Three Sorted Arrays"
    - listitem:
      - button "6. Intersection of Two Arrays"
    - listitem:
      - button "7. Merge Sorted Array"
    - listitem:
      - button "8. Kth Largest Element in an Array"
    - listitem:
      - button "9. K Closest Points to Origin"
    - listitem:
      - button "10. Top K Frequent Elements"
    - listitem:
      - button "11. Sort Colors"
    - listitem:
      - button "12. Placeholder 12"
    - listitem:
      - button "13. Placeholder 13"
    - listitem:
      - button "14. Placeholder 14"
    - listitem:
      - button "15. Placeholder 15"
    - listitem:
      - button "16. Placeholder 16"
    - listitem:
      - button "17. Placeholder 17"
    - listitem:
      - button "18. Placeholder 18"
    - listitem:
      - button "19. Placeholder 19"
    - listitem:
      - button "20. Placeholder 20"
    - listitem:
      - button "21. Placeholder 21"
    - listitem:
      - button "22. Placeholder 22"
    - listitem:
      - button "23. Placeholder 23"
    - listitem:
      - button "24. Placeholder 24"
    - listitem:
      - button "25. Placeholder 25"
    - listitem:
      - button "26. Placeholder 26"
    - listitem:
      - button "27. Placeholder 27"
    - listitem:
      - button "28. Placeholder 28"
    - listitem:
      - button "29. Placeholder 29"
    - listitem:
      - button "30. Placeholder 30"
    - listitem:
      - button "31. Placeholder 31"
    - listitem:
      - button "32. Placeholder 32"
    - listitem:
      - button "33. Placeholder 33"
    - listitem:
      - button "34. Placeholder 34"
    - listitem:
      - button "35. Placeholder 35"
    - listitem:
      - button "36. Placeholder 36"
    - listitem:
      - button "37. Placeholder 37"
    - listitem:
      - button "38. Placeholder 38"
    - listitem:
      - button "39. Placeholder 39"
    - listitem:
      - button "40. Placeholder 40"
    - listitem:
      - button "41. Placeholder 41"
    - listitem:
      - button "42. Placeholder 42"
    - listitem:
      - button "43. Placeholder 43"
    - listitem:
      - button "44. Placeholder 44"
    - listitem:
      - button "45. Placeholder 45"
    - listitem:
      - button "46. Placeholder 46"
    - listitem:
      - button "47. Placeholder 47"
    - listitem:
      - button "48. Placeholder 48"
    - listitem:
      - button "49. Placeholder 49"
    - listitem:
      - button "50. Placeholder 50"
- heading "Two Sum" [level=2]
- text: Return indices of two numbers that add up to target.
- code:
  - textbox "Editor content": "def two_sum(nums, target): return 0def two_sum(nums, target): pass"
- button "Check"
- complementary:
  - heading "Settings" [level=3]
  - text: "Mode:"
  - combobox "Mode:":
    - option "Learning" [selected]
    - option "Mock"
  - button "Download Progress"
  - button "Choose File"
- button "🎤"
- alert
- alert
```

# Test source

```ts
   1 | import { test, expect } from '@playwright/test'
   2 |
   3 | const base = 'http://localhost:4173'
   4 |
   5 | test('select question and check code', async ({ page }) => {
   6 |   await page.goto(base)
   7 |   await expect(page.getByRole('heading', { level: 2 })).toHaveText('Sort an Array')
   8 |   await page.getByText('2. Two Sum').click()
   9 |   await expect(page.getByRole('heading', { level: 2 })).toHaveText('Two Sum')
  10 |   const editor = page.getByRole('textbox')
  11 |   await editor.fill('def two_sum(nums, target):\n    return 0')
> 12 |   await page.getByRole('button', { name: 'Check' }).click()
     |                                                     ^ Error: locator.click: Test timeout of 30000ms exceeded.
  13 |   await expect(page.getByText('Solution does not match exactly.')).toBeVisible()
  14 | })
  15 |
```