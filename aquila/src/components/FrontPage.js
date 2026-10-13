import React, { useState } from 'react';
import Login from './Login';
import '../css/FrontPage.css';
import axios from 'axios';

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
  MailFilled, 
  PhoneFilled,
  PictureOutlined
} from '@ant-design/icons';

function App() {
  const [form] = Form.useForm();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

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

  const onFinish = async (values) => {
  try {
    const response = await axios.post('http://localhost:5000/api/register', {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      password: values.password
    });

    message.success({
      content: response.data.message || 'Account successfully registered!',
      style: { marginTop: '20vh' },
    });
    form.resetFields();
  } catch (error) {
    message.error({
      content: error.response?.data?.message || 'Registration failed. Please try again.',
      style: { marginTop: '20vh' },
    });
  }
};

  const onFinishFailed = (errorInfo) => {
    message.error({
      content: 'Please verify all fields and ensure passwords match.',
      style: { marginTop: '20vh' },
    });
  };

  const scrollToRegister = () => {
    const section = document.getElementById('register-section');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <div className="frontpage-container">
      
      {/* Header & Hero Section */}
      <header className="frontpage-header" style={{ backgroundImage: `url(${require('../images/aquila_bg.png')})` }}>
        <div className="frontpage-bg-overlay" />

        {/* Navigation Bar */}
        <nav className="frontpage-nav-container">
          <div className="frontpage-logo-wrapper">
            <img 
              src={require('../images/aquila_logo.png')} 
              alt="Aquila Crystal Palace Logo" 
              className="frontpage-logo-img"
            />
          </div>

          <div className="frontpage-nav-links">
            <a href="#" className="frontpage-nav-link-item">HOME</a>
            <a href="#gallery-section" className="frontpage-nav-link-item">GALLERY</a>
            <a href="#log-in" onClick={(e) => { e.preventDefault(); setIsLoginOpen(true); }} className="frontpage-nav-link-item">LOG IN</a>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="frontpage-hero-content">
          <p className="frontpage-est-text">EST. 2016 &bull; TAGAYTAY CITY, PHILIPPINES</p>
          <h1 className="frontpage-hero-title">The Number 1 Event Place in Metro Tagaytay</h1>
          <div>
            <Button 
              type="primary" 
              size="large"
              onClick={scrollToRegister}
              className="register-hero-btn"
              style={{
                height: '46px',
                padding: '0 30px',
                borderRadius: '9999px',
                fontWeight: '500',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                cursor: 'pointer'
              }}
            >
              <span>Register</span>
              <ArrowRightOutlined style={{ fontSize: '12px' }} />
            </Button>
          </div>
        </div>
      </header>

      {/* Gallery Section */}
      <section id="gallery-section" className="frontpage-gallery-section">
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <p className="frontpage-section-subtitle">THE GALLERY</p>
          <h2 className="frontpage-section-title">Moments Worth Remembering</h2>
          <p className="frontpage-section-desc">
            A glimpse into the celebrations, beautiful setups, and unforgettable moments at Aquila Crystal Palace Event Place, where every picture tells a story.
          </p>

          <div className="frontpage-gallery-wrapper">
            <button 
              onClick={handlePrevImage}
              className="frontpage-arrow-btn"
              aria-label="Previous photo"
            >
              <LeftOutlined />
            </button>

            <div className="frontpage-image-display-box">
              {galleryItems[activeImageIndex].src ? (
                <img 
                  key={activeImageIndex}
                  src={galleryItems[activeImageIndex].src} 
                  alt={galleryItems[activeImageIndex].alt} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  className="gallery-image-transition"
                />
              ) : (
                <div key={activeImageIndex} className="frontpage-gallery-placeholder gallery-image-transition">
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
              className="frontpage-arrow-btn"
              aria-label="Next photo"
            >
              <RightOutlined />
            </button>
          </div>
        </div>
      </section>

      {/* Registration Section */}
      <section id="register-section" className="frontpage-register-section">
        <div className="frontpage-register-grid">
          
          <div className="frontpage-contact-info">
            <h2 className="frontpage-section-title" style={{ textAlign: 'left', marginBottom: '10px' }}>
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

            <div className="frontpage-contact-list">
              <div className="frontpage-contact-item">
                <MailFilled style={{ fontSize: '18px', color: '#171717' }} />
                <span>aquila.tagaytay@yahoo.com</span>
              </div>
              <div className="frontpage-contact-item">
                <PhoneFilled style={{ fontSize: '18px', color: '#171717' }} />
                <span>+63 123 456 7890</span>
              </div>
              <div className="frontpage-contact-item">
                <FacebookFilled style={{ fontSize: '18px', color: '#171717' }} />
                <span>facebook.com/AquilaCrystalPalaceEventPlace</span>
              </div>
            </div>
          </div>

          <div>
            <Card className="frontpage-card-wrapper" bordered={false}>
              <Form
                form={form}
                name="registerForm"
                layout="vertical"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                scrollToFirstError
                requiredMark={false}
              >
                <div className="frontpage-form-row">
                  <Form.Item
                    name="firstName"
                    label={<span style={{ fontSize: '12px', fontWeight: '600', color: '#262626' }}>First Name</span>}
                    rules={[{ required: true, message: 'First name is required' }]}
                    style={{ marginBottom: '16px' }}
                  >
                    <Input style={{ borderRadius: '6px', padding: '6px 11px' }} />
                  </Form.Item>

                  <Form.Item
                    name="lastName"
                    label={<span style={{ fontSize: '12px', fontWeight: '600', color: '#262626' }}>Last Name</span>}
                    rules={[{ required: true, message: 'Last name is required' }]}
                    style={{ marginBottom: '16px' }}
                  >
                    <Input style={{ borderRadius: '6px', padding: '6px 11px' }} />
                  </Form.Item>
                </div>

                <Form.Item
                  name="email"
                  label={<span style={{ fontSize: '12px', fontWeight: '600', color: '#262626' }}>Email</span>}
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
                  label={<span style={{ fontSize: '12px', fontWeight: '600', color: '#262626' }}>Password</span>}
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
                  label={<span style={{ fontSize: '12px', fontWeight: '600', color: '#262626' }}>Confirm Password</span>}
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
                    style={{
                      fontWeight: '500',
                      height: '42px',
                      borderRadius: '9999px',
                      padding: '0 30px'
                    }}
                  >
                    Create Account
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="frontpage-footer">
        &copy; 2026 Aquila Crystal Palace Tagaytay. All rights reserved.
      </footer>

      <Login visible={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </div>
  );
}

export default App;