import { useState } from 'react';

function Contact() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState(''); // For success/error message

  const handleChange = e => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();

    // Here you can integrate real email sending (e.g., EmailJS, Formspree, or your backend)
    console.log('Contact Form Submitted:', formState);

    setStatus(
      "Thank you! Your message has been sent. We'll get back to you soon."
    );
    setFormState({ name: '', email: '', subject: '', message: '' });

    // Optional: Clear status after 5 seconds
    setTimeout(() => setStatus(''), 5000);
  };

  return (
    <section className="py-16 md:py-24 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Get in Touch
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We'd love to hear from you! Whether you have a question about our
            products, need help with an order, or just want to say hello.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-[#A0C878]/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-8 h-8 text-[#A0C878]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Email Us</h3>
            <p className="text-gray-600">support@yourstore.com</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-[#A0C878]/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-8 h-8 text-[#A0C878]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Call Us</h3>
            <p className="text-gray-600">+1 (555) 123-4567</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-[#A0C878]/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-8 h-8 text-[#A0C878]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Visit Us</h3>
            <p className="text-gray-600">
              123 Green Street
              <br />
              Nature City, NC 12345
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Send Us a Message
          </h2>

          {status && (
            <div className="mb-6 p-4 bg-green-100 border border-green-300 text-green-800 rounded-xl text-center">
              {status}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Your Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formState.name}
                  onChange={handleChange}
                  className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:border-[#A0C878] focus:ring-4 focus:ring-[#A0C878]/20 transition-all"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formState.email}
                  onChange={handleChange}
                  className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:border-[#A0C878] focus:ring-4 focus:ring-[#A0C878]/20 transition-all"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="subject"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Subject
              </label>
              <input
                id="subject"
                name="subject"
                type="text"
                required
                value={formState.subject}
                onChange={handleChange}
                className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:border-[#A0C878] focus:ring-4 focus:ring-[#A0C878]/20 transition-all"
                placeholder="How can we help you?"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="6"
                required
                value={formState.message}
                onChange={handleChange}
                className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:border-[#A0C878] focus:ring-4 focus:ring-[#A0C878]/20 transition-all resize-none"
                placeholder="Write your message here..."
              />
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="px-10 py-5 bg-[#A0C878] hover:bg-[#8bb15c] text-white text-xl font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;
