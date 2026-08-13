#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n;
    long long budget;
    cin >> n >> budget;

    vector<int> scholarship(n);
    for (int i = 0; i < n; ++i) {
        cin >> scholarship[i];
    }

    sort(scholarship.begin(), scholarship.end());

    int selectedStudents = 0;

    for (int amount : scholarship) {
        if (budget >= amount) {
            budget -= amount;
            ++selectedStudents;
        } else {
            break;
        }
    }

    cout << selectedStudents << '\n';
    return 0;
}
