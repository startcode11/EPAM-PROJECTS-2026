#include <iostream>
#include <vector>
#include <queue>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n, m, d;
    cin >> n >> m >> d;

    vector<vector<int>> graph(n + 1);

    for (int i = 0; i < m; ++i) {
        int u, v;
        cin >> u >> v;
        graph[u].push_back(v);
        graph[v].push_back(u);
    }

    vector<int> distance(n + 1, -1);
    queue<int> q;

    distance[1] = 0;
    q.push(1);

    while (!q.empty()) {
        int current = q.front();
        q.pop();

        for (int neighbor : graph[current]) {
            if (distance[neighbor] == -1) {
                distance[neighbor] = distance[current] + 1;
                q.push(neighbor);
            }
        }
    }

    int reachableCount = 0;

    for (int city = 1; city <= n; ++city) {
        if (distance[city] != -1 && distance[city] <= d) {
            ++reachableCount;
        }
    }

    cout << reachableCount << '\n';
    return 0;
}

