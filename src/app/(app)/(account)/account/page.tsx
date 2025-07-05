"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

interface AccountPageProps {
  userId?: string; 
  section?: string; 
  isLoggedIn?: boolean;
  onLogout?: () => void;
}


export default function AccountPage({
  userId,
  section,
  isLoggedIn = true,
  onLogout,
}: AccountPageProps) {
  const [activeSection, setActiveSection] = useState(section || "profile");

  return (
    <div className="min-h-screen bg-white">
    
        <nav className="p-4 bg-[#F4F4F0] w-full border-b">
        <Link prefetch href={"/home"} className="flex items-center gap-2">
          <ArrowLeftIcon className="size-4" />
          <span className="font-medium text">Back</span>
        </Link>
      </nav>

      {/* Page header with title and description */}
      <header className="bg-[#F4F4F0] py-8 border-b">
        <div className="max-w-(--breakpoint-xl) mx-auto px-4 lg:px-12 flex flex-col gap-y-4">
          <h1 className="text-[40px] font-medium">Account</h1>
          <p className="font-medium">Your Account is here</p>
        </div>
      </header>

      {/* Grid layout for sidebar and main content */}
      <div className="grid grid-cols-1 lg:grid-cols-6 xl:grid-cols-8 gap-y-6 gap-x-12 max-w-(--breakpoint-xl) mx-auto px-4 lg:px-12 py-10">
        {/* Account sidebar (takes 2 columns on large screens) */}
        <div className="lg:col-span-2 xl:col-span-2">
          <AccountSidebar
            activeSection={activeSection}
            onSectionChange={setActiveSection}
            onLogout={onLogout}
          />
        </div>

        {/* Main account content (spans remaining columns on large screens) */}
        <div className="lg:col-span-4 xl:col-span-6">
          <AccountOverview section={activeSection} userId={userId} />
        </div>
      </div>
    </div>
  );
}

// AccountSidebar Component
const AccountSidebar = ({
  activeSection,
  onSectionChange,
  onLogout,
}: {
  activeSection?: string;
  onSectionChange: (section: string) => void;
  onLogout?: () => void;
}) => {
  const sidebarItems = [
    { id: "profile", label: "Profile", icon: "👤" },
    { id: "orders", label: "Order History", icon: "📦" },
    // { id: "billing", label: "Billing & Payment", icon: "💳" },
    { id: "security", label: "Security", icon: "🔒" },
    { id: "notifications", label: "Notifications", icon: "🔔" },
    // { id: "preferences", label: "Preferences", icon: "⚙️" },
  ];

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      // Default logout behavior
      console.log("Logging out...");
      // You can add your logout logic here
    }
  };

  return (
    <div className="border rounded-md bg-white">
      {/* Sidebar tabs styled like ProductFilter */}
      {sidebarItems.map((item, index) => (
        <div
          key={item.id}
          className={`p-4 border-b flex items-center gap-3 cursor-pointer transition-colors font-medium ${
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

// AccountOverview Component
const AccountOverview = ({
  section,
  userId,
}: {
  section?: string;
  userId?: string;
}) => {
  // Default to profile section if none specified
  const currentSection = section || "profile";

  const renderSection = () => {
    switch (currentSection) {
      case "profile":
        return <ProfileSection />;
      case "orders":
        return <OrdersSection />;
      case "billing":
        return <BillingSection />;
      case "security":
        return <SecuritySection />;
      case "notifications":
        return <NotificationsSection />;
      case "preferences":
        return <PreferencesSection />;
      default:
        return <ProfileSection />;
    }
  };

  return <div className="space-y-1">{renderSection()}</div>;
};

// ProfileSection Component
const ProfileSection = () => {
  return (
    <div className="space-y-6">
      {/* Profile Information Card */}
      <div className="bg-white border rounded-md p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-900">
          Profile Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              First Name
            </label>
            <Input
              type="text"
              placeholder="Enter first name"
              defaultValue="John"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Last Name
            </label>
            <Input
              type="text"
              placeholder="Enter last name"
              defaultValue="Doe"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <Input
              type="email"
              placeholder="Enter email address"
              defaultValue="john.doe@example.com"
              
            />
          </div>
        </div>
        <div className="mt-6">
          <Button
            variant="elevated"
            className="h-11 px-4 bg-transparent border border-primary rounded-full hover:bg-white text-black"
          >
            Save Changes
          </Button> 
        </div>
      </div>

      <div className="bg-white border rounded-md p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-900">
          Account Actions
        </h2>
        <div className="space-y-4">
          <div className="p-4 border border-red-200 rounded-lg bg-red-50">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-red-900">Log Out</p>
                <p className="text-sm text-red-700">
                  Sign out of your account on this device
                </p>
              </div>
              <Button
                variant="elevated"
                className="h-11 px-4 bg-red-500 border border-primary rounded-full hover:bg-red-600 text-white"
              >
                Log Out
              </Button>
            </div>
          </div>
        </div>
      </div>
     
    </div>
  );
};

// OrdersSection Component
const OrdersSection = () => {
  const orders = [
    { id: "12345", date: "2024-06-20", status: "Delivered", total: "$89.99" },
    { id: "12344", date: "2024-06-15", status: "Shipped", total: "$45.50" },
    { id: "12343", date: "2024-06-10", status: "Processing", total: "$129.99" },
  ];

  return (
    <div className="bg-white border rounded-md p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-900">
        Order History
      </h2>
      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="border-b border-gray-200 pb-4 last:border-b-0 last:pb-0"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium text-gray-900">Order #{order.id}</p>
                <p className="text-sm text-gray-600">Placed on {order.date}</p>
              </div>
              <div className="text-right">
                <p className="font-medium text-gray-900">{order.total}</p>
                <span
                  className={`inline-block px-2 py-1 text-xs rounded-full ${
                    order.status === "Delivered"
                      ? "bg-green-100 text-green-800"
                      : order.status === "Shipped"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {order.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6">
        <Button
          variant="elevated"
          className="h-11 px-4 bg-transparent border border-primary rounded-full hover:bg-white text-black"
        >
          View All Orders
        </Button>
      </div>
    </div>
  );
};

// BillingSection Component
const BillingSection = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white border rounded-md p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-900">
          Payment Methods
        </h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center">
                <span className="text-xs font-medium">VISA</span>
              </div>
              <div>
                <p className="font-medium text-gray-900">**** **** **** 4242</p>
                <p className="text-sm text-gray-600">Expires 12/26</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="text-sm text-gray-600 hover:text-gray-900 border-gray-300"
            >
              Remove
            </Button>
          </div>
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center">
                <span className="text-xs font-medium">MC</span>
              </div>
              <div>
                <p className="font-medium text-gray-900">**** **** **** 8888</p>
                <p className="text-sm text-gray-600">Expires 08/27</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="text-sm text-gray-600 hover:text-gray-900 border-gray-300"
            >
              Remove
            </Button>
          </div>
        </div>
        <div className="mt-6">
          <Button
            variant="elevated"
            className="h-11 px-4 bg-transparent border border-primary rounded-full hover:bg-white text-black"
          >
            Add Payment Method
          </Button>
        </div>
      </div>

      <div className="bg-white border rounded-md p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-900">
          Billing Address
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Street Address
            </label>
            <Input
              type="text"
              placeholder="Enter billing address"
              defaultValue="456 Business Ave"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              City
            </label>
            <Input
              type="text"
              placeholder="Enter city"
              defaultValue="New York"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              State
            </label>
            <Input type="text" placeholder="Enter state" defaultValue="NY" />
          </div>
        </div>
        <div className="mt-6">
          <Button
            variant="elevated"
            className="h-11 px-4 bg-transparent border border-primary rounded-full hover:bg-white text-black"
          >
            Update Billing Address
          </Button>
        </div>
      </div>
    </div>
  );
};

// SecuritySection Component
const SecuritySection = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white border rounded-md p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-900">
          Password & Security
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Current Password
            </label>
            <Input type="password" placeholder="Enter current password" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              New Password
            </label>
            <Input type="password" placeholder="Enter new password" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm New Password
            </label>
            <Input type="password" placeholder="Confirm new password" />
          </div>
        </div>
        <div className="mt-6">
          <Button
            variant="elevated"
            className="h-11 px-4 bg-transparent border border-primary rounded-full hover:bg-white text-black"
          >
            Update Password
          </Button>
        </div>
      </div>

      <div className="bg-white border rounded-md p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-900">
          Two-Factor Authentication
        </h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">SMS Authentication</p>
              <p className="text-sm text-gray-600">
                Receive codes via text message
              </p>
            </div>
            <span className="inline-block px-3 py-1 text-xs rounded-full bg-green-100 text-green-800">
              Enabled
            </span>
          </div>
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Authenticator App</p>
              <p className="text-sm text-gray-600">
                Use an authenticator app for codes
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="text-sm border-gray-300"
            >
              Setup
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

// NotificationsSection Component with working toggle sliders
const NotificationsSection = () => {
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
    marketing: false,
  });

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const notificationItems = [
    {
      id: "email" as keyof typeof notifications,
      label: "Email notifications",
      description: "Receive updates via email",
    },
    {
      id: "sms" as keyof typeof notifications,
      label: "SMS notifications",
      description: "Receive updates via text message",
    },
    {
      id: "push" as keyof typeof notifications,
      label: "Push notifications",
      description: "Receive browser notifications",
    },
    {
      id: "marketing" as keyof typeof notifications,
      label: "Marketing emails",
      description: "Receive promotional content",
    },
  ];

  return (
    <div className="bg-white border rounded-md p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-900">
        Notification Preferences
      </h2>
      <div className="space-y-4">
        {notificationItems.map((item) => (
          <div key={item.id} className="flex items-center justify-between py-2">
            <div>
              <p className="font-medium text-gray-900">{item.label}</p>
              <p className="text-sm text-gray-600">{item.description}</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={notifications[item.id]}
                onChange={() => toggleNotification(item.id)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-black/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
            </label>
          </div>
        ))}
      </div>
      <div className="mt-6">
        <Button
          variant="elevated"
          className="h-11 px-4 bg-transparent border border-primary rounded-full hover:bg-white text-black"
        >
          Save Preferences
        </Button>
      </div>
    </div>
  );
};

// PreferencesSection Component
const PreferencesSection = () => {
  const [preferences, setPreferences] = useState({
    language: "en",
    currency: "usd",
    timezone: "est",
    theme: "light",
  });

  const updatePreference = (key: keyof typeof preferences, value: string) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="bg-white border rounded-md p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-900">
        Account Preferences
      </h2>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Language
          </label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            value={preferences.language}
            onChange={(e) => updatePreference("language", e.target.value)}
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Currency
          </label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            value={preferences.currency}
            onChange={(e) => updatePreference("currency", e.target.value)}
          >
            <option value="usd">USD ($)</option>
            <option value="eur">EUR (€)</option>
            <option value="gbp">GBP (£)</option>
            <option value="cad">CAD ($)</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Time Zone
          </label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            value={preferences.timezone}
            onChange={(e) => updatePreference("timezone", e.target.value)}
          >
            <option value="est">Eastern Time (EST)</option>
            <option value="pst">Pacific Time (PST)</option>
            <option value="cst">Central Time (CST)</option>
            <option value="gmt">Greenwich Mean Time (GMT)</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Theme
          </label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            value={preferences.theme}
            onChange={(e) => updatePreference("theme", e.target.value)}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="auto">Auto</option>
          </select>
        </div>
      </div>
      <div className="mt-6">
        <Button
          variant="elevated"
          className="h-11 px-4 bg-transparent border border-primary rounded-full hover:bg-white text-black"
        >
          Save Preferences
        </Button>
      </div>
    </div>
  );
};
