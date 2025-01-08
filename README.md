# Flood Assist

A **React based Emergency Management Application** that allows users to create, manage, and interact with emergencies. Users can register for emergencies, filter them by priority and type, and dynamically view them on a map. Users can earn coupons as rewards for their contributions, integrating gamification elements to enhance engagement and user experience.

---

- ## Features

  - **Dynamic Map with Leaflet**:

    - Display emergencies as markers on an interactive map.
    - Different marker icons for registered/owned emergencies.

  - **Emergency Filtering**:

    - Filter by **priority**: High, Medium, Low.
    - Filter by **type**: Official, Unofficial.

  - **Emergency Creation**:

    - Create new emergencies by selecting a position on the map.
    - Automatically register as the owner of newly created emergencies.

  - **Global State Management**:

    - Track the current registered emergency and ownership globally.

  - **Coupon Management**:

    - View and manage your available coupons in the **Coupons** section.
    - Coupons display details such as discounts, expiration dates, and participating stores.
    - Redeem coupons with a countdown timer after initiating redemption.

  - **Distribute Coupons When Closing Emergencies**:

    - Emergency owners can select users to receive coupons when closing an emergency.
    - The coupons are then distributed to the selected users.

  - **Responsive UI**:
    - Filter popup for priorities and types.
    - Toast notifications for feedback (e.g., closing emergencies).
    - Interactive coupon details and redemption process.

---

## File Structure

### Root Directory

- **`App.tsx`**

  - Entry point of the application.
  - Defines routing for all pages and serves as the main component connecting the app's structure.

- **`App.css`**

  - Global CSS for styling the application.

- **`CustomNavbar.tsx`**

  - A reusable navigation bar component used across the app.
  - Includes links to different pages (e.g., Discover, Coupons, Account).

- **`globalRegistrationStore.ts`**
  - Manages global state for the user's current registered emergency and user ID.
  - Acts as a centralized store to track global interactions.

---

### Data Directory (`/data`)

- **`emergencies.ts`**
  - Mock data structure for emergencies.
  - Stores static emergency data (e.g., priority, type, position, owner) and serves as the application's data source.

---

### Pages Directory (`/pages`)

Each file in the `pages/` directory represents a route in the application:

- **`Account.tsx`**

  - Displays user account information and settings.

- **`CouponDetail.tsx`**

  - Provides detailed information about a selected coupon, including a redemption timer and participating stores.

- **`Coupons.tsx`**

  - Lists all available coupons with details like description and expiration date.

- **`CreateTask.tsx`**

  - Form to create a new emergency.
  - Allows users to select a position on the map and input emergency details (e.g., title, priority).

- **`CurrentTask.tsx`**

  - Displays the user's currently registered emergency, including its details.

- **`Discover.tsx`**

  - The main map view of the application, built with React Leaflet.
  - Displays all emergencies as markers and includes filtering options for priority and type.

- **`Emergency.tsx`**

  - Provides detailed information about a specific emergency when selected.
  - Allows users to register or close emergencies (for owners).

- **`Settings.tsx`**
  - A placeholder page for app settings and customization options.

---

### Summary of File Purposes

1. **Routing and Entry Point**:

   - `App.tsx`: Connects and routes all pages in the app.

2. **Global State and Data**:

   - `globalRegistrationStore.ts`: Centralized store for tracking global app state.
   - `emergencies.ts`: Mock data source for emergency information.

3. **UI Components**:

   - `CustomNavbar.tsx`: Handles navigation across pages.

4. **Pages**:

   - Each file in `pages/` corresponds to a specific route or feature (e.g., map, coupons, tasks).

5. **Styling**:
   - `App.css`: Global styling for consistent design.

---

## How to Use

### 1. Clone the Repository

```bash
git clone https://github.com/12209123/FloodAssistReactApp
cd FloodAssistReactApp
```

### 2. Install Dependencies

Make sure you have Node.js installed, then install the required packages:

```bash
npm install
```

### 3. Run the App Locally

Start the development server:

```bash
npm run dev
```

## The app will be available at the given link in console.
