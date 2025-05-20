import type { Question } from '../types';

export const questionData: Question[] = [
    {
        id: 1,
        title: "Sort an Array",
        description: "Given an array of integers nums, sort the array in ascending order and return it.\n\nExample 1:\nInput: nums = [5,2,3,1]\nOutput: [1,2,3,5]\n\nExample 2:\nInput: nums = [5,1,1,2,0,0]\nOutput: [0,0,1,1,2,5]",
        starterCode: "def solution(nums):\n    # Your code here\n    pass",
        solution: "def solution(nums):\n    return sorted(nums)"
    },
    {
        id: 2,
        title: "Two Sum",
        description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n\nExample 1:\nInput: nums = [2,7,11,15], target = 9\nOutput: [0,1]\nExplanation: Because nums[0] + nums[1] == 9, we return [0, 1].",
        starterCode: "def solution(nums, target):\n    # Your code here\n    pass",
        solution: "def solution(nums, target):\n    seen = {}\n    for i, num in enumerate(nums):\n        complement = target - num\n        if complement in seen:\n            return [seen[complement], i]\n        seen[num] = i\n    return []"
    },
    {
        id: 3,
        title: "Two Sum II - Input Array Is Sorted",
        description: "Given a 1-indexed array of integers numbers that is already sorted in non-decreasing order, find two numbers such that they add up to a specific target number.\n\nExample 1:\nInput: numbers = [2,7,11,15], target = 9\nOutput: [1,2]\nExplanation: The sum of 2 and 7 is 9. Therefore index1 = 1, index2 = 2.",
        starterCode: "def solution(numbers, target):\n    # Your code here\n    pass",
        solution: "def solution(numbers, target):\n    left, right = 0, len(numbers) - 1\n    while left < right:\n        current_sum = numbers[left] + numbers[right]\n        if current_sum == target:\n            return [left + 1, right + 1]  # 1-indexed\n        elif current_sum < target:\n            left += 1\n        else:\n            right -= 1\n    return []"
    },
    {
        id: 4,
        title: "Meeting Rooms",
        description: "Given an array of meeting time intervals where intervals[i] = [starti, endi], determine if a person could attend all meetings.\n\nExample 1:\nInput: intervals = [[0,30],[5,10],[15,20]]\nOutput: false\n\nExample 2:\nInput: intervals = [[7,10],[2,4]]\nOutput: true",
        starterCode: "def solution(intervals):\n    # Your code here\n    pass",
        solution: "def solution(intervals):\n    intervals.sort(key=lambda x: x[0])\n    for i in range(1, len(intervals)):\n        if intervals[i][0] < intervals[i-1][1]:\n            return False\n    return True"
    },
    {
        id: 5,
        title: "Intersection of Three Sorted Arrays",
        description: "Given three integer arrays arr1, arr2 and arr3 sorted in strictly increasing order, return a sorted array of only the integers that appeared in all three arrays.\n\nExample 1:\nInput: arr1 = [1,2,3,4,5], arr2 = [1,2,5,7,9], arr3 = [1,3,4,5,8]\nOutput: [1,5]",
        starterCode: "def solution(arr1, arr2, arr3):\n    # Your code here\n    pass",
        solution: "def solution(arr1, arr2, arr3):\n    i = j = k = 0\n    result = []\n    \n    while i < len(arr1) and j < len(arr2) and k < len(arr3):\n        if arr1[i] == arr2[j] == arr3[k]:\n            result.append(arr1[i])\n            i += 1\n            j += 1\n            k += 1\n        elif arr1[i] < arr2[j]:\n            i += 1\n        elif arr2[j] < arr3[k]:\n            j += 1\n        else:\n            k += 1\n            \n    return result"
    },
    {
        id: 6,
        title: "Intersection of Two Arrays",
        description: "Given two integer arrays nums1 and nums2, return an array of their intersection. Each element in the result must be unique and you may return the result in any order.\n\nExample 1:\nInput: nums1 = [1,2,2,1], nums2 = [2,2]\nOutput: [2]",
        starterCode: "def solution(nums1, nums2):\n    # Your code here\n    pass",
        solution: "def solution(nums1, nums2):\n    return list(set(nums1) & set(nums2))"
    },
    {
        id: 7,
        title: "Merge Sorted Array",
        description: "You are given two integer arrays nums1 and nums2, sorted in non-decreasing order, and two integers m and n, representing the number of elements in nums1 and nums2 respectively.\n\nMerge nums1 and nums2 into a single array sorted in non-decreasing order.\n\nExample 1:\nInput: nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3\nOutput: [1,2,2,3,5,6]",
        starterCode: "def solution(nums1, m, nums2, n):\n    # Your code here\n    pass",
        solution: "def solution(nums1, m, nums2, n):\n    p1 = m - 1\n    p2 = n - 1\n    p = m + n - 1\n    \n    while p1 >= 0 and p2 >= 0:\n        if nums1[p1] > nums2[p2]:\n            nums1[p] = nums1[p1]\n            p1 -= 1\n        else:\n            nums1[p] = nums2[p2]\n            p2 -= 1\n        p -= 1\n    \n    nums1[:p2 + 1] = nums2[:p2 + 1]\n    return nums1"
    },
    {
        id: 8,
        title: "Kth Largest Element in an Array",
        description: "Given an integer array nums and an integer k, return the kth largest element in the array.\n\nExample 1:\nInput: nums = [3,2,1,5,6,4], k = 2\nOutput: 5",
        starterCode: "def solution(nums, k):\n    # Your code here\n    pass",
        solution: "def solution(nums, k):\n    return sorted(nums, reverse=True)[k-1]"
    },
    {
        id: 9,
        title: "K Closest Points to Origin",
        description: "Given an array of points where points[i] = [xi, yi] represents a point on the X-Y plane and an integer k, return the k closest points to the origin (0, 0).\n\nExample 1:\nInput: points = [[1,3],[-2,2]], k = 1\nOutput: [[-2,2]]",
        starterCode: "def solution(points, k):\n    # Your code here\n    pass",
        solution: "def solution(points, k):\n    return sorted(points, key=lambda p: p[0]**2 + p[1]**2)[:k]"
    },
    {
        id: 10,
        title: "Top K Frequent Elements",
        description: "Given an integer array nums and an integer k, return the k most frequent elements. You may return the answer in any order.\n\nExample 1:\nInput: nums = [1,1,1,2,2,3], k = 2\nOutput: [1,2]",
        starterCode: "def solution(nums, k):\n    # Your code here\n    pass",
        solution: "def solution(nums, k):\n    from collections import Counter\n    counter = Counter(nums)\n    return [item for item, count in counter.most_common(k)]"
    },
    {
        id: 11,
        title: "Sort Colors",
        description: "Given an array nums with n objects colored red, white, or blue, sort them in-place so that objects of the same color are adjacent.\n\nWe will use the integers 0, 1, and 2 to represent the color red, white, and blue, respectively.\n\nExample 1:\nInput: nums = [2,0,2,1,1,0]\nOutput: [0,0,1,1,2,2]",
        starterCode: "def solution(nums):\n    # Your code here\n    pass",
        solution: "def solution(nums):\n    left, mid, right = 0, 0, len(nums) - 1\n    \n    while mid <= right:\n        if nums[mid] == 0:\n            nums[left], nums[mid] = nums[mid], nums[left]\n            left += 1\n            mid += 1\n        elif nums[mid] == 1:\n            mid += 1\n        else:  # nums[mid] == 2\n            nums[mid], nums[right] = nums[right], nums[mid]\n            right -= 1\n    \n    return nums"
    }
];

// Generate placeholder questions for the remaining slots (12-50)
for (let i = 12; i <= 50; i++) {
    questionData.push({
        id: i,
        title: `Placeholder Question ${i}`,
        description: "This question will be added in a future update.",
        starterCode: "def solution():\n    # Placeholder\n    pass",
        solution: "def solution():\n    return 'placeholder'",
        isPlaceholder: true
    });
} 