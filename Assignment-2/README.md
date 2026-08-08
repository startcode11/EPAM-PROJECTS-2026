# Assignment 2 - Tree & Graph

This repository contains solutions for the two problems provided in Assignment 2.

## Repository Structure

```text
Assignment-2-Tree-Graph/
â”œâ”€â”€ README.md
â”œâ”€â”€ Problem-1-Tree-of-Trusted-Servers/
â”‚   â”œâ”€â”€ README.md
â”‚   â””â”€â”€ solution.cpp
â””â”€â”€ Problem-2-Emergency-Route-Validation/
    â”œâ”€â”€ README.md
    â””â”€â”€ solution.cpp
```

## Problems

### Problem 1 - Tree of Trusted Servers

The problem gives a tree of servers rooted at Server 1. Each server has an integer security key. For every server, the XOR of all keys on the path from Server 1 to that server is calculated. A server is counted as trusted when this path XOR is greater than or equal to `K`.

**Approach:** Depth First Search (DFS) while carrying the XOR value accumulated from the root.

**Complexity:**
- Time: `O(N)`
- Space: `O(N)`

### Problem 2 - Emergency Route Validation

The problem gives a connected undirected graph. A city is efficiently reachable when its shortest path from City 1 uses at most `D` roads.

**Approach:** Breadth First Search (BFS), because every road has equal cost. BFS calculates the minimum number of edges from City 1 to every reachable city.

**Complexity:**
- Time: `O(N + M)`
- Space: `O(N + M)`

## Language

C++17


