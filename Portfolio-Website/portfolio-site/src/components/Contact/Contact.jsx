import React from 'react';
import './Contact.css';
const Contact = () => {
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
                        <a href="mailto:[EMAIL_ADDRESS]" className="contact-link">
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

                    <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input type="text" id="name" placeholder="YOUR NAME" required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" placeholder="YOUR EMAIL" required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="message">Message</label>
                            <textarea id="message" rows="4" placeholder="HOW CAN I HELP?" required></textarea>
                        </div>

                        <button type="submit" className="btn-submit">Send Message</button>
                    </form>
                </div>
            </div>

            <footer className="footer">
                <p>© {new Date().getFullYear()} Veerbhadra Mahant. Designed & Built using React and Nodejs.</p>
            </footer>
        </section>
    );
};

export default Contact;
