# 🗺️ DSA Patterns Map — One-Page Overview

A quick reference for recognizing which pattern applies to which problem type. **Use this to identify patterns, then deep-dive only when you encounter them.**

---

## 🎯 Pattern Recognition Flowchart

```
Is the input SORTED or can be SORTED?
├── Yes → Binary Search, Two Pointers, or Merge technique
└── No ↓

Is it about SUBARRAY/SUBSTRING?
├── Yes → Sliding Window or Prefix Sum
└── No ↓

Is it about finding PAIRS or TRIPLETS?
├── Yes → Two Pointers (sorted) or HashMap (unsorted)
└── No ↓

Is it about TREE or GRAPH traversal?
├── Yes → BFS (shortest path, level-order) or DFS (all paths, backtracking)
└── No ↓

Is there OVERLAPPING SUBPROBLEMS?
├── Yes → Dynamic Programming
└── No ↓

Is it about INTERVALS?
├── Yes → Sorting + Greedy or Merge Intervals
└── No ↓

Is it about TOP K or STREAMING data?
├── Yes → Heap (Priority Queue)
└── No ↓

Is it about CONNECTED COMPONENTS?
├── Yes → Union-Find (DSU) or DFS/BFS
└── No → Consider Backtracking, Greedy, or Simulation
```

---

## 📋 Pattern Quick Reference

### 1. 🎯 Two Pointers

**When to use:**
- Sorted array/string
- Finding pairs with sum/difference
- Removing duplicates
- Palindrome checking
- Container problems

**Template:**
```
left = 0, right = n-1
while left < right:
    process based on arr[left] + arr[right]
    move left++ or right-- based on condition
```

**Classic Problems:** Two Sum II, 3Sum, Container With Most Water, Valid Palindrome

---

### 2. 🪟 Sliding Window

**When to use:**
- Contiguous subarray/substring
- "Maximum/minimum of size k"
- "Longest/shortest with condition"
- String anagram/permutation matching

**Template:**
```
left = 0
for right in range(n):
    expand: add arr[right] to window
    while window invalid:
        shrink: remove arr[left], left++
    update answer
```

**Classic Problems:** Maximum Sum Subarray of Size K, Longest Substring Without Repeating Characters, Minimum Window Substring

---

### 3. 🔍 Binary Search

**When to use:**
- Sorted array
- "Find position" or "find boundary"
- Search space can be halved
- "Minimum/maximum that satisfies condition"

**Template:**
```
left, right = 0, n-1
while left <= right:
    mid = left + (right - left) // 2
    if condition(mid):
        answer = mid
        adjust left or right
    else:
        adjust opposite
```

**Variations:**
- Find exact value
- Find leftmost/rightmost occurrence
- Binary search on answer (min/max satisfying condition)

**Classic Problems:** Search in Rotated Sorted Array, Find Peak Element, Koko Eating Bananas

---

### 4. 🌊 BFS (Breadth-First Search)

**When to use:**
- Shortest path in unweighted graph
- Level-order traversal
- "Minimum steps to reach"
- Spreading problems (rotting oranges, infection)

**Template:**
```
queue = [start]
visited = {start}
level = 0
while queue:
    for _ in range(len(queue)):
        node = queue.pop(0)
        if node == target: return level
        for neighbor in neighbors(node):
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)
    level++
```

**Classic Problems:** Binary Tree Level Order, Shortest Path in Binary Matrix, Rotting Oranges, Word Ladder

---

### 5. 🌲 DFS (Depth-First Search)

**When to use:**
- All paths/combinations
- Tree traversals (pre/in/post order)
- Backtracking problems
- Connected components
- Cycle detection

**Template:**
```
def dfs(node, state):
    if base_case: return result
    if invalid: return
    
    mark visited
    for neighbor in neighbors:
        dfs(neighbor, new_state)
    unmark visited (if backtracking)
```

**Classic Problems:** Path Sum, Number of Islands, Permutations, Combination Sum, Word Search

---

### 6. 📊 Dynamic Programming

**When to use:**
- Optimal substructure (optimal solution from optimal sub-solutions)
- Overlapping subproblems
- "Count ways", "min/max", "is possible"
- Sequences, strings, grids

**Approach:**
1. Define state: `dp[i] = answer for subproblem i`
2. Find recurrence: `dp[i] = f(dp[i-1], dp[i-2], ...)`
3. Identify base cases
4. Determine order of computation

**Common Patterns:**
| Pattern | State | Example |
|---------|-------|---------|
| Linear | `dp[i]` | Climbing Stairs, House Robber |
| Two Strings | `dp[i][j]` | Edit Distance, LCS |
| Interval | `dp[i][j]` = subarray [i,j] | Matrix Chain, Palindrome Partitioning |
| Knapsack | `dp[i][w]` = items 0..i, capacity w | 0/1 Knapsack, Coin Change |
| Bitmask | `dp[mask]` | TSP, Assign Tasks |

**Classic Problems:** Fibonacci, Climbing Stairs, Longest Increasing Subsequence, Coin Change, Edit Distance, Longest Common Subsequence

---

### 7. ⛰️ Heap / Priority Queue

**When to use:**
- "K largest/smallest"
- "Median" in stream
- Merge K sorted lists
- Task scheduling
- Dijkstra's algorithm

**Key Insight:**
- Min-heap for "K largest" (keep K largest, pop smallest)
- Max-heap for "K smallest" (keep K smallest, pop largest)

**Classic Problems:** Kth Largest Element, Top K Frequent Elements, Merge K Sorted Lists, Find Median from Data Stream

---

### 8. 🔗 Union-Find (Disjoint Set Union)

**When to use:**
- Connected components
- "Are X and Y connected?"
- Cycle detection in undirected graph
- Kruskal's MST

**Template:**
```
parent[i] = i initially
def find(x):
    if parent[x] != x:
        parent[x] = find(parent[x])  # Path compression
    return parent[x]

def union(x, y):
    px, py = find(x), find(y)
    if px != py:
        parent[px] = py  # (Add rank optimization for efficiency)
```

**Classic Problems:** Number of Connected Components, Redundant Connection, Accounts Merge

---

### 9. 🌳 Tree-Specific Patterns

**Traversals:**
| Type | Order | Use Case |
|------|-------|----------|
| Pre-order | Root → Left → Right | Copy tree, serialize |
| In-order | Left → Root → Right | BST sorted order |
| Post-order | Left → Right → Root | Delete tree, calculate size |
| Level-order | BFS | Level-by-level processing |

**Common Techniques:**
- **Recursion:** Most tree problems
- **Parent pointer:** Find ancestors, LCA
- **Morris traversal:** O(1) space traversal
- **Iterative with stack:** Convert recursive to iterative

**Classic Problems:** Max Depth, Diameter, LCA, Validate BST, Serialize/Deserialize

---

### 10. 📊 Graph Algorithms

| Algorithm | Use Case | Complexity |
|-----------|----------|------------|
| BFS | Shortest path (unweighted) | O(V + E) |
| DFS | All paths, connectivity | O(V + E) |
| Dijkstra | Shortest path (weighted, non-negative) | O((V + E) log V) |
| Bellman-Ford | Shortest path (negative edges) | O(V × E) |
| Floyd-Warshall | All pairs shortest path | O(V³) |
| Topological Sort | Task ordering (DAG) | O(V + E) |
| Kruskal/Prim | Minimum Spanning Tree | O(E log E) |

---

### 11. 🎒 Greedy

**When to use:**
- Local optimal leads to global optimal
- Interval scheduling
- Huffman coding type problems
- Often involves sorting first

**Validation:** Can you prove that greedy choice doesn't eliminate optimal solution?

**Classic Problems:** Activity Selection, Jump Game, Gas Station, Meeting Rooms

---

### 12. ↩️ Backtracking

**When to use:**
- Generate all combinations/permutations
- Constraint satisfaction (Sudoku, N-Queens)
- Path finding with constraints

**Template:**
```
def backtrack(path, choices):
    if goal_reached:
        add path to result
        return
    
    for choice in choices:
        if valid(choice):
            make choice
            backtrack(path + choice, remaining_choices)
            undo choice  # Backtrack
```

**Classic Problems:** Permutations, Subsets, N-Queens, Sudoku Solver, Word Search

---

## 🔗 Pattern Combinations

Real problems often combine patterns:

| Combination | Example |
|-------------|---------|
| BFS + DP | Shortest path with state |
| Binary Search + Greedy | Min max problems |
| Sliding Window + HashMap | Substring problems |
| DFS + Memoization | Tree DP, Grid DP |
| Heap + Two Pointers | Merge K sorted |
| Union-Find + Sorting | Kruskal's MST |

---

## 📈 Learning Priority (For Prax)

Based on your current level (2/10) and interview frequency:

### Phase 1: Foundation (Week 1-4)
1. ✅ Two Pointers
2. ✅ Sliding Window
3. ✅ Binary Search
4. ✅ BFS/DFS basics

### Phase 2: Core (Week 5-10)
5. ⬜ Trees (all traversals, common problems)
6. ⬜ Graphs (BFS/DFS applications)
7. ⬜ Heap/Priority Queue
8. ⬜ Basic DP (linear, 1D)

### Phase 3: Advanced (Week 11-20)
9. ⬜ Advanced DP (2D, intervals)
10. ⬜ Union-Find
11. ⬜ Backtracking
12. ⬜ Greedy with proofs

### Phase 4: Specialized (Week 21+)
13. ⬜ Segment Trees
14. ⬜ Tries
15. ⬜ Advanced Graph (Dijkstra, Topological Sort)

---

*Don't memorize this map. Use it to IDENTIFY patterns when you encounter problems. Deep understanding comes from solving, not reading.*
