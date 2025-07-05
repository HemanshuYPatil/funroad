"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ContactPageProps {
  onSubmit?: (data: any) => void;
}

// ContactPage - Layout for contact form and information
export default function ContactPage({ onSubmit }: ContactPageProps) {
  const [activeSection, setActiveSection] = useState("contact");

  return (
    <div className="px-4 lg:px-12 py-8 flex flex-col gap-4">
      {/* Header row with title */}
      <div className="flex flex-col lg:flex-row lg:items-center gap-y-2 lg:gap-y-0 justify-between">
        <p className="text-2xl font-medium">Contact Us</p>
      </div>

      {/* Grid layout for sidebar and main content */}
      <div className="grid grid-cols-1 lg:grid-cols-6 xl:grid-cols-8 gap-y-6 gap-x-12">
        {/* Contact sidebar (takes 2 columns on large screens) */}
        <div className="lg:col-span-2 xl:col-span-2">
          <ContactSidebar
            activeSection={activeSection}
            onSectionChange={setActiveSection}
          />
        </div>

        {/* Main contact content (spans remaining columns on large screens) */}
        <div className="lg:col-span-4 xl:col-span-6">
          <ContactContent section={activeSection} onSubmit={onSubmit} />
        </div>
      </div>
    </div>
  );
}

// ContactSidebar Component
const ContactSidebar = ({
  activeSection,
  onSectionChange,
}: {
  activeSection?: string;
  onSectionChange: (section: string) => void;
}) => {
  const sidebarItems = [
    { id: "contact", label: "Contact Form", icon: "📝" },
    { id: "support", label: "Support Center", icon: "🎧" },
    { id: "locations", label: "Our Locations", icon: "📍" },
    { id: "faq", label: "FAQ", icon: "❓" },
  ];

  return (
    <div className="border rounded-md bg-white">
      {/* Sidebar tabs styled like ProductFilter */}
      {sidebarItems.map((item) => (
        <div
          key={item.id}
          className={`p-4 border-b flex items-center gap-3 cursor-pointer transition-colors font-medium last:border-b-0 ${
            activeSection === item.id
              ? "bg-gray-100 text-gray-900 font-medium"
              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
          }`}
          onClick={() => onSectionChange(item.id)}
        >
          <div className="flex items-center gap-3 w-full text-sm">
            <span className="text-base size-5">{item.icon}</span>
            <p className="font-medium text-[16px]">{item.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

// ContactContent Component
const ContactContent = ({
  section,
  onSubmit,
}: {
  section?: string;
  onSubmit?: (data: any) => void;
}) => {
  const currentSection = section || "contact";

  const renderSection = () => {
    switch (currentSection) {
      case "contact":
        return <ContactFormSection onSubmit={onSubmit} />;
      case "support":
        return <SupportSection />;
      case "locations":
        return <LocationsSection />;
      case "faq":
        return <FAQSection />;
      default:
        return <ContactFormSection onSubmit={onSubmit} />;
    }
  };

  return <div className="space-y-1">{renderSection()}</div>;
};

// ContactFormSection Component
const ContactFormSection = ({ onSubmit }: { onSubmit?: (data: any) => void }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
    priority: "medium",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit(formData);
    } else {
      console.log("Form submitted:", formData);
      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        subject: "",
        message: "",
        priority: "medium",
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Contact Form Card */}
      <div className="bg-white border rounded-md p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-900">
          Get in Touch
        </h2>
        <p className="text-gray-600 mb-6">
          We'd love to hear from you. Send us a message and we'll respond as soon as possible.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              First Name *
            </label>
            <Input
              type="text"
              placeholder="Enter first name"
              value={formData.firstName}
              onChange={(e) => handleInputChange("firstName", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Last Name *
            </label>
            <Input
              type="text"
              placeholder="Enter last name"
              value={formData.lastName}
              onChange={(e) => handleInputChange("lastName", e.target.value)}
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address *
            </label>
            <Input
              type="email"
              placeholder="Enter email address"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Subject *
            </label>
            <Input
              type="text"
              placeholder="Enter subject"
              value={formData.subject}
              onChange={(e) => handleInputChange("subject", e.target.value)}
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Priority
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              value={formData.priority}
              onChange={(e) => handleInputChange("priority", e.target.value)}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Message *
            </label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent min-h-[120px] resize-vertical"
              placeholder="Enter your message..."
              value={formData.message}
              onChange={(e) => handleInputChange("message", e.target.value)}
            />
          </div>
        </div>
        <div className="mt-6">
          <Button
            variant="elevated"
            className="h-11 px-4 bg-transparent border border-primary rounded-full hover:bg-white text-black"
            onClick={handleSubmit}
          >
            Send Message
          </Button>
        </div>
      </div>

      {/* Quick Contact Info */}
      <div className="bg-white border rounded-md p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-900">
          Other Ways to Reach Us
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 border border-gray-200 rounded-lg">
            <div className="text-2xl mb-2">📞</div>
            <p className="font-medium text-gray-900">Phone</p>
            <p className="text-sm text-gray-600">+1 (555) 123-4567</p>
          </div>
          <div className="text-center p-4 border border-gray-200 rounded-lg">
            <div className="text-2xl mb-2">✉️</div>
            <p className="font-medium text-gray-900">Email</p>
            <p className="text-sm text-gray-600">support@company.com</p>
          </div>
          <div className="text-center p-4 border border-gray-200 rounded-lg">
            <div className="text-2xl mb-2">💬</div>
            <p className="font-medium text-gray-900">Live Chat</p>
            <p className="text-sm text-gray-600">Available 24/7</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// SupportSection Component
const SupportSection = () => {
  const supportOptions = [
    {
      title: "Technical Support",
      description: "Get help with technical issues and troubleshooting",
      icon: "🔧",
      action: "Get Technical Help"
    },
    {
      title: "Billing Support",
      description: "Questions about billing, payments, and account charges",
      icon: "💳",
      action: "Contact Billing"
    },
    {
      title: "General Inquiries",
      description: "General questions about our products and services",
      icon: "💼",
      action: "Ask a Question"
    },
    {
      title: "Feature Requests",
      description: "Suggest new features or improvements to our products",
      icon: "💡",
      action: "Submit Request"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white border rounded-md p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-900">
          Support Center
        </h2>
        <p className="text-gray-600 mb-6">
          Choose the type of support you need and we'll connect you with the right team.
        </p>
        <div className="space-y-4">
          {supportOptions.map((option, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-2xl">{option.icon}</span>
                  <div>
                    <p className="font-medium text-gray-900">{option.title}</p>
                    <p className="text-sm text-gray-600">{option.description}</p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-sm border-gray-300"
                >
                  {option.action}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white border rounded-md p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-900">
          Support Hours
        </h2>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Monday - Friday</span>
            <span className="font-medium text-gray-900">9:00 AM - 6:00 PM EST</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Saturday</span>
            <span className="font-medium text-gray-900">10:00 AM - 4:00 PM EST</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Sunday</span>
            <span className="font-medium text-gray-900">Closed</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// LocationsSection Component
const LocationsSection = () => {
  const locations = [
    {
      name: "New York Office",
      address: "123 Business Ave, Suite 100",
      city: "New York, NY 10001",
      phone: "+1 (555) 123-4567",
      email: "ny@company.com",
      hours: "Mon-Fri: 9AM-6PM"
    },
    {
      name: "Los Angeles Office",
      address: "456 Innovation Blvd, Floor 5",
      city: "Los Angeles, CA 90210",
      phone: "+1 (555) 987-6543",
      email: "la@company.com",
      hours: "Mon-Fri: 8AM-5PM"
    },
    {
      name: "Chicago Office",
      address: "789 Commerce St, Suite 200",
      city: "Chicago, IL 60601",
      phone: "+1 (555) 456-7890",
      email: "chicago@company.com",
      hours: "Mon-Fri: 9AM-6PM"
    }
  ];

  return (
    <div className="bg-white border rounded-md p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-900">
        Our Locations
      </h2>
      <p className="text-gray-600 mb-6">
        Visit us at one of our office locations or get in touch with your local team.
      </p>
      <div className="space-y-6">
        {locations.map((location, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              {location.name}
            </h3>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <span className="text-gray-400 mt-1">📍</span>
                <div>
                  <p className="text-gray-900">{location.address}</p>
                  <p className="text-gray-900">{location.city}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-400">📞</span>
                <p className="text-gray-900">{location.phone}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-400">✉️</span>
                <p className="text-gray-900">{location.email}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-400">🕒</span>
                <p className="text-gray-900">{location.hours}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// FAQSection Component
const FAQSection = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const faqItems = [
    {
      question: "How do I create an account?",
      answer: "To create an account, click the 'Sign Up' button at the top of the page and fill out the required information. You'll receive a confirmation email to verify your account."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for enterprise customers."
    },
    {
      question: "How can I track my order?",
      answer: "Once your order is shipped, you'll receive a tracking number via email. You can also track your orders by logging into your account and visiting the Order History section."
    },
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy for most items. Products must be in original condition and packaging. Some restrictions may apply for certain product categories."
    },
    {
      question: "How do I reset my password?",
      answer: "Click 'Forgot Password' on the login page and enter your email address. You'll receive instructions to reset your password within a few minutes."
    },
    {
      question: "Do you offer customer support?",
      answer: "Yes! Our customer support team is available Monday-Friday 9AM-6PM EST. You can reach us via phone, email, or live chat."
    }
  ];

  return (
    <div className="bg-white border rounded-md p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-900">
        Frequently Asked Questions
      </h2>
      <p className="text-gray-600 mb-6">
        Find answers to common questions about our products and services.
      </p>
      <div className="space-y-4">
        {faqItems.map((item, index) => (
          <div key={index} className="border border-gray-200 rounded-lg">
            <button
              className="w-full px-4 py-3 text-left font-medium text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black focus:ring-inset rounded-lg transition-colors"
              onClick={() => toggleItem(index)}
            >
              <div className="flex justify-between items-center">
                <span>{item.question}</span>
                <span className="ml-6 flex-shrink-0">
                  {openItems.includes(index) ? "−" : "+"}
                </span>
              </div>
            </button>
            {openItems.includes(index) && (
              <div className="px-4 pb-3">
                <p className="text-gray-600">{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-6">
        <p className="text-gray-600 text-sm">
          Can't find what you're looking for?{" "}
          <button className="text-black font-medium hover:underline">
            Contact our support team
          </button>
        </p>
      </div>
    </div>
  );
};