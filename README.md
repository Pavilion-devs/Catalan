# Opue - Xandeum pNode Analytics Platform

> Real-time analytics and insights for the Xandeum storage network

<!-- SCREENSHOT: Add main dashboard screenshot here -->
<!-- ![Dashboard Overview](./screenshots/dashboard.png) -->

## Overview

Opue is a comprehensive analytics platform for monitoring and analyzing Xandeum pNodes (storage provider nodes). Built for the Xandeum ecosystem, it provides real-time insights into network health, node performance, and storage capacity.

**Live Demo:** https://opue-pink.vercel.app

---

## Screenshots

<!-- Add your screenshots in a /screenshots folder -->

| Dashboard | pNode Explorer | Network Analytics |
|-----------|----------------|-------------------|
| ![Dashboard](./screenshots/dashboard.png) | ![Explorer](./screenshots/explorer.png) | ![Network](./screenshots/network.png) |

| pNode Details | Compare View | Watchlist |
|---------------|--------------|-----------|
| ![Details](./screenshots/details.png) | ![Compare](./screenshots/compare.png) | ![Watchlist](./screenshots/watchlist.png) |

---

## Features

### Core Features
- **Real-time pNode Data** - Fetches live data from Xandeum pRPC endpoints
- **Network Dashboard** - Overview of network health, total storage, and statistics
- **pNode Explorer** - Browse all nodes with filtering, sorting, and search
- **Interactive Map** - Geographic distribution visualization

### Advanced Features
- **Compare Tool** - Side-by-side comparison of multiple pNodes
- **Watchlist** - Track your favorite pNodes with persistent storage
- **Alert System** - Set custom alerts for node status changes
- **Historical Analytics** - Performance trends and predictions
- **Export Data** - Download pNode data as CSV or JSON

### User Experience
- **Dark/Light Mode** - System preference detection with manual toggle
- **Responsive Design** - Optimized for desktop, tablet, and mobile
- **Global Search** - Quick search with keyboard shortcut (/)
- **Command Palette** - Power user keyboard navigation (Cmd+K)

---

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 15 (App Router) + React 19 |
| Styling | Tailwind CSS 4 |
| UI Components | shadcn/ui (Radix UI) |
| State Management | TanStack React Query + Jotai |
| Charts | Recharts |
| Maps | Leaflet + React Leaflet |
| Blockchain | @solana/web3.js + @xandeum/web3.js |
| Database | PostgreSQL + Prisma (optional) |
| Language | TypeScript |

---

## Quick Start

### Prerequisites
- Node.js 20+
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/opue.git
cd opue

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Variables (Optional)

Create a `.env.local` file for custom configuration:

```bash
# Optional: Custom RPC endpoint
NEXT_PUBLIC_XANDEUM_RPC_URL=https://api.devnet.xandeum.com:8899

# Optional: For historical analytics (requires PostgreSQL)
DATABASE_URL=postgresql://user:password@localhost:5432/xandeum_analytics
```

> **Note:** The app works out of the box without any environment variables. It uses the default Xandeum devnet endpoints.

---

## Project Structure

```
src/
├── app/                    # Next.js pages
│   ├── page.tsx            # Home dashboard
│   ├── pnodes/             # pNode explorer & details
│   ├── network/            # Network analytics
│   ├── analytics/          # Historical analytics
│   ├── compare/            # pNode comparison
│   ├── watchlist/          # Saved pNodes
│   └── alerts/             # Alert management
├── components/             # React components
│   ├── ui/                 # Base UI components
│   ├── pnodes/             # pNode-specific components
│   ├── analytics/          # Chart components
│   └── dashboard/          # Dashboard widgets
├── hooks/                  # Custom React hooks
├── services/               # API & data services
├── lib/                    # Utilities
└── types/                  # TypeScript types
```

---

## API Integration

### How It Works

1. **pRPC Proxy** - Client requests go through `/api/prpc` to handle CORS
2. **getClusterNodes** - Fetches all nodes from Xandeum network
3. **Data Transform** - Raw data is transformed into rich pNode objects
4. **Auto Refresh** - Data refreshes every 30 seconds via React Query

### RPC Endpoint

- **Primary:** `https://api.devnet.xandeum.com:8899`
- **Protocol:** JSON-RPC 2.0
- **Method:** `getClusterNodes`

---

## Available Scripts

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run start     # Start production server
npm run lint      # Run ESLint
npm run format    # Format with Prettier
```

---

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Deploy (no configuration needed)

### Other Platforms

```bash
npm run build
npm run start
```

---

## Hackathon Submission

This project was built for the **Xandeum pNode Analytics Bounty**.

### Requirements Met

| Requirement | Status |
|-------------|--------|
| Web-based analytics platform | Yes |
| Retrieve pNodes via pRPC | Yes |
| Display pNode information | Yes |
| Live, functional website | Yes |
| Documentation provided | Yes |

### Innovation Features
- AI-powered anomaly detection
- Predictive analytics with trend forecasting
- Interactive geographic heatmap
- pNode comparison tool
- Custom alert system
- Data export functionality

---

## Links

- [Xandeum Website](https://xandeum.network)
- [Xandeum Docs](https://xandeum.github.io/xandeum-web3.js)
- [Xandeum Discord](https://discord.gg/uqRSmmM5m)

---

## License

MIT License - Built for the Xandeum ecosystem

---

<p align="center">
  Built with Next.js, React, and Tailwind CSS
</p>
