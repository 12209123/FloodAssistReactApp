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

The app will be available at the given link in console.

+++

