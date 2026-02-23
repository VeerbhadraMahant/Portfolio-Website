import React, { useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import './ProjectDetail.css';

const projectsData = {
    'predictive-analytics': {
        title: "Predictive Analytics Engine(In Development)",
        desc: "A scalable ML pipeline for forecasting user retention. This project involved building robust data ingestion pipelines, training various temporal prediction models, and deploying the solution as a microservice.",
        color: "var(--color-navy)",
        demo: "#",
        github: "#"
    },
    'lead-extraction': {
        title: "Lead extraction tool",
        desc: "An automated lead generation tool that searches Google for corporate training opportunities, extracts contact information, and stores qualified leads in Excel with email alerts. Designed for high throughput and accuracy.",
        color: "var(--color-green)",
        demo: null,
        github: "https://github.com/VeerbhadraMahant/Lead-Extraction-Tool"
    },
    'ml-radiology-assistant': {
        title: "ML Based Radiology Assistant(In Development)",
        desc: "AI-powered assistant for automated radiographic image analysis. Exploring deep learning computer vision models to detect abnormalities and highlight areas of clinical concern across various X-Ray and MRI modalities.",
        color: "var(--color-teal)",
        demo: "#",
        github: "#"
    },
    'ml-stock-analytics': {
        title: "ML Based Stock market analytics dashboard",
        desc: "A comprehensive dashboard for analyzing stock market trends using machine learning. Features real-time data ingestion, technical indicator calculation, and predictive modeling for equity forecasting.",
        color: "var(--color-red)",
        demo: null,
        github: "https://github.com/VeerbhadraMahant/StockAnalysisSystem"
    }
};

const ProjectDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { state } = useLocation();
    const project = projectsData[id];

    const handleBackClick = () => {
        navigate('/', { state: { scrollTo: 'work', contractColor: project.color, returnId: state?.returnId } });
    };

    // Scroll to top when page loads
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!project) {
        return (
            <div className="project-detail-section" style={{ backgroundColor: 'var(--color-navy)' }}>
                <div className="overlay-inner" style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <h2 style={{ color: 'white' }}>Project Not Found</h2>
                    <button className="btn-back" onClick={handleBackClick} style={{ marginTop: '2rem' }}>
                        <span>←</span>
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="project-detail-section" style={{ backgroundColor: project.color }}>
            <div className="overlay-inner">
                <div className="overlay-header">
                    <button className="btn-back" onClick={handleBackClick}>
                        <span>←</span>
                    </button>
                    <h2 className="overlay-title">{project.title}</h2>
                </div>

                <div className="overlay-body">
                    <div className="overlay-desc-box">
                        <p>{project.desc}</p>
                    </div>
                    <div className="overlay-links">
                        {project.demo && (
                            <a href={project.demo} className="overlay-link" target="_blank" rel="noopener noreferrer">
                                Live Demo <span className="link-arrow">→</span>
                            </a>
                        )}
                        {project.github && (
                            <a href={project.github} className="overlay-link" target="_blank" rel="noopener noreferrer">
                                GitHub <span className="link-arrow">→</span>
                            </a>
                        )}
                    </div>
                </div>

                <footer className="footer overlay-footer" style={{ marginTop: 'auto' }}>
                    <p>© {new Date().getFullYear()} Veerbhadra Mahant. Engineered with React & Node.</p>
                </footer>
            </div>
        </div>
    );
};

export default ProjectDetail;
