# Problem 1 - Tree of Trusted Servers

## Approach

The input is a tree rooted at Server 1. During DFS, maintain the XOR value of the keys from Server 1 to the current server.

For a node:

```text
currentXor = pathXor ^ key[node]
```

If `currentXor >= K`, the server is counted as trusted.

Because a tree has `N - 1` edges and every node is visited once, the solution runs in `O(N)` time.

## Input Format

```text
N K
key[1] key[2] ... key[N]
u1 v1
u2 v2
...
u(N-1) v(N-1)
```

## Output Format

Print the number of trusted servers.

## Complexity

- Time: `O(N)`
- Space: `O(N)`












