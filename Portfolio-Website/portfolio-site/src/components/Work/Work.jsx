import React from 'react';
import './Work.css';

const Work = () => {
    const projects = [
        {
            title: "Predictive Analytics Engine",
            desc: "A scalable ML pipeline for forecasting user retention.",
            color: "var(--color-navy)"
        },
        {
            title: "Lead extraction tool",
            desc: "An automated lead generation tool that searches Google for corporate training opportunities, extracts contact information, and stores qualified leads in Excel with email alerts..",
            color: "var(--color-green)"
        },
        {
            title: "NLP Customer Support Bot",
            desc: "LLM-integrated chat agent to resolve queries autonomously.",
            color: "var(--color-teal)"
        },
        {
            title: "E-Commerce Recommendation System",
            desc: "Collaborative filtering model to boost sales conversions.",
            color: "var(--color-mustard)"
        }
    ];

    return (
        <section id="work" className="work-section">
            <div className="content-wrapper grid-container work-container">
                <h2 className="section-title work-title">Works</h2>

                <div className="projects-grid">
                    {projects.map((project, index) => (
                        <div
                            key={index}
                            className="project-card"
                            style={{ backgroundColor: project.color }}
                        >
                            <div className="project-content">
                                <h3>{project.title}</h3>
                                <p>{project.desc}</p>
                            </div>
                            <span className="project-arrow">→</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Work;
