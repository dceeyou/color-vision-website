"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ContactContent } from "@/lib/wordpress/types";

export default function Contact({ contact: propContact }: { contact?: ContactContent }) {
  const containerRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // Form input state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    details: "",
  });

  // Validation errors
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [responseMessage, setResponseMessage] = useState<string>("");
  const [fallbackEmail, setFallbackEmail] = useState<string>("info@colorvision.lk");

  const serviceOptions = [
    "Brand Identity",
    "UI/UX Design",
    "Digital Product Design",
    "Web Design",
    "Design Systems",
    "Visual Communication",
    "Something else",
  ];

  // Validation logic
  const validateField = (field: string, value: string): string => {
    switch (field) {
      case "name":
        if (!value.trim()) return "Please enter your name.";
        if (value.trim().length < 2) return "Name must be at least 2 characters.";
        return "";
      case "email":
        if (!value.trim()) return "Please enter your email address.";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
          return "Please enter a valid email address.";
        }
        return "";
      case "service":
        if (!value || !serviceOptions.includes(value)) {
          return "Please select what you need.";
        }
        return "";
      case "details":
        if (!value.trim()) return "Please share some details about your project.";
        if (value.trim().length < 10) {
          return "Please provide at least 10 characters.";
        }
        return "";
      default:
        return "";
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const newErrors: Record<string, string> = {
      name: validateField("name", formData.name),
      email: validateField("email", formData.email),
      service: validateField("service", formData.service),
      details: validateField("details", formData.details),
    };

    setTouched({
      name: true,
      email: true,
      service: true,
      details: true,
    });

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((err) => err.length > 0);
    if (hasErrors) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSubmitStatus("success");
        setResponseMessage(
          data.message ||
            "Thanks for reaching out. We've received your project details and will get back to you soon."
        );
        // Reset form on true backend delivery
        setFormData({ name: "", email: "", service: "", details: "" });
        setTouched({});
        setErrors({});
      } else {
        setSubmitStatus("error");
        setResponseMessage(
          data.error ||
            "Unable to deliver your message through the automated service at this moment."
        );
        if (data.recipientEmail || data.email) {
          setFallbackEmail(data.recipientEmail || data.email);
        }
      }
    } catch {
      setSubmitStatus("error");
      setResponseMessage(
        "Network connection failed. Please send your message directly via email to info@colorvision.lk."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // GSAP ScrollTrigger entrance
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReduced) return;

    const ctx = gsap.context(() => {
      if (leftColRef.current) {
        gsap.fromTo(
          leftColRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: leftColRef.current,
              start: "top 85%",
            },
          }
        );
      }

      if (formRef.current) {
        gsap.fromTo(
          formRef.current,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: {
              trigger: formRef.current,
              start: "top 80%",
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Pre-filled mailto URL for direct fallback
  const mailtoUrl = `mailto:${fallbackEmail}?subject=${encodeURIComponent(
    `[Project Inquiry] ${formData.service || "Creative Project"} — ${formData.name || "Client"}`
  )}&body=${encodeURIComponent(
    `Name: ${formData.name}\nEmail: ${formData.email}\nService: ${formData.service}\n\nProject Details:\n${formData.details}`
  )}`;

  return (
    <section
      id="contact"
      ref={containerRef}
      className="relative w-full bg-transparent py-24 md:py-32 lg:py-40 border-b border-white/[0.06]"
    >
      <div className="w-full max-w-[1280px] mx-auto px-4 md:px-6 lg:px-0">
        {/* Section Eyebrow */}
        <div className="flex items-center gap-2.5 mb-8 md:mb-12">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF5108] inline-block shadow-[0_0_8px_rgba(255,81,8,0.6)]" />
          <p className="uppercase tracking-[0.22em] text-[12px] md:text-[13px] font-[600] text-[#8E9098]">
            {propContact?.eyebrow || "LET'S CREATE TOGETHER"}
          </p>
          <span className="text-[#737680] font-mono text-[11px] tracking-widest ml-1">
            (PROJECT INQUIRY)
          </span>
        </div>

        {/* Two-Column Editorial Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-20 items-start">
          {/* Left Column: Expressive Heading, Narrative & Direct Studio Details */}
          <div ref={leftColRef} className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <h2 className="text-[38px] sm:text-[48px] md:text-[56px] lg:text-[62px] xl:text-[70px] font-[800] leading-[1.08] tracking-[-0.03em] select-none">
                <span className="block text-[#F4F2ED]">
                  Have a project
                </span>
                <span className="block text-[#F4F2ED]">
                  in mind?
                </span>
                <span className="block text-[#F4F2ED] mt-1 sm:mt-2">
                  Let&apos;s make it{" "}
                  <span className="text-[#FF5108] relative inline-block">
                    matter.
                    <div className="absolute -bottom-1 sm:-bottom-2 left-0 w-full h-[2px] sm:h-[3px] bg-[#FF5108] shadow-[0_0_8px_rgba(255,81,8,0.6)]" />
                  </span>
                </span>
              </h2>

              <p className="text-[#8E9098] text-[15px] sm:text-[16px] md:text-[17px] leading-[1.75] font-[400] mt-8 max-w-[500px]">
                {propContact?.description ||
                  "Have an idea, a challenge, or a product that needs a clearer direction? Tell us what you're working on and what you're trying to solve. We'll bring strategy and purposeful design together to turn your idea into an experience people can understand, use, and remember."}
              </p>
            </div>

            {/* Direct Studio Contact Information & Channels */}
            <div className="mt-12 sm:mt-16 pt-8 border-t border-white/[0.08] space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-widest text-[#737680] block mb-1">
                    STUDIO INQUIRIES
                  </span>
                  <a
                    href="mailto:info@colorvision.lk"
                    className="text-[#F4F2ED] hover:text-[#FF5108] font-[600] text-[15px] transition-colors duration-200"
                  >
                    info@colorvision.lk
                  </a>
                </div>

                <div>
                  <span className="text-[11px] font-mono uppercase tracking-widest text-[#737680] block mb-1">
                    LOCATION &amp; REGION
                  </span>
                  <p className="text-[#F4F2ED] font-[600] text-[15px]">
                    Colombo, Sri Lanka
                  </p>
                </div>
              </div>

              {/* Status / Availability Badge */}
              <div className="flex items-center justify-between p-4 rounded-lg bg-white/[0.02] border border-white/[0.06]">
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#FF5108] animate-pulse" />
                  <span className="text-[12px] font-mono uppercase tracking-wider text-[#F4F2ED] font-[600]">
                    ACCEPTING Q1/Q2 PROJECTS
                  </span>
                </div>
                <span className="text-[11px] font-mono text-[#737680] hidden sm:inline-block">
                  TURNAROUND: 24–48H
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Project Inquiry Form (No conventional rounded card) */}
          <div className="lg:col-span-6">
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              noValidate
              className="space-y-6"
            >
              {/* Field 1: Your Name */}
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="block text-[12px] font-mono uppercase tracking-[0.14em] text-[#F4F2ED] font-[600]"
                >
                  Your Name <span className="text-[#FF5108]">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  placeholder="e.g. Sarah Jenkins"
                  aria-required="true"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  className={`w-full px-4 py-3.5 bg-[#11141A] text-[#F4F2ED] placeholder-[#737680] rounded text-[14px] sm:text-[15px] border transition-all duration-200 focus:outline-none ${
                    errors.name
                      ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                      : "border-white/[0.14] focus:border-[#FF5108] focus:ring-1 focus:ring-[#FF5108]"
                  }`}
                />
                {errors.name && (
                  <p
                    id="name-error"
                    className="text-[12px] font-mono text-red-400 mt-1 flex items-center gap-1.5"
                  >
                    <span>⚠</span> {errors.name}
                  </p>
                )}
              </div>

              {/* Field 2: Email Address */}
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-[12px] font-mono uppercase tracking-[0.14em] text-[#F4F2ED] font-[600]"
                >
                  Email Address <span className="text-[#FF5108]">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  placeholder="e.g. sarah@company.com"
                  aria-required="true"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  className={`w-full px-4 py-3.5 bg-[#11141A] text-[#F4F2ED] placeholder-[#737680] rounded text-[14px] sm:text-[15px] border transition-all duration-200 focus:outline-none ${
                    errors.email
                      ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                      : "border-white/[0.14] focus:border-[#FF5108] focus:ring-1 focus:ring-[#FF5108]"
                  }`}
                />
                {errors.email && (
                  <p
                    id="email-error"
                    className="text-[12px] font-mono text-red-400 mt-1 flex items-center gap-1.5"
                  >
                    <span>⚠</span> {errors.email}
                  </p>
                )}
              </div>

              {/* Field 3: What do you need? (Select) */}
              <div className="space-y-2">
                <label
                  htmlFor="service"
                  className="block text-[12px] font-mono uppercase tracking-[0.14em] text-[#F4F2ED] font-[600]"
                >
                  What do you need? <span className="text-[#FF5108]">*</span>
                </label>
                <div className="relative">
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    aria-required="true"
                    aria-invalid={!!errors.service}
                    aria-describedby={errors.service ? "service-error" : undefined}
                    className={`w-full px-4 py-3.5 bg-[#11141A] text-[#F4F2ED] rounded text-[14px] sm:text-[15px] border transition-all duration-200 focus:outline-none appearance-none cursor-pointer pr-10 ${
                      !formData.service ? "text-[#737680]" : "text-[#F4F2ED]"
                    } ${
                      errors.service
                        ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                        : "border-white/[0.14] focus:border-[#FF5108] focus:ring-1 focus:ring-[#FF5108]"
                    }`}
                  >
                    <option value="" disabled>
                      Select a service capability...
                    </option>
                    {serviceOptions.map((opt) => (
                      <option
                        key={opt}
                        value={opt}
                        className="bg-[#11141A] text-[#F4F2ED] py-2"
                      >
                        {opt}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#8E9098]">
                    <svg
                      width="12"
                      height="8"
                      viewBox="0 0 12 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 1.5L6 6.5L11 1.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
                {errors.service && (
                  <p
                    id="service-error"
                    className="text-[12px] font-mono text-red-400 mt-1 flex items-center gap-1.5"
                  >
                    <span>⚠</span> {errors.service}
                  </p>
                )}
              </div>

              {/* Field 4: Project Details */}
              <div className="space-y-2">
                <label
                  htmlFor="details"
                  className="block text-[12px] font-mono uppercase tracking-[0.14em] text-[#F4F2ED] font-[600]"
                >
                  Project Details <span className="text-[#FF5108]">*</span>
                </label>
                <textarea
                  id="details"
                  name="details"
                  rows={4}
                  value={formData.details}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  placeholder="Tell us what you're working on, what challenge you're trying to solve, and your approximate timeline or budget..."
                  aria-required="true"
                  aria-invalid={!!errors.details}
                  aria-describedby={errors.details ? "details-error" : undefined}
                  className={`w-full px-4 py-3.5 bg-[#11141A] text-[#F4F2ED] placeholder-[#737680] rounded text-[14px] sm:text-[15px] border transition-all duration-200 focus:outline-none resize-y min-h-[120px] ${
                    errors.details
                      ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                      : "border-white/[0.14] focus:border-[#FF5108] focus:ring-1 focus:ring-[#FF5108]"
                  }`}
                />
                {errors.details && (
                  <p
                    id="details-error"
                    className="text-[12px] font-mono text-red-400 mt-1 flex items-center gap-1.5"
                  >
                    <span>⚠</span> {errors.details}
                  </p>
                )}
              </div>

              {/* Submission Button & Action */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full sm:w-auto px-9 py-4 rounded-full font-[700] text-[13px] uppercase tracking-[0.16em] transition-all duration-300 flex items-center justify-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5108] ${
                    isSubmitting
                      ? "bg-white/20 text-[#8E9098] cursor-not-allowed"
                      : "bg-[#FF5108] text-[#08090D] hover:bg-[#F4F2ED] hover:shadow-[0_0_24px_rgba(255,81,8,0.4)]"
                  }`}
                >
                  <span>{isSubmitting ? "SENDING INQUIRY..." : "SEND INQUIRY"}</span>
                  <span className="transition-transform duration-300 group-hover:translate-x-1 font-bold">
                    →
                  </span>
                </button>
              </div>

              {/* Success Confirmation State */}
              {submitStatus === "success" && (
                <div
                  role="status"
                  aria-live="polite"
                  className="p-5 rounded-lg bg-[#FF5108]/10 border border-[#FF5108]/30 text-[#F4F2ED] space-y-2 mt-4 animate-fadeIn"
                >
                  <div className="flex items-center gap-2 text-[#FF5108] font-[700] text-[13px] font-mono uppercase tracking-wider">
                    <span>✓</span> INQUIRY TRANSMITTED
                  </div>
                  <p className="text-[14px] leading-relaxed text-[#F4F2ED]">
                    {responseMessage}
                  </p>
                </div>
              )}

              {/* Error or Backend Unconfigured Notice */}
              {submitStatus === "error" && (
                <div
                  role="alert"
                  className="p-5 rounded-lg bg-white/[0.03] border border-white/[0.12] space-y-3 mt-4"
                >
                  <div className="flex items-center gap-2 text-[#FF5108] font-[700] text-[13px] font-mono uppercase tracking-wider">
                    <span>ℹ</span> INQUIRY STATUS NOTICE
                  </div>
                  <p className="text-[14px] text-[#8E9098] leading-relaxed">
                    {responseMessage}
                  </p>
                  <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-3">
                    <a
                      href={mailtoUrl}
                      className="inline-flex items-center gap-2 text-[12px] font-mono uppercase tracking-wider px-4 py-2 rounded bg-[#FF5108] text-[#08090D] font-[700] hover:bg-[#F4F2ED] transition-colors"
                    >
                      <span>SEND DIRECTLY VIA EMAIL</span>
                      <span>↗</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => setSubmitStatus("idle")}
                      className="text-[11px] font-mono text-[#737680] hover:text-[#F4F2ED] transition-colors self-start sm:self-center underline"
                    >
                      Dismiss
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
