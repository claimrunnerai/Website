import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './Home.scss';
import heroImage from '../media/homep.png';
import missionImage from '../media/mission.svg';
import { saveNewsletterSignup } from '../services/supabase';

function Home() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isDuplicate, setIsDuplicate] = useState(false);

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setIsDuplicate(false);

    try {
      console.log('Submitting form with data:', formData);
      
      // Save to Supabase
      const result = await saveNewsletterSignup(
        formData.firstName,
        formData.lastName,
        formData.email,
        formData.company
      );

      console.log('Result from Supabase:', result);

      if (result.success) {
        setSubmitted(true);
        setLoading(false);
      } else if (result.alreadyExists) {
        // Email already exists - show success message with different text
        setSubmitted(true);
        setIsDuplicate(true);
        setLoading(false);
      } else {
        setError(result.error?.message || 'Failed to save signup. Please try again.');
        setLoading(false);
        console.error('Signup failed:', result.error);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setError(error.message || 'An error occurred. Please try again.');
      setLoading(false);
    }
  };

  const features = [
    {
      title: 'E-file',
      desc:
        'Submit your claim through our platform when courts allow.',
    },
  
    {
      title: 'Eligibility Checker',
      desc:
        'See if your case meets the requirements to file. Try it for free in King County, WA!',
    },  {
      title: 'Trial Prep & Simulator',
      desc:
        'Practice answering questions and presenting evidence for your hearing.',
    },
    {
      title: 'Judy, Our Claim Agent',
      desc:
        'Answer a few questions and let Judy help you build a winning case.',
    },
    {
      title: 'Talk-to-Claim',
      desc:
        'Tell our AI your story, and it will turn your words into usable claim details.',
    },
    {
      title: 'Legal Form Generator',
      desc:
        'Share your answers and we’ll prepare your legal forms, ready for download or filing.',
    },
  ];

  const handleFeatureClick = (title) => {
    if (title === 'Eligibility Checker') {
      navigate('/dashboard');
    } else {
      navigate('/coming-soon');
    }
  };

  return (
    <main className="home">
      {/* Hero */}
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero__content">
          <h1 id="hero-title" className="hero__title">
            Making Small Claims <br />
            Easier for Everyone
          </h1>
          <p className="hero__text">
            ClaimRunner makes it easy to file and manage small claims. Our guided tools help you
            understand your case, prepare and file your claim, and reach a resolution faster.
          </p>
        </div>

        <div className="hero__visual" aria-hidden="true">
          <img src={heroImage} alt="" className="hero__image" />
        </div>
      </section>

      {/* Features */}
      <section className="features" id="features" aria-labelledby="features-title">
        <header className="section-head">
          <h2 id="features-title" className="section-head__title">Your Claim. Made Simple.</h2>
          <p className="section-head__sub">
            Our platform uses AI to guide you and remove the guesswork from filing a small claim.
          </p>
        </header>
      {/* Disclaimer Box */}
        <div className="disclaimer-container">
          <div className="disclaimer-box">
            <div className="disclaimer-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgb(217 119 6)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                <line x1="12" y1="9" x2="12" y2="13"></line>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
              </svg>
            </div>
            <div className="disclaimer-content">
              <strong>Important Legal Disclaimer</strong>
              <p>
                This platform is provided for informational purposes only and does not
                constitute professional legal advice. The results are based on general
                guidelines and your specific situation may require additional legal
                considerations. For specific legal advice, please consult with a qualified attorney.
              </p>
            </div>
          </div>
        </div>

        <ul className="feature-grid" >
          {features.map(({ title, desc }, i) => (
            <li key={title} className="feature-item">
              <button
                type="button"
                className="feature"
                onClick={() => handleFeatureClick(title)}
                aria-label={title}
              >
                <h3 className="feature__title">{title}</h3>
                <p className="feature__desc">{desc}</p>
              </button>
            </li>
          ))}
        </ul>
      </section>

      {/* Mission */}
      <section className="mission" aria-labelledby="mission-title">
        <h2 id="mission-title" className="mission__title">Our Mission</h2>
        <h3 className="mission__kicker">Expanding Access to Justice</h3>
        <p className="mission__text">
          ClaimRunner AI’s mission is simple: to expand access to justice through information and
          technology. We're building an AI-powered platform designed to guide anyone through the
          small claims process, from start to finish. For those who have found the legal system
          confusing or out of reach, we aim to make the process more understandable and more
          accessible.
        </p>
        <img src={missionImage} alt="Mission illustration" className="mission__icon" />
      </section>

      {/* Signup Form */}
      <section className="signup" id="signup" aria-labelledby="signup-title">
        <div className="signup__container">
          <header className="signup__header">
            <h2 id="signup-title" className="signup__title">Sign Up for Our Newsletter!</h2>
          </header>

          {submitted ? (
            <div className="signup__success">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="16 9 10 15 8 13"></polyline>
              </svg>
              <p>{isDuplicate ? 'You have already signed up! Stay tuned.' : "You're all set! Thanks for signing up."}</p>
            </div>
          ) : (
            <form className="signup__form" onSubmit={handleFormSubmit}>
              {error && (
                <div className="signup__error">
                  <p>{error}</p>
                </div>
              )}
              <div className="signup__row">
                <div className="signup__field">
                  <label htmlFor="firstName" className="signup__label">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleFormChange}
                    className="signup__input"
                    required
                  />
                </div>
                <div className="signup__field">
                  <label htmlFor="lastName" className="signup__label">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleFormChange}
                    className="signup__input"
                    required
                  />
                </div>
              </div>

              <div className="signup__field">
                <label htmlFor="email" className="signup__label">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleFormChange}
                  className="signup__input"
                  required
                />
              </div>

              <div className="signup__field">
                <label htmlFor="company" className="signup__label">Company</label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  placeholder="Company"
                  value={formData.company}
                  onChange={handleFormChange}
                  className="signup__input"
                />
              </div>

              <button 
                type="submit" 
                className="signup__button"
                disabled={loading}
              >
                {loading ? 'Signing Up...' : 'Sign Me Up'}
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}

export default Home;
