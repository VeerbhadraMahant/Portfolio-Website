import React from 'react';
import './Home.css';
import myImage from '../../assets/Fin_Vec_1.png';

const Home = () => {
    return (
        <section id="home" className="home-section" style={{ position: 'relative', overflow: 'hidden' }}>
            <div
                className="home-background-layer"
                style={{
                    backgroundImage: `url(${myImage})`
                }}
            ></div>

            <div className="content-wrapper grid-container home-grid" style={{ zIndex: 1, position: 'relative' }}>
                <div className="home-content">
                    <h1 className="home-title">
                        Veerbhadra <br /> Mahant
                    </h1>
                    <p className="home-subtitle">
                        AIML Engineer & <br /> Software Developer
                    </p>
                    <button
                        className="btn-primary"
                        onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                        View Work
                    </button>
                </div>

                {/* Background handles the visual now */}
                <div className="home-visual"></div>
            </div>
        </section>
    );
};

export default Home;
