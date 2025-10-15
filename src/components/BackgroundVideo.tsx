'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Users, Briefcase } from 'lucide-react';

const BackgroundVideo = () => {
  const [videoError, setVideoError] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

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
      <div className="video-wrapper">
        {!videoError ? (
          <video
            ref={videoRef}
            className="background-video"
            autoPlay
            loop
            muted
            playsInline
            onError={handleVideoError}
            onLoadedData={handleVideoLoad}
          >
            <source src="/videos/software.mp4" type="video/mp4" />
            <source src="https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4" type="video/mp4" />
            <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
          </video>
        ) : (
          <div className="fallback-background animated-gradient" />
        )}
        <div className="video-overlay" />
      </div>
      
      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-title">
          Top Engineers, Ready for Your Projects
          </h1>
          <p className="hero-subtitle font-medium text-xl">
          Our lab produces the next generation of skilled technologists to shape your future!
          </p>
          
          <div className="hero-buttons">
          
            <Link href="/products" className="btn-primary bg-orange-600">
              Browse our Expertise
            </Link>
          </div>
          
          <div className="hidden hero-stats">
          
            <div className="stat-item">
              <div className="stat-number">5</div>
              <div className="stat-label">Domains</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">10+</div>
              <div className="stat-label">Projects Shipped</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">100+</div>
              <div className="stat-label">Skilled Engineers</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BackgroundVideo;
