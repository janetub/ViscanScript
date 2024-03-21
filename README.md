# ViscanScript

This project centers on the development of a web-based solution designed to enhance and streamline the thesis submission for binding procedures at the VSU Library. The current process faces challenges such as an inefficient queueing system, manual entry of details, manual receipt creation, and the need for manual retrieval of softcopies in pile of emails. Through this initiative, the project seeks to tackle these issues, ultimately improving the overall efficiency of material submission and automating the receipt generation process.

---

| Internal Release Code | Version     | Date Released          |
|-----------------------|-------------|------------------------|
| VB.000.000            | v0.0.1      | 2024-02-06 19:30:00    |
| VB.001.000            | v0.1.0      | 2024-02-12 14:49:00    |
| VB.026.001            | v2.6.1      | 2024-03-04 12:10:00    |
| VB.029.000            | v2.9.0      | 2024-03-21 17:05:00    |

---

## VB.000.000 Release Notes

1. Newly created Github repository
2. Github Commits (Total of 16) mainly:
   - Information added in README file (Finished)
   - Integration of folder named: Design Specification
   - Updated markdown files within the folder: Design Specification

##  VB.001.000 Release Notes
**Major changes**

   - Set up Firebase and added a collection to store eligible IDs for account creation and a separate collection for users
   - Implemented a sign-in button for login and signup functionality
   - Created a navigation bar with links to different pages and the login/signup button
   - Integrated Google Sign-In for authentication during both login and signup processes
   - Connected Google Sign-In to Firebase collections for account validation and authentication
   - Designed a three-panel canvas for the web app dashboard page, including an app logo in the header
   - Developed a registration form for staff members to gain access to the library staff dashboard

##  VB.026.001 Release Notes
**Major changes**

1. Unique ID Tracking:
   Added a unique numeric ID tracker module.
2. Document Management and Retrieval:
   Implemented a module for retrieving collections and creating documents.
3. User Interface and Authentication Enhancements:
   Created and initialized dashboard components.
   Linked authentication logic to the new user interface design.
   Improved SignIn functionality, handling failed sign-in attempts and persisting warning messages across page reloads.
   Enhanced authentication mechanisms for distinct user roles.
4. Code Organization and Bug Fixes:
   Migrated non-page files outside the app directory.
   Fixed a bug in page navigation, correcting the page index and revising file naming.
5. Library Staff Dashboard Features:
   Added search, navigation, and sorting features to the library staff dashboard.
6. Data Management and Firebase Integration:
   Added a loading indicator during data fetching from Firebase.
   Centralized bindings in Firestore

##  VB.029.000 Release Notes
**Major changes**

- Implementation of Binding Request and Submission Form
-  Email Authentication Enhancement:
   - The system exclusively accepts VSU email addresses during sign-in.
- Enhance Asset Integrity and Implement Tab Bindings:
   - Implemented the binding of tabs and filters. The active tab now determines the filters applied. These tabs represent order statuses, allowing for efficient status filtering.
- Enhance user interface and access control:
   - Adjusted dashboard visibility. The dashboard now renders conditionally based on user authentication status.
   - Added loading indicator. A loading page indicator is now displayed while the dashboard is loading.
   - Refined hint and warning messages.
- Add preloader and restructure project for local asset hosting

---

## Important Links
- Github Repository: [https://github.com/janetub/ViscanScript](https://github.com/janetub/ViscanScript)
