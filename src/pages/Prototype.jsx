import React from 'react';

const Prototype = () => {
  return (
    <div className="prototype-page" style={{ padding: '40px 20px', textAlign: 'center' }}>
      <h1>Product Prototype</h1>
      <p style={{ marginBottom: '30px', color: '#666' }}>
        Watch our AI-powered claim runner in action below.
      </p>

      <div className="video-container" style={{ 
        maxWidth: '900px', 
        margin: '0 auto', 
        backgroundColor: '#000',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
      }}>
        <iframe
          src="https://drive.google.com/file/d/1hgk8jc_rebO_ZHi5Aj51QRWQTj1VCHCY/preview"
          width="100%"
          height="500"
          allow="autoplay; encrypted-media"
          allowFullScreen
          title="ClaimRunner Demo Video"
          style={{ border: 'none', display: 'block' }}
        ></iframe>
      </div>
    </div>
  );
};

export default Prototype;