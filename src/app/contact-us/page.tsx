"use client";
import Link from "next/link";
import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1200));
    alert("Message sent successfully! 🎉");

    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-background pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-6xl md:text-7xl font-bold tracking-tighter mb-4">
            Get In Touch
          </h1>
          <p className="text-xl text-muted-text max-w-2xl mx-auto">
            Questions about keyboards? Custom builds? Partnerships?
            <br />
            We’d love to hear from you.
          </p>
        </div>

        <div className="grid md:grid-cols-12 gap-12 lg:gap-16">
          {/* Contact Info */}
          <div className="md:col-span-5 space-y-8">
            <div>
              <h2 className="text-3xl font-semibold mb-8">Let’s Connect</h2>

              <div className="space-y-6">
                <div className="glass p-6 rounded-3xl flex gap-5 items-start">
                  <div className="w-12 h-12 bg-sky-500/10 rounded-2xl flex items-center justify-center text-3xl shrink-0">
                    ✉️
                  </div>
                  <div>
                    <p className="text-muted-text text-sm">EMAIL</p>
                    <a
                      href="mailto:hello@keyforge.store"
                      className="text-lg hover:text-primary transition-colors"
                    >
                      support@keycraft.com
                    </a>
                  </div>
                </div>

                <div className="glass p-6 rounded-3xl flex gap-5 items-start">
                  <div className="w-12 h-12 bg-sky-500/10 rounded-2xl flex items-center justify-center text-3xl shrink-0">
                    📍
                  </div>
                  <div>
                    <p className="text-muted-text text-sm">LOCATION</p>
                    <p className="text-lg">Sylhet, Bangladesh</p>
                  </div>
                </div>

                <div className="glass p-6 rounded-3xl flex gap-5 items-start">
                  <div className="w-12 h-12 bg-sky-500/10 rounded-2xl flex items-center justify-center text-3xl shrink-0">
                    📞
                  </div>
                  <div>
                    <p className="text-muted-text text-sm">PHONE</p>
                    <a
                      href="tel:+49123456789"
                      className="text-lg hover:text-primary transition-colors"
                    >
                      +88 8888 8888
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Community */}
            <div className="glass p-8 rounded-3xl">
              <p className="text-(--muted-text) mb-4">
                Join the Mechanical Community
              </p>
              <div className="flex gap-6 text-4xl">
                <Link
                  href="#"
                  className="hover:text-(--primary) transition-colors"
                >
                  𝕏
                </Link>
                <Link
                  href="#"
                  className="hover:text-(--primary) transition-colors"
                >
                  📸
                </Link>
                <Link
                  href="#"
                  className="hover:text-(--primary) transition-colors"
                >
                  𝔻
                </Link>
                <Link
                  href="#"
                  className="hover:text-(--primary) transition-colors"
                >
                  🗣️
                </Link>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="md:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="glass p-10 md:p-12 rounded-3xl"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-(--muted-text) mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full bg-white/5 border border-(--border-color) rounded-2xl px-6 py-4 focus:border-(--primary) outline-none transition-all"
                    placeholder="Alex Chen"
                  />
                </div>
                <div>
                  <label className="block text-sm text-(--muted-text) mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full bg-white/5 border border-(--border-color) rounded-2xl px-6 py-4 focus:border-(--primary) outline-none transition-all"
                    placeholder="you@email.com"
                  />
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm text-(--muted-text) mb-2">
                  Phone (Optional)
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full bg-white/5 border border-(--border-color) rounded-2xl px-6 py-4 focus:border-(--primary) outline-none transition-all"
                  placeholder="+88 8888 8888"
                />
              </div>

              <div className="mt-6">
                <label className="block text-sm text-(--muted-text) mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  className="w-full bg-white/5 border border-(--border-color) rounded-2xl px-6 py-4 focus:border-(--primary) outline-none transition-all"
                  placeholder="Custom Keyboard Inquiry"
                />
              </div>

              <div className="mt-6">
                <label className="block text-sm text-(--muted-text) mb-2">
                  Message
                </label>
                <textarea
                  rows={8}
                  required
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full bg-white/5 border border-(--border-color) rounded-3xl px-6 py-4 focus:border-(--primary) outline-none resize-y transition-all"
                  placeholder="Hi, I'm looking for recommendations on tactile switches..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-10 w-full bg-(--primary) hover:bg-(--primary-hover) disabled:opacity-70 transition-all text-black font-semibold py-4 rounded-2xl text-lg active:scale-[0.985]"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
