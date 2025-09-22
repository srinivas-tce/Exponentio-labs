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
            Top-Talent Outsourcing Needs
          </h1>
          <p className="hero-subtitle">
            Connect with skilled gig workers and access cutting-edge lab equipment for your projects. 
            Scale your business with flexible, on-demand talent and advanced technology solutions.
          </p>
          
          <div className="hero-buttons">
            <Link href="/jobs" className="btn-primary">
              Find GIGs
            </Link>
            <Link href="/products" className="btn-secondary">
              Browse Equipment
            </Link>
          </div>
          
          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-number">50K+</div>
              <div className="stat-label">Gig Workers</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">500+</div>
              <div className="stat-label">Cities</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">28+</div>
              <div className="stat-label">States</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">100+</div>
              <div className="stat-label">Equipment</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BackgroundVideo;
