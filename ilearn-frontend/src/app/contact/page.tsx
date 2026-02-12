'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  MessageCircle,
  Clock,
  CheckCircle,
  Loader2
} from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    userType: 'student'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulation d'envoi
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);

      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        userType: 'student'
      });

      setTimeout(() => setSubmitted(false), 5000);
    }, 2000);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'contact@ilearn.education',
      link: 'mailto:contact@ilearn.education',
      description: 'Send us an email anytime'
    },
    {
      icon: Phone,
      title: 'Phone',
      value: '+33 1 23 45 67 89',
      link: 'tel:+33123456789',
      description: 'Mon-Fri 9AM - 6PM CET'
    },
    {
      icon: MapPin,
      title: 'Address',
      value: '123 Education Street, Paris 75001, France',
      link: 'https://maps.google.com',
      description: 'Visit our office'
    }
  ];

  const departments = [
    {
      icon: MessageCircle,
      title: 'General Inquiries',
      titleFr: 'Demandes Générales',
      email: 'info@ilearn.education'
    },
    {
      icon: Phone,
      title: 'Technical Support',
      titleFr: 'Support Technique',
      email: 'support@ilearn.education'
    },
    {
      icon: Mail,
      title: 'Partnerships',
      titleFr: 'Partenariats',
      email: 'partnerships@ilearn.education'
    }
  ];

  const faq = [
    {
      question: 'How do I create an account?',
      questionFr: 'Comment créer un compte ?',
      answer:
        'Click on "Sign Up Free" and follow the registration process. It takes less than 2 minutes!'
    },
    {
      question: 'Is i-Learn really free?',
      questionFr: 'i-Learn est-il vraiment gratuit ?',
      answer:
        'Yes! We offer free access to all educational resources for students and teachers.'
    },
    {
      question: 'What devices can I use?',
      questionFr: 'Quels appareils puis-je utiliser ?',
      answer:
        'i-Learn works on computers, tablets, and smartphones with any modern web browser.'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero */}
      <section className="bg-gradient-to-r from-green-500 via-emerald-500 to-green-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Contact Us</h1>
          <p className="text-2xl opacity-90 mb-2">Contactez-Nous</p>
          <p className="text-xl opacity-80 max-w-3xl mx-auto">
            Have a question? We're here to help and answer any question you might have.
          </p>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="max-w-7xl mx-auto px-4 -mt-10">
        <div className="grid md:grid-cols-3 gap-6">
          {contactInfo.map((info, index) => (
            <a
              key={info.title}
              href={info.link}
              target={info.link.startsWith('http') ? '_blank' : undefined}
              rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all group"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <info.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">{info.title}</h3>
              <p className="text-green-600 font-semibold mb-1">{info.value}</p>
              <p className="text-gray-600 text-sm">{info.description}</p>
            </a>
          ))}
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">

            {/* Form */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-3xl font-bold mb-6 text-gray-800">
                Send us a Message
              </h2>

              {submitted && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <div>
                    <p className="font-semibold text-green-800">
                      Message sent successfully!
                    </p>
                    <p className="text-sm text-green-700">
                      We'll get back to you within 24 hours.
                    </p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">

                <select
                  name="userType"
                  value={formData.userType}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                >
                  <option value="student">Student - Étudiant</option>
                  <option value="parent">Parent</option>
                  <option value="teacher">Teacher - Enseignant</option>
                  <option value="school">School Administrator</option>
                  <option value="other">Other - Autre</option>
                </select>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="John Doe"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="john@example.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                />

                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="How can we help?"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                />

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg font-bold flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Right column (Departments + FAQ + Hours) */}
            <div className="space-y-8">
              {/* ... ton code original inchangé ici ... */}
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
