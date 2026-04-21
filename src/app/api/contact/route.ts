import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

// TODO_CLIENT: Replace with confirmed business email once provided.
// Currently using assumed address — confirmed in content.ts as info@metricline.ca
const TO_EMAIL = process.env.CONTACT_EMAIL ?? "info@metricline.ca";
const FROM_EMAIL = process.env.FROM_EMAIL ?? "noreply@metricline.ca";

// Lazy instantiation — avoids build-time failure when env var is absent.
// RESEND_API_KEY must be set in .env.local (or Vercel env) before going live.
let _resend: Resend | null = null;
function getResend(): Resend {
  if (!_resend) {
    const key = process.env.RESEND_API_KEY;
    if (!key) throw new Error("RESEND_API_KEY environment variable is not set.");
    _resend = new Resend(key);
  }
  return _resend;
}

// ── Types ─────────────────────────────────────────────────────

interface ContactPayload {
  name: string;
  company: string;
  email: string;
  phone?: string;
  enquiryType: "new-project" | "rental-enquiry" | "careers" | "general";
  message: string;
}

const ENQUIRY_LABELS: Record<ContactPayload["enquiryType"], string> = {
  "new-project": "New Project Enquiry",
  "rental-enquiry": "Equipment Rental Enquiry",
  "careers": "Careers",
  "general": "General",
};

// ── Validation ────────────────────────────────────────────────

function validate(body: unknown): body is ContactPayload {
  if (!body || typeof body !== "object") return false;
  const b = body as Record<string, unknown>;

  if (typeof b.name !== "string" || b.name.trim().length < 2) return false;
  if (typeof b.company !== "string" || b.company.trim().length < 1) return false;
  if (typeof b.email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(b.email)) return false;
  if (typeof b.message !== "string" || b.message.trim().length < 20) return false;
  if (
    b.enquiryType !== "new-project" &&
    b.enquiryType !== "rental-enquiry" &&
    b.enquiryType !== "careers" &&
    b.enquiryType !== "general"
  ) return false;

  return true;
}

// ── Email HTML ────────────────────────────────────────────────

function buildEmailHtml(data: ContactPayload): string {
  const enquiryLabel = ENQUIRY_LABELS[data.enquiryType];
  const phone = data.phone?.trim() || "—";
  const message = data.message.replace(/\n/g, "<br />");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin:0;padding:0;background:#0A0A0A;font-family:system-ui,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0A0A0A;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="background:#111111;border-left:4px solid #E8742A;padding:32px 32px 24px;">
              <p style="margin:0 0 6px;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#E8742A;font-family:monospace;">
                New Enquiry Received
              </p>
              <h1 style="margin:0;font-size:22px;font-weight:700;color:#FFFFFF;letter-spacing:-0.02em;">
                ${enquiryLabel}
              </h1>
              <p style="margin:8px 0 0;font-size:11px;color:rgba(255,255,255,0.35);font-family:monospace;">
                metricline.ca/contact — Transmission received
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="background:#161616;padding:32px;">

              <!-- Sender info -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding-bottom:20px;border-bottom:1px solid #222222;">
                    <p style="margin:0 0 4px;font-size:9px;letter-spacing:0.14em;text-transform:uppercase;color:rgba(255,255,255,0.3);font-family:monospace;">From</p>
                    <p style="margin:0;font-size:16px;font-weight:600;color:#FFFFFF;">${data.name}</p>
                    <p style="margin:2px 0 0;font-size:13px;color:rgba(255,255,255,0.5);">${data.company}</p>
                  </td>
                </tr>
              </table>

              <!-- Contact details -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:20px;">
                <tr>
                  <td width="50%" style="padding-bottom:16px;padding-right:12px;vertical-align:top;">
                    <p style="margin:0 0 4px;font-size:9px;letter-spacing:0.14em;text-transform:uppercase;color:rgba(255,255,255,0.3);font-family:monospace;">Email</p>
                    <a href="mailto:${data.email}" style="font-size:13px;color:#E8742A;text-decoration:none;">${data.email}</a>
                  </td>
                  <td width="50%" style="padding-bottom:16px;padding-left:12px;vertical-align:top;">
                    <p style="margin:0 0 4px;font-size:9px;letter-spacing:0.14em;text-transform:uppercase;color:rgba(255,255,255,0.3);font-family:monospace;">Phone</p>
                    <p style="margin:0;font-size:13px;color:rgba(255,255,255,0.6);">${phone}</p>
                  </td>
                </tr>
                <tr>
                  <td colspan="2" style="padding-bottom:16px;vertical-align:top;">
                    <p style="margin:0 0 4px;font-size:9px;letter-spacing:0.14em;text-transform:uppercase;color:rgba(255,255,255,0.3);font-family:monospace;">Enquiry Type</p>
                    <p style="margin:0;font-size:13px;color:rgba(255,255,255,0.6);">${enquiryLabel}</p>
                  </td>
                </tr>
              </table>

              <!-- Message -->
              <div style="margin-top:12px;padding:20px;background:#111111;border:1px solid #222222;">
                <p style="margin:0 0 10px;font-size:9px;letter-spacing:0.14em;text-transform:uppercase;color:rgba(255,255,255,0.3);font-family:monospace;">Message</p>
                <p style="margin:0;font-size:14px;color:rgba(255,255,255,0.7);line-height:1.7;">${message}</p>
              </div>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#0A0A0A;padding:20px 32px;border-top:1px solid #1a1a1a;">
              <p style="margin:0;font-size:9px;letter-spacing:0.1em;text-transform:uppercase;color:rgba(255,255,255,0.2);font-family:monospace;">
                Metricline Projects Ltd. · Calgary, Alberta · metricline.ca
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

// ── Route handler ─────────────────────────────────────────────

export async function POST(req: NextRequest): Promise<NextResponse> {
  let body: unknown;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  if (!validate(body)) {
    return NextResponse.json({ error: "Invalid or missing fields" }, { status: 422 });
  }

  const enquiryLabel = ENQUIRY_LABELS[body.enquiryType];

  let resend: Resend;
  try {
    resend = getResend();
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Email service not configured" }, { status: 503 });
  }

  const { error } = await resend.emails.send({
    from: `Metricline Contact Form <${FROM_EMAIL}>`,
    to: [TO_EMAIL],
    replyTo: body.email,
    subject: `[${enquiryLabel}] ${body.name} — ${body.company}`,
    html: buildEmailHtml(body),
  });

  if (error) {
    console.error("Resend error:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
