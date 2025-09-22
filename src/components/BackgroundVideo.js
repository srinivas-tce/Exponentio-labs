import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Users, Briefcase } from 'lucide-react';
import './BackgroundVideo.css';

const BackgroundVideo = () => {
  const [videoError, setVideoError] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoRef = useRef(null);

  const handleVideoError = () => {
    console.log('Video failed to load, using fallback');
    setVideoError(true);
  };

  const handleVideoLoad = () => {
    console.log('Video loaded successfully');
    setIsVideoLoaded(true);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.addEventListener('loadeddata', handleVideoLoad);
      return () => video.removeEventListener('loadeddata', handleVideoLoad);
    }
  }, []);

  return (
    <div className="video-hero-container">
      {/* Background Video */}
      <div className="video-wrapper">
        {!videoError ? (
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            onError={handleVideoError}
            onLoadedData={handleVideoLoad}
            className={`background-video ${isVideoLoaded ? 'loaded' : ''}`}
          >
            {/* Your Local Software Development Video - Priority Source */}
            <source src="/videos/software.mp4" type="video/mp4" />
            <source src="/videos/software-development.mp4" type="video/mp4" />
            <source src="https://cdn.pixabay.com/video/2015/08/24/560-135736646_large.mp4" type="video/mp4" />
            <source src="https://cdn.pixabay.com/video/2015/08/24/560-135736646_medium.mp4" type="video/mp4" />
            <source src="https://cdn.pixabay.com/video/2015/08/24/560-135736646_small.mp4" type="video/mp4" />
            <source src="https://cdn.pixabay.com/video/2015/08/24/560-135736646_tiny.mp4" type="video/mp4" />
            <source src="https://cdn.pixabay.com/video/2015/08/24/560-135736646_720p.mp4" type="video/mp4" />
            <source src="https://cdn.pixabay.com/video/2015/08/24/560-135736646_480p.mp4" type="video/mp4" />
            <source src="https://cdn.pixabay.com/video/2015/08/24/560-135736646_360p.mp4" type="video/mp4" />
            <source src="https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=165&oauth2_token_id=57447761" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <div className="fallback-background">
            <div className="animated-gradient"></div>
          </div>
        )}
        
        {/* Overlay with gradient */}
        <div className="video-overlay"></div>
      </div>
      
      {/* Content */}
      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-title">
            A One-Stop Gig Platform for Top-Talent Outsourcing Needs
          </h1>
          <p className="hero-subtitle">
            An open work marketplace where freelancers, gig workers, entrepreneurs and businesses 
            can connect and collaborate to accomplish their goals.
          </p>
          
          <div className="hero-buttons">
            <Link
              to="/post-job"
              className="btn-primary"
            >
              <Users className="w-5 h-5 mr-2" />
              Hire Talent
            </Link>
            <Link
              to="/jobs"
              className="btn-secondary"
            >
              <Briefcase className="w-5 h-5 mr-2" />
              Find GIGs
            </Link>
          </div>

          {/* Stats */}
          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-number">0</div>
              <div className="stat-label">Gig Workers Registered</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">0</div>
              <div className="stat-label">Pincodes Penetrated</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">0</div>
              <div className="stat-label">Cities Penetrated</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">0</div>
              <div className="stat-label">States and UT Penetrated</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BackgroundVideo;
