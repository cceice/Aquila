import React, { useState } from 'react';
import Login from './Login';
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

  const onFinish = (values) => {
    message.success({
      content: 'Account successfully registered!',
      style: { marginTop: '20vh' },
    });
    form.resetFields();
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

  const styles = {
    page: {
      minHeight: '100vh',
      backgroundColor: '#ffffff',
      color: '#262626',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      boxSizing: 'border-box',
      overflowX: 'hidden'
    },
    header: {
        position: 'relative',
        width: '100%',
        height: '92vh',
        backgroundColor: '#1c1917',
        backgroundImage: `url(${require('../images/aquila_bg.png')})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        overflow: 'hidden'
    },
    bgOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.65)',
      zIndex: 1
    },
    navContainer: {
      position: 'relative',
      zIndex: 2,
      maxWidth: '1200px',
      width: '100%',
      margin: '0 auto',
      padding: '30px 20px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    logoWrapper: {
      display: 'flex',
      alignItems: 'center'
    },
    logoFallback: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      borderLeft: '2px solid rgba(254, 243, 199, 0.5)',
      paddingLeft: '12px',
      marginLeft: '4px'
    },
    navLinks: {
      display: 'flex',
      gap: '35px',
      fontSize: '13px',
      letterSpacing: '0.2em',
      fontWeight: '500',
      textTransform: 'uppercase'
    },
    navLinkItem: {
      color: '#e5e5e5',
      textDecoration: 'none',
      transition: 'color 0.3s ease'
    },
    heroContent: {
      position: 'relative',
      zIndex: 2,
      maxWidth: '1200px',
      width: '100%',
      margin: '0 auto',
      padding: '0 20px 80px 20px'
    },
    estText: {
      fontSize: '12px',
      letterSpacing: '0.25em',
      color: '#d4d4d4',
      textTransform: 'uppercase',
      marginBottom: '12px',
      fontWeight: '600'
    },
    heroTitle: {
      fontSize: 'clamp(2.5rem, 5vw, 4rem)',
      fontFamily: 'Georgia, serif',
      color: '#ffffff',
      lineHeight: 1.15,
      marginBottom: '30px',
      fontWeight: 'normal',
      maxWidth: '700px'
    },
    gallerySection: {
      padding: '80px 20px',
      backgroundColor: '#ffffff',
      textAlign: 'center'
    },
    sectionSubtitle: {
      fontSize: '11px',
      textTransform: 'uppercase',
      letterSpacing: '0.3em',
      color: '#737373',
      marginBottom: '8px',
      fontWeight: '600'
    },
    sectionTitle: {
      fontSize: 'clamp(2rem, 3.5vw, 3rem)',
      fontFamily: 'Georgia, serif',
      color: '#171717',
      marginBottom: '16px',
      fontStyle: 'italic',
      fontWeight: 'normal'
    },
    sectionDesc: {
      color: '#525252',
      maxWidth: '550px',
      margin: '0 auto 50px auto',
      fontSize: '15px',
      lineHeight: 1.6
    },
    galleryWrapper: {
      position: 'relative',
      maxWidth: '850px',
      margin: '0 auto',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    arrowBtn: {
      background: 'transparent',
      border: 'none',
      cursor: 'pointer',
      color: '#171717',
      padding: '10px',
      zIndex: 10,
      fontSize: '28px'
    },
    imageDisplayBox: {
      width: '100%',
      aspectRatio: '16/9',
      backgroundColor: '#171717',
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
      border: '1px solid #e5e5e5',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 15px'
    },
    galleryPlaceholder: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#a3a3a3',
      padding: '20px',
      textAlign: 'center',
      width: '100%',
      height: '100%',
      backgroundColor: '#1c1917'
    },
    registerSection: {
      padding: '90px 20px',
      backgroundColor: '#f7f6f2',
      borderTop: '1px solid #e7e5e4'
    },
    registerGrid: {
      maxWidth: '1100px',
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
      gap: '50px',
      alignItems: 'center'
    },
    contactInfo: {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px'
    },
    contactList: {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      marginTop: '10px',
      color: '#262626',
      fontSize: '15px'
    },
    contactItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    },
    cardWrapper: {
      borderRadius: '24px',
      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05)',
      border: '1px solid #f5f5f4',
      padding: '10px',
      backgroundColor: '#ffffff'
    },
    formRow: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '15px'
    },
    footer: {
      padding: '25px 20px',
      backgroundColor: '#e3e1dc',
      color: '#525252',
      textAlign: 'center',
      fontSize: '12px',
      borderTop: '1px solid #d6d3d1'
    }
  };

  return (
    <div style={styles.page}>
      
      {/* CSS para sa hover effects: White background at Black text sa hover */}
      <style>{`
        /* Register button hover */
        .register-hero-btn {
          background-color: #ffffff !important;
          color: #000000 !important;
          border: 1px solid #ffffff !important;
          transition: all 0.3s ease-in-out !important;
        }
        .register-hero-btn:hover {
          background-color: #ffffff !important;
          color: #000000 !important;
          border-color: #ffffff !important;
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 10px 20px rgba(255, 255, 255, 0.3) !important;
        }

        /* Create Account button hover */
        .create-account-btn {
          background-color: #000000 !important;
          color: #ffffff !important;
          border: 1px solid #000000 !important;
          transition: all 0.3s ease-in-out !important;
        }
        .create-account-btn:hover {
          background-color: #ffffff !important;
          color: #000000 !important;
          border-color: #000000 !important;
          transform: translateY(-2px);
          box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15) !important;
        }

        /* Navigation links hover */
        .nav-link:hover {
          color: #fef3c7 !important;
        }

        /* Gallery arrow hover */
        .gallery-arrow {
          transition: all 0.3s ease;
        }
        .gallery-arrow:hover {
          transform: scale(1.25);
          color: #d97706 !important;
        }

        /* Contact item hover */
        .contact-row {
          transition: transform 0.3s ease;
        }
        .contact-row:hover {
          transform: translateX(6px);
        }

        /* Gallery image fade-in */
        .gallery-image-transition {
          animation: fadeIn 0.4s ease-in-out;
        }
        @keyframes fadeIn {
          from { opacity: 0.3; transform: scale(0.98); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>

      {/* Header & Hero Section */}
      <header style={styles.header}>
        <div style={styles.bgOverlay} />

        {/* Navigation Bar */}
        <nav style={styles.navContainer}>
        <div style={styles.logoWrapper}>
            <img 
            src={require('../images/aquila_logo.png')} // Palitan mo ng eksaktong filename ng logo mo sa images folder
            alt="Aquila Crystal Palace Logo" 
            style={{ height: '70px', objectFit: 'contain' }}
            />
        </div>

          <div style={styles.navLinks}>
            <a href="#" style={styles.navLinkItem} className="nav-link">HOME</a>
            <a href="#gallery-section" style={styles.navLinkItem} className="nav-link">GALLERY</a>
            <a href="#log-in" onClick={(e) => { e.preventDefault(); setIsLoginOpen(true); }} style={styles.navLinkItem} className="nav-link" > LOG IN </a>
          </div>
        </nav>

        {/* Hero Content */}
        <div style={styles.heroContent}>
          <p style={styles.estText}>EST. 2016 &bull; TAGAYTAY CITY, PHILIPPINES</p>
          <h1 style={styles.heroTitle}>The Number 1 Event Place in Metro Tagaytay</h1>
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
      <section id="gallery-section" style={styles.gallerySection}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <p style={styles.sectionSubtitle}>THE GALLERY</p>
          <h2 style={styles.sectionTitle}>Moments Worth Remembering</h2>
          <p style={styles.sectionDesc}>
            A glimpse into the celebrations, beautiful setups, and unforgettable moments at Aquila Crystal Palace Event Place, where every picture tells a story.
          </p>

          <div style={styles.galleryWrapper}>
            <button 
              onClick={handlePrevImage}
              style={styles.arrowBtn}
              className="gallery-arrow"
              aria-label="Previous photo"
            >
              <LeftOutlined />
            </button>

            <div style={styles.imageDisplayBox}>
              {galleryItems[activeImageIndex].src ? (
                <img 
                  key={activeImageIndex}
                  src={galleryItems[activeImageIndex].src} 
                  alt={galleryItems[activeImageIndex].alt} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  className="gallery-image-transition"
                />
              ) : (
                <div key={activeImageIndex} style={styles.galleryPlaceholder} className="gallery-image-transition">
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
              style={styles.arrowBtn}
              className="gallery-arrow"
              aria-label="Next photo"
            >
              <RightOutlined />
            </button>
          </div>
        </div>
      </section>

      {/* Registration Section */}
      <section id="register-section" style={styles.registerSection}>
        <div style={styles.registerGrid}>
          
          <div style={styles.contactInfo}>
            <h2 style={{ ...styles.sectionTitle, textAlign: 'left', marginBottom: '10px' }}>
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

            <div style={styles.contactList}>
              <div style={styles.contactItem} className="contact-row">
                <MailFilled style={{ fontSize: '18px', color: '#171717' }} />
                <span>aquila.tagaytay@yahoo.com</span>
              </div>
              <div style={styles.contactItem} className="contact-row">
                <PhoneFilled style={{ fontSize: '18px', color: '#171717' }} />
                <span>+63 123 456 7890</span>
              </div>
              <div style={styles.contactItem} className="contact-row">
                <FacebookFilled style={{ fontSize: '18px', color: '#171717' }} />
                <span>facebook.com/AquilaCrystalPalaceEventPlace</span>
              </div>
            </div>
          </div>

          <div>
            <Card style={styles.cardWrapper} bordered={false}>
              <Form
                form={form}
                name="registerForm"
                layout="vertical"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                scrollToFirstError
                requiredMark={false}
              >
                <div style={styles.formRow}>
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
      <footer style={styles.footer}>
        &copy; 2026 Aquila Crystal Palace Tagaytay. All rights reserved.
      </footer>

      <Login visible={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </div>
  );
}

export default App;