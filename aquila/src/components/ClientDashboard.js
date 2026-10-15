import React, { useState } from 'react';
import { 
  ConfigProvider, Layout, Menu, Tabs, Card, Avatar, Dropdown, Space, 
  DatePicker, TimePicker, Input, Select, Button, Modal, Table, Badge, message, Popconfirm
} from 'antd';
import { 
  AppstoreFilled, QuestionCircleFilled, BookFilled, ClockCircleFilled, 
  UserOutlined, BellFilled, PlusCircleFilled, CloseCircleFilled, 
  EllipsisOutlined, FilterOutlined, SearchOutlined, CheckCircleFilled, DownOutlined, LogoutOutlined 
} from '@ant-design/icons';
import dayjs from 'dayjs';
import aquilaLogo from '../images/aquila_logo.png';
import gallery1 from '../images/gallery_1.jpg';
import gallery2 from '../images/gallery_2.jpg';
import gallery3 from '../images/gallery_3.jpg';
import gallery5 from '../images/gallery_5.jpg';

const { Header, Sider, Content } = Layout;
const { Option } = Select;
const { TextArea } = Input;

export default function ClientDashboard({ onLogout }) {
  const [currentMenu, setCurrentMenu] = useState('dashboard');
  const [dashboardTab, setDashboardTab] = useState('view');
  const [bookingsTab, setBookingsTab] = useState('forms');
  const [pendingsTab, setPendingsTab] = useState('inquiry');

  // Multi-step booking form state
  const [bookingStep, setBookingStep] = useState(1);
  const [eventDetails, setEventDetails] = useState({
    eventName: '',
    type: '',
    date: null,
    time: null,
    packageChoice: '',
    addOns: '',
    pax: '',
    notes: '',
    totalCost: '',
    paymentType: '',
    paymentMethod: '',
    amount: ''
  });

  const [isReviewModalVisible, setIsReviewModalVisible] = useState(false);
  const [isThankYou, setIsThankYou] = useState(false);
  const [isCancelModalVisible, setIsCancelModalVisible] = useState(false);
  const [selectedBookingToCancel, setSelectedBookingToCancel] = useState(null);

  // Sample data for My Bookings
  const [myBookingsData, setMyBookingsData] = useState([
    {
      key: '1',
      eventName: 'Grand Wedding Celebration',
      clientName: 'Juan Dela Cruz',
      type: 'Wedding',
      date: 'Nov 25, 2026',
      time: '3:00 PM',
      dateCreated: 'Oct 10, 2026',
      status: 'Confirmed'
    },
    {
      key: '2',
      eventName: 'Debutante Gala 18th',
      clientName: 'Maria Santos',
      type: 'Debut',
      date: 'Dec 12, 2026',
      time: '4:00 PM',
      dateCreated: 'Oct 12, 2026',
      status: 'Pending'
    },
    {
      key: '3',
      eventName: 'Annual Tech Corporate Summit',
      clientName: 'Acme Corp',
      type: 'Corporate Event',
      date: 'Jan 20, 2027',
      time: '9:00 AM',
      dateCreated: 'Oct 14, 2026',
      status: 'Confirmed'
    }
  ]);

  // Sample pendings data
  const pendingInquiries = [
    { 
      key: '1', 
      inquiryId: 'INQ-1002', 
      clientName: 'Juan Dela Cruz', 
      subject: 'Custom Catering & Menu Selection', 
      message: 'Requesting custom vegetarian menu options for 200 guests.', 
      date: 'Oct 15, 2026' 
    },
    { 
      key: '2', 
      inquiryId: 'INQ-1003', 
      clientName: 'Maria Santos', 
      subject: 'Garden Ceremony Pavilion Setup', 
      message: 'Inquiring if outdoor arch setup is included in the package.', 
      date: 'Oct 16, 2026' 
    }
  ];

  const pendingPayments = [
    { 
      key: '1', 
      eventName: 'Grand Wedding Celebration', 
      totalCost: '₱ 250,000.00', 
      typeOfPayments: 'Downpayment', 
      paymentMethod: 'Bank Transfer', 
      amount: '₱ 125,000.00', 
      date: 'Oct 15, 2026', 
      status: 'Pending Verification' 
    },
    { 
      key: '2', 
      eventName: 'Debutante Gala 18th', 
      totalCost: '₱ 180,000.00', 
      typeOfPayments: 'Full Payment', 
      paymentMethod: 'GCash', 
      amount: '₱ 180,000.00', 
      date: 'Oct 16, 2026', 
      status: 'Unpaid' 
    }
  ];

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#45533A',
          borderRadius: 8,
          fontFamily: 'Poppins, sans-serif',
        },
      }}
    >
      <style>{`
        body {
          margin: 0;
          font-family: 'Poppins', sans-serif;
          background-color: #f7f9f6;
        }
        .ant-layout-sider {
          background: #45533A !important;
        }
        .ant-menu-dark {
          background: #45533A !important;
        }
        .ant-menu-dark .ant-menu-item-selected {
          background-color: rgba(255, 255, 255, 0.15) !important;
        }
        .ant-menu-dark .ant-menu-item:hover {
          background-color: rgba(255, 255, 255, 0.1) !important;
        }
        .custom-logo-text {
          font-family: 'Cinzel', serif, cursive;
          color: #ffffff;
          font-style: italic;
          letter-spacing: 1px;
        }
        .card-shadow {
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
          border-radius: 16px;
          border: 1px solid #eaeaea;
        }
        .transition-all {
          transition: all 0.3s ease-in-out;
        }
      `}</style>

      <Layout style={{ minHeight: '100vh' }}>
        {/* Sider Navigation */}
        <Sider width={260} trigger={null} collapsible={false} style={{ background: '#45533A', padding: '24px 0' }}>
          <div style={{ textAlign: 'center', marginTop:-12, marginBottom: 20, padding: '0 16px' }}>
            <img 
              src={aquilaLogo}
              alt="Aquila Crystal Palace - The Events Place" 
              style={{ height: '65px', width: 'auto', display: 'block', margin: '0 auto' }} 
            />
          </div>

          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={[currentMenu]}
            onClick={(e) => setCurrentMenu(e.key)}
            style={{ background: 'transparent', fontSize: '15px', fontWeight: 500 }}
            items={[
              { key: 'dashboard', icon: <AppstoreFilled />, label: 'Dashboard' },
              { key: 'inquire', icon: <QuestionCircleFilled />, label: 'Inquire' },
              { key: 'bookings', icon: <BookFilled />, label: 'Bookings' },
              { key: 'pendings', icon: <ClockCircleFilled />, label: 'Pendings' },
              { type: 'divider', style: { borderColor: 'rgba(255,255,255,0.2)', margin: '40px 16px' } },
              { key: 'profile', icon: <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#fff', color: '#45533A' }} />, label: 'Profile' },
            ]}
          />
        </Sider>

        <Layout>
          {/* Top Header */}
          <Header style={{ background: '#fff', padding: '0 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f0f0f0', height: 72 }}>
            <h1 style={{ fontSize: '22px', fontWeight: 600, color: '#222', margin: 0, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              {currentMenu}
            </h1>

            <Space size={24} align="center">
              <Badge count={2} size="small">
                <BellFilled style={{ fontSize: '20px', color: '#666', cursor: 'pointer' }} />
              </Badge>
              
              <Dropdown 
              menu={{
              items: [
                { key: 'profile', label: 'My Profile', icon: <UserOutlined /> },
                { type: 'divider' },
                { 
                  key: 'logout', 
                  label: 'Log Out', 
                  icon: <LogoutOutlined />, 
                  danger: true,
                  onClick: () => {
                    message.success('Logged out successfully');
                    if (onLogout) {
                      onLogout();
                    }
                  } 
                }
              ]
            }} 
            trigger={['click']}
            >
              <Space style={{ cursor: 'pointer' }}>
                <Avatar size="large" icon={<UserOutlined />} style={{ backgroundColor: '#d0d8cd', color: '#45533A' }} />
                <div style={{ textAlign: 'left', lineHeight: '1.2' }}>
                  <div style={{ fontWeight: 600, fontSize: '14px', color: '#333' }}>Full Name</div>
                  <div style={{ fontSize: '12px', color: '#777' }}>Role</div>
                </div>
                <DownOutlined style={{ fontSize: '12px', color: '#888' }} />
              </Space>
            </Dropdown>
            </Space>
          </Header>

          {/* Main Content Area */}
          <Content style={{ margin: '24px 32px', minHeight: 280 }}>
            
            {}
            {currentMenu === 'dashboard' && (
              <div className="transition-all">
                <Tabs
                  activeKey={dashboardTab}
                  onChange={setDashboardTab}
                  items={[
                    {
                      key: 'view',
                      label: 'View',
                      children: (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                          {/* Quick Action Widget Bar */}
                          <Card className="card-shadow" bodyStyle={{ padding: '20px 32px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                              <div 
                                style={{ textAlign: 'center', cursor: 'pointer' }}
                                onClick={() => { setCurrentMenu('bookings'); setBookingsTab('forms'); }}
                              >
                                <PlusCircleFilled style={{ fontSize: '40px', color: '#45533A', marginBottom: '8px' }} />
                                <div style={{ fontWeight: 500, fontSize: '14px', color: '#333' }}>New Booking</div>
                              </div>
                              <div 
                                style={{ textAlign: 'center', cursor: 'pointer' }}
                                onClick={() => setCurrentMenu('inquire')}
                              >
                                <QuestionCircleFilled style={{ fontSize: '40px', color: '#45533A', marginBottom: '8px' }} />
                                <div style={{ fontWeight: 500, fontSize: '14px', color: '#333' }}>New Inquiry</div>
                              </div>
                              <div 
                                style={{ textAlign: 'center', cursor: 'pointer' }}
                                onClick={() => { setCurrentMenu('bookings'); setBookingsTab('my-bookings'); }}
                              >
                                <CloseCircleFilled style={{ fontSize: '40px', color: '#45533A', marginBottom: '8px' }} />
                                <div style={{ fontWeight: 500, fontSize: '14px', color: '#333' }}>Cancel Booking</div>
                              </div>
                            </div>
                          </Card>

                          {/* Balance & Inquiries Row */}
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                            <Card title="My Balance" className="card-shadow" headStyle={{ fontWeight: 600, fontSize: '16px' }}>
                              <div style={{ background: '#45533A', borderRadius: '12px', padding: '24px', color: '#fff' }}>
                                <div style={{ fontSize: '14px', opacity: 0.8, marginBottom: '8px' }}>Total Balance</div>
                                <div style={{ fontSize: '36px', fontWeight: 700, letterSpacing: '1px' }}>₱ 00.00</div>
                              </div>
                            </Card>

                            <Card title="Inquiries" className="card-shadow" headStyle={{ fontWeight: 600, fontSize: '16px' }}>
                              <Table
                                dataSource={[
                                  { key: '1', subject: 'Wedding Package Inquiry', status: 'Pending' },
                                  { key: '2', subject: 'Debut Customization', status: 'Replied' },
                                ]}
                                columns={[
                                  { title: 'Subject', dataIndex: 'subject', key: 'subject' },
                                  { title: 'Status', dataIndex: 'status', key: 'status', align: 'center' }
                                ]}
                                pagination={false}
                                size="small"
                              />
                            </Card>
                          </div>

                          {/* My Bookings Section */}
                          <Card title="My Bookings" className="card-shadow" headStyle={{ fontWeight: 600, fontSize: '16px' }}>
                            <Table
                              dataSource={[
                                { key: '1', event: 'Grand Wedding Celebration', daysLeft: '40 Days Left', status: 'Confirmed' },
                                { key: '2', event: 'Debutante Gala 18th', daysLeft: '57 Days Left', status: 'Pending' }
                              ]}
                              columns={[
                                { title: 'Event', dataIndex: 'event', key: 'event' },
                                { title: 'Days Left', dataIndex: 'daysLeft', key: 'daysLeft' },
                                { title: 'Status', dataIndex: 'status', key: 'status', align: 'center' }
                              ]}
                              pagination={false}
                              size="small"
                            />
                          </Card>
                        </div>
                      )
                    },
                    {
                      key: 'gallery',
                      label: 'Gallery',
                      children: (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
                          <img 
                            src={gallery1} 
                            alt="Grand Ballroom" 
                            style={{ width: '100%', height: '260px', objectFit: 'cover', borderRadius: '8px' }} 
                          />
                          <img 
                            src={gallery2} 
                            alt="Red Theme" 
                            style={{ width: '100%', height: '260px', objectFit: 'cover', borderRadius: '8px' }} 
                          />
                          <img 
                            src={gallery3} 
                            alt="Glass Dome" 
                            style={{ width: '100%', height: '260px', objectFit: 'cover', borderRadius: '8px' }} 
                          />
                        </div>
                      )
                    },
                    {
                      key: 'packages',
                      label: 'Packages',
                      children: (
                        <div style={{ display: 'flex', gap: '24px' }}>
                          <Card 
                            hoverable 
                            style={{ width: 360 }}
                            className="card-shadow"
                            cover={<img alt="package" src={gallery5} style={{ height: '210px', objectFit: 'cover' }} />}
                          >
                            <Card.Meta 
                              title={<span style={{ fontFamily: 'Instrument Serif, serif', fontWeight: 450, fontSize: 26 }}>CRYSTAL PALACE PACKAGE</span>} 
                              description="For 2025 - 2027 Wedding and Debut Events" 
                            />
                          </Card>
                        </div>
                      )
                    }
                  ]}
                />
              </div>
            )}

            {}
            {currentMenu === 'inquire' && (
              <Card className="card-shadow" style={{ maxWidth: 800, margin: '0 auto', padding: '24px' }}>
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  message.success('Inquiry submitted successfully!');
                }} 
                style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
              >
              
                <div>
                  <label style={{ display: 'block', fontWeight: 500, marginBottom: '8px', color: '#333' }}>
                    Inquiry ID
                  </label>
                  <Input 
                    variant="outlined" 
                    value="INQ-2026-0891" 
                    readOnly 
                    style={{ backgroundColor: '#fff', color: '#333', cursor: 'default' }} 
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: 500, marginBottom: '8px', color: '#333' }}>
                    Client Name
                  </label>
                  <Input 
                    variant="outlined" 
                    placeholder="Enter your full name" 
                    required 
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: 500, marginBottom: '8px', color: '#333' }}>
                    Subject
                  </label>
                  <Input 
                    variant="outlined" 
                    placeholder="Enter inquiry subject" 
                    style={{ marginBottom: '12px' }} 
                    required 
                  />
                  
                  <label style={{ display: 'block', fontWeight: 500, marginBottom: '8px', color: '#333' }}>
                    Inquiry Details
                  </label>
                  <TextArea 
                    rows={4} 
                    placeholder="Type your detailed inquiry here..." 
                    variant="outlined" 
                    required 
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: 500, marginBottom: '8px', color: '#333' }}>
                    Date Submitted
                  </label>
                  <DatePicker 
                    defaultValue={dayjs()} 
                    inputReadOnly 
                    open={false} 
                    style={{ width: '100%', backgroundColor: '#fff', pointerEvents: 'none' }} 
                  />
                </div>

                <div style={{ textAlign: 'center', marginTop: '16px' }}>
                  <Button 
                    type="primary" 
                    htmlType="submit"
                    size="large"
                    style={{ backgroundColor: '#000', color: '#fff', borderRadius: '30px', padding: '0 48px', height: '48px', fontWeight: 600 }}
                  >
                    Submit
                  </Button>
                </div>
              </form>
            </Card>
            )}

            {}
            {currentMenu === 'bookings' && (
              <div>
                <Tabs
                  activeKey={bookingsTab}
                  onChange={setBookingsTab}
                  items={[
                    {
                      key: 'forms',
                      label: 'Forms',
                      children: (
                        <Card className="card-shadow" style={{ maxWidth: 800, margin: '0 auto', padding: '24px' }}>
                          {!isThankYou ? (
                            <>
                              <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                                <Space size={8} style={{ marginBottom: '16px' }}>
                                  <div style={{ width: 24, height: 6, background: bookingStep >= 1 ? '#45533A' : '#ddd', borderRadius: 3 }}></div>
                                  <div style={{ width: 12, height: 6, background: bookingStep >= 2 ? '#45533A' : '#ddd', borderRadius: 3 }}></div>
                                  <div style={{ width: 12, height: 6, background: bookingStep >= 3 ? '#45533A' : '#ddd', borderRadius: 3 }}></div>
                                </Space>
                                <h2 style={{ fontFamily: 'Instrument Serif, serif', fontWeight: 450, fontSize: '40px', color: '#222', margin: 0 }}>
                                  {bookingStep === 1 && 'Event Details'}
                                  {bookingStep === 2 && 'Packages & Services'}
                                  {bookingStep === 3 && 'Payment'}
                                </h2>
                              </div>

                              {/* Step 1: Event Details */}
                              {bookingStep === 1 && (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                  <div>
                                    <label style={{ display: 'block', fontWeight: 500, marginBottom: '8px' }}>Event Name</label>
                                    <Input 
                                      variant="outlined" 
                                      required
                                      placeholder="e.g. Smith & Johnson Wedding"
                                      value={eventDetails.eventName}
                                      onChange={(e) => setEventDetails({...eventDetails, eventName: e.target.value})}
                                    />
                                  </div>

                                  <div>
                                    <label style={{ display: 'block', fontWeight: 500, marginBottom: '8px' }}>Type</label>
                                    <Select
                                      variant="outlined"
                                      required
                                      placeholder="Select event type"
                                      style={{ width: '100%' }}
                                      value={eventDetails.type || undefined}
                                      onChange={(val) => setEventDetails({...eventDetails, type: val})}
                                      options={[
                                        { value: 'Wedding', label: 'Wedding' },
                                        { value: 'Debut', label: 'Debut' },
                                        { value: 'Corporate Event', label: 'Corporate Event' }
                                      ]}
                                    />
                                  </div>

                                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                    <div>
                                      <label style={{ display: 'block', fontWeight: 500, marginBottom: '8px' }}>Date</label>
                                      <DatePicker 
                                        style={{ width: '100%' }} 
                                        variant="outlined"
                                        required
                                        value={eventDetails.date}
                                        onChange={(date) => setEventDetails({...eventDetails, date})}
                                      />
                                    </div>
                                    <div>
                                      <label style={{ display: 'block', fontWeight: 500, marginBottom: '8px' }}>Time</label>
                                      <TimePicker 
                                        style={{ width: '100%' }} 
                                        variant="outlined"
                                        required
                                        value={eventDetails.time}
                                        onChange={(time) => setEventDetails({...eventDetails, time})}
                                      />
                                    </div>
                                  </div>

                                  <div style={{ textAlign: 'center', marginTop: '24px' }}>
                                    <Button 
                                      type="primary" 
                                      size="large"
                                      style={{ backgroundColor: '#000', color: '#fff', borderRadius: '30px', padding: '0 48px', height: '48px', fontWeight: 600 }}
                                      onClick={() => setBookingStep(2)}
                                    >
                                      Next
                                    </Button>
                                  </div>
                                </div>
                              )}

                              {/* Step 2: Packages & Services */}
                              {bookingStep === 2 && (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                  <div>
                                    <label style={{ display: 'block', fontWeight: 500, marginBottom: '8px' }}>Aquila's Packages</label>
                                    <Select
                                      variant="outlined"
                                      required
                                      placeholder="Select package"
                                      style={{ width: '100%' }}
                                      value={eventDetails.packageChoice || undefined}
                                      onChange={(val) => setEventDetails({...eventDetails, packageChoice: val})}
                                      options={[
                                        { value: 'Crystal Palace Package', label: 'Crystal Palace Package' },
                                        { value: 'Will Not Avail', label: 'Will Not Avail' }
                                      ]}
                                    />
                                  </div>

                                  {eventDetails.packageChoice === 'Crystal Palace Package' && (
                                    <div style={{ background: '#f4f7f3', padding: '16px', borderRadius: '8px', border: '1px solid #d0d8cd' }}>
                                      <h4 style={{ margin: '0 0 8px 0', color: '#45533A', fontFamily: 'Poppins, serif', }}>Crystal Palace Package Details</h4>
                                      <p style={{ margin: 0, fontSize: '13px', color: '#555' }}>
                                        Includes exclusive use of the Glass Dome, Grand Ballroom, VIP bridal suite, standard elegant lighting, sound system setup, and full coordination for 2025-2027 events.
                                      </p>
                                    </div>
                                  )}

                                  <div>
                                    <label style={{ display: 'block', fontWeight: 500, marginBottom: '8px' }}>Add-ons/Extras</label>
                                    <Input 
                                      variant="outlined" 
                                      placeholder="e.g. Additional LED wall, fireworks"
                                      value={eventDetails.addOns}
                                      onChange={(e) => setEventDetails({...eventDetails, addOns: e.target.value})}
                                    />
                                  </div>

                                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                    <div>
                                      <label style={{ display: 'block', fontWeight: 500, marginBottom: '8px' }}>Pax/No. of Guests</label>
                                      <Input 
                                        variant="outlined" 
                                        required
                                        placeholder="e.g. 150 pax"
                                        value={eventDetails.pax}
                                        onChange={(e) => setEventDetails({...eventDetails, pax: e.target.value})}
                                      />
                                    </div>
                                    <div>
                                      <label style={{ display: 'block', fontWeight: 500, marginBottom: '8px' }}>Notes</label>
                                      <Input 
                                        variant="outlined"
                                        required 
                                        placeholder="Special instructions"
                                        value={eventDetails.notes}
                                        onChange={(e) => setEventDetails({...eventDetails, notes: e.target.value})}
                                      />
                                    </div>
                                  </div>

                                  <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '24px' }}>
                                    <Button 
                                      size="large"
                                      style={{ borderRadius: '30px', padding: '0 36px', height: '48px', fontWeight: 600 }}
                                      onClick={() => setBookingStep(1)}
                                    >
                                      Back
                                    </Button>
                                    <Button 
                                      type="primary" 
                                      size="large"
                                      style={{ backgroundColor: '#000', color: '#fff', borderRadius: '30px', padding: '0 36px', height: '48px', fontWeight: 600 }}
                                      onClick={() => setBookingStep(3)}
                                    >
                                      Next
                                    </Button>
                                  </div>
                                </div>
                              )}

                              {/* Step 3: Payment */}
                              {bookingStep === 3 && (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                  <div>
                                    <label style={{ display: 'block', fontWeight: 500, marginBottom: '8px' }}>Total Cost</label>
                                    <Input 
                                      variant="outlined" 
                                      addonBefore="₱" 
                                      placeholder="0.00"
                                      value={eventDetails.totalCost}
                                      onChange={(e) => setEventDetails({...eventDetails, totalCost: e.target.value})}
                                    />
                                  </div>

                                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                    <div>
                                      <label style={{ display: 'block', fontWeight: 500, marginBottom: '8px' }}>Type of Payment</label>
                                      <Select
                                        variant="outlined"
                                        placeholder="Select payment type"
                                        required
                                        style={{ width: '100%' }}
                                        value={eventDetails.paymentType || undefined}
                                        onChange={(val) => setEventDetails({...eventDetails, paymentType: val})}
                                        options={[
                                          { value: 'Downpayment', label: 'Downpayment (50%)' },
                                          { value: 'Full Payment', label: 'Full Payment' }
                                        ]}
                                      />
                                    </div>
                                    <div>
                                      <label style={{ display: 'block', fontWeight: 500, marginBottom: '8px' }}>Payment Method</label>
                                      <Select
                                        variant="outlined"
                                        placeholder="Select method"
                                        required
                                        style={{ width: '100%' }}
                                        value={eventDetails.paymentMethod || undefined}
                                        onChange={(val) => setEventDetails({...eventDetails, paymentMethod: val})}
                                        options={[
                                          { value: 'Bank Transfer', label: 'Bank Transfer' },
                                          { value: 'Credit Card', label: 'Credit Card' },
                                          { value: 'GCash', label: 'GCash' }
                                        ]}
                                      />
                                    </div>
                                  </div>

                                  <div>
                                    <label style={{ display: 'block', fontWeight: 500, marginBottom: '8px' }}>Amount</label>
                                    <Input 
                                      variant="outlined" 
                                      addonBefore="₱" 
                                      placeholder="0.00"
                                      required
                                      value={eventDetails.amount}
                                      onChange={(e) => setEventDetails({...eventDetails, amount: e.target.value})}
                                    />
                                  </div>

                                  <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '24px' }}>
                                    <Button 
                                      size="large"
                                      style={{ borderRadius: '30px', padding: '0 36px', height: '48px', fontWeight: 600 }}
                                      onClick={() => setBookingStep(2)}
                                    >
                                      Back
                                    </Button>
                                    <Button 
                                      type="primary" 
                                      size="large"
                                      style={{ backgroundColor: '#000', color: '#fff', borderRadius: '30px', padding: '0 36px', height: '48px', fontWeight: 600 }}
                                      onClick={() => setIsReviewModalVisible(true)}
                                    >
                                      Review Details
                                    </Button>
                                  </div>
                                </div>
                              )}
                            </>
                          ) : (
                            /* Thank You Screen */
                            <div style={{ textAlign: 'center', padding: '40px 0' }}>
                              <CheckCircleFilled style={{ fontSize: '72px', color: '#45533A', marginBottom: '24px' }} />
                              <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: '32px', marginBottom: '16px' }}>Thank you!</h2>
                              <p style={{ fontSize: '16px', color: '#555', maxWidth: 500, margin: '0 auto 32px auto' }}>
                                Your booking has been received. A member of our events team will write to you within one business day.
                              </p>
                              <Button 
                                type="primary"
                                style={{ backgroundColor: '#000', borderRadius: '30px', height: '48px', padding: '0 36px', fontWeight: 600 }}
                                onClick={() => {
                                  setIsThankYou(false);
                                  setBookingStep(1);
                                  setEventDetails({
                                    eventName: '', type: '', date: null, time: null,
                                    packageChoice: '', addOns: '', pax: '', notes: '',
                                    totalCost: '', paymentType: '', paymentMethod: '', amount: ''
                                  });
                                }}
                              >
                                Submit Another Booking
                              </Button>
                            </div>
                          )}
                        </Card>
                      )
                    },
                    {
                      key: 'my-bookings',
                      label: 'My Bookings',
                      children: (
                        <div>
                          <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
                            <Input 
                              prefix={<SearchOutlined style={{ color: '#aaa' }} />} 
                              placeholder="Search bookings..." 
                              variant="outlined"
                              style={{ maxWidth: 350, borderRadius: '8px' }}
                            />
                            <Button icon={<FilterOutlined />} style={{ borderRadius: '8px' }}>Sort by:</Button>
                          </div>

                          <Table
                            dataSource={myBookingsData}
                            className="card-shadow"
                            columns={[
                              { title: 'Event Name', dataIndex: 'eventName', key: 'eventName' },
                              { title: 'Client Name', dataIndex: 'clientName', key: 'clientName' },
                              { title: 'Type', dataIndex: 'type', key: 'type' },
                              { title: 'Date', dataIndex: 'date', key: 'date' },
                              { title: 'Time', dataIndex: 'time', key: 'time' },
                              { title: 'Date Created', dataIndex: 'dateCreated', key: 'dateCreated' },
                              { 
                                title: 'Status', 
                                dataIndex: 'status', 
                                key: 'status', 
                                render: (status) => (
                                  <span style={{ color: status === 'Confirmed' ? '#556B2F' : '#d48806', fontWeight: 600 }}>
                                    {status}
                                  </span>
                                ) 
                              },
                              {
                                title: '',
                                key: 'action',
                                render: (_, record) => (
                                  <Popconfirm
                                    title="Cancel Booking"
                                    description="Are you sure you want to cancel this booking?"
                                    onConfirm={() => {
                                      setMyBookingsData(prev => prev.filter(item => item.key !== record.key));
                                      message.success('Booking cancelled');
                                    }}
                                    okText="Yes"
                                    cancelText="No"
                                  >
                                    <EllipsisOutlined style={{ fontSize: '20px', cursor: 'pointer' }} />
                                  </Popconfirm>
                                )
                              }
                            ]}
                          />
                        </div>
                      )
                    }
                  ]}
                />
              </div>
            )}

            {}
            {currentMenu === 'pendings' && (
              <div className="transition-all">
                <Tabs
                  activeKey={pendingsTab}
                  onChange={setPendingsTab}
                  items={[
                    {
                      key: 'inquiry',
                      label: 'Inquiry',
                      children: (
                        <div>
                          <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
                            <Input 
                              prefix={<SearchOutlined style={{ color: '#aaa' }} />} 
                              placeholder="Search inquiry..." 
                              variant="outlined"
                              style={{ maxWidth: 350, borderRadius: '8px' }}
                            />
                            <Button icon={<FilterOutlined />} style={{ borderRadius: '8px' }}>Sort by:</Button>
                          </div>

                          <Table 
                            dataSource={pendingInquiries}
                            className="card-shadow"
                            columns={[
                              { title: 'ID', dataIndex: 'inquiryId', key: 'inquiryId', align: 'center' },
                              { title: 'Client Name', dataIndex: 'clientName', key: 'clientName', align: 'center' },
                              { title: 'Subject', dataIndex: 'subject', key: 'subject', align: 'center' },
                              { title: 'Message/Description', dataIndex: 'message', key: 'message', align: 'center' },
                              { title: 'Date', dataIndex: 'date', key: 'date', align: 'center' }
                            ]}
                          />
                        </div>
                      )
                    },
                    {
                      key: 'payments',
                      label: 'Payments',
                      children: (
                        <div>
                          <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
                            <Input 
                              prefix={<SearchOutlined style={{ color: '#aaa' }} />} 
                              placeholder="Search payments..." 
                              variant="outlined"
                              style={{ maxWidth: 350, borderRadius: '8px' }}
                            />
                            <Button icon={<FilterOutlined />} style={{ borderRadius: '8px' }}>Sort by:</Button>
                          </div>

                          <Table 
                            dataSource={pendingPayments}
                            className="card-shadow"
                            columns={[
                              { title: 'Event Name', dataIndex: 'eventName', key: 'eventName', align: 'center' },
                              { title: 'Total Cost', dataIndex: 'totalCost', key: 'totalCost', align: 'center' },
                              { title: 'Type of Payments', dataIndex: 'typeOfPayments', key: 'typeOfPayments', align: 'center' },
                              { title: 'Payment Method', dataIndex: 'paymentMethod', key: 'paymentMethod', align: 'center' },
                              { title: 'Amount', dataIndex: 'amount', key: 'amount', align: 'center' },
                              { title: 'Date', dataIndex: 'date', key: 'date', align: 'center' },
                              { 
                                title: 'Status', 
                                dataIndex: 'status', 
                                key: 'status', 
                                align: 'center',
                                render: (status) => (
                                  <span style={{ color: status === 'Unpaid' ? '#cf1322' : '#d48806', fontWeight: 600 }}>
                                    {status}
                                  </span>
                                ) 
                              }
                            ]}
                          />
                        </div>
                      )
                    }
                  ]}
                />
              </div>
            )}

            {}
            {currentMenu === 'profile' && (
              <Card className="card-shadow" style={{ maxWidth: 450, margin: '0 auto', textAlign: 'center', padding: '36px 24px', borderRadius: '12px' }}>
              <Avatar 
                size={110} 
                icon={<UserOutlined />} 
                style={{ backgroundColor: '#61704d', marginBottom: '20px' }} 
              />             
              <h2 style={{ margin: '0 0 6px 0', fontSize: '22px', fontWeight: 700, color: '#222' }}>
                Full Name
              </h2>              
              <p style={{ margin: '0 0 4px 0', fontSize: '15px', color: '#444' }}>
                email@gmail.com
              </p>            
              <p style={{ margin: '0 0 24px 0', fontSize: '15px', color: '#444' }}>
                Joined October 2026
              </p>              
              <Button 
                type="primary" 
                style={{ 
                  backgroundColor: '#000', 
                  color: '#fff', 
                  borderRadius: '20px', 
                  padding: '0 28px', 
                  height: '38px', 
                  fontWeight: 600,
                  fontSize: '13px'
                }}
                onClick={() => message.info('Edit profile clicked')}
              >
                Edit Profile
              </Button>
            </Card>
            )}

          </Content>
        </Layout>
      </Layout>

      {}
      <Modal
        title={<div style={{ textAlign: 'center', fontFamily: 'Cinzel, serif', fontSize: '24px' }}>Details</div>}
        open={isReviewModalVisible}
        footer={null}
        onCancel={() => setIsReviewModalVisible(false)}
        width={600}
        centered
      >
        <Table
          pagination={false}
          showHeader={false}
          bordered
          dataSource={[
            { label: 'Event Name:', value: eventDetails.eventName || 'N/A' },
            { label: 'Type:', value: eventDetails.type || 'N/A' },
            { label: 'Date:', value: eventDetails.date ? dayjs(eventDetails.date).format('MMM DD, YYYY') : 'N/A' },
            { label: 'Time:', value: eventDetails.time ? dayjs(eventDetails.time).format('hh:mm A') : 'N/A' },
            { label: "Aquila's Package:", value: eventDetails.packageChoice || 'N/A' },
            { label: 'Add-ons/Extras:', value: eventDetails.addOns || 'N/A' },
            { label: 'Pax/No. of Guests:', value: eventDetails.pax || 'N/A' },
            { label: 'Notes:', value: eventDetails.notes || 'N/A' },
            { label: 'Total Cost:', value: eventDetails.totalCost ? `₱ ${eventDetails.totalCost}` : 'N/A' },
            { label: 'Type of Payment:', value: eventDetails.paymentType || 'N/A' },
            { label: 'Amount:', value: eventDetails.amount ? `₱ ${eventDetails.amount}` : 'N/A' },
          ]}
          columns={[
            { dataIndex: 'label', key: 'label', style: { fontWeight: 600, width: '40%' } },
            { dataIndex: 'value', key: 'value' }
          ]}
        />
        <div style={{ textAlign: 'center', marginTop: '24px' }}>
          <Button 
            type="primary" 
            size="large"
            style={{ backgroundColor: '#000', color: '#fff', borderRadius: '30px', padding: '0 48px', height: '48px', fontWeight: 600 }}
            onClick={() => {
              setIsReviewModalVisible(false);
              setIsThankYou(true);
            }}
          >
            Pay Now
          </Button>
        </div>
      </Modal>
    </ConfigProvider>
  );
}