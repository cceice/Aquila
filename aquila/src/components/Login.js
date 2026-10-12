import React from 'react';
import { Modal, Card, Form, Input, Button, message } from 'antd';

function Login({ visible, onClose }) {
  const [form] = Form.useForm();

  const handleLogin = (values) => {
    message.success({
      content: 'Logged in successfully!',
      style: { marginTop: '20vh' },
    });
    form.resetFields();
    onClose();
  };

  const handleClear = () => {
    form.resetFields();
  };

  return (
    <Modal
      open={visible}
      onCancel={onClose}
      footer={null}
      centered
      closable={false}
      width={480}
      bodyStyle={{ padding: 0 }}
      style={{ borderRadius: '24px', overflow: 'hidden' }}
    >
      <Card 
        bordered={false}
        style={{ 
          borderRadius: '24px', 
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
          padding: '20px 10px'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <h3 style={{ 
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            fontWeight: '800',
            fontSize: '18px',
            letterSpacing: '0.05em',
            color: '#000000',
            margin: 0 
          }}>
            LOG IN TO ACCOUNT
          </h3>
        </div>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleLogin}
          requiredMark={false}
        >
          <Form.Item
            name="email"
            label={<span style={{ fontSize: '13px', fontWeight: '500', color: '#262626' }}>Email</span>}
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Please enter a valid email!' }
            ]}
            style={{ marginBottom: '18px' }}
          >
            <Input 
              size="large" 
              style={{ borderRadius: '8px', border: '1px solid #d9d9d9', height: '42px' }} 
            />
          </Form.Item>

          <Form.Item
            name="password"
            label={<span style={{ fontSize: '13px', fontWeight: '500', color: '#262626' }}>Password</span>}
            rules={[{ required: true, message: 'Please input your password!' }]}
            style={{ marginBottom: '30px' }}
          >
            <Input.Password 
              size="large" 
              style={{ borderRadius: '8px', border: '1px solid #d9d9d9', height: '42px' }} 
            />
          </Form.Item>

          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
            <Button 
              type="primary"
              htmlType="submit"
              className="login-action-btn"
              style={{
                flex: 1,
                backgroundColor: '#000000',
                color: '#ffffff',
                height: '42px',
                borderRadius: '9999px',
                fontWeight: '600',
                fontSize: '14px',
                border: 'none',
                boxShadow: '0 4px 10px rgba(0,0,0,0.15)'
              }}
            >
              Log in
            </Button>

            <Button 
              type="default"
              onClick={handleClear}
              className="login-action-btn"
              style={{
                flex: 1,
                backgroundColor: '#000000',
                color: '#ffffff',
                height: '42px',
                borderRadius: '9999px',
                fontWeight: '600',
                fontSize: '14px',
                border: 'none',
                boxShadow: '0 4px 10px rgba(0,0,0,0.15)'
              }}
            >
              Clear
            </Button>
          </div>
        </Form>
      </Card>

      <style>{`
        .login-action-btn {
          transition: all 0.3s ease-in-out !important;
        }
        .login-action-btn:hover {
          background-color: #ffffff !important;
          color: #000000 !important;
          border: 1px solid #000000 !important;
          transform: translateY(-2px);
          box-shadow: 0 6px 15px rgba(0,0,0,0.2) !important;
        }
      `}</style>
    </Modal>
  );
}

export default Login;