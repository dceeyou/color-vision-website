"use client";

import React, { useState } from "react";
import { CheckCircle2, AlertCircle, ArrowRight, Loader2, Mail, MessageSquare } from "lucide-react";
import { ContactFormData } from "@/lib/contact/types";

interface ContactFormProps {
  data: ContactFormData;
}

export default function ContactForm({ data }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    service: "",
    budget: "",
    details: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error" | "unconfigured">("idle");
  const [statusMessage, setStatusMessage] = useState<string>("");

  const validateField = (field: string, value: string): string => {
    switch (field) {
      case "name":
        if (!value.trim()) return "Full name is required.";
        if (value.trim().length < 2) return "Name must be at least 2 characters.";
        return "";
      case "email":
        if (!value.trim()) return "Email address is required.";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
          return "Please enter a valid email address.";
        }
        return "";
      case "service":
        if (!value) return "Please select a service category.";
        return "";
      case "details":
        if (!value.trim()) return "Project details are required.";
        if (value.trim().length < 10) return "Please provide at least 10 characters describing your project.";
        return "";
      default:
        return "";
    }
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const error = validateField(field, formData[field as keyof typeof formData]);
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) {
      const error = validateField(field, value);
      setErrors((prev) => ({ ...prev, [field]: error }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all required fields touched
    const allTouched = {
      name: true,
      email: true,
      service: true,
      details: true,
    };
    setTouched((prev) => ({ ...prev, ...allTouched }));

    // Validate all required fields
    const newErrors: Record<string, string> = {
      name: validateField("name", formData.name),
      email: validateField("email", formData.email),
      service: validateField("service", formData.service),
      details: validateField("details", formData.details),
    };

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((err) => err.length > 0);
    if (hasErrors) {
      const firstErrorKey = Object.keys(newErrors).find((k) => newErrors[k]);
      if (firstErrorKey) {
        document.getElementById(`field-${firstErrorKey}`)?.focus();
      }
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");
    setStatusMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const resData = await res.json().catch(() => ({}));

      if (res.ok && resData.success) {
        setSubmitStatus("success");
        setStatusMessage(
          resData.message || "Thank you. Your inquiry has been received. We will review your project and get back to you soon."
        );
      } else if (res.status === 503) {
        // Honest unconfigured backend state per specification
        setSubmitStatus("unconfigured");
        setStatusMessage(
          resData.error ||
            "The automated inquiry backend is currently in preview mode. Please reach out to us directly via email or WhatsApp below."
        );
      } else {
        setSubmitStatus("error");
        setStatusMessage(resData.error || "Something went wrong while submitting your inquiry. Please try again or reach out directly.");
      }
    } catch (err) {
      console.error("[ContactForm] Submit error:", err);
      setSubmitStatus("error");
      setStatusMessage("Unable to reach the server. Please check your connection or reach out to info@colorvision.lk.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      company: "",
      service: "",
      budget: "",
      details: "",
    });
    setTouched({});
    setErrors({});
    setSubmitStatus("idle");
    setStatusMessage("");
  };

  return (
    <div className="rounded-2xl border border-white/[0.1] bg-[#111218] p-6 sm:p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
      {/* Form Header */}
      <div className="mb-8 sm:mb-10 pb-6 border-b border-white/[0.08]">
        <h2 className="text-[26px] sm:text-[30px] md:text-[34px] font-[800] tracking-[-0.03em] text-[#F4F2ED]">
          {data.heading}
        </h2>
        <p className="mt-2 text-[#92939B] text-[15px] sm:text-[16px] leading-[1.65]">
          {data.description}
        </p>
      </div>

      {/* Success Notification */}
      {submitStatus === "success" && (
        <div className="p-6 rounded-xl border border-emerald-500/30 bg-emerald-500/10 mb-8 flex flex-col gap-3">
          <div className="flex items-center gap-3 text-emerald-400 font-[700] text-[16px]">
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <span>Inquiry Received</span>
          </div>
          <p className="text-emerald-200/80 text-[14px] leading-relaxed">
            {statusMessage}
          </p>
          <button
            type="button"
            onClick={handleReset}
            className="self-start mt-2 px-4 py-2 rounded-full border border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/20 text-[12px] font-mono tracking-wider uppercase transition-colors"
          >
            Submit another inquiry
          </button>
        </div>
      )}

      {/* Backend Integration Notice (Honest state when email service is unconfigured) */}
      {submitStatus === "unconfigured" && (
        <div className="p-6 rounded-xl border border-[#FF5108]/30 bg-[#FF5108]/10 mb-8 flex flex-col gap-4">
          <div className="flex items-start gap-3 text-[#FF5108] font-[700] text-[15px]">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <div>
              <div className="text-[#F4F2ED] font-[700]">Direct Delivery Required</div>
              <p className="text-[#B2B4BC] text-[13.5px] font-[400] mt-1 leading-relaxed">
                {statusMessage}
              </p>
            </div>
          </div>

          <div className="pt-2 border-t border-[#FF5108]/20 flex flex-wrap gap-3">
            <a
              href={`mailto:info@colorvision.lk?subject=${encodeURIComponent(
                `[Project Inquiry] ${formData.service || "Design Inquiry"} — ${formData.name || "Client"}`
              )}&body=${encodeURIComponent(
                `Name: ${formData.name}\nEmail: ${formData.email}\nCompany: ${formData.company || "N/A"}\nService: ${formData.service}\nBudget: ${formData.budget || "N/A"}\n\nProject Details:\n${formData.details}`
              )}`}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#FF5108] text-[#08090D] font-[700] text-[12px] tracking-[0.14em] uppercase hover:bg-white transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span>Email directly to info@colorvision.lk</span>
            </a>

            <a
              href="https://wa.me/94761428445"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-white/20 text-[#F4F2ED] font-[600] text-[12px] tracking-[0.14em] uppercase hover:border-[#FF5108] hover:text-[#FF5108] transition-colors"
            >
              <MessageSquare className="w-4 h-4 text-[#25D366]" />
              <span>Message on WhatsApp</span>
            </a>
          </div>
        </div>
      )}

      {/* Submission Error Notification */}
      {submitStatus === "error" && (
        <div className="p-5 rounded-xl border border-red-500/30 bg-red-500/10 mb-8 flex items-start gap-3 text-red-300 text-[14px]">
          <AlertCircle className="w-5 h-5 shrink-0 text-red-400 mt-0.5" />
          <p>{statusMessage}</p>
        </div>
      )}

      {/* The Form */}
      <form onSubmit={handleSubmit} noValidate className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Full Name Field */}
          <div>
            <label
              htmlFor="field-name"
              className="block text-[13px] font-[600] uppercase tracking-[0.12em] text-[#F4F2ED] mb-2"
            >
              Full Name <span className="text-[#FF5108]">*</span>
            </label>
            <input
              type="text"
              id="field-name"
              name="name"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              onBlur={() => handleBlur("name")}
              placeholder="e.g. Alex Morgan"
              className={`w-full px-4 py-3.5 rounded-xl bg-white/[0.03] border text-[#F4F2ED] placeholder:text-[#737680] text-[15px] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5108] ${
                touched.name && errors.name
                  ? "border-red-500/70 bg-red-500/[0.02]"
                  : "border-white/[0.12] hover:border-white/[0.2] focus:border-[#FF5108]"
              }`}
              aria-invalid={Boolean(touched.name && errors.name)}
              aria-describedby={touched.name && errors.name ? "error-name" : undefined}
            />
            {touched.name && errors.name && (
              <p id="error-name" className="text-red-400 text-[12.5px] mt-1.5 flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.name}</span>
              </p>
            )}
          </div>

          {/* Email Address Field */}
          <div>
            <label
              htmlFor="field-email"
              className="block text-[13px] font-[600] uppercase tracking-[0.12em] text-[#F4F2ED] mb-2"
            >
              Email Address <span className="text-[#FF5108]">*</span>
            </label>
            <input
              type="email"
              id="field-email"
              name="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              onBlur={() => handleBlur("email")}
              placeholder="e.g. alex@company.com"
              className={`w-full px-4 py-3.5 rounded-xl bg-white/[0.03] border text-[#F4F2ED] placeholder:text-[#737680] text-[15px] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5108] ${
                touched.email && errors.email
                  ? "border-red-500/70 bg-red-500/[0.02]"
                  : "border-white/[0.12] hover:border-white/[0.2] focus:border-[#FF5108]"
              }`}
              aria-invalid={Boolean(touched.email && errors.email)}
              aria-describedby={touched.email && errors.email ? "error-email" : undefined}
            />
            {touched.email && errors.email && (
              <p id="error-email" className="text-red-400 text-[12.5px] mt-1.5 flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.email}</span>
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Company / Business Field (Optional) */}
          <div>
            <label
              htmlFor="field-company"
              className="block text-[13px] font-[600] uppercase tracking-[0.12em] text-[#F4F2ED] mb-2"
            >
              Company / Business <span className="text-[#737680] font-[400] text-[11px] font-mono">(Optional)</span>
            </label>
            <input
              type="text"
              id="field-company"
              name="company"
              value={formData.company}
              onChange={(e) => handleChange("company", e.target.value)}
              placeholder="e.g. Studio, Brand, or Startup"
              className="w-full px-4 py-3.5 rounded-xl bg-white/[0.03] border border-white/[0.12] hover:border-white/[0.2] focus:border-[#FF5108] text-[#F4F2ED] placeholder:text-[#737680] text-[15px] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5108]"
            />
          </div>

          {/* Service Required Dropdown */}
          <div>
            <label
              htmlFor="field-service"
              className="block text-[13px] font-[600] uppercase tracking-[0.12em] text-[#F4F2ED] mb-2"
            >
              Service Required <span className="text-[#FF5108]">*</span>
            </label>
            <select
              id="field-service"
              name="service"
              value={formData.service}
              onChange={(e) => handleChange("service", e.target.value)}
              onBlur={() => handleBlur("service")}
              className={`w-full px-4 py-3.5 rounded-xl bg-[#0e0f14] border text-[#F4F2ED] text-[15px] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5108] cursor-pointer ${
                touched.service && errors.service
                  ? "border-red-500/70"
                  : "border-white/[0.12] hover:border-white/[0.2] focus:border-[#FF5108]"
              }`}
              aria-invalid={Boolean(touched.service && errors.service)}
              aria-describedby={touched.service && errors.service ? "error-service" : undefined}
            >
              <option value="" disabled className="text-[#737680]">
                Select a service
              </option>
              {data.serviceOptions.map((opt) => (
                <option key={opt} value={opt} className="bg-[#111218] text-[#F4F2ED]">
                  {opt}
                </option>
              ))}
            </select>
            {touched.service && errors.service && (
              <p id="error-service" className="text-red-400 text-[12.5px] mt-1.5 flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.service}</span>
              </p>
            )}
          </div>
        </div>

        {/* Project Budget Field (Optional) */}
        <div>
          <label
            htmlFor="field-budget"
            className="block text-[13px] font-[600] uppercase tracking-[0.12em] text-[#F4F2ED] mb-2"
          >
            Estimated Budget <span className="text-[#737680] font-[400] text-[11px] font-mono">(Optional range)</span>
          </label>
          <select
            id="field-budget"
            name="budget"
            value={formData.budget}
            onChange={(e) => handleChange("budget", e.target.value)}
            className="w-full px-4 py-3.5 rounded-xl bg-[#0e0f14] border border-white/[0.12] hover:border-white/[0.2] focus:border-[#FF5108] text-[#F4F2ED] text-[15px] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5108] cursor-pointer"
          >
            <option value="" className="text-[#737680]">
              Select budget range (optional)
            </option>
            {data.budgetOptions.map((opt) => (
              <option key={opt} value={opt} className="bg-[#111218] text-[#F4F2ED]">
                {opt}
              </option>
            ))}
          </select>
        </div>

        {/* Project Details Textarea */}
        <div>
          <label
            htmlFor="field-details"
            className="block text-[13px] font-[600] uppercase tracking-[0.12em] text-[#F4F2ED] mb-2"
          >
            Project Details <span className="text-[#FF5108]">*</span>
          </label>
          <textarea
            id="field-details"
            name="details"
            rows={5}
            value={formData.details}
            onChange={(e) => handleChange("details", e.target.value)}
            onBlur={() => handleBlur("details")}
            placeholder="Tell us about the challenge you're facing, the timeline you have in mind, and what you hope to achieve..."
            className={`w-full px-4 py-3.5 rounded-xl bg-white/[0.03] border text-[#F4F2ED] placeholder:text-[#737680] text-[15px] leading-relaxed transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5108] resize-y ${
              touched.details && errors.details
                ? "border-red-500/70 bg-red-500/[0.02]"
                : "border-white/[0.12] hover:border-white/[0.2] focus:border-[#FF5108]"
            }`}
            aria-invalid={Boolean(touched.details && errors.details)}
            aria-describedby={touched.details && errors.details ? "error-details" : undefined}
          />
          {touched.details && errors.details && (
            <p id="error-details" className="text-red-400 text-[12.5px] mt-1.5 flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{errors.details}</span>
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-4 sm:py-4.5 rounded-full bg-[#FF5108] text-[#08090D] font-[700] text-[13px] sm:text-[14px] uppercase tracking-[0.16em] hover:bg-white hover:shadow-[0_0_28px_rgba(255,81,8,0.4)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#FF5108]"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Sending Inquiry...</span>
              </>
            ) : (
              <>
                <span>SEND PROJECT INQUIRY</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
                  →
                </span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
