import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    inquiryType: "general"
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [activeSection, setActiveSection] = useState('form');
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const formRef = useRef(null);
  const { user } = useSelector(store => store.auth);

  // Auto-fill user data if logged in
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.name || "",
        email: user.email || ""
      }));
    }
  }, [user]);

  const inquiryTypes = [
    { value: "general", label: "General Inquiry", icon: "💬", color: "blue" },
    { value: "support", label: "Customer Support", icon: "🛠️", color: "green" },
    { value: "business", label: "Business Partnership", icon: "🤝", color: "purple" },
    { value: "feedback", label: "Feedback & Suggestions", icon: "💡", color: "orange" },
    { value: "technical", label: "Technical Issue", icon: "🐛", color: "red" },
    { value: "career", label: "Career Opportunities", icon: "💼", color: "indigo" }
  ];

  const contactMethods = [
    {
      icon: "📧",
      title: "Email Us",
      description: "Get in touch via email",
      value: "hello@sweegy.com",
      link: "mailto:hello@sweegy.com",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: "📞",
      title: "Call Us",
      description: "Speak directly with our team",
      value: "+91 98765 43210",
      link: "tel:+919876543210",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: "💬",
      title: "Live Chat",
      description: "Chat with us in real-time",
      value: "Available 24/7",
      link: "#",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: "📍",
      title: "Visit Us",
      description: "Come to our office",
      value: "Delhi, India",
      link: "#",
      color: "from-orange-500 to-red-500"
    }
  ];

  const faqs = [
    {
      question: "How long does delivery usually take?",
      answer: "Most deliveries are completed within 30-45 minutes, depending on your location and restaurant preparation time."
    },
    {
      question: "Is there a minimum order amount?",
      answer: "Minimum order amounts vary by restaurant. You can see the minimum order requirement on each restaurant's page."
    },
    {
      question: "How can I track my order?",
      answer: "Once your order is confirmed, you'll receive real-time updates via SMS and email. You can also track your order in the app."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit/debit cards, UPI, net banking, and cash on delivery for eligible orders."
    },
    {
      question: "How do I cancel or modify my order?",
      answer: "You can cancel or modify your order within 2 minutes of placing it. After that, please contact our support team."
    }
  ];

  const socialLinks = [
    { name: "Facebook", icon: "📘", url: "#", color: "hover:text-blue-600" },
    { name: "Twitter", icon: "🐦", url: "#", color: "hover:text-sky-500" },
    { name: "Instagram", icon: "📷", url: "#", color: "hover:text-pink-500" },
    { name: "LinkedIn", icon: "💼", url: "#", color: "hover:text-blue-700" },
    { name: "YouTube", icon: "📺", url: "#", color: "hover:text-red-600" }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitStatus('success');
      setFormData({
        name: user?.name || "",
        email: user?.email || "",
        phone: "",
        subject: "",
        message: "",
        inquiryType: "general"
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  return (
    <div className={`${isDarkMode ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' : 'bg-gradient-to-br from-orange-50 via-red-50 to-pink-50'} relative`}>
      {/* Static Background */}
      <div className={`absolute inset-0 opacity-5 pointer-events-none ${isDarkMode ? 'bg-gradient-to-br from-orange-900 to-red-900' : 'bg-gradient-to-br from-orange-100 to-red-100'}`} />

      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 bg-clip-text text-transparent mb-6">
            Get In Touch
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            We'd love to hear from you! Whether you have questions, feedback, or need support, 
            our team is here to help you 24/7.
          </p>
          
          {/* Navigation Pills */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {['form', 'info', 'faq'].map((section) => (
              <button
                key={section}
                onClick={() => setActiveSection(section)}
                className={`px-6 py-3 rounded-full font-semibold transition-colors duration-300 ${
                  activeSection === section
                    ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-orange-100 dark:hover:bg-gray-700'
                }`}
              >
                {section === 'form' && '📝 Contact Form'}
                {section === 'info' && '📞 Contact Info'}
                {section === 'faq' && '❓ FAQ'}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 pb-20">
        {/* Contact Form Section */}
        {activeSection === 'form' && (
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                Send us a message 💌
              </h2>
              
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                {/* Inquiry Type Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    What can we help you with?
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {inquiryTypes.map((type) => (
                      <label
                        key={type.value}
                        className={`relative cursor-pointer p-3 rounded-lg border-2 transition-colors duration-300 ${
                          formData.inquiryType === type.value
                            ? 'border-orange-500 bg-orange-50 dark:bg-orange-900'
                            : 'border-gray-200 dark:border-gray-600 hover:border-orange-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name="inquiryType"
                          value={type.value}
                          checked={formData.inquiryType === type.value}
                          onChange={handleInputChange}
                          className="sr-only"
                        />
                        <div className="text-center">
                          <div className="text-2xl mb-1">{type.icon}</div>
                          <div className="text-xs font-medium text-gray-700 dark:text-gray-300">
                            {type.label}
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Form Fields */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-300"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-300"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-300"
                      placeholder="+91 98765 43210"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-300"
                      placeholder="What's this about?"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-300 resize-none"
                    placeholder="Tell us more about your inquiry..."
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:from-orange-600 hover:to-red-600 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-3 animate-spin" />
                      Sending Message...
                    </div>
                  ) : (
                    'Send Message 🚀'
                  )}
                </button>

                {/* Submit Status */}
                {submitStatus && (
                  <div className={`p-4 rounded-lg text-center font-medium transition-all duration-300 ${
                    submitStatus === 'success'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                  }`}>
                    {submitStatus === 'success' ? (
                      <>✅ Message sent successfully! We'll get back to you soon.</>
                    ) : (
                      <>❌ Something went wrong. Please try again.</>
                    )}
                  </div>
                )}
              </form>
            </div>

            {/* Contact Methods */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                Other ways to reach us 📞
              </h2>
              
              <div className="grid gap-4">
                {contactMethods.map((method, index) => (
                  <a
                    key={index}
                    href={method.link}
                    className={`block p-6 rounded-xl bg-gradient-to-r ${method.color} text-white shadow-lg hover:shadow-xl transition-shadow duration-300`}
                  >
                    <div className="flex items-center">
                      <div className="text-3xl mr-4">{method.icon}</div>
                      <div>
                        <h3 className="text-xl font-semibold mb-1">{method.title}</h3>
                        <p className="opacity-90 mb-1">{method.description}</p>
                        <p className="text-lg font-medium">{method.value}</p>
                      </div>
                    </div>
                  </a>
                ))}
              </div>

              {/* Social Links */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                  Follow us on social media 🌐
                </h3>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      className={`text-3xl transition-colors duration-300 ${social.color}`}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Contact Info Section */}
        {activeSection === 'info' && (
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Company Info */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                Company Information 🏢
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="text-2xl">🏠</div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                      Headquarters
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Sweegy Technologies Pvt. Ltd.<br/>
                      123, Food Street, Connaught Place<br/>
                      New Delhi - 110001, India
                    </p>
                    <div className="mt-3 flex space-x-2">
                      <span className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 px-2 py-1 rounded-full text-xs">
                        📍 Central Delhi
                      </span>
                      <span className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-2 py-1 rounded-full text-xs">
                        🚇 Metro Connected
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="text-2xl">🕒</div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                      Business Hours
                    </h3>
                    <div className="text-gray-600 dark:text-gray-300 space-y-1">
                      <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                      <p>Saturday: 10:00 AM - 4:00 PM</p>
                      <p>Sunday: Closed</p>
                      <p className="text-orange-500 font-medium">Customer Support: 24/7</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="text-2xl">🌍</div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                      Service Areas
                    </h3>
                    <div className="text-gray-600 dark:text-gray-300">
                      <p>Currently serving in:</p>
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        {[
                          { name: 'Delhi NCR', coordinates: '28.6139,77.2090' },
                          { name: 'Mumbai', coordinates: '19.0760,72.8777' },
                          { name: 'Bangalore', coordinates: '12.9716,77.5946' },
                          { name: 'Pune', coordinates: '18.5204,73.8567' },
                          { name: 'Hyderabad', coordinates: '17.3850,78.4867' },
                          { name: 'Chennai', coordinates: '13.0827,80.2707' }
                        ].map((city) => (
                          <button
                            key={city.name}
                            onClick={() => window.open(`https://maps.google.com/?q=${city.coordinates}`, '_blank')}
                            className="bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 px-3 py-1 rounded-full text-sm hover:bg-orange-200 dark:hover:bg-orange-800 transition-colors duration-300 cursor-pointer"
                          >
                            📍 {city.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Nearby Landmarks */}
                <div className="flex items-start space-x-4">
                  <div className="text-2xl">🏛️</div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                      Nearby Landmarks
                    </h3>
                    <div className="text-gray-600 dark:text-gray-300 space-y-1">
                      <p>🏪 Palika Bazaar - 2 min walk</p>
                      <p>🚇 Rajiv Chowk Metro - 1 min walk</p>
                      <p>🏢 Central Park - 3 min walk</p>
                      <p>🍽️ Various Restaurants - Ground floor</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Map */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 h-full">
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                Find Us Here 📍
              </h2>
              
              <div className="relative bg-gray-200 dark:bg-gray-700 rounded-lg h-80 overflow-hidden">
                {!isMapLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
                  </div>
                )}
                
                {/* Google Maps Embed */}
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.8893320975447!2d77.21559637544988!3d28.634715575681704!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd0c3b1a92d5%3A0x6a0d13a4b2c8f2e5!2sConnaught%20Place%2C%20New%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1697678400000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-lg"
                  onLoad={() => setIsMapLoaded(true)}
                />
                
                {/* Fallback for no internet */}
                <div 
                  className="absolute inset-0 bg-gradient-to-br from-orange-200 to-red-200 dark:from-orange-800 dark:to-red-800 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300"
                  style={{ display: isMapLoaded ? 'none' : 'flex' }}
                >
                  <div className="text-center">
                    <div className="text-6xl mb-4">🗺️</div>
                    <p className="text-gray-700 dark:text-gray-300">
                      Loading Interactive Map...<br/>
                      <span className="text-sm">Connaught Place, New Delhi</span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <button 
                  onClick={() => window.open('https://maps.google.com/?q=Connaught+Place+New+Delhi', '_blank')}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition-colors duration-300"
                >
                  Get Directions 🧭
                </button>
                <button 
                  onClick={() => window.open('tel:+919876543210')}
                  className="bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 px-6 rounded-lg font-semibold hover:from-green-600 hover:to-emerald-600 transition-colors duration-300"
                >
                  Call Office 📞
                </button>
              </div>
            </div>
          </div>
        )}

        {/* FAQ Section */}
        {activeSection === 'faq' && (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
                Frequently Asked Questions 🤔
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Find quick answers to common questions
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="transition-all duration-300">
                  <details className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                    <summary className="cursor-pointer p-6 hover:bg-orange-50 dark:hover:bg-gray-700 transition-colors duration-300">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                          {faq.question}
                        </h3>
                        <div className="text-2xl text-orange-500 group-open:rotate-180 transition-transform duration-300">
                          ⬇️
                        </div>
                      </div>
                    </summary>
                    <div className="px-6 pb-6">
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </details>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Still have questions? 🤷‍♂️</h3>
                <p className="text-lg mb-6 opacity-90">
                  Our support team is here to help you 24/7
                </p>
                <button
                  onClick={() => setActiveSection('form')}
                  className="bg-white text-orange-500 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300"
                >
                  Contact Support 💬
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Contact;