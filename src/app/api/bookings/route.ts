import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';
import { Resend } from 'resend';

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// ADMIN EMAIL (Your Inbox)
const ADMIN_EMAIL = 'info@mirabytes.io'; 

// --- THE MAGIC LOGO STRING (Base64 Encoded SVG) ---
const LOGO_BASE64 = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB4PSIyIiB5PSIyIiB3aWR0aD0iMzYiIGhlaWdodD0iMzYiIHJ4PSI4IiBmaWxsPSJyZ2JhKDM3LDk5LDIzNSwwLjIpIiBzdHJva2U9InJnYmEoNTksMTMwLDI0NiwwLjUpIiBzdHJva2Utd2lkdGg9IjEiLz48cGF0aCBkPSJNMTIgMjhWMTJMMjAgMjBMMjggMTJWMjgiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMi41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz48Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIyIiBmaWxsPSIjMjJkM2VlIi8+PGNpcmNsZSBjeD0iMjgiIGN5PSIxMiIgcj0iMiIgZmlsbD0iIzIyZDNlZSIvPjxjaXJjbGUgY3g9IjIwIiBjeT0iMjAiIHI9IjIiIGZpbGw9IiM2MGE1ZmEiLz48Y2lyY2xlIGN4PSIxMiIgY3k9IjI4IiByPSIyIiBmaWxsPSIjYzA4NGZjIi8+PGNpcmNsZSBjeD0iMjgiIGN5PSIyOCIgcj0iMiIgZmlsbD0iI2MwODRmYyIvPjxwYXRoIGQ9Ik0yMCAyMFYyOCIgc3Ryb2tlPSIjYTc4YmZhIiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PC9zdmc+";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get('date');

  if (!date) return NextResponse.json({ error: 'Date required' }, { status: 400 });

  const { data, error } = await supabase
    .from('bookings')
    .select('booking_time')
    .eq('booking_date', date);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ bookedTimes: data.map((b: any) => b.booking_time) });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("1. Processing submission for:", body.email);

    // --- LOGIC: Determine Submission Type ---
    // If 'time' exists and looks like a slot (e.g. "09:00 AM"), it's a Booking.
    // Otherwise, it's a Lead (Resource Download).
    const isBooking = body.time && (body.time.includes('AM') || body.time.includes('PM'));
    const entryType = isBooking ? 'Strategy Session' : 'Resource Request';

    // Fallbacks for DB (Leads don't select a date, so we use "Today")
    const dbDate = body.date || new Date().toISOString().split('T')[0];
    const dbTime = body.time || 'Lead-Capture'; 

    // --- 1. Insert into Supabase ---
    const { error } = await supabase
      .from('bookings')
      .insert([{
        name: body.name,
        email: body.email,
        company: body.company,
        subject: body.subject,
        message: body.message || `Lead Source: ${entryType}`,
        booking_date: dbDate,
        booking_time: dbTime
      }]);

    if (error) {
      if (error.code === '23505') { 
          return NextResponse.json({ success: false, message: 'This slot was just taken!' }, { status: 409 });
      }
      return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }

    // --- 2. Email Automation (Resend Only) ---
    if (process.env.RESEND_API_KEY) {
        
        // A. ADMIN EMAIL (To You)
        await resend.emails.send({
            from: 'Mirabytes System <info@mirabytes.io>',
            to: ADMIN_EMAIL, 
            replyTo: body.email, 
            subject: `🚀 New ${entryType}: ${body.name}`,
            html: `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #334155; margin: 0; padding: 0; background-color: #f1f5f9; }
                    .container { max-width: 600px; margin: 40px auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; }
                    .header { background-color: #020617; padding: 32px; text-align: center; }
                    .logo-img { width: 48px; height: 48px; display: inline-block; vertical-align: middle; margin-right: 12px; }
                    .logo-text { color: white; font-size: 26px; font-weight: 800; text-decoration: none; display: inline-block; vertical-align: middle; }
                    .logo-dot { color: #60a5fa; }
                    .content { padding: 40px 32px; }
                    /* Dynamic Badge Color: Green for Booking, Blue for Lead */
                    .badge { background-color: ${isBooking ? '#22c55e' : '#3b82f6'}; color: white; font-size: 11px; font-weight: 700; text-transform: uppercase; padding: 4px 8px; border-radius: 4px; display: inline-block; margin-bottom: 12px; letter-spacing: 1px; }
                    .h1 { color: #0f172a; font-size: 22px; font-weight: 700; margin: 0 0 24px 0; }
                    
                    .data-row { display: flex; border-bottom: 1px solid #f1f5f9; padding: 12px 0; }
                    .data-label { width: 120px; font-weight: 600; color: #64748b; font-size: 13px; text-transform: uppercase; }
                    .data-value { flex: 1; color: #0f172a; font-size: 15px; font-weight: 500; }
                    .footer { background-color: #f8fafc; padding: 16px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <img src="${LOGO_BASE64}" alt="Mirabytes" class="logo-img" />
                        <span class="logo-text">Mirabytes<span class="logo-dot">.io</span></span>
                    </div>
                    <div class="content">
                        <span class="badge">New ${entryType}</span>
                        <h1 class="h1">${entryType} Received</h1>
                        
                        <div class="data-row">
                            <div class="data-label">Client</div>
                            <div class="data-value">${body.name}</div>
                        </div>
                        <div class="data-row">
                            <div class="data-label">Email</div>
                            <div class="data-value"><a href="mailto:${body.email}" style="color: #2563eb; text-decoration: none;">${body.email}</a></div>
                        </div>
                        <div class="data-row">
                            <div class="data-label">Company</div>
                            <div class="data-value">${body.company || '-'}</div>
                        </div>
                        <div class="data-row" style="border-bottom: none;">
                            <div class="data-label">Details</div>
                            <div class="data-value">${body.subject}</div>
                        </div>
                        
                        ${isBooking ? `
                        <div class="data-row">
                            <div class="data-label">Time</div>
                            <div class="data-value">${body.date} @ ${body.time}</div>
                        </div>` : ''}

                    </div>
                    <div class="footer">
                        Admin Notification • Sent via System
                    </div>
                </div>
            </body>
            </html>
            `
        });

        // B. CLIENT EMAIL (To User)
        // Dynamic Subject & Content based on type
        const userSubject = isBooking ? 'Confirmed: Your Strategy Session' : 'Received: Your Request for Information';
        
        // This block decides what the "Card" in the email shows
        const cardContentHtml = isBooking 
            ? `
                <div style="margin-bottom: 16px;">
                    <div class="card-label">Date</div>
                    <div class="card-value">${body.date}</div>
                </div>
                <div style="margin-bottom: 16px;">
                    <div class="card-label">Time</div>
                    <div class="card-value">${body.time} (GMT)</div>
                </div>
                <div>
                    <div class="card-label">Next Steps</div>
                    <div class="card-value">A follow-up meeting invite will be sent shortly.</div>
                </div>
              `
            : `
                <div style="margin-bottom: 16px;">
                    <div class="card-label">Resource Requested</div>
                    <div class="card-value">${body.subject}</div>
                </div>
                <div>
                    <div class="card-label">Status</div>
                    <div class="card-value">Request Received. We will email the materials shortly.</div>
                </div>
              `;

        await resend.emails.send({
            from: 'Mirabytes Consulting <info@mirabytes.io>', 
            to: body.email, 
            subject: userSubject,
            html: `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #334155; margin: 0; padding: 0; background-color: #f8fafc; }
                    .container { max-width: 600px; margin: 40px auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); }
                    .header { background-color: #020617; padding: 32px; text-align: center; }
                    .logo-img { width: 48px; height: 48px; display: inline-block; vertical-align: middle; margin-right: 12px; }
                    .logo-text { color: white; font-size: 26px; font-weight: 800; text-decoration: none; display: inline-block; vertical-align: middle; }
                    .logo-dot { color: #60a5fa; }
                    .content { padding: 40px 32px; }
                    .h1 { color: #0f172a; font-size: 24px; font-weight: 700; margin-top: 0; margin-bottom: 16px; }
                    .p { margin-bottom: 24px; font-size: 16px; color: #475569; }
                    .card { background-color: #f1f5f9; border-left: 4px solid #3b82f6; border-radius: 8px; padding: 24px; margin: 24px 0; }
                    .card-label { font-weight: 600; color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; }
                    .card-value { font-weight: 700; color: #0f172a; font-size: 16px; margin-top: 4px; }
                    .footer { background-color: #f8fafc; padding: 24px; text-align: center; border-top: 1px solid #e2e8f0; font-size: 13px; color: #94a3b8; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <img src="${LOGO_BASE64}" alt="Mirabytes Logo" class="logo-img" />
                        <span class="logo-text">Mirabytes<span class="logo-dot">.io</span></span>
                    </div>
                    <div class="content">
                        <h1 class="h1">${isBooking ? 'Session Confirmed' : 'Request Received'}</h1>
                        <p class="p">Hello ${body.name},</p>
                        <p class="p">
                            ${isBooking 
                                ? "Your technical strategy session has been successfully scheduled." 
                                : "Thank you for your interest. We have received your request."}
                        </p>
                        
                        <div class="card">
                            ${cardContentHtml}
                        </div>
                        
                        <p class="p">If you have any questions, simply reply to this email.</p>
                    </div>
                    <div class="footer">
                        &copy; 2025 Mirabytes Consulting. All rights reserved.<br>
                        London, UK (Global Remote)
                    </div>
                </div>
            </body>
            </html>
            `
        });

        console.log("Emails dispatched successfully via Resend.");
    } else {
        console.warn("WARNING: RESEND_API_KEY is missing in env.");
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Server Error:", err);
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}