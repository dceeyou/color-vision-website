import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, company, service, budget, details } = body;

    // Server-side validation
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid name." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== "string" || !emailRegex.test(email.trim())) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    const validServices = [
      "Brand Identity Design",
      "UI/UX Design",
      "Digital Product Design",
      "Web Design",
      "Design Systems",
      "Visual Communication",
      "Something Else",
      // Backwards-compatible matches
      "Brand Identity",
      "Something else",
    ];

    if (!service || !validServices.includes(service)) {
      return NextResponse.json(
        { success: false, error: "Please select a valid service category." },
        { status: 400 }
      );
    }

    if (!details || typeof details !== "string" || details.trim().length < 10) {
      return NextResponse.json(
        {
          success: false,
          error: "Please provide at least 10 characters describing your project details.",
        },
        { status: 400 }
      );
    }

    // Check for configured email provider or webhook
    const resendApiKey = process.env.RESEND_API_KEY;
    const webhookUrl = process.env.CONTACT_WEBHOOK_URL;
    const recipientEmail = process.env.CONTACT_NOTIFICATION_EMAIL || "info@colorvision.lk";

    const formattedCompany = company && typeof company === "string" ? company.trim() : "Not specified";
    const formattedBudget = budget && typeof budget === "string" ? budget.trim() : "Not specified";

    // 1. If Resend is configured
    if (resendApiKey) {
      try {
        const resendRes = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify({
            from: "Color Vision Inquiries <onboarding@resend.dev>",
            to: [recipientEmail],
            reply_to: email.trim(),
            subject: `[New Inquiry] ${service} — ${name.trim()}`,
            text: `New project inquiry received:\n\nName: ${name.trim()}\nEmail: ${email.trim()}\nCompany: ${formattedCompany}\nService: ${service}\nBudget: ${formattedBudget}\n\nProject Details:\n${details.trim()}`,
          }),
        });

        if (resendRes.ok) {
          return NextResponse.json({
            success: true,
            message:
              "Thanks for reaching out. We've received your project details and will get back to you soon.",
          });
        } else {
          const errData = await resendRes.json();
          console.error("[Contact API] Resend error:", errData);
          return NextResponse.json(
            {
              success: false,
              error: "Failed to dispatch email notification via email service.",
            },
            { status: 502 }
          );
        }
      } catch (err) {
        console.error("[Contact API] Resend dispatch exception:", err);
        return NextResponse.json(
          {
            success: false,
            error: "Failed to connect to email provider.",
          },
          { status: 500 }
        );
      }
    }

    // 2. If Webhook URL is configured (e.g. Zapier, Slack, Make, CRM)
    if (webhookUrl) {
      try {
        const webhookRes = await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: name.trim(),
            email: email.trim(),
            company: formattedCompany,
            service,
            budget: formattedBudget,
            details: details.trim(),
            submittedAt: new Date().toISOString(),
          }),
        });

        if (webhookRes.ok) {
          return NextResponse.json({
            success: true,
            message:
              "Thanks for reaching out. We've received your project details and will get back to you soon.",
          });
        }
      } catch (err) {
        console.error("[Contact API] Webhook dispatch exception:", err);
      }
    }

    // 3. Neither backend service is configured
    // Strictly follow rule: Do NOT pretend inquiries have been sent successfully.
    return NextResponse.json(
      {
        success: false,
        configured: false,
        error:
          "The project inquiry service backend is not yet configured with an email provider (such as RESEND_API_KEY or CONTACT_WEBHOOK_URL). Please send your inquiry directly to info@colorvision.lk.",
        recipientEmail,
      },
      { status: 503 }
    );
  } catch (err) {
    console.error("[Contact API] Unexpected error:", err);
    return NextResponse.json(
      {
        success: false,
        error: "An unexpected error occurred while processing your inquiry.",
      },
      { status: 500 }
    );
  }
}
