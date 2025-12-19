// lib/sendEmail.ts (or lib/sendmail.ts – keep your filename/import consistent)

type Plan = "single" | "pack";

export async function sendEvaltreeThankYouEmail(opts: {
  to: string;
  plan: Plan;
  sessionId: string;
  slug?: string; // ✅ NEW: required for single purchase link
}) {
  const { to, plan, sessionId, slug } = opts;

  // ✅ Use your real site url (better: move to env NEXT_PUBLIC_SITE_URL)
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.SITE_URL ||
    "https://www.evaltree.com";

  // ✅ Guard: single must include slug (KEEP)
  if (plan === "single" && !slug) {
    throw new Error("Missing slug for single purchase email link");
  }

  // ✅ UPDATED: session_id + slug for single, only session_id for pack
  // (No functionality removed — we just avoid encoding an empty slug)
  const downloadUrl =
    plan === "single"
      ? `${baseUrl}/evaltree/thank-you?session_id=${encodeURIComponent(
          sessionId
        )}&slug=${encodeURIComponent(slug)}`
      : `${baseUrl}/evaltree/thank-you?session_id=${encodeURIComponent(
          sessionId
        )}`;

  const apiKey = process.env.BREVO_API_KEY;
  const senderName = process.env.BREVO_SENDER_NAME;
  const senderEmail = process.env.BREVO_SENDER_EMAIL;

  if (!apiKey) throw new Error("BREVO_API_KEY is missing");
  if (!senderName) throw new Error("BREVO_SENDER_NAME is missing");
  if (!senderEmail) throw new Error("BREVO_SENDER_EMAIL is missing");

  const res = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": apiKey,
    },
    body: JSON.stringify({
      sender: { name: senderName, email: senderEmail },
      to: [{ email: to }],
      subject:
        plan === "pack"
          ? "Your Evaltree Insights access is ready"
          : "Your Evaltree Insight is ready",
      htmlContent: `
  <div style="margin:0;padding:0;background:#F5F6F8;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F5F6F8;padding:24px 0;">
      <tr>
        <td align="center" style="padding:0 12px;">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0"
            style="width:600px;max-width:600px;background:#FFFFFF;border-radius:18px;overflow:hidden;
                   box-shadow:0 10px 30px rgba(15,28,63,0.08);">
            
            <!-- Header -->
            <tr>
              <td style="background:#0F1C3F;padding:22px 24px;">
                <div style="font-family:Inter,Arial,sans-serif;color:#FFFFFF;">
                  <div style="font-size:16px;font-weight:700;letter-spacing:0.2px;">
                    Evaltree Insights
                  </div>
                  <div style="font-size:13px;opacity:0.85;margin-top:3px;">
                    by Crowbar
                  </div>
                </div>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding:26px 24px 8px 24px;">
                <div style="font-family:Inter,Arial,sans-serif;color:#0F1C3F;line-height:1.55;">
                  
                  <div style="display:inline-block;background:#F5F6F8;border-radius:999px;padding:8px 12px;
                              font-size:12px;font-weight:600;color:#0F1C3F;">
                    ✅ Payment confirmed
                  </div>

                  <h1 style="margin:14px 0 8px 0;font-size:22px;line-height:1.25;">
                    Thanks for your purchase.
                  </h1>

                  <p style="margin:0 0 14px 0;font-size:14px;color:#0F1C3F;opacity:0.92;">
                    Your access is ready: 
                    <b>${plan === "pack" ? "Five Briefs" : "One Brief of your choice"}</b>.
                    Evaltree Insights are concise 3–5 page research briefs designed to help you understand complex topics quickly and confidently.
                  </p>

                  <div style="background:#F5F6F8;border:1px solid rgba(15,28,63,0.08);border-radius:14px;padding:14px 14px;margin:14px 0;">
                    <div style="font-size:13px;font-weight:700;margin-bottom:6px;">
                      What you can do next
                    </div>
                    <ul style="margin:0;padding-left:18px;font-size:13px;color:#0F1C3F;opacity:0.9;">
                      <li>
                        ${
                          plan === "pack"
                            ? "Download up to 5 briefs from the current list (as more briefs are published, you’ll have access based on your purchase)."
                            : "Select any one brief from the list to download. Once selected, your one-download access is consumed."
                        }
                      </li>
                      <li>Save the download page link below for future access.</li>
                      <li>If you face any issue, contact support and we’ll help quickly.</li>
                    </ul>
                  </div>

                </div>
              </td>
            </tr>

            <!-- CTA -->
            <tr>
              <td align="center" style="padding:10px 24px 18px 24px;">
                <a href="${downloadUrl}"
                   style="display:inline-block;background:#FF6A00;color:#FFFFFF;text-decoration:none;
                          padding:12px 18px;border-radius:12px;font-family:Inter,Arial,sans-serif;
                          font-weight:700;font-size:14px;">
                  Access your brief(s)
                </a>
                <div style="font-family:Inter,Arial,sans-serif;font-size:12px;opacity:0.75;margin-top:10px;color:#0F1C3F;">
                  If the button doesn’t work, copy and paste this link:
                  <div style="word-break:break-all;margin-top:6px;">
                    <a href="${downloadUrl}" style="color:#0F1C3F;text-decoration:underline;">
                      ${downloadUrl}
                    </a>
                  </div>
                </div>
              </td>
            </tr>

            <!-- Divider -->
            <tr>
              <td style="padding:0 24px;">
                <div style="height:1px;background:rgba(15,28,63,0.10);"></div>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="padding:16px 24px 22px 24px;">
                <div style="font-family:Inter,Arial,sans-serif;color:#0F1C3F;">
                  <div style="font-size:12px;opacity:0.85;line-height:1.6;">
                    <b>Evaltree Insights by Crowbar</b><br/>
                    Website: <a href="https://www.evaltree.com" style="color:#0F1C3F;text-decoration:underline;">evaltree.com</a> &nbsp;•&nbsp;
                    Crowbar: <a href="https://crowbarltd.com" style="color:#0F1C3F;text-decoration:underline;">crowbarltd.com</a><br/>
                    LinkedIn: <a href="https://www.linkedin.com/company/crowbar-limited" style="color:#0F1C3F;text-decoration:underline;">Crowbar Ltd</a><br/>
                    Support: <a href="mailto:support@crowbarltd.com" style="color:#0F1C3F;text-decoration:underline;">support@crowbarltd.com</a>
                  </div>

                  <div style="margin-top:12px;font-size:11px;opacity:0.65;line-height:1.6;">
                    Payments processed securely by Crowbar Ltd. 
                    Purchases are non-refundable due to the digital nature of the product.
                    Evaltree Insights are informational research briefs only and do not constitute legal, financial, or investment advice.
                  </div>
                </div>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </div>
`,
    }),
  });

  const text = await res.text();
  console.log("Brevo response:", res.status, text);

  if (!res.ok) {
    throw new Error(`Brevo send failed: ${res.status} ${text}`);
  }
}
