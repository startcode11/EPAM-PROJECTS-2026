#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n;
    cin >> n;

    vector<long long> points(n);
    for (int i = 0; i < n; ++i) {
        cin >> points[i];
    }

    if (n == 1) {
        cout << points[0] << '\n';
        return 0;
    }

    long long previousTwo = 0;
    long long previousOne = points[0];

    for (int i = 1; i < n; ++i) {
        long long takeCurrent = previousTwo + points[i];
        long long skipCurrent = previousOne;
        long long current = max(takeCurrent, skipCurrent);

        previousTwo = previousOne;
        previousOne = current;
    }

    cout << previousOne << '\n';
    return 0;
}

