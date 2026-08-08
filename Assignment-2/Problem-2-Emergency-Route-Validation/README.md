# Problem 2 - Emergency Route Validation

## Approach

Use BFS starting from City 1.

The `distance` array stores the minimum number of roads needed to reach each city. Initially, all distances are `-1`, and:

```text
distance[1] = 0
```

For every unvisited neighbor:

```text
distance[neighbor] = distance[current] + 1
```

Finally, count every city whose distance is not `-1` and is less than or equal to `D`.

## Input Format

```text
N M D
u1 v1
u2 v2
...
uM vM
```

## Output Format

Print the number of efficiently reachable cities.

## Complexity

- Time: `O(N + M)`
- Space: `O(N + M)`


