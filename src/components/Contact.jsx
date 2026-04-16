import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPaperPlane, FaEnvelope, FaMapMarkerAlt, FaPhone, FaGithub, FaLinkedin, FaTwitter, FaDiscord } from 'react-icons/fa';
import './Contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 1500));

        setIsSubmitting(false);
        setSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });

        setTimeout(() => setSubmitted(false), 5000);
    };

    const contactInfo = [
        { icon: FaEnvelope, label: 'Email', value: 'vardhanchauhan0407@gmail.com', href: 'mailto:vardhanchauhan0407@gmail.com' },
        { icon: FaMapMarkerAlt, label: 'Location', value: 'Zirakpur, Punjab, India', href: null },
        { icon: FaPhone, label: 'Phone', value: '+91-7649840004', href: 'tel:+917649840004' }
    ];

    const socialLinks = [
        { icon: FaGithub, name: 'GitHub', href: 'https://github.com', color: '#333' },
        { icon: FaLinkedin, name: 'LinkedIn', href: 'https://linkedin.com', color: '#0077b5' },
        { icon: FaTwitter, name: 'Twitter', href: 'https://twitter.com', color: '#1da1f2' },
        { icon: FaDiscord, name: 'Discord', href: 'https://discord.com', color: '#5865f2' }
    ];

    return (
        <section id="contact" className="section contact">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <h2 className="section-title">Get In Touch</h2>
                    <p className="section-subtitle">Ready to start a new quest together?</p>
                </motion.div>

                <div className="contact-content">
                    {/* Contact Info */}
                    <motion.div
                        className="contact-info"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="contact-info-title">Let's Connect!</h3>
                        <p className="contact-info-text">
                            I'm always excited to work on new game design projects and collaborate with
                            creative minds. Whether you have a project idea, internship opportunity, or
                            just want to say hi, feel free to reach out!
                        </p>

                        <div className="contact-details">
                            {contactInfo.map((info, index) => (
                                <motion.div
                                    key={index}
                                    className="contact-detail-item"
                                    whileHover={{ x: 10 }}
                                    transition={{ type: 'spring', stiffness: 300 }}
                                >
                                    <div className="detail-icon">
                                        <info.icon />
                                    </div>
                                    <div className="detail-text">
                                        <span className="detail-label">{info.label}</span>
                                        {info.href ? (
                                            <a href={info.href} className="detail-value">{info.value}</a>
                                        ) : (
                                            <span className="detail-value">{info.value}</span>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <div className="social-links">
                            <h4 className="social-title">Find me on</h4>
                            <div className="social-icons">
                                {socialLinks.map((social, index) => (
                                    <motion.a
                                        key={index}
                                        href={social.href}
                                        className="social-link"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ y: -5, scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                        style={{ '--social-color': social.color }}
                                    >
                                        <social.icon />
                                    </motion.a>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        className="contact-form-container"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <form onSubmit={handleSubmit} className="contact-form">
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="name">Your Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        placeholder="Your Name"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Your Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        placeholder="Your Email"
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="subject">Subject</label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                    placeholder="Game Design Collaboration"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="message">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows="5"
                                    placeholder="Your Message"
                                ></textarea>
                            </div>

                            <motion.button
                                type="submit"
                                className={`btn btn-primary submit-btn ${isSubmitting ? 'submitting' : ''} ${submitted ? 'submitted' : ''}`}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <span className="loading-dots">Sending...</span>
                                ) : submitted ? (
                                    <>✓ Message Sent!</>
                                ) : (
                                    <>
                                        <FaPaperPlane /> Send Message
                                    </>
                                )}
                            </motion.button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
