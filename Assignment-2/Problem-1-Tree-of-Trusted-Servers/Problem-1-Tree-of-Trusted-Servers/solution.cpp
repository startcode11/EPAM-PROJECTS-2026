#include <iostream>
#include <vector>
using namespace std;

int n;
long long k;
vector<long long> key;
vector<vector<int>> graph;
int trustedServers = 0;

void dfs(int node, int parent, long long pathXor) {
    long long currentXor = pathXor ^ key[node];

    if (currentXor >= k) {
        ++trustedServers;
    }

    for (int neighbor : graph[node]) {
        if (neighbor != parent) {
            dfs(neighbor, node, currentXor);
        }
    }
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    cin >> n >> k;

    key.resize(n + 1);
    graph.resize(n + 1);

    for (int i = 1; i <= n; ++i) {
        cin >> key[i];
    }

    for (int i = 0; i < n - 1; ++i) {
        int u, v;
        cin >> u >> v;
        graph[u].push_back(v);
        graph[v].push_back(u);
    }

    dfs(1, 0, 0);

    cout << trustedServers << '\n';
    return 0;
}

