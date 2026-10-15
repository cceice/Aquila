import React, { useState, useEffect, useRef } from 'react';
import Login from './Login';
import '../css/FrontPage.css';
import { 
  Button, 
  Card, 
  Input, 
  Form, 
  message 
} from 'antd';
import { 
  ArrowRightOutlined, 
  LeftOutlined, 
  RightOutlined, 
  FacebookFilled, 
  InstagramFilled, 
  MailFilled, 
  PhoneFilled,
  PictureOutlined
} from '@ant-design/icons';

function useScrollFadeIn() {
  const domRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    const currentRef = domRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return domRef;
}

function App() {
  const [form] = Form.useForm();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const galleryRef = useScrollFadeIn();
  const registerRef = useScrollFadeIn();

  const galleryItems = [
    {
      src: require('../images/gallery_1.jpg'), 
      alt: "Aquila Crystal Palace Event Display 1",
      title: "Grand Ballroom Setup"
    },
    {
      src: require('../images/gallery_3.jpg'), 
      alt: "Aquila Crystal Palace Event Display 2",
      title: "Garden Ceremony Area"
    },
    {
      src: require('../images/gallery_4.jpg'), 
      alt: "Aquila Crystal Palace Event Display 3",
      title: "Crystal Dome View"
    }
  ];

  const handlePrevImage = () => {
    setActiveImageIndex((prev) => (prev === 0 ? galleryItems.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setActiveImageIndex((prev) => (prev === galleryItems.length - 1 ? 0 : prev + 1));
  };

  const onFinish = (values) => {
    message.success({
      content: 'Account successfully registered!',
      style: { marginTop: '7vh' },
    });
    form.resetFields();
  };

  const onFinishFailed = (errorInfo) => {
    message.error({
      content: 'Please verify all fields and ensure passwords match.',
      style: { marginTop: '7vh' },
    });
  };

  const scrollToRegister = () => {
    const section = document.getElementById('register-section');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fp-page">
      <header className="fp-header">
        <div className="fp-bg-overlay" />

        <nav className="fp-nav-container">
          <div className="fp-logo-wrapper">
            <img 
              src={require('../images/aquila_logo.png')} 
              alt="Aquila Crystal Palace Logo" 
              className="fp-logo-img"
            />
          </div>

          <div className="fp-nav-links">
            <a href="#" className="fp-nav-link-item">HOME</a>
            <a href="#gallery-section" className="fp-nav-link-item">GALLERY</a>
            <a href="#log-in" onClick={(e) => { e.preventDefault(); setIsLoginOpen(true); }} className="fp-nav-link-item">LOG IN</a>
          </div>
        </nav>

        <div className="fp-hero-content">
          <p className="fp-est-text">EST. 2016 &bull; TAGAYTAY CITY, PHILIPPINES</p>
          <h1 className="fp-hero-title">The Number 1 Event Place in Metro Tagaytay</h1>
          <div className="fp-hero-actions">
            <Button 
              size="large"
              onClick={() => setIsLoginOpen(true)}
              className="inquire-hero-btn"
            >
              <span>Inquire</span>
            </Button>

            <Button 
              type="primary" 
              size="large"
              onClick={scrollToRegister}
              className="register-hero-btn"
            >
              <span>Register</span>
              <ArrowRightOutlined style={{ fontSize: '12px' }} />
            </Button>
          </div>
        </div>
      </header>

      <section id="gallery-section" ref={galleryRef} className="fade-in-section fp-gallery-section">
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <p className="fp-section-subtitle">THE GALLERY</p>
          <h2 className="fp-section-title">Moments Worth Remembering</h2>
          <p className="fp-section-desc">
            A glimpse into the celebrations, beautiful setups, and unforgettable moments at Aquila Crystal Palace Event Place, where every picture tells a story.
          </p>

          <div className="fp-gallery-wrapper">
            <button 
              onClick={handlePrevImage}
              className="fp-arrow-btn"
              aria-label="Previous photo"
            >
              <LeftOutlined />
            </button>

            <div className="fp-image-display-box">
              {galleryItems[activeImageIndex].src ? (
                <img 
                  key={activeImageIndex}
                  src={galleryItems[activeImageIndex].src} 
                  alt={galleryItems[activeImageIndex].alt} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  className="gallery-image-transition"
                />
              ) : (
                <div key={activeImageIndex} className="fp-gallery-placeholder gallery-image-transition">
                  <PictureOutlined style={{ fontSize: '42px', marginBottom: '10px', color: '#737373' }} />
                  <span style={{ fontSize: '14px', fontWeight: '500', color: '#e5e5e5' }}>
                    {galleryItems[activeImageIndex].title}
                  </span>
                  <span style={{ fontSize: '11px', color: '#737373', marginTop: '4px' }}>
                    (Provide image URL or local asset)
                  </span>
                </div>
              )}
            </div>

            <button 
              onClick={handleNextImage}
              className="fp-arrow-btn"
              aria-label="Next photo"
            >
              <RightOutlined />
            </button>
          </div>
        </div>
      </section>

      <section id="register-section" ref={registerRef} className="fade-in-section fp-register-section">
        <div className="fp-register-grid">
          
          <div className="fp-contact-info">
            <h2 className="fp-section-title" style={{ textAlign: 'left', marginBottom: '10px' }}>
              Your Event Begins Here!
            </h2>
            <p style={{ color: '#404040', fontSize: '15px', lineHeight: 1.6, margin: 0 }}>
              <a 
                href="#register-section" 
                onClick={scrollToRegister} 
                style={{ fontWeight: '600', color: '#171717', textDecoration: 'underline' }}
              >
                Create an account
              </a> to inquire about bookings, explore our venue, and share your event details. Our team at Aquila Crystal Palace Event Place is ready to help you plan a celebration worth remembering.
            </p>

            <div className="fp-contact-list">
              <div className="fp-contact-item">
                <MailFilled style={{ fontSize: '18px', color: '#171717' }} />
                <a href="mailto:aquila.tagaytay@yahoo.com" style={{ color: 'inherit', textDecoration: 'none' }}>
                  aquila.tagaytay@yahoo.com
                </a>
              </div>
              <div className="fp-contact-item">
                <PhoneFilled style={{ fontSize: '18px', color: '#171717' }} />
                <a href="tel:+631234567890" style={{ color: 'inherit', textDecoration: 'none' }}>
                  +63 123 456 7890
                </a>
              </div>
              <div className="fp-contact-item">
                <FacebookFilled style={{ fontSize: '18px', color: '#171717' }} />
                <a href="https://facebook.com/AquilaCrystalPalaceEventPlace" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
                  facebook.com/AquilaCrystalPalaceEventPlace
                </a>
              </div>
              <div className="fp-contact-item">
                <InstagramFilled style={{ fontSize: '18px', color: '#171717' }} />
                <a href="https://instagram.com/aquilacrystal_palace" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
                  instagram.com/aquilacrystal_palace
                </a>
              </div>
            </div>
          </div>

          <div>
            <Card className="fp-card-wrapper" bordered={false}>
              <Form
                form={form}
                name="registerForm"
                layout="vertical"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                scrollToFirstError
                requiredMark={false}
              >
                <div className="fp-form-row">
                  <Form.Item
                    name="firstName"
                    label={<span style={{ fontSize: '12px', fontFamily: 'Poppins', fontWeight: '600', color: '#262626' }}>First Name</span>}
                    rules={[{ required: true, message: 'First name is required' }]}
                    style={{ marginBottom: '16px' }}
                  >
                    <Input style={{ borderRadius: '6px', padding: '6px 11px' }} />
                  </Form.Item>

                  <Form.Item
                    name="lastName"
                    label={<span style={{ fontSize: '12px', fontFamily: 'Poppins', fontWeight: '600', color: '#262626' }}>Last Name</span>}
                    rules={[{ required: true, message: 'Last name is required' }]}
                    style={{ marginBottom: '16px' }}
                  >
                    <Input style={{ borderRadius: '6px', padding: '6px 11px' }} />
                  </Form.Item>
                </div>

                <Form.Item
                  name="email"
                  label={<span style={{ fontSize: '12px', fontFamily: 'Poppins', fontWeight: '600', color: '#262626' }}>Email</span>}
                  rules={[
                    { required: true, message: 'Email address is required' },
                    { type: 'email', message: 'Please input a valid email address' }
                  ]}
                  style={{ marginBottom: '16px' }}
                >
                  <Input style={{ borderRadius: '6px', padding: '6px 11px' }} />
                </Form.Item>

                <Form.Item
                  name="password"
                  label={<span style={{ fontSize: '12px', fontFamily: 'Poppins', fontWeight: '600', color: '#262626' }}>Password</span>}
                  rules={[
                    { required: true, message: 'Password is required' },
                    { min: 6, message: 'Password must be at least 6 characters' }
                  ]}
                  style={{ marginBottom: '16px' }}
                >
                  <Input.Password style={{ borderRadius: '6px', padding: '6px 11px' }} />
                </Form.Item>

                <Form.Item
                  name="confirmPassword"
                  label={<span style={{ fontSize: '12px', fontFamily: 'Poppins', fontWeight: '600', color: '#262626' }}>Confirm Password</span>}
                  dependencies={['password']}
                  rules={[
                    { required: true, message: 'Please confirm your password' },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error('Passwords do not match!'));
                      },
                    }),
                  ]}
                  style={{ marginBottom: '24px' }}
                >
                  <Input.Password style={{ borderRadius: '6px', padding: '6px 11px' }} />
                </Form.Item>

                <Form.Item style={{ marginBottom: 0 }}>
                  <Button 
                    type="primary" 
                    htmlType="submit" 
                    className="create-account-btn"
                  >
                    Create Account
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </div>

        </div>
      </section>

      <footer className="fp-footer">
        &copy; 2026 Aquila Crystal Palace Tagaytay. All rights reserved.
      </footer>

      <Login visible={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </div>
  );
}

export default App;