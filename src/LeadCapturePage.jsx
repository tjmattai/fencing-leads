import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";

export default function LeadCapturePage() {
  const [submitted, setSubmitted] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const [phone, setPhone] = useState("");

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (submitted) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, [submitted]);

  const formatPhoneNumber = (value) => {
    // Remove all non-numeric characters
    const numbers = value.replace(/\D/g, "");
    
    // Format the number as (XXX) XXX-XXXX
    if (numbers.length <= 3) {
      return numbers;
    } else if (numbers.length <= 6) {
      return `(${numbers.slice(0, 3)}) ${numbers.slice(3)}`;
    } else {
      return `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(6, 10)}`;
    }
  };

  const handlePhoneChange = (e) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhone(formatted);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const data = {
      fullName: formData.get("fullName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      address: formData.get("address"),
      description: formData.get("description")
    };

    try {
      const response = await fetch("https://script.google.com/macros/s/AKfycbyTcFlTCQsMTi8zxXy1fkGqF3M6zJl95HsRED-JC7Q4dzPRw_ngr8lU3R-157EprRGANw/exec", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setSubmitted(true);
    } catch (error) {
      console.error('Submission error:', error);
      alert('Unable to submit form. This is likely because you\'re running locally. The form submission endpoint is configured for production use.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex flex-col items-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-repeat opacity-10"></div>
      
      {/* Header Image Section */}
      <div className="w-full relative h-32 md:h-40">
        <img 
          src="/fence-header.jpg" 
          alt="Professional Fence Installation" 
          className="w-full h-full object-cover object-bottom"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/50 to-gray-900"></div>
      </div>

      {/* Header with Company Info */}
      <div className="absolute top-2 left-4 z-50">
        <img 
          src="/logo.png" 
          alt="Sunshine State Fences" 
          className="h-20 w-auto"
        />
      </div>

      {/* Main Content Container */}
      <div className="w-full max-w-4xl space-y-8 px-4 py-8">
        {/* Main Form Container */}
        <div className="relative backdrop-blur-xl bg-gray-900/80 p-10 rounded-3xl shadow-2xl border border-gray-800">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl"></div>
          <div className="relative flex flex-col md:flex-row gap-8">
            {/* Form Section */}
            <div className="md:w-2/3">
              <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-2">
                {submitted ? "Thank You!" : "Free Fence Installation Quote"}
              </h1>
              <p className="text-gray-300 mb-8">
                {submitted
                  ? "We received your request and will be in touch within 1 business day."
                  : "Enter your details and we'll get you a quote ASAP."}
              </p>

              {!submitted && (
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <Input label="Full Name" name="fullName" placeholder="Jane Doe" />
                  <Input label="Email Address" name="email" type="email" placeholder="you@example.com" />
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Phone Number</label>
                    <input
                      name="phone"
                      type="tel"
                      value={phone}
                      onChange={handlePhoneChange}
                      placeholder="(123) 456-7890"
                      required
                      className="w-full p-3 bg-gray-800/50 border border-gray-700 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-100 placeholder-gray-400"
                    />
                  </div>
                  <Input label="Project Address" name="address" placeholder="123 Main St, Tampa, FL" />

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Brief Description</label>
                    <textarea
                      name="description"
                      className="w-full p-3 bg-gray-800/50 border border-gray-700 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-100 placeholder-gray-400"
                      rows="3"
                      placeholder="Approx. linear footage, layout, gates, urgency, etc."
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Upload Photos (optional)</label>
                    <div className="relative">
                      <input
                        name="photos"
                        type="file"
                        className="hidden"
                        id="file-upload"
                        multiple
                      />
                      <label
                        htmlFor="file-upload"
                        className="w-full p-3 bg-gray-800/50 border border-gray-700 rounded-xl shadow-sm hover:bg-gray-800/70 transition-colors cursor-pointer text-gray-300 flex items-center justify-center"
                      >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                        Choose files
                      </label>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-6 rounded-xl text-lg font-medium hover:from-blue-600 hover:to-purple-600 transition-all transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                  >
                    Submit Request
                  </button>
                </form>
              )}
            </div>

            {/* Trust Indicators Sidebar */}
            <div className="md:w-1/3 space-y-4">
              <div className="bg-gray-800/50 p-4 rounded-xl">
                <h3 className="text-lg font-semibold text-white mb-3">Why Choose Us</h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                      <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-white font-medium">Licensed & Insured</h4>
                      <p className="text-gray-400 text-sm">All work performed by licensed and insured contractors</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center">
                      <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-white font-medium">Experienced Team</h4>
                      <p className="text-gray-400 text-sm">Skilled installation professionals</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-white font-medium">Professional Service</h4>
                      <p className="text-gray-400 text-sm">Dedicated to customer satisfaction</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-800/50 p-4 rounded-xl">
                <h3 className="text-lg font-semibold text-white mb-3">Service Area</h3>
                <div className="relative w-full aspect-[3/2] mb-2 rounded-lg overflow-hidden bg-white">
                  <img 
                    src="/tampa-bay-map.png" 
                    alt="Tampa Bay Service Area" 
                    className="w-full h-full object-cover object-center"
                    loading="eager"
                    decoding="sync"
                  />
                </div>
                <p className="text-gray-400 text-sm">Serving the greater Tampa Bay area.</p>
              </div>
              <div className="bg-gray-800/50 p-4 rounded-xl">
                <h3 className="text-lg font-semibold text-white mb-3">Meet the Pros</h3>
                <div className="relative w-full aspect-[3/2] mb-2 rounded-lg overflow-hidden bg-white">
                  <img 
                    src="/sunshine-fence-pros.png" 
                    alt="Sunshine State Fences Team" 
                    className="w-full h-full object-cover object-center"
                    loading="eager"
                    decoding="sync"
                  />
                </div>
                <p className="text-gray-400 text-sm">Our experienced team is ready to help with your fencing needs.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-800/50 p-4 rounded-lg">
              <p className="text-gray-300 text-sm">"Excellent service! They installed our fence quickly and professionally. Highly recommend!"</p>
              <p className="text-gray-400 text-xs mt-2">- Sarah M., Tampa</p>
            </div>
            <div className="bg-gray-800/50 p-4 rounded-lg">
              <p className="text-gray-300 text-sm">"Best fence installation company in Tampa. Great communication and quality work."</p>
              <p className="text-gray-400 text-xs mt-2">- John D., St. Petersburg</p>
            </div>
          </div>

          {/* Service Area */}
          <div className="text-center text-gray-400 text-sm">
            Serving Tampa Bay Area • Free Estimates • Same Day Response
          </div>
        </div>
      </div>
    </div>
  );
}

function Input({ label, name, type = "text", placeholder }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-1">{label}</label>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        required
        className="w-full p-3 bg-gray-800/50 border border-gray-700 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-100 placeholder-gray-400"
      />
    </div>
  );
} 