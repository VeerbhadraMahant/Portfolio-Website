import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import './Contact.css';
const Contact = () => {
    const form = useRef();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState('');

    const sendEmail = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitMessage('');

        emailjs.sendForm(
            'service_al4n05w', // Replace with your EmailJS Service ID
            'template_dsbicuh', // Replace with your EmailJS Template ID
            form.current,
            'bV7bRgDIlUNxbW6r5' // Replace with your EmailJS Public Key
        )
            .then((result) => {
                setSubmitMessage('Message sent successfully!');
                setIsSubmitting(false);
                e.target.reset(); // Clear form fields
            }, (error) => {
                setSubmitMessage('Failed to send message. Please try again.');
                setIsSubmitting(false);
                console.error(error.text);
            });
    };

    return (
        <section id="contact" className="contact-section">
            <div className="section-number">04</div>

            <div className="content-wrapper grid-container contact-container">
                <div className="contact-header">
                    <h2 className="section-title">Get In Touch</h2>
                    <p className="contact-subtitle">
                        Currently available for freelance projects and full-time opportunities.
                    </p>
                </div>

                <div className="contact-content">
                    <div className="contact-links">
                        <a href="mailto:veerbhadramahant59@gmail.com" className="contact-link">
                            EMAIL
                            <span className="link-arrow">→</span>
                        </a>
                        <a href="https://www.linkedin.com/in/veerbhadramahant/" target="_blank" rel="noopener noreferrer" className="contact-link">
                            LinkedIn
                            <span className="link-arrow">→</span>
                        </a>
                        <a href="https://github.com/VeerbhadraMahant" target="_blank" rel="noopener noreferrer" className="contact-link">
                            GitHub
                            <span className="link-arrow">→</span>
                        </a>
                    </div>
                    <form ref={form} className="contact-form" onSubmit={sendEmail}>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input type="text" id="name" name="user_name" placeholder="YOUR NAME" required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" name="user_email" placeholder="YOUR EMAIL" required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="message">Message</label>
                            <textarea id="message" name="message" rows="4" placeholder="HOW CAN I HELP?" required></textarea>
                        </div>

                        <button type="submit" className="btn-submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Sending...' : 'Send Message'}
                        </button>
                        {submitMessage && (
                            <p style={{
                                marginTop: '1.5rem',
                                color: submitMessage.includes('successfully') ? 'var(--color-green)' : 'var(--color-red)',
                                fontWeight: '500'
                            }}>
                                {submitMessage}
                            </p>
                        )}
                    </form>
                </div>
            </div>

            <footer className="footer">
                <p>© {new Date().getFullYear()} Veerbhadra Mahant. Engineered with React.</p>
            </footer>
        </section>
    );
};
export default Contact;