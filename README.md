<<<<<<< HEAD
<<<<<<< HEAD
# BloodBankAIFrontend

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.0.4.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
=======
# 🩸 BloodBridge – Blood Bank Management System (Frontend)

BloodBridge is a real-time blood bank management frontend application built with **Angular**.  
It provides role-based dashboards for **Admin**, **Hospital**, and **Donor**, enabling seamless blood requests, approvals, and inventory tracking.

---

## 🚀 Features

### 🏥 Hospital Dashboard
- Request blood units for patients
- View request status (Pending / Approved / Partial / Rejected)
- Real-time updates when admin takes action
- Clean and user-friendly request form

### 🛡️ Admin Dashboard
- View all hospital blood requests in real time
- Approve, partially approve, or reject requests based on inventory
- Manage donor requests
- Visual blood inventory overview
- Role-based secure access

### 🧑‍🤝‍🧑 Donor Dashboard
- Submit blood donation requests
- View donation history
- Track approval status

---

## 🔄 Project Flow

### 1️⃣ Authentication & Role Selection
- User logs in as **Admin**, **Hospital**, or **Donor**
- Dashboard loads based on role

### 2️⃣ Hospital → Admin Flow
- Hospital submits a blood request
- Request instantly appears on Admin Dashboard
- Admin checks inventory
- Admin approves / partially approves / rejects
- Status updates in real time on Hospital Dashboard

### 3️⃣ Donor → Admin Flow
- Donor sends donation request
- Admin approves or rejects
- Approved donations update inventory

### 4️⃣ Inventory Management
- Inventory updates automatically after approvals
- Admin can monitor blood group-wise stock levels

---

## 🧩 Tech Stack

- **Frontend:** Angular (Standalone Components)
- **Styling:** Custom CSS (Dashboard UI)
- **State Management:** RxJS (BehaviorSubject)
- **Storage:** LocalStorage (Mock Persistence)
- **Deployment:** Vercel

---

## 📁 Project Structure

```text
src/
 ├── app/
 │   ├── dashboards/
 │   │   ├── admin-dashboard/
 │   │   ├── hospital-dashboard/
 │   │   └── donor-dashboard/
 │   ├── services/
 │   │   ├── user.service.ts
 │   │   └── blood-request.service.ts
 │   ├── auth/
 │   └── app.routes.ts
 └── assets/

---

⚙️ Setup & Run Locally
git clone https://github.com/<your-username>/bloodbridge-frontend.git
cd bloodbridge-frontend
npm install
ng serve

Open 👉 http://localhost:4200

🌍 Deployment

The project is deployed on Vercel.

https://bloodbridge-frontend.vercel.app
>>>>>>> 5acf39145f1c70a7297d87277c85abc27f0263f7
=======
# BloodBridge_Frontend_Angular
BloodBridge is a real-time blood bank management system that connects Hospitals, Donors, and Admins on a single platform. It enables hospitals to request blood units, admins to manage inventory and approvals, and donors to contribute efficiently—ensuring timely availability of blood when it matters most.
>>>>>>> 9953878fd0b864c91e46cf67eb6e18a0b2e477dc
