# VenueFlow 🏛️

> **A premium venue booking platform** — browse, book, and manage event spaces with elegance.

🌐 **Live Site:** [azmrmle.github.io/VenueFlow](https://azmrmle.github.io/VenueFlow)

---

## ✨ Features

### For Guests
- 🔍 **Browse Venues** — Explore 6 curated event spaces (ballroom, rooftop, conference, outdoor, studio, dining)
- 📋 **Venue Detail Pages** — Full amenities list, capacity, pricing, and description per venue
- 📅 **Booking Form** — Select date, time slot, package, and guest count with real-time price estimation
- 💬 **Chat Widget** — Floating live chat assistant on each venue page

### For Admins
- 🔐 **Admin Login** — Protected admin portal
- 📊 **Dashboard** — Overview stats (total, pending, confirmed, cancelled bookings)
- 🗂️ **Booking Management** — Filter by status or venue, search by name/email/reference
- ✏️ **Booking Detail Modal** — View full booking info, add internal notes, confirm or cancel
- 💾 **Persistent State** — Bookings survive page navigation via custom hook

---

## 🏛️ Venues

| Venue | Type | Capacity | Price |
|---|---|---|---|
| The Grand Pavilion | Ballroom | 500 pax | RM 8,000 / day |
| The Ivory Loft | Rooftop | 150 pax | RM 3,500 / day |
| Cedarwood Hall | Conference | 80 pax | RM 1,800 / day |
| The Amber Garden | Outdoor | 300 pax | RM 5,500 / day |
| Sapphire Studio | Studio | 40 pax | RM 900 / half-day |
| The Heritage Room | Dining | 60 pax | RM 2,200 / day |

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **React 19** | UI framework |
| **Vite 8** | Build tool & dev server |
| **Vanilla CSS** | Styling & animations |
| **JavaScript (ES Modules)** | Logic & state |
| **GitHub Pages** | Hosting |
| **gh-pages** | Deployment |

---

## 📁 Project Structure

```
venueflow/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── components/
│   │   ├── home/          # Hero, VenueCard
│   │   ├── layout/        # Nav, Footer
│   │   ├── ui/            # Btn, Badge, Field (reusable)
│   │   └── venue/         # ChatWidget
│   ├── config/            # App-wide constants
│   ├── data/              # venues.js, bookingOptions.js, mockBookings.js
│   ├── hooks/             # useBookings (booking state management)
│   ├── pages/             # HomePage, VenueDetailPage, BookingPage,
│   │                      # AdminLoginPage, AdminDashboardPage, AboutPage
│   ├── styles/            # global.css
│   ├── utils/             # bookingUtils.js
│   ├── App.jsx            # Root component & client-side routing
│   └── main.jsx           # Entry point
├── index.html
├── vite.config.js
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) v18+
- npm v9+

### Installation

```bash
# 1. Clone the repo
git clone https://github.com/azmrmle/VenueFlow.git
cd VenueFlow

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📦 Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start local development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview the production build locally |
| `npm run deploy` | Build & deploy to GitHub Pages |

---

## 🔑 Admin Access

The admin portal is accessible from the **Nav** → **Admin** link.

> Default credentials are set in `src/config/constants.js`

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<p align="center">Built with ❤️ using React + Vite</p>
