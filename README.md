# Foodle 🥬
### The Modern Farm-to-Table Marketplace

![Foodle Banner](https://img.shields.io/badge/Foodle-Farm%20to%20Table-green?style=for-the-badge&logo=leaf)
![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

**Foodle** is a premium mobile application designed to bridge the gap between local farmers and health-conscious consumers. By eliminating middlemen, Foodle ensures farmers get fair prices while consumers enjoy fresh, organic produce delivered directly to their doorstep.

---

## 📱 App Overview

Foodle features a dual-interface system tailored for two distinct user types:

*   **Foodies (Consumers)**: Browse fresh produce, manage cart, track orders, and discover local farmers.
*   **Farmers (Sellers)**: Manage inventory, track sales analytics, process orders, and build their brand.

### 📊 User Flow Architecture

```mermaid
graph TD
    A[User Opens App] --> B{User Type?}
    B -->|Foodie| C[Home Screen]
    B -->|Farmer| D[Farmer Dashboard]
    
    subgraph Foodie Experience
    C --> E[Explore Categories]
    C --> F[View Product Details]
    F --> G[Add to Cart]
    G --> H[Checkout & Payment]
    H --> I[Order Tracking]
    end
    
    subgraph Farmer Experience
    D --> J[Add/Edit Products]
    D --> K[View Orders]
    K --> L[Update Status]
    D --> M[Sales Analytics]
    end
    
    I -.-> K
```

### 📸 App Screenshots

<p align="center">
  <img src="app_images/image.png" width="200" alt="Screen 1" />
  <img src="app_images/image copy.png" width="200" alt="Screen 2" />
  <img src="app_images/image copy 2.png" width="200" alt="Screen 3" />
</p>
<p align="center">
  <img src="app_images/image copy 3.png" width="200" alt="Screen 4" />
  <img src="app_images/image copy 4.png" width="200" alt="Screen 5" />
  <img src="app_images/image copy 5.png" width="200" alt="Screen 6" />
</p>

---

## 🚀 Key Features

### For Foodies 🛒
*   **Smart Search & Filter**: Find products by category, price, or farmer rating.
*   **Real-time Cart**: Persistent cart management with dynamic total calculation.
*   **Favorites**: Save top-rated products and farmers for quick access.
*   **Order History**: Track past purchases and re-order with one tap.

### For Farmers 👨‍🌾
*   **Inventory Management**: Easy-to-use interface for adding and updating produce.
*   **Order Management**: Accept, process, and mark orders as delivered.
*   **Performance Metrics**: Visual insights into daily sales and popular items.
*   **Profile Customization**: Showcase farm details and build trust with customers.

---

## 🛠️ Technology Stack

Foodle is built with a robust, modern tech stack ensuring performance and scalability.

| Category | Technology | Usage |
|----------|------------|-------|
| **Core** | React Native (Expo) | Cross-platform mobile development |
| **Language** | TypeScript | Type-safe code and better developer experience |
| **Styling** | NativeWind (Tailwind) | Utility-first styling for rapid UI development |
| **Navigation** | React Navigation | Native stack and bottom tab navigation |
| **State** | React Context API | Global state for User, Cart, and Toast notifications |
| **Icons** | Lucide React Native | Modern, consistent icon set |

### 📈 Code Composition

```mermaid
pie title Project Composition
    "UI Components (Screens)" : 45
    "Business Logic (Context/Hooks)" : 25
    "Navigation Structure" : 15
    "Configuration & Assets" : 10
    "Utilities" : 5
```

---

## 📂 Project Structure

```bash
foodle/
├── app.json             # Expo configuration
├── App.tsx              # Entry point & Provider wrapping
├── babel.config.js      # Babel setup for NativeWind
├── components/          # Reusable UI components (Sidebar, etc.)
├── context/             # Global state (Cart, User, Toast)
├── navigation/          # Stack and Tab navigators
├── screens/             # Application screens
│   ├── HomeScreen.tsx
│   ├── FarmerHomeScreen.tsx
│   ├── ProductDetailScreen.tsx
│   ├── CartScreen.tsx
│   └── ...
├── utils/               # Helper functions (responsive scaling)
└── assets/              # Images and icons
```

---

## 🏁 Getting Started

1.  **Clone the repository**
    ```bash
    git clone https://github.com/eres45/foodle.git
    cd foodle
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Start the App**
    ```bash
    npx expo start
    ```

4.  **Run on Device**
    *   Scan the QR code with the **Expo Go** app (Android/iOS).
    *   Press `a` for Android Emulator or `i` for iOS Simulator.

---

## 🤝 Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any enhancements.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

*Built with ❤️ by the Foodle Team*
