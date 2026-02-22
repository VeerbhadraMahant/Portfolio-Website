import React from 'react';
import './About.css';
import aboutImage from '../../assets/Vector1.png';
const About = () => {
    return (
        <section id="about" className="about-section">
            <div className="section-number">01</div>

            <div className="content-wrapper grid-container about-grid">
                <div className="about-visual">
                    <div className="image-frame">
                        <div className="image-offset"></div>
                        {/* Actual image goes here */}
                        <img src={aboutImage} alt="About Me" className="about-img" />
                    </div>
                </div>

                <div className="about-content">
                    <h2 className="section-title">About Me</h2>

                    <div className="text-content">
                        <p>
                            I am an Information Technology undergraduate focused on building production
                            ready machine learning and automation systems.
                            I design end to end data workflows, integrate LLM APIs,
                            and deploy ML models that solve real operational problems.
                        </p>
                        <p>
                            My work centers on practical ML engineering. From feature engineering and model evaluation to
                            automated reporting pipelines and API integrations,
                            I focus on building systems that reduce manual effort and deliver measurable impact.
                        </p>
                    </div>
                </div>

                <div className="skills-container">
                    <h3 className="skills-title">Skills</h3>

                    <div className="skills-grid-container">
                        <div className="skill-category">
                            <h4>Programming</h4>
                            <ul className="skills-list">
                                <li>Python</li>
                                <li>SQL</li>
                                <li>JavaScript</li>
                                <li>Java</li>
                            </ul>
                        </div>

                        <div className="skill-category">
                            <h4>AI / Machine Learning</h4>
                            <ul className="skills-list">
                                <li>Scikit Learn</li>
                                <li>NumPy & Pandas</li>
                                <li>Regression Modeling</li>
                                <li>Feature Engineering</li>
                                <li>Model Evaluation</li>
                                <li>LLM API Integration</li>
                                <li>TensorFlow & PyTorch</li>
                            </ul>
                        </div>

                        <div className="skill-category">
                            <h4>Backend & APIs</h4>
                            <ul className="skills-list">
                                <li>REST API Development</li>
                                <li>Google APIs</li>
                                <li>Automation Scripting</li>
                            </ul>
                        </div>

                        <div className="skill-category">
                            <h4>Databases</h4>
                            <ul className="skills-list">
                                <li>PostgreSQL & MySQL</li>
                                <li>Oracle SQL</li>
                                <li>SQLite & MongoDB</li>
                            </ul>
                        </div>

                        <div className="skill-category">
                            <h4>Frontend</h4>
                            <ul className="skills-list">
                                <li>React</li>
                                <li>CSS Grid / Flexbox</li>
                                <li>Streamlit</li>
                            </ul>
                        </div>

                        <div className="skill-category">
                            <h4>Cloud & Tools</h4>
                            <ul className="skills-list">
                                <li>Oracle Cloud</li>
                                <li>Git & GitHub</li>
                                <li>Figma</li>
                                <li>Plotly & Jupyter</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
