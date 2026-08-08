# Bank Customer Dashboard

## Objective
A simple front-end project that simulates a bank customer's dashboard where they can check their balance, deposit or withdraw money, and view their transaction history — all in the browser, no backend involved.

## Features
- Customer profile section (name, account number, IFSC, contact details, etc.)
- Live dashboard cards: available balance, total deposits, total withdrawals, transaction count
- Deposit and withdraw forms with input validation (no empty input, no negative numbers, no letters, balance check on withdrawal)
- Transaction history with date/time, newest first
- Search transactions by type or amount
- Filter transactions by All / Deposits / Withdrawals
- Dark mode toggle that remembers your preference (Local Storage)
- Responsive layout for desktop, tablet, and mobile

## Technologies Used
- HTML5
- CSS3 (Flexbox + Grid, no framework)
- Vanilla JavaScript (ES6)

No React, no Bootstrap, no backend — just open `index.html`.

## Folder Structure
```
BankCustomerPage/
├── index.html
├── style.css
├── script.js
├── assets/
│   └── images/
└── README.md
```

## How to Run
1. Download or clone the folder.
2. Open `index.html` directly in any modern browser (Chrome, Edge, Firefox).
3. That's it — no installation, no server needed.

## Screenshots
_(Add screenshots here once you run it locally — e.g. `assets/images/dashboard.png`)_

## Future Improvements
- Connect to a real backend/database instead of Local Storage
- Add login/authentication
- Add a "download statement" feature (PDF/CSV export)
- Add charts for spending patterns over time
- Support multiple accounts per customer

## Learning Outcomes
Working on this helped reinforce:
- DOM manipulation without a framework
- Managing application state manually with plain JS objects/arrays
- Persisting data with Local Storage
- Writing form validation without relying on browser `alert()` boxes
- Structuring CSS for responsiveness using Grid/Flexbox

## Limitations
- Data is only stored in the browser's Local Storage, so it's tied to one device/browser and isn't shared across devices.
- No real authentication — this is a UI simulation, not a production banking system.
- Amounts are stored as JS floating point numbers, so extremely precise decimal math (like real accounting systems use) isn't guaranteed.
