#!/usr/bin/env python3
"""
KisanMitra — Multi-Client Real-Time APMC Mandi Procurement Backend
Handles shared persistent data across multiple PCs and devices,
post-inspection weighment/quality certification, and Gmail-style intimation delivery.
"""

import json
import os
import random
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import parse_qs, urlparse

try:
    from dotenv import load_dotenv
    load_dotenv()
except ImportError:
    pass

PORT = 8080
DATA_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'mandi_records.json')

# Real Gmail Configuration for APMC Notifications
GMAIL_SENDER = os.getenv("GMAIL_SENDER_EMAIL", "aswinnchi810@gmail.com")
GMAIL_APP_PASS = os.getenv("GMAIL_APP_PASSWORD", "28_01_2007")

def dispatch_gmail_via_smtp(to_email, subject, body_html, body_text=""):
    target = to_email if to_email and '@' in to_email else GMAIL_SENDER
    try:
        msg = MIMEMultipart('alternative')
        msg['Subject'] = subject
        msg['From'] = f"KisanMitra APMC Dispatch <{GMAIL_SENDER}>"
        msg['To'] = target
        msg['Reply-To'] = GMAIL_SENDER
        if body_text:
            msg.attach(MIMEText(body_text, 'plain', 'utf-8'))
        msg.attach(MIMEText(body_html, 'html', 'utf-8'))

        with smtplib.SMTP('smtp.gmail.com', 587, timeout=4) as server:
            server.ehlo()
            server.starttls()
            server.ehlo()
            server.login(GMAIL_SENDER, GMAIL_APP_PASS)
            server.sendmail(GMAIL_SENDER, [target, GMAIL_SENDER], msg.as_string())
        print(f"📧 [SMTP SUCCESS] Real Gmail sent to {target}")
        return True, "Delivered to Gmail Inbox"
    except Exception as err:
        print(f"📧 [SMTP Notice] Relay: {err}. Intimation saved to web digital outbox.")
        return False, str(err)


# Initial seed queue records for demo APMC mandis
DEFAULT_QUEUE = {
    'tn_pollachi': [
        {
            'token': '#KM-2048',
            'farmerName': 'Ramesh Kumar',
            'phone': '+91 9876543210',
            'aadhaar': '7841-9920-1123',
            'vehicleNo': 'TN-37-BX-4091 (Tractor)',
            'crop': 'Copra / Coconut',
            'estQty': 25.0,
            'slotTime': '10:30 AM',
            'status': 'Weighing',
            'gate': 'Gate #1',
            'priceStatus': 'Verified',
            'grossWeight': 52.4,
            'tareWeight': 38.0,
            'netWeight': 14.4,
            'moisture': 11.8,
            'qualityGrade': 'Grade-A (Premium APMC Standard)',
            'mspRate': 11160,
            'deductions': 0,
            'finalTotalPayout': 160704,
            'utr': 'PFMS-DBT-2026-99412',
            'certDate': '2026-09-11 10:45 AM',
            'emailGenerated': True
        },
        {
            'token': '#KM-2049',
            'farmerName': 'S. Murugesan',
            'phone': '+91 94431 88921',
            'aadhaar': '5512-3398-4421',
            'vehicleNo': 'TN-38-DF-9102 (Lorry)',
            'crop': 'Copra Grade-1',
            'estQty': 32.0,
            'slotTime': '11:15 AM',
            'status': 'Quality Check',
            'gate': 'Gate #2',
            'priceStatus': 'Pending Verification',
            'moisture': 12.2,
            'qualityGrade': 'Testing in Progress...',
            'mspRate': 11160
        },
        {
            'token': '#KM-2050',
            'farmerName': 'K. Vellingiri',
            'phone': '+91 98422 44109',
            'aadhaar': '6123-4567-8901',
            'vehicleNo': 'TN-41-AA-1122 (Tractor)',
            'crop': 'Groundnut Pods',
            'estQty': 18.0,
            'slotTime': '12:00 PM',
            'status': 'Gate In',
            'gate': 'Gate #1',
            'priceStatus': 'Pending Verification',
            'mspRate': 6783
        },
        {
            'token': '#KM-2051',
            'farmerName': 'P. Thangavel',
            'phone': '+91 97880 12345',
            'aadhaar': '8876-1234-5678',
            'vehicleNo': 'TN-37-CZ-7788 (Mini Truck)',
            'crop': 'Copra',
            'estQty': 20.0,
            'slotTime': '01:30 PM',
            'status': 'Scheduled',
            'gate': 'Gate #1',
            'priceStatus': 'Pending Verification',
            'mspRate': 11160
        }
    ]
}

def load_data():
    if os.path.exists(DATA_FILE):
        try:
            with open(DATA_FILE, 'r', encoding='utf-8') as f:
                return json.load(f)
        except Exception:
            pass
    return {'queues': DEFAULT_QUEUE, 'emails': {}}

def save_data(data):
    try:
        with open(DATA_FILE, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
    except Exception as e:
        print(f"Error saving data: {e}")

# Ensure initial data exists
init_data = load_data()
if 'queues' not in init_data:
    init_data['queues'] = DEFAULT_QUEUE
if 'emails' not in init_data:
    init_data['emails'] = {}
# Seed email for KM-2048
init_data['emails']['#KM-2048'] = {
    'subject': '📢 [APMC Pollachi] Verified Procurement Intimation & DBT Settlement — Token #KM-2048',
    'fromName': 'Government APMC Procurement Cell, Pollachi Regulated Market',
    'fromEmail': 'apmc.pollachi@kisanmitra.gov.in',
    'toName': 'Ramesh Kumar',
    'toPhone': '+91 9876543210',
    'token': '#KM-2048',
    'crop': 'Copra / Coconut',
    'qualityGrade': 'Grade-A (Premium APMC Standard)',
    'moisture': '11.8% (Approved within 14% ceiling)',
    'grossWeight': 52.4,
    'tareWeight': 38.0,
    'netWeight': 14.4,
    'mspRate': 11160,
    'deductions': 0,
    'finalTotalPayout': 160704,
    'bankAccount': 'State Bank of India (A/C: ******4891)',
    'utr': 'PFMS-DBT-2026-99412',
    'timestamp': 'Today, 10:48 AM',
    'status': 'Disbursed via PFMS Direct Benefit Transfer'
}
save_data(init_data)


class KisanMitraHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

    def send_json(self, status_code, obj):
        body = json.dumps(obj, ensure_ascii=False).encode('utf-8')
        self.send_response(status_code)
        self.send_header('Content-Type', 'application/json; charset=utf-8')
        self.send_header('Content-Length', str(len(body)))
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
        self.wfile.write(body)

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

    def do_GET(self):
        parsed = urlparse(self.path)
        path = parsed.path
        query = parse_qs(parsed.query)

        # API: Get Mandi Queue
        if path == '/api/queue':
            mandi_id = query.get('mandiId', ['tn_pollachi'])[0]
            data = load_data()
            queue = data.get('queues', {}).get(mandi_id, [])
            self.send_json(200, {'success': True, 'mandiId': mandi_id, 'queue': queue})
            return

        # API: Track Token Status Across All Mandis (Strict lookup - No random IDs allowed)
        if path == '/api/track':
            token = query.get('token', [''])[0].strip()
            cleaned = token.replace('#KM-', '').replace('KM-', '').replace('#', '').strip()
            full_token = f"#KM-{cleaned}"
            data = load_data()
            found_record = None
            found_mandi_id = None
            queue_pos = 1

            for m_id, q_list in data.get('queues', {}).items():
                for idx, q in enumerate(q_list):
                    q_clean = q.get('token', '').replace('#KM-', '').replace('KM-', '').replace('#', '').strip()
                    if q_clean == cleaned or q.get('token') == full_token or q.get('token') == token:
                        found_record = dict(q)
                        found_mandi_id = m_id
                        found_record['position'] = idx + 1
                        found_record['ahead'] = idx
                        break
                if found_record:
                    break

            if found_record:
                email = data.get('emails', {}).get(found_record.get('token'))
                self.send_json(200, {
                    'success': True,
                    'found': True,
                    'mandiId': found_mandi_id,
                    'record': found_record,
                    'email': email
                })
            else:
                self.send_json(200, {
                    'success': True,
                    'found': False,
                    'message': f'No tracker record found for Token {full_token}'
                })
            return

        # API: Get Email Intimation for Token
        if path == '/api/email':
            token = query.get('token', [''])[0]
            data = load_data()
            email = data.get('emails', {}).get(token)
            if email:
                self.send_json(200, {'success': True, 'email': email})
            else:
                self.send_json(404, {'success': False, 'message': 'No email intimation found for this token yet.'})
            return

        # Serve static files as fallback
        super().do_GET()

    def do_POST(self):
        parsed = urlparse(self.path)
        path = parsed.path

        content_length = int(self.headers.get('Content-Length', 0))
        post_body = self.rfile.read(content_length).decode('utf-8') if content_length > 0 else '{}'
        try:
            payload = json.loads(post_body)
        except Exception:
            payload = {}

        # API: Farmer Registration with Real Gmail
        if path == '/api/register':
            data = load_data()
            if 'farmers' not in data:
                data['farmers'] = []

            name = payload.get('name', 'Ramesh Patil').strip()
            phone = payload.get('phone', '').strip()
            email = payload.get('email', '').strip()
            aadhaar = payload.get('aadhaar', '').strip()
            mandi = payload.get('mandi', 'tn_pollachi').strip()
            crop = payload.get('crop', 'Copra').strip()
            kisan_id = f"KM-2026-{random.randint(1000, 9999)}"

            farmer_entry = {
                'kisanId': kisan_id,
                'name': name,
                'phone': phone if phone.startswith('+91') else f"+91 {phone}",
                'email': email,
                'aadhaar': aadhaar,
                'mandi': mandi,
                'crop': crop,
                'registeredAt': 'Just now'
            }

            # Filter out existing by phone or email
            data['farmers'] = [f for f in data['farmers'] if f.get('phone') != farmer_entry['phone'] and f.get('email') != email]
            data['farmers'].append(farmer_entry)
            save_data(data)

            self.send_json(200, {'success': True, 'farmer': farmer_entry})
            return

        # API: Book Procurement Slot (Multi-client sync with Formal Gmail Intimation)
        if path == '/api/book-slot':
            data = load_data()
            mandi_id = payload.get('mandiId', 'tn_pollachi')
            if 'queues' not in data:
                data['queues'] = {}
            if mandi_id not in data['queues']:
                data['queues'][mandi_id] = []

            # Generate unique token
            existing_tokens = {q.get('token') for q in data['queues'][mandi_id]}
            token_num = random.randint(2100, 9900)
            token_str = f"#KM-{token_num}"
            while token_str in existing_tokens:
                token_num = random.randint(2100, 9900)
                token_str = f"#KM-{token_num}"

            farmer_name = payload.get('farmerName', 'Ramesh Kumar')
            farmer_phone = payload.get('phone', '+91 9876543210')
            farmer_email = payload.get('farmerEmail') or payload.get('email', 'farmer@gmail.com')
            slot_time = payload.get('slotTime', 'Morning Window (08:00 AM – 11:00 AM)')
            mandi_name = payload.get('mandiName', 'Pollachi Regulated Market')
            crop_name = payload.get('crop', 'Copra')
            est_qty = float(payload.get('estQty', 25.0))
            msp_rate = float(payload.get('mspRate', 2300))

            new_record = {
                'token': token_str,
                'farmerName': farmer_name,
                'phone': farmer_phone,
                'email': farmer_email,
                'aadhaar': payload.get('aadhaar', '7841-9920-1123'),
                'vehicleNo': payload.get('vehicleNo', 'TN-37-BX-4091 (Tractor)'),
                'crop': crop_name,
                'estQty': est_qty,
                'slotTime': slot_time,
                'status': 'Scheduled',
                'gate': 'Gate #1',
                'priceStatus': 'Pending Verification',
                'mspRate': msp_rate,
                'mandiName': mandi_name,
                'createdAt': payload.get('createdAt', '2026-09-11T10:00:00Z')
            }

            data['queues'][mandi_id].append(new_record)

            # Generate Official Formal Booking Intimation to real Gmail
            if 'emails' not in data:
                data['emails'] = {}

            # Formal order: Date, Time, Place, Quantity, Product, Assigned Gate & Price Notice
            booking_email = {
                'subject': f"📋 [{mandi_name}] Official Procurement Slot Confirmation — Token {token_str}",
                'fromName': f"Government APMC Procurement Authority ({mandi_name})",
                'fromEmail': f"apmc.procurement@{mandi_id.replace('_', '-')}.gov.in",
                'toName': farmer_name,
                'toPhone': farmer_phone,
                'toEmail': farmer_email,
                'token': token_str,
                'type': 'booking',
                'mandiName': mandi_name,
                'date': slot_time.split(',')[0] if ',' in slot_time else 'Scheduled Date',
                'timeSlot': slot_time.split(',')[1].strip() if ',' in slot_time else slot_time,
                'place': f"{mandi_name} (Yard Gate #1, Main Agricultural Complex)",
                'crop': crop_name,
                'estQty': f"{est_qty} Quintals",
                'gate': 'Gate #1 (Weighbridge Scale #1)',
                'priceStatus': 'Pending Physical Quality & Weighbridge Check',
                'notice': 'IMPORTANT APMC NOTICE: As per Mandi Procurement Rules, the final quotation / purchase price is NOT opened or fixed at slot booking. The final product price will be officially certified on-site after physical weighbridge weighing (Gross - Tare) and moisture quality grading.',
                'timestamp': 'Just now',
                'status': 'Slot Confirmed — Awaiting Arrival'
            }

            booking_text = f"""
Government APMC Mandi Procurement Intimation
Token: {token_str}
Farmer: {farmer_name} ({farmer_phone})
Date: {booking_email['date']}
Time Window: {booking_email['timeSlot']}
Place: {booking_email['place']}
Quantity: {booking_email['estQty']}
Product / Crop: {crop_name}
Assigned Gate: {booking_email['gate']}

NOTICE: {booking_email['notice']}
            """
            booking_html = f"""
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
              <div style="background: #14532d; color: white; padding: 18px 24px;">
                <h2 style="margin: 0;">🏛️ APMC Mandi Procurement Intimation</h2>
                <p style="margin: 4px 0 0; opacity: 0.9;">Token Pass Reference: <strong>{token_str}</strong></p>
              </div>
              <div style="padding: 24px; background: #fafaf9;">
                <table style="width: 100%; border-collapse: collapse;">
                  <tr><td style="padding: 8px; color: #64748b;">1. Reporting Date:</td><td style="padding: 8px; font-weight: bold;">{booking_email['date']}</td></tr>
                  <tr><td style="padding: 8px; color: #64748b;">2. Scheduled Time:</td><td style="padding: 8px; font-weight: bold;">{booking_email['timeSlot']}</td></tr>
                  <tr><td style="padding: 8px; color: #64748b;">3. Place & Centre:</td><td style="padding: 8px; font-weight: bold;">{booking_email['place']}</td></tr>
                  <tr><td style="padding: 8px; color: #64748b;">4. Quantity:</td><td style="padding: 8px; font-weight: bold;">{booking_email['estQty']}</td></tr>
                  <tr><td style="padding: 8px; color: #64748b;">5. Product / Crop:</td><td style="padding: 8px; font-weight: bold;">{crop_name}</td></tr>
                  <tr><td style="padding: 8px; color: #64748b;">6. Assigned Gate:</td><td style="padding: 8px; font-weight: bold;">{booking_email['gate']}</td></tr>
                </table>
                <div style="margin-top: 18px; padding: 12px; background: #fef3c7; border-left: 4px solid #f59e0b; border-radius: 4px; font-size: 0.88rem; color: #92400e;">
                  <strong>⚠️ Mandatory APMC Notice:</strong> {booking_email['notice']}
                </div>
              </div>
            </div>
            """
            smtp_success, smtp_info = dispatch_gmail_via_smtp(farmer_email, booking_email['subject'], booking_html, booking_text)
            booking_email['smtpDelivered'] = smtp_success
            booking_email['smtpInfo'] = smtp_info

            data['emails'][token_str] = booking_email

            save_data(data)
            self.send_json(200, {'success': True, 'token': new_record, 'queue': data['queues'][mandi_id], 'email': booking_email})
            return

        # API: Certify Weighment and Quality Check (Admin Post-Inspection)
        if path == '/api/certify-weighment':
            data = load_data()
            mandi_id = payload.get('mandiId', 'tn_pollachi')
            token = payload.get('token')
            mandi_queue = data.get('queues', {}).get(mandi_id, [])

            record = next((q for q in mandi_queue if q.get('token') == token), None)
            if not record:
                # If not found in this mandi, check across all mandis
                for m_id, q_list in data.get('queues', {}).items():
                    r = next((q for q in q_list if q.get('token') == token), None)
                    if r:
                        record = r
                        mandi_id = m_id
                        break

            gross = float(payload.get('grossWeight', 50.0))
            tare = float(payload.get('tareWeight', 35.0))
            net = round(max(0.0, gross - tare), 2)
            moisture = float(payload.get('moisture', 11.5))
            grade = payload.get('qualityGrade', 'Grade-A (Premium Quality)')
            msp_rate = float(payload.get('mspRate', 2300))
            deduction_per_qtl = float(payload.get('deductions', 0.0))
            
            deduction_total = round(net * deduction_per_qtl, 2)
            final_payout = round(max(0.0, (net * msp_rate) - deduction_total))
            utr_ref = f"PFMS-DBT-2026-{random.randint(10000, 99999)}"

            farmer_name = record.get('farmerName', payload.get('farmerName', 'Ramesh Kumar')) if record else payload.get('farmerName', 'Ramesh Kumar')
            farmer_phone = record.get('phone', payload.get('phone', '+91 9876543210')) if record else payload.get('phone', '+91 9876543210')
            crop_name = payload.get('crop') or (record.get('crop') if record else 'Copra')
            mandi_name = payload.get('mandiName', 'Pollachi Regulated Market')

            if record:
                record['grossWeight'] = gross
                record['tareWeight'] = tare
                record['netWeight'] = net
                record['moisture'] = moisture
                record['qualityGrade'] = grade
                record['mspRate'] = msp_rate
                record['deductions'] = deduction_total
                record['finalTotalPayout'] = final_payout
                record['status'] = 'Completed'
                record['priceStatus'] = 'Verified'
                record['utr'] = utr_ref
                record['emailGenerated'] = True

            farmer_email = record.get('email', payload.get('email', 'farmer@gmail.com')) if record else payload.get('email', 'farmer@gmail.com')

            # Generate Gmail-Style Procurement Intimation (Official Final Quotation & DBT Settlement)
            email_data = {
                'subject': f"📢 [{mandi_name}] Official Weighment & PFMS DBT Disbursement Intimation — Token {token}",
                'fromName': f"APMC Regulated Market Procurement Officer ({mandi_name})",
                'fromEmail': f"apmc.officer@{mandi_id.replace('_', '-')}.gov.in",
                'toName': farmer_name,
                'toPhone': farmer_phone,
                'toEmail': farmer_email,
                'token': token,
                'type': 'quotation_certified',
                'mandiName': mandi_name,
                'crop': crop_name,
                'qualityGrade': grade,
                'moisture': f"{moisture}% (Govt APMC Norm: < 14.0%)",
                'grossWeight': gross,
                'tareWeight': tare,
                'netWeight': net,
                'mspRate': msp_rate,
                'deductions': deduction_total,
                'finalTotalPayout': final_payout,
                'bankAccount': 'Direct Aadhaar-Linked Bank Account via PFMS',
                'utr': utr_ref,
                'timestamp': 'Just now',
                'status': 'Disbursed via PFMS Direct Benefit Transfer'
            }

            quotation_text = f"""
Official APMC Mandi Weighment & Final Price Quotation Intimation
Token: {token}
Farmer: {farmer_name} ({farmer_phone})
Mandi Centre: {mandi_name}
Commodity: {crop_name} ({grade})
Moisture: {moisture}%

Gross Scale: {gross} Quintals
Tare Scale: {tare} Quintals
Certified Net Weight: {net} Quintals
Applicable Price Rate: ₹{msp_rate} / Quintal
Quality Deductions: ₹{deduction_total}
Final Price Quotation / Total DBT Amount: ₹{final_payout}
Disbursement Reference UTR: {utr_ref}
Status: Disbursed via PFMS Direct Benefit Transfer
            """
            quotation_html = f"""
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
              <div style="background: #14532d; color: white; padding: 18px 24px;">
                <h2 style="margin: 0;">🏛️ APMC Verified Weighment & Final Price Advice</h2>
                <p style="margin: 4px 0 0; opacity: 0.9;">Token Pass: <strong>{token}</strong> | UTR: <strong>{utr_ref}</strong></p>
              </div>
              <div style="padding: 24px; background: #fafaf9;">
                <table style="width: 100%; border-collapse: collapse;">
                  <tr><td style="padding: 8px; color: #64748b;">Farmer:</td><td style="padding: 8px; font-weight: bold;">{farmer_name} ({farmer_phone})</td></tr>
                  <tr><td style="padding: 8px; color: #64748b;">Mandi:</td><td style="padding: 8px; font-weight: bold;">{mandi_name}</td></tr>
                  <tr><td style="padding: 8px; color: #64748b;">Quality Grade:</td><td style="padding: 8px; font-weight: bold;">{grade} (Moisture {moisture}%)</td></tr>
                  <tr><td style="padding: 8px; color: #64748b;">Gross Scale:</td><td style="padding: 8px; font-weight: bold;">{gross} Quintals</td></tr>
                  <tr><td style="padding: 8px; color: #64748b;">Tare Scale:</td><td style="padding: 8px; font-weight: bold;">{tare} Quintals</td></tr>
                  <tr style="background: #dcfce7;"><td style="padding: 8px; color: #166534; font-weight: bold;">Certified Net Weight:</td><td style="padding: 8px; font-weight: bold; color: #166534;">{net} Quintals</td></tr>
                  <tr style="background: #ecfdf5;"><td style="padding: 12px; color: #047857; font-size: 1.1rem; font-weight: bold;">Final Verified DBT Payout:</td><td style="padding: 12px; font-size: 1.2rem; font-weight: bold; color: #047857;">₹{final_payout:,}</td></tr>
                </table>
              </div>
            </div>
            """
            smtp_success, smtp_info = dispatch_gmail_via_smtp(farmer_email, email_data['subject'], quotation_html, quotation_text)
            email_data['smtpDelivered'] = smtp_success
            email_data['smtpInfo'] = smtp_info

            if 'emails' not in data:
                data['emails'] = {}
            data['emails'][token] = email_data
            save_data(data)

            self.send_json(200, {
                'success': True,
                'record': record or email_data,
                'email': email_data,
                'queue': data.get('queues', {}).get(mandi_id, [])
            })
            return

        # API: Call Farmer to Weighbridge & Quality Inspection (Announce)
        if path == '/api/call-farmer':
            data = load_data()
            mandi_id = payload.get('mandiId', 'tn_pollachi')
            token = payload.get('token')
            mandi_queue = data.get('queues', {}).get(mandi_id, [])
            record = next((q for q in mandi_queue if q.get('token') == token), None)
            if not record:
                for m_id, q_list in data.get('queues', {}).items():
                    r = next((q for q in q_list if q.get('token') == token), None)
                    if r:
                        record = r
                        mandi_id = m_id
                        break

            if record:
                record['status'] = 'Weighing'
                save_data(data)
                self.send_json(200, {
                    'success': True,
                    'message': f'Farmer {record.get("farmerName")} called to Weighbridge Scale #1 for inspection & final price quotation.',
                    'record': record,
                    'queue': data.get('queues', {}).get(mandi_id, [])
                })
            else:
                self.send_json(404, {'success': False, 'message': 'Token not found'})
            return

        # API: Advance Token Workflow Stage
        if path == '/api/advance-stage':
            data = load_data()
            mandi_id = payload.get('mandiId', 'tn_pollachi')
            token = payload.get('token')
            mandi_queue = data.get('queues', {}).get(mandi_id, [])
            record = next((q for q in mandi_queue if q.get('token') == token), None)

            if record:
                curr = record.get('status', 'Scheduled')
                stages = ['Scheduled', 'Gate In', 'Quality Check', 'Weighing', 'Payment Ready', 'Completed']
                if curr in stages:
                    idx = stages.index(curr)
                    if idx < len(stages) - 1:
                        record['status'] = stages[idx + 1]
                save_data(data)
                self.send_json(200, {'success': True, 'record': record, 'queue': mandi_queue})
            else:
                self.send_json(404, {'success': False, 'message': 'Token not found'})
            return

        self.send_json(404, {'success': False, 'message': 'API endpoint not found'})


def run():
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    server_address = ('', PORT)
    httpd = ThreadingHTTPServer(server_address, KisanMitraHandler)
    print(f"🌾 KisanMitra Backend & Web Server live on http://localhost:{PORT}")
    httpd.serve_forever()

if __name__ == '__main__':
    run()
