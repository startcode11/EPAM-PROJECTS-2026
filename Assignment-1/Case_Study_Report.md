# Case Study Report: Developing a Bank Customer Page Using JavaScript

## 1. Title
Developing a Bank Customer Dashboard Using HTML, CSS and JavaScript

## 2. Aim
To design and develop an interactive web-based bank customer dashboard that allows a user to view account details, deposit and withdraw money, and track transaction history, using only client-side web technologies.

## 3. Introduction
JavaScript is the programming language that runs in the browser and makes a webpage interactive instead of just static text and images. Without it, a webpage can only display information — with JavaScript, it can respond to what the user does: clicking a button, typing into a field, or searching for something.

For this project, JavaScript is useful because a bank dashboard isn't just something you look at — it's something you interact with. You deposit money, you withdraw money, you search your past transactions. All of that logic (checking if an entered amount is valid, updating the balance, saving data so it doesn't disappear on refresh) has to happen somewhere, and that's what the JavaScript file in this project does.

## 4. Problem Statement
Most learning projects for JavaScript are either too simple (a to-do list) or require a backend that a beginner can't easily set up. There's a need for a project that is complex enough to use real JavaScript concepts — arrays, objects, DOM manipulation, validation, Local Storage — while still being something that runs by just opening a file in a browser.

## 5. Objectives
- Build a working front-end simulation of a bank account dashboard
- Practice DOM manipulation and event handling
- Implement input validation without using `alert()`
- Use Local Storage to persist data across page reloads
- Apply responsive design principles using Flexbox/Grid

## 6. Software Requirements
- Any modern web browser (Chrome, Firefox, Edge)
- A code editor (VS Code was used for this project)
- No server or database software required

## 7. Hardware Requirements
- A basic laptop/desktop capable of running a browser
- No specific hardware requirements beyond that

## 8. Functional Requirements
- The system must display customer profile details
- The system must allow deposit and withdrawal operations
- The system must validate all monetary inputs
- The system must maintain a transaction history
- The system must allow searching and filtering of transactions
- The system must support a dark mode toggle

## 9. Non-Functional Requirements
- The interface should be responsive across screen sizes
- The application should load and respond quickly (no backend calls)
- The code should be readable and organized into functions
- Data should persist between sessions using Local Storage

## 10. System Design
The project follows a simple three-layer structure on the front end:
- **HTML** — structure/layout of the page
- **CSS** — visual styling and responsiveness
- **JavaScript** — application logic, state management, and DOM updates

There is no backend or database. All "account" data is stored in a JavaScript object and array, and persisted to the browser's Local Storage so it survives a page refresh.

## 11. Flowchart (ASCII)
```
        [ Page Loads ]
               |
      [ Load Data from
       Local Storage ]
               |
     [ Display Customer +
       Dashboard Values ]
               |
        [ User Action? ]
        /       |       \
   Deposit   Withdraw   Search/Filter
      |          |             |
 [Validate]  [Validate +   [Filter/Search
  Amount]    Check Balance]  Transaction List]
      |          |             |
  [Update     [Update       [Re-render
  Balance +   Balance +      Transaction
  Save]       Save]          List]
      \          |            /
       \         |           /
        [ Re-render Dashboard
          and Transaction List ]
```

## 12. Algorithm
**Deposit Algorithm**
1. Read the value from the deposit input field.
2. Validate: not empty, is a number, greater than zero.
3. If invalid, show an error message and stop.
4. If valid, add the amount to the balance and to total deposits.
5. Create a transaction record with date, time, type, amount, and updated balance.
6. Add the transaction to the top of the transactions array.
7. Re-render the dashboard cards and transaction list.
8. Save the updated state to Local Storage.

**Withdraw Algorithm**
1. Read the value from the withdraw input field.
2. Validate: not empty, is a number, greater than zero.
3. Check that the amount does not exceed the current balance.
4. If any check fails, show an error message and stop.
5. If valid, subtract the amount from the balance and add it to total withdrawals.
6. Create a transaction record and add it to the top of the list.
7. Re-render the dashboard and save to Local Storage.

## 13. Project Explanation
The page loads with a hardcoded sample customer (name, account number, IFSC, etc.) since there's no backend to fetch real data from. On load, the script checks Local Storage for any previously saved balance/transactions and restores them — this is what allows the dashboard to "remember" your deposits and withdrawals even after you close and reopen the page.

The deposit and withdraw sections each have their own input field and button. When clicked, the amount is validated through a shared `validateAmount()` function before anything is changed — this avoids duplicating the same checks in two places.

Every successful transaction is pushed into a `transactions` array (newest at the front, using `unshift()`), and the `renderTransactions()` function is responsible for turning that array into actual HTML on the page, applying whatever search term or filter button is currently active.

Dark mode is a simple class toggle on the `<body>` tag, with the choice saved to Local Storage so it persists across visits.

## 14. JavaScript Concepts Used
- Variables (`let`, `const`)
- Functions and arrow functions
- Objects (customer data, transaction records)
- Arrays and array methods (`filter()`, `forEach()`, `unshift()`)
- Conditional statements (`if...else`)
- DOM manipulation (`querySelector`, `querySelectorAll`, `createElement`)
- Event listeners (`click`, `input`, `keydown`)
- Template literals for building HTML dynamically
- The `Date` object for transaction timestamps
- Local Storage (`getItem`, `setItem`)
- `Number()`, `parseFloat()`, `toFixed()` for handling monetary values
- Basic input validation logic

## 15. Screens Description
- **Header** — Bank name and the dark mode toggle button.
- **Profile Section** — Displays static customer information in a card layout.
- **Dashboard Section** — Four summary cards showing balance, total deposits, total withdrawals, and transaction count, all updated live.
- **Actions Section** — Two side-by-side cards for depositing and withdrawing money, each with its own input, button, and inline error message.
- **Transactions Section** — A search bar, three filter buttons (All/Deposits/Withdrawals), and a list of transaction cards showing type, date/time, amount, and balance after the transaction.

## 16. Testing

| Test Case | Input | Expected Output | Actual Output | Status |
|---|---|---|---|---|
| Deposit valid amount | 5000 | Balance increases by 5000, transaction added | Balance increased, transaction added | Pass |
| Deposit empty input | (blank) | Error: "Please enter an amount." | Error shown correctly | Pass |
| Deposit letters | "abcd" | Error: "Please enter a valid amount." | Error shown correctly | Pass |
| Deposit negative number | -200 | Error: "Amount must be greater than zero." | Error shown correctly | Pass |
| Withdraw more than balance | 999999 | Error: "Insufficient balance..." | Error shown correctly | Pass |
| Withdraw valid amount | 1000 | Balance decreases by 1000 | Balance decreased correctly | Pass |
| Search "deposit" | "deposit" | Only deposit transactions shown | Worked as expected | Pass |
| Filter: Withdrawals | click "Withdrawals" | Only withdrawal transactions shown | Worked as expected | Pass |
| Dark mode toggle | click toggle | Theme switches and persists on reload | Worked as expected | Pass |
| Refresh page after transactions | refresh | Balance and transactions still present | Data restored from Local Storage | Pass |

## 17. Challenges Faced
- Initially got confused about why the transaction list wasn't updating — turned out `innerHTML` was being appended instead of cleared first, so old and new items kept stacking up.
- Local Storage only stores strings, so forgetting to `JSON.stringify()`/`JSON.parse()` caused a `[object Object]` bug the first time around.
- Validation logic got messy when it was duplicated between the deposit and withdraw functions — refactoring it into one shared `validateAmount()` function fixed that.
- Getting the layout to behave properly on mobile took a few tries with Flexbox and Grid, especially the dashboard cards wrapping awkwardly on smaller screens.

## 18. Future Scope
- Connecting the front end to an actual backend and database so data isn't tied to a single browser
- Adding user authentication and multiple accounts
- Adding downloadable statements (PDF/CSV)
- Adding basic analytics/charts for spending trends

## 19. Conclusion
This project helped in understanding how a webpage can go beyond just displaying information and actually behave like a small application — handling user input, validating it, updating state, and remembering that state across sessions, all without any backend. It reinforced core JavaScript concepts in a context that felt more practical than isolated exercises.

## 20. References
- MDN Web Docs — https://developer.mozilla.org/
- W3Schools — https://www.w3schools.com/js/
- JavaScript.info — https://javascript.info/
