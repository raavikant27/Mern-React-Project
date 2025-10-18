import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";

const About = () => {
  const [activeSection, setActiveSection] = useState('story');
  const [statsVisible, setStatsVisible] = useState(false);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const { user } = useSelector(store => store.auth);

  // Stats animation trigger
  useEffect(() => {
    const timer = setTimeout(() => setStatsVisible(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Auto rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setTestimonialIndex(prev => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const sections = {
    story: "Our Story",
    mission: "Our Mission", 
    team: "Our Team",
    tech: "Technology Stack"
  };

  const stats = [
    { number: "50K+", label: "Happy Customers", icon: "👥" },
    { number: "1000+", label: "Restaurants", icon: "🏪" },
    { number: "25K+", label: "Orders Delivered", icon: "📦" },
    { number: "4.8/5", label: "Average Rating", icon: "⭐" }
  ];

  const teamMembers = [
    {
      name: "Ravi Kant",
      role: "Full Stack Developer & Founder",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&auto=format",
      skills: ["React.js", "Node.js", "MongoDB", "Express.js"],
      description: "Passionate about creating seamless food delivery experiences"
    },
    {
      name: "Sarah Johnson", 
      role: "UI/UX Designer",
      image: "https://images.unsplash.com/photo-1494790108755-2616b332e234?w=300&h=300&fit=crop&auto=format",
      skills: ["Figma", "Adobe XD", "User Research", "Prototyping"],
      description: "Designing intuitive interfaces that users love"
    },
    {
      name: "Alex Chen",
      role: "Backend Engineer", 
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&auto=format",
      skills: ["Python", "PostgreSQL", "Docker", "AWS"],
      description: "Building robust and scalable backend systems"
    }
  ];

  const techStack = [
    { name: "React.js", icon: "⚛️", color: "#61DAFB", description: "Modern UI library" },
    { name: "Redux Toolkit", icon: "🔄", color: "#764ABC", description: "State management" },
    { name: "Tailwind CSS", icon: "🎨", color: "#38B2AC", description: "Utility-first styling" },
    { name: "Node.js", icon: "📗", color: "#339933", description: "Backend runtime" },
    { name: "Express.js", icon: "🚀", color: "#000000", description: "Web framework" },
    { name: "MongoDB", icon: "🍃", color: "#47A248", description: "NoSQL database" },
    { name: "Swiggy API", icon: "🍔", color: "#FC8019", description: "Real restaurant data" },
    { name: "Vite", icon: "⚡", color: "#646CFF", description: "Fast build tool" }
  ];

  const testimonials = [
    {
      text: "Amazing food delivery app! Super fast and reliable.",
      author: "Priya Sharma",
      role: "Regular Customer",
      rating: 5
    },
    {
      text: "Best user interface I've seen in any food app. Love it!",
      author: "Arjun Patel", 
      role: "Food Blogger",
      rating: 5
    },
    {
      text: "Quick delivery and fresh food every time. Highly recommended!",
      author: "Sneha Gupta",
      role: "Working Professional", 
      rating: 5
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  const StatCard = ({ stat, index }) => (
    <motion.div
      initial={{ scale: 0, rotate: -180 }}
      animate={statsVisible ? { scale: 1, rotate: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow duration-300"
    >
      <div className="text-3xl mb-2">{stat.icon}</div>
      <div className="text-2xl font-bold text-orange-500 mb-1">{stat.number}</div>
      <div className="text-gray-600 dark:text-gray-400">{stat.label}</div>
    </motion.div>
  );

  const renderContent = () => {
    switch(activeSection) {
      case 'story':
        return (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            <motion.h2 variants={itemVariants} className="text-3xl font-bold text-gray-800 dark:text-white">
              Our Story 📖
            </motion.h2>
            <motion.p variants={itemVariants} className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              Started in 2024, <span className="text-orange-500 font-semibold">Sweegy</span> was born from a simple idea: 
              making delicious food accessible to everyone, anywhere, anytime. As a passionate developer, I wanted to create 
              a seamless food delivery experience that connects food lovers with their favorite restaurants.
            </motion.p>
            <motion.p variants={itemVariants} className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              What started as a learning project has evolved into a full-featured platform showcasing modern web technologies 
              and best practices in software development. Every line of code is written with love and attention to detail.
            </motion.p>
            <motion.div variants={itemVariants} className="bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-900 dark:to-red-900 p-6 rounded-lg">
              <p className="text-orange-800 dark:text-orange-200 italic">
                "Food is not just about eating, it's about experiencing moments of joy and connecting with culture."
              </p>
            </motion.div>
          </motion.div>
        );

      case 'mission':
        return (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            <motion.h2 variants={itemVariants} className="text-3xl font-bold text-gray-800 dark:text-white">
              Our Mission 🎯
            </motion.h2>
            <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-50 dark:bg-blue-900 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-blue-800 dark:text-blue-200 mb-3">🚀 Innovation</h3>
                <p className="text-blue-700 dark:text-blue-300">
                  Leveraging cutting-edge technology to revolutionize food delivery with real-time tracking, 
                  smart recommendations, and seamless user experiences.
                </p>
              </div>
              <div className="bg-green-50 dark:bg-green-900 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-green-800 dark:text-green-200 mb-3">🌱 Sustainability</h3>
                <p className="text-green-700 dark:text-green-300">
                  Promoting local restaurants, reducing food waste, and implementing eco-friendly delivery 
                  practices for a better tomorrow.
                </p>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-purple-800 dark:text-purple-200 mb-3">💝 Community</h3>
                <p className="text-purple-700 dark:text-purple-300">
                  Building bridges between restaurants and customers, supporting local businesses, 
                  and creating memorable dining experiences.
                </p>
              </div>
              <div className="bg-orange-50 dark:bg-orange-900 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-orange-800 dark:text-orange-200 mb-3">⚡ Excellence</h3>
                <p className="text-orange-700 dark:text-orange-300">
                  Maintaining highest standards in code quality, user experience, and customer service 
                  through continuous learning and improvement.
                </p>
              </div>
            </motion.div>
          </motion.div>
        );

      case 'team':
        return (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            <motion.h2 variants={itemVariants} className="text-3xl font-bold text-gray-800 dark:text-white">
              Meet Our Team 👨‍💻👩‍💻
            </motion.h2>
            <motion.div variants={itemVariants} className="grid md:grid-cols-3 gap-6">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="text-center mb-4">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-orange-200"
                    />
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{member.name}</h3>
                    <p className="text-orange-500 font-medium">{member.role}</p>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{member.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {member.skills.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="px-3 py-1 bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 text-xs rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        );

      case 'tech':
        return (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            <motion.h2 variants={itemVariants} className="text-3xl font-bold text-gray-800 dark:text-white">
              Technology Stack 💻
            </motion.h2>
            <motion.p variants={itemVariants} className="text-lg text-gray-600 dark:text-gray-300">
              Built with modern technologies and best practices for performance, scalability, and maintainability.
            </motion.p>
            <motion.div variants={itemVariants} className="grid md:grid-cols-4 sm:grid-cols-2 gap-4">
              {techStack.map((tech, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05, rotateY: 5 }}
                  className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-center"
                >
                  <div className="text-3xl mb-2">{tech.icon}</div>
                  <h3 className="font-semibold text-gray-800 dark:text-white mb-1">{tech.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{tech.description}</p>
                  <div 
                    className="h-1 bg-gradient-to-r rounded-full mt-3"
                    style={{ background: `linear-gradient(to right, ${tech.color}, ${tech.color}50)` }}
                  />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`${isDarkMode ? 'bg-gradient-to-br from-gray-900 to-gray-800' : 'bg-gradient-to-br from-orange-50 to-red-50'}`}>
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative py-20 px-4"
      >
        <div className="max-w-6xl mx-auto text-center">
          <motion.h1
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent mb-6"
          >
            About Sweegy
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
          >
            Crafting exceptional food delivery experiences with cutting-edge technology and passion for innovation
          </motion.p>
          {user && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mt-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg inline-block"
            >
              <p className="text-orange-500">Welcome back, <span className="font-semibold">{user.name}!</span> 👋</p>
            </motion.div>
          )}
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="py-16 px-4"
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <StatCard key={index} stat={stat} index={index} />
            ))}
          </div>
        </div>
      </motion.section>

      {/* Navigation Tabs */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="py-8 px-4"
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {Object.entries(sections).map(([key, label]) => (
              <motion.button
                key={key}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveSection(key)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  activeSection === key
                    ? 'bg-orange-500 text-white shadow-lg'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-orange-100 dark:hover:bg-gray-700'
                }`}
              >
                {label}
              </motion.button>
            ))}
          </div>

          {/* Content Area */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {renderContent()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="py-16 px-4"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">What Our Users Say 💭</h2>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={testimonialIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <div className="flex justify-center mb-4">
                  {[...Array(testimonials[testimonialIndex].rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-2xl">⭐</span>
                  ))}
                </div>
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-4 italic">
                  "{testimonials[testimonialIndex].text}"
                </p>
                <div>
                  <p className="font-semibold text-gray-800 dark:text-white">
                    {testimonials[testimonialIndex].author}
                  </p>
                  <p className="text-orange-500">{testimonials[testimonialIndex].role}</p>
                </div>
              </motion.div>
            </AnimatePresence>
            <div className="flex justify-center space-x-2 mt-6">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setTestimonialIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === testimonialIndex ? 'bg-orange-500' : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Call to Action */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="py-16 px-4"
      >
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl shadow-xl p-8 text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Experience Sweegy? 🚀</h2>
            <p className="text-xl mb-6 opacity-90">
              Join thousands of satisfied customers and discover your next favorite meal!
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-orange-500 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300"
            >
              Start Ordering Now 🍽️
            </motion.button>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default About;