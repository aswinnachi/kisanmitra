# 🌾 KisanMitra — Smart Farmer Procurement & Digital Mandi Platform

## 📌 Project Overview
**KisanMitra** is an all-in-one digital platform designed to eliminate long waiting queues and congestion at agricultural mandis / procurement centers across India. 

---

## 🌟 Newly Implemented Core Features

1. **📍 Pincode Mandi Locator (Proximity Engine):**
   - Farmers enter any 6-digit PIN code (or use Auto-Detect GPS) to locate nearby Government APMC Mandis & Sub-Yards.
   - Shows live distance (km), full postal addresses, Mandi Secretary & Helpdesk phone numbers with one-tap calling (`tel:`), today's remaining slots, and direct slot booking.

2. **🏛️ State & District Government Mandi Directory:**
   - Interactive cascading dropdowns (Select State ➔ Select District).
   - Lists verified Government APMCs and MSP Centres with active buying rates, operating hours, and contact details across major Indian states.

3. **🎟️ Farmer Live Token Pass & Queue Stepper:**
   - Real-time token status search (#KM-XXXX).
   - 5-stage live progress visual stepper (*Slot Booked ➔ Gate Checked-In ➔ Quality & Moisture ➔ IoT Weighment ➔ DBT Payment*).

4. **🏢 Multi-Tenant Independent Mandi Admin Portal:**
   - Dedicated Admin control suite where **each Mandi operates independently**.
   - **Live Token Calling Engine:** Big-screen announcement display with Web Audio API harmonic chime bell.
   - **IoT Weighbridge Terminal:** Digital scale readings (Gross Wt − Tare Wt = Net Wt), MSP payout computation, and official printable **Mandi Weighment & Procurement Receipt**.
   - **Slot & Capacity Controller:** Hourly vehicle quotas and emergency overflow slots.
   - **Daily MSP Rates Master:** Live rate and moisture limit editor.
   - **DBT Settlement Logbook:** Batch transaction reports and PFMS export.

---

## 📂 Folder Structure
```
kisanmitra/
├── index.html                # Main UI (Hero, Pincode Locator, State Directory, Pass Tracker, Admin Portal, Modals)
├── style.css                 # Complete design system (Emerald Green & Gold theme, glassmorphism, responsive)
├── script.js                 # Complete application logic (Mandi DB, Pincode engine, Token queue, IoT Weighbridge, Audio chime)
├── README.md                 # Project quickstart
└── PROJECT_DOCUMENTATION.md  # Detailed project specification
```

---

## 🚀 How to Run Locally

### Option 1: Open Directly in Browser
Double-click [index.html](file:///Users/aswinnachi/Desktop/kisanmitra/index.html) in your web browser.

### Option 2: Run with Local Web Server
```bash
python3 -m http.server 8080
```
Then open `http://localhost:8080` in your browser.

