import React, { useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import './ProjectDetail.css';
import projectsList from '../../data/projects';

const projectsData = Object.fromEntries(projectsList.map(p => [p.id, p]));

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
                    <p>© {new Date().getFullYear()} Veerbhadra Mahant. Engineered with React.</p>
                </footer>
            </div>
        </div>
    );
};

export default ProjectDetail;
