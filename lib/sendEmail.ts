type Plan = "single" | "pack";

export async function sendEvaltreeThankYouEmail(opts: {
  to: string;
  plan: Plan;
  sessionId: string;
  slug?: string;
}) {
  const { to, plan } = opts;

  const apiKey = process.env.BREVO_API_KEY;
  const senderName = process.env.BREVO_SENDER_NAME;
  const senderEmail = process.env.BREVO_SENDER_EMAIL;

  if (!apiKey) throw new Error("BREVO_API_KEY is missing");
  if (!senderName) throw new Error("BREVO_SENDER_NAME is missing");
  if (!senderEmail) throw new Error("BREVO_SENDER_EMAIL is missing");

  const libraryUrl =
    `${process.env.NEXT_PUBLIC_SITE_URL || "https://www.evaltree.com"}/evaltree/library`;

  const res = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": apiKey,
    },
    body: JSON.stringify({
      sender: { name: senderName, email: senderEmail },
      to: [{ email: to }],
      subject: "Your Evaltree purchase is confirmed",
      htmlContent: `
<div style="margin:0;padding:0;background:#F5F6F8;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:24px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0"
          style="background:#FFFFFF;border-radius:18px;
                 box-shadow:0 10px 30px rgba(15,28,63,0.08);overflow:hidden;">

          <!-- Header -->
          <tr>
            <td style="background:#0F1C3F;padding:22px 24px;color:#FFFFFF;
                       font-family:Inter,Arial,sans-serif;">
              <div style="font-size:16px;font-weight:700;">
                Evaltree Insights
              </div>
              <div style="font-size:13px;opacity:0.85;">
                by Crowbar
              </div>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:26px 24px;font-family:Inter,Arial,sans-serif;
                       color:#0F1C3F;font-size:14px;line-height:1.7;">
              
              <p style="margin:0 0 12px 0;">
                Thank you for your purchase.
              </p>

              <p style="margin:0 0 12px 0;">
                Your payment has been successfully processed, and your
                <b>
                  ${plan === "pack"
                    ? "purchased Evaltree Insight briefs"
                    : "purchased Evaltree Insight brief"}
                </b>
                are now securely available in your library.
              </p>

              <p style="margin:0 0 14px 0;">
                For security and compliance reasons, access to paid content is
                provided exclusively through your Evaltree Library.
                This ensures that only verified purchasers can view or download
                the full briefs.
              </p>

              <div style="background:#F5F6F8;border-radius:14px;
                          padding:14px 16px;margin:16px 0;">
                <div style="font-weight:700;margin-bottom:6px;">
                  What you can do next
                </div>
                <ul style="margin:0;padding-left:18px;">
                  <li>View your purchased brief(s) online</li>
                  <li>Download full PDFs anytime</li>
                  <li>Access your content securely from one place</li>
                </ul>
              </div>

              <div style="text-align:center;margin:24px 0;">
                <a href="${libraryUrl}"
                   style="display:inline-block;background:#FF6A00;
                          color:#FFFFFF;text-decoration:none;
                          padding:12px 20px;border-radius:12px;
                          font-weight:700;">
                  Go to My Library
                </a>
              </div>

              <p style="margin:0;font-size:13px;">
                If you experience any issues accessing your purchase,
                please contact us at
                <a href="mailto:support@crowbarltd.com"
                   style="color:#0F1C3F;text-decoration:underline;">
                  support@crowbarltd.com
                </a>.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:16px 24px;font-family:Inter,Arial,sans-serif;
                       font-size:11px;color:#555;line-height:1.6;">
              Payments are processed securely by Crowbar Ltd.<br/>
              Purchases are non-refundable due to the digital nature of the product.<br/>
              Evaltree Insights are informational research briefs and do not constitute
              legal, financial, or investment advice.
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
