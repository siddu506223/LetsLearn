# 🐘 Data Persistence & Admin Features Documentation

## Data Persistence - CONFIRMED ✅

All user data, parent data, and progress data are **permanently persisted** across application restarts and deployments.

### Storage Details

**Location:** `/data` directory in the project root

**Files:**
- **`users.json`** - All student and user accounts
  - Fields: id, firstName, lastName, email, password (hashed), grade, role, createdAt
  - Persists: User registration, grade assignments, account info

- **`parents.json`** - All parent accounts  
  - Fields: id, firstName, lastName, email, password (hashed), grade, createdAt
  - Persists: Parent registration, grade assignments

- **`progress.json`** - Student quiz progress and points
  - Fields: userId → {totalGamesPlayed, totalPointsEarned, quizzesTaken, lastUpdated, minigames}
  - Persists: Quiz scores, points earned, game history

### Persistence Mechanism

1. **File-Based Storage**: Uses Node.js `fs` module to write JSON to disk
2. **Module**: `src/database-persistent.js` handles all CRUD operations
3. **Automatic Saving**: Every insert, update, delete operation writes to disk immediately
4. **Render Deployment**: Persistent volumes configured to keep `/data` folder across redeploys

### Key Functions

```javascript
// Database module provides:
db.insertUser()          // Create new student account
db.selectUserById()      // Retrieve user by ID
db.updateUser()          // Update user properties
db.getAllUsers()         // Get all students
db.deleteUser()          // Remove student account
db.updateUserGrade()     // Update student grade (NEW)

db.getAllParents()       // Get all parents
db.updateParentGrade()   // Update parent grade (NEW)

db.updateProgress()      // Save quiz progress
db.getLeaderboard()      // Fetch rankings
```

### Data Flow

```
User Registration → Stored in users.json
         ↓
Quiz Taken → Progress saved to progress.json
         ↓
Admin Edit Grade → Updated in users.json/parents.json
         ↓
App Restart/Redeploy → Data persists from disk
```

**Result:** Once a user registers, they will ALWAYS be able to log back in with their account, and all their progress/scores are permanently saved.

---

## New Admin Features (Just Added!)

### 1. Edit User Grades ✅
**Endpoint:** `POST /api/admin/edit-user-grade`
**Location:** Admin Panel → Users Tab → Edit Button

**Features:**
- Click Edit button next to any student
- Modal form appears with current grade
- Dropdown to select new grade (K-12)
- Save updates grade immediately in database
- List automatically refreshes

**Example:**
```
Change: John Doe from "2nd grade" → "3rd grade"
```

### 2. Edit Parent Grades ✅
**Endpoint:** `POST /api/admin/edit-parent-grade`
**Location:** Admin Panel → Parents Tab → Edit Button

**Features:**
- New "Parents" tab in admin panel
- View all registered parents with their info
- Click Edit for each parent to change grade
- Modal form with grade dropdown
- Changes persist immediately

**Example:**
```
Change: Jane Smith (parent) from "1st grade" → "3rd grade"
```

### 3. Parent Management ✅
**Endpoint:** `GET /api/admin/parents`
**Location:** Admin Panel → New "Parents" Tab

**Features:**
- Dedicated Parents section in admin panel
- Table displays: ID, First Name, Email, Grade
- Refresh button to reload parent list
- Edit button for each parent
- View all registered parents at once

### 4. Tab Navigation ✅
Admin panel now has two tabs:
- **👥 Users Tab** - Manage student grades and delete students
- **👨‍👩‍👧 Parents Tab** - Manage parent grades and view parent information

---

## Security (Localhost Only) 🔒

All admin endpoints include security checks:
- Only accessible from `localhost` (127.0.0.1)
- Cannot be accessed from remote/production URLs
- On Render, only accessible from the app's own internal requests
- External users cannot access admin functions

---

## Recent Changes (Just Deployed)

**Commit:** `745ce3f`
**Deployed to:** GitHub (auto-deploying to Render)

**Changes:**
1. ✅ Added `updateUserGrade()` function to database
2. ✅ Added `updateParentGrade()` function to database  
3. ✅ Added `getAllParents()` function to database
4. ✅ Added `/api/admin/edit-user-grade` endpoint
5. ✅ Added `/api/admin/edit-parent-grade` endpoint
6. ✅ Added `/api/admin/parents` endpoint
7. ✅ Updated admin panel HTML with tabs and modals
8. ✅ Added 130+ lines of admin JavaScript functions
9. ✅ Added edit forms and parent management UI

---

## How to Use Admin Features

### From Your Computer (Localhost)

1. **Open the app:** `http://localhost:3001`
2. **Login** with any student or parent account
3. **Click Admin Panel** button (⚙️) on dashboard
4. **Switch tabs:**
   - **Users Tab:** Edit student grades or delete students
   - **Parents Tab:** Edit parent grades or view parents
5. **Click Edit Button** to modify grade
6. **Select new grade** from dropdown
7. **Click Save** to update

### Important Notes

- Admin features ONLY work from `localhost`
- They're disabled on production (Render) for security
- If you want admin access on production, contact support
- All changes are immediately saved to database files
- Data persists across app restarts and redeploys

---

## Architecture Overview

```
┌─────────────────────────────────────┐
│   Admin Panel (index.html)          │
│  - User Tab with Edit Buttons       │
│  - Parent Tab with Edit Buttons     │
│  - Modal forms for editing          │
└──────────────┬──────────────────────┘
               │
               ↓
┌─────────────────────────────────────┐
│   API Endpoints (server.js)         │
│  - GET /api/admin/users             │
│  - POST /api/admin/edit-user-grade  │
│  - GET /api/admin/parents           │
│  - POST /api/admin/edit-parent-grade│
└──────────────┬──────────────────────┘
               │
               ↓
┌─────────────────────────────────────┐
│   Database (database-persistent.js) │
│  - updateUserGrade()                │
│  - updateParentGrade()              │
│  - getAllUsers()                    │
│  - getAllParents()                  │
└──────────────┬──────────────────────┘
               │
               ↓
┌─────────────────────────────────────┐
│   JSON Files (/data/)               │
│  - users.json (student data)        │
│  - parents.json (parent data)       │
│  - progress.json (quiz progress)    │
└─────────────────────────────────────┘
```

---

## Summary

✅ **Data Persistence:** All user, parent, and progress data persists permanently  
✅ **Admin Edit Feature:** Can edit student and parent grades  
✅ **Parent Management:** View and manage all registered parents  
✅ **Security:** Localhost-only access prevents unauthorized changes  
✅ **Auto-Deployment:** Changes automatically deploy to Render production  

**Your app is production-ready with full data persistence and comprehensive admin features!**
