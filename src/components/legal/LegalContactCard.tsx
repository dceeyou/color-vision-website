"use client";

import React from "react";
import { Mail, MessageCircle, MapPin, ArrowUpRight } from "lucide-react";

interface LegalContactCardProps {
  email?: string;
  whatsapp?: string;
  location?: string;
  note?: string;
}

export const LegalContactCard: React.FC<LegalContactCardProps> = ({
  email = "info@colorvision.lk",
  whatsapp = "+94 76 142 8445",
  location = "Colombo, Sri Lanka",
  note = "We aim to respond to all legal and privacy-related inquiries within 2–3 business days.",
}) => {
  const cleanPhone = whatsapp.replace(/[^0-9+]/g, "");

  return (
    <div className="mt-8 rounded-2xl border border-white/10 bg-[#111218]/80 p-6 md:p-8 backdrop-blur-sm relative overflow-hidden group">
      {/* Subtle ambient accent glow in the corner */}
      <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#FF5108]/10 blur-3xl pointer-events-none transition-opacity duration-500 group-hover:bg-[#FF5108]/15" />

      <div className="relative z-10">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-[#FF5108] mb-2">
          Direct Studio Inquiries
        </h4>
        <p className="text-sm text-[#92939B] mb-6 leading-relaxed">
          For any questions regarding our terms, data practices, or to exercise your privacy rights, please reach out to our team directly.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Email */}
          <a
            href={`mailto:${email}`}
            className="flex items-start gap-3.5 p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-[#FF5108]/30 transition-all duration-300 group/item"
          >
            <div className="mt-0.5 p-2 rounded-lg bg-white/5 text-[#FF5108] group-hover/item:bg-[#FF5108]/10 transition-colors">
              <Mail className="w-4 h-4" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[11px] uppercase tracking-wider text-[#92939B] font-medium">
                Email
              </div>
              <div className="text-sm font-semibold text-[#F4F2ED] flex items-center gap-1 mt-0.5 truncate group-hover/item:text-[#FF5108] transition-colors">
                <span className="truncate">{email}</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover/item:opacity-100 group-hover/item:translate-x-0.5 group-hover/item:-translate-y-0.5 transition-transform shrink-0" />
              </div>
            </div>
          </a>

          {/* WhatsApp */}
          <a
            href={`https://wa.me/${cleanPhone.replace("+", "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-3.5 p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-[#FF5108]/30 transition-all duration-300 group/item"
          >
            <div className="mt-0.5 p-2 rounded-lg bg-white/5 text-[#FF5108] group-hover/item:bg-[#FF5108]/10 transition-colors">
              <MessageCircle className="w-4 h-4" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[11px] uppercase tracking-wider text-[#92939B] font-medium">
                WhatsApp Direct
              </div>
              <div className="text-sm font-semibold text-[#F4F2ED] flex items-center gap-1 mt-0.5 truncate group-hover/item:text-[#FF5108] transition-colors">
                <span className="truncate">{whatsapp}</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover/item:opacity-100 group-hover/item:translate-x-0.5 group-hover/item:-translate-y-0.5 transition-transform shrink-0" />
              </div>
            </div>
          </a>

          {/* Studio Location */}
          <div className="flex items-start gap-3.5 p-4 rounded-xl border border-white/5 bg-white/[0.02]">
            <div className="mt-0.5 p-2 rounded-lg bg-white/5 text-[#92939B]">
              <MapPin className="w-4 h-4" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[11px] uppercase tracking-wider text-[#92939B] font-medium">
                Studio Base
              </div>
              <div className="text-sm font-semibold text-[#F4F2ED] mt-0.5 truncate">
                {location}
              </div>
            </div>
          </div>
        </div>

        {note && (
          <p className="mt-5 text-xs text-[#92939B]/70 italic border-t border-white/5 pt-4">
            {note}
          </p>
        )}
      </div>
    </div>
  );
};
