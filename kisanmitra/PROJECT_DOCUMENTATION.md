# PROJECT OVERVIEW & DOCUMENTATION SPECIFICATION: KISANMITRA

## 1. Project Title
**KisanMitra** — Smart Farmer Procurement, Pincode Mandi Locator & Independent Mandi Queue Management Platform

---

## 2. Problem Statement & Context
In India, agricultural procurement centers (Mandis / APMCs / MSP Procurement Centres) face severe bottlenecks during harvest seasons:
- **Massive Queues & Delays:** Thousands of farmers arrive simultaneously without prior scheduling, causing traffic congestion, long waiting lines (6–12+ hours), and overnight camping outside mandis.
- **Crop Spoilage & Loss of Productive Time:** Long wait times in open sun or rain result in crop deterioration and wasted labor hours.
- **Lack of Mandi Directory & Proximity Guidance:** Farmers often lack direct contacts, addresses, or knowledge of operating hours and open slot quotas of nearby APMCs.
- **Lack of Transparency & Independent Mandi Operations:** Manual token distribution and paper-based weighment logs lead to mistrust, arbitrary grading, and delayed MSP payments.

---

## 3. Implemented Solution & System Architecture
**KisanMitra** is an end-to-end digital procurement, proximity locator, slot booking, and multi-tenant mandi operating suite:

1. **📍 Pincode Mandi Locator:**
   - 6-digit Pincode and GPS geolocation engine.
   - Calculates distance to closest Government APMC Mandis & Sub-Yards.
   - Displays full postal addresses, Mandi Secretary & Helpline numbers with one-tap phone calling, today's open capacity, and direct slot booking.

2. **🏛️ State & District Government Mandi Directory:**
   - Cascading State ➔ District filter covering major agricultural states across India (Maharashtra, Punjab, MP, UP, Haryana, Rajasthan, Gujarat, Karnataka, Tamil Nadu, AP/Telangana).
   - Lists verified APMC Principal Yards and MSP Sub-Centres with contact numbers, operating hours, and live commodity MSP buying rates.

3. **🎟️ Farmer Live Token Pass & Queue Stepper:**
   - Real-time tracking of token pass (#KM-XXXX).
   - 5-stage progress milestone tracker: *Slot Booked ➔ Gate Checked-In ➔ Quality & Moisture ➔ IoT Weighment ➔ DBT Payment*.
   - Live estimated arrival turn and gate assignment.

4. **🏢 Multi-Tenant Independent Mandi Admin Portal:**
   - Switchable Mandi Administrator workspace (each Mandi operates autonomously with isolated quotas, queues, and rates).
   - **Live Token Calling Engine:** Visual large display board, Web Audio API harmonic chime alert, token stage progression.
   - **IoT Digital Weighbridge Terminal:** Scale readings simulator (Gross Wt − Tare Wt = Net Wt), automated MSP payout calculator, and official printable Mandi Weighment & DBT Receipt generator.
   - **Daily Capacity & Slot Controller:** Dynamic per-slot vehicle limits and emergency capacity overrides (+10 overflow slots, freeze bookings).
   - **Daily MSP Rates Master:** Superintendent rate and moisture tolerance thresholds editor.
   - **DBT Settlement Logbook:** Daily transaction batches and PFMS-ready reporting.

---

## 4. Technical Stack
- **Frontend / Client UI:** Semantic HTML5, CSS3 Custom Properties (Emerald Green & Gold theme, Glassmorphism), Vanilla ES6+ JavaScript.
- **Audio & Media:** HTML5 Web Audio API harmonic chime synthesizer.
- **State & Data Store:** Modular in-memory multi-tenant Mandi database.
- **Hardware Simulation:** IoT RS-232 / Modbus weighing scale terminal and printable procurement receipts.

