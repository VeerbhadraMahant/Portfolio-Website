import React from 'react';
import './Experience.css';

const experiences = [
    { year: '2023 - Present', role: 'Senior Designer', company: 'Studio Geometric' },
    { year: '2020 - 2023', role: 'Frontend Developer', company: 'Digital Form' },
    { year: '2018 - 2020', role: 'UI/UX Intern', company: 'Creative Agency' }
];

const Experience = () => {
    return (
        <section id="experience" className="experience-section">
            <div className="section-number">03</div>

            <div className="content-wrapper grid-container exp-container">
                <h2 className="section-title exp-title">Experience</h2>

                <div className="timeline-container">
                    <div className="timeline-line"></div>

                    <div className="timeline-items">
                        {experiences.map((exp, index) => (
                            <div key={index} className="timeline-item">
                                <div className="timeline-node"></div>
                                <div className="timeline-content">
                                    <div className="timeline-year">{exp.year}</div>
                                    <h3 className="timeline-role">{exp.role}</h3>
                                    <div className="timeline-company">{exp.company}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Experience;
