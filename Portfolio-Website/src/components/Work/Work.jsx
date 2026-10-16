import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Work.css';
import projects from '../../data/projects';

const Work = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [transitionState, setTransitionState] = useState(() => {
        return (location.state?.contractColor && location.state?.returnId !== undefined) ? 'contracting' : 'idle';
    });

    const [transitionStyle, setTransitionStyle] = useState(() => {
        if (location.state?.contractColor && location.state?.returnId !== undefined) {
            return {
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                backgroundColor: location.state.contractColor,
                opacity: 1,
                transition: 'none' // Prevent animating the initial spawn
            };
        }
        return {};
    });

    useEffect(() => {
        // Handle returning from project detail
        if (transitionState === 'contracting' && location.state?.contractColor !== undefined) {
            // The expanding div is already rendered at 100vw/100vh.
            // Wait a tick for DOM to be ready and App.jsx scroll restoration to finish
            const timer = setTimeout(() => {
                const card = document.getElementById(`project-card-${location.state.returnId}`);
                if (card) {
                    const rect = card.getBoundingClientRect();
                    setTransitionStyle({
                        top: rect.top,
                        left: rect.left,
                        width: rect.width,
                        height: rect.height,
                        backgroundColor: location.state.contractColor,
                        opacity: 1
                        // 'transition: none' is omitted so CSS transition plays!
                    });

                    // Fade out after shrinking
                    setTimeout(() => {
                        setTransitionStyle(prev => ({ ...prev, opacity: 0 }));
                        setTimeout(() => {
                            setTransitionState('idle');
                            // Clear the location state so refreshing the page doesn't replay the animation
                            window.history.replaceState({}, '');
                        }, 300);
                    }, 500);
                } else {
                    setTransitionState('idle');
                }
            }, 50);

            return () => clearTimeout(timer);
        }
    }, [transitionState, location.state]);

    const handleProjectClick = (link, color, index, e) => {
        const rect = e.currentTarget.getBoundingClientRect();

        // Start at card size
        setTransitionStyle({
            top: rect.top,
            left: rect.left,
            width: rect.width,
            height: rect.height,
            backgroundColor: color,
            opacity: 1
        });
        setTransitionState('expanding');

        // Next frame, expand to full screen
        setTimeout(() => {
            setTransitionStyle({
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                backgroundColor: color,
                opacity: 1
            });
        }, 50);

        setTimeout(() => {
            navigate(link, { state: { returnId: index } });
            // Let the new page mount before resetting state
            setTimeout(() => setTransitionState('idle'), 50);
        }, 500);
    };


    return (
        <section id="work" className="work-section">
            <div className="section-number">02</div>

            <div className="content-wrapper grid-container work-container">
                <h2 className="section-title work-title">Works</h2>

                <div className="projects-grid">
                    {projects.map((project, index) => (
                        <div
                            id={`project-card-${index}`}
                            key={index}
                            className="project-card"
                            style={{ backgroundColor: project.color }}
                            onClick={(e) => handleProjectClick(`/project/${project.id}`, project.color, index, e)}
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

            {transitionState !== 'idle' && (
                <div
                    className={`rect-transition ${transitionState}`}
                    style={transitionStyle}
                ></div>
            )}
        </section>
    );
};

export default Work;
