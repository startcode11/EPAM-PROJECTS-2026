# Problem 2 - Maximum Learning Points

## Approach
Use dynamic programming. For each topic, either skip it or take it and skip the previous topic.

`dp[i] = max(dp[i-1], dp[i-2] + points[i])`

Only the previous two DP values are stored.

## Complexity
- Time: `O(N)`
- Space: `O(1)`

## Language
C++17

