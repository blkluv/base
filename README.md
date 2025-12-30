# Base Network Transaction Sender 🚀

A modern, dark-themed Web3 application built with **Next.js 14** and **Thirdweb**. This application allows users to connect their wallets, view their balance, and securely send native ETH transactions on the **Base** network (supporting both Mainnet and Sepolia Testnet).

It features a polished UI with glassmorphism effects, gradient glows, and real-time transaction feedback.

## ✨ Features

*   **Wallet Connection:** Secure login using Thirdweb Connect (supports MetaMask, Phantom, Coinbase Wallet, and Ledger).
*   **Network Toggling:** One-click switch between **Base Mainnet** and **Base Sepolia** (Testnet).
*   **Balance Display:** Real-time fetching of the connected wallet's native balance.
*   **Transaction Sender:**
    *   Send ETH to specific addresses.
    *   Defaults to "Self-Send" if no address is provided (useful for testing gas/signatures).
    *   Input validation.
*   **Smart Feedback:**
    *   Loading states during wallet signature.
    *   Success confirmation with transaction hash.
    *   Direct links to **BaseScan** (automatically adjusts for Testnet/Mainnet).
*   **Modern UI:** Built with Tailwind CSS, utilizing gradients, blur effects, and Lucide icons.

## 🛠️ Tech Stack

*   **Framework:** [Next.js](https://nextjs.org/) (App Router)
*   **Language:** TypeScript
*   **Web3 SDK:** [Thirdweb v5](https://portal.thirdweb.com/)
*   **Styling:** Tailwind CSS, clsx, tailwind-merge
*   **Icons:** Lucide React
*   **Fonts:** Inter (Google Fonts)

## ⚙️ Prerequisites

Before you begin, ensure you have the following:

*   **Node.js** (v18 or higher recommended)
*   A **Thirdweb Client ID** (Get one for free at the [Thirdweb Dashboard](https://thirdweb.com/dashboard))

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/base-tx-sender.git
cd base-tx-sender
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory of your project. You **must** provide a Thirdweb Client ID for the wallet connection to work.

```bash
touch .env.local
```

Add the following variable to the file:

```env
# Get this from https://thirdweb.com/dashboard/settings/api-keys
NEXT_PUBLIC_THIRDWEB_CLIENT_ID=your_client_id_here

# Optional: Only needed if using server-side functionality or restrictions
THIRDWEB_SECRET_KEY=your_secret_key_here
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📂 Project Structure

```
.
├── src/
│   ├── app/
│   │   ├── globals.css         # Global styles & Tailwind directives
│   │   ├── layout.tsx          # Root layout & ThirdwebProvider wrapper
│   │   └── page.tsx            # Main entry point (Background visuals)
│   ├── components/
│   │   └── AuthAndBaseTx.tsx   # Core Logic: Connect, Balance, Send Tx Form
│   └── lib/
│       └── client.ts           # Thirdweb client initialization
├── public/
├── .env.local                  # Environment variables (Ignored by git)
├── next.config.mjs
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

## 🧩 Configuration

### Modifying Supported Wallets

To change which wallets are allowed (e.g., adding Rainbow or removing Ledger), edit `src/components/AuthAndBaseTx.tsx`:

```typescript
// Allowed wallets configuration
const wallets = [
    createWallet("io.metamask"),
    createWallet("app.phantom"),
    createWallet("com.coinbase.wallet"),
    createWallet("com.ledger"),
    // Add others here like createWallet("me.rainbow")
];
```

### Changing Default Networks

The app currently toggles between `base` and `baseSepolia`. To change this to other chains (e.g., Ethereum or Polygon), modify the imports from `thirdweb/chains` in `src/components/AuthAndBaseTx.tsx`.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

This project is licensed under the MIT License.