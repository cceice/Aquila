import React from 'react';
import { Modal, Card, Form, Input, Button, message } from 'antd';
import '../css/Login.css';

function Login({ visible, onClose, onLoginSuccess }) {
  const [form] = Form.useForm();

  // Default credentials para sa client
  const defaultEmail = 'client@aquila.com';
  const defaultPassword = 'password123';

  const handleLogin = (values) => {
    // I-check kung tama ang email at password
    if (values.email === defaultEmail && values.password === defaultPassword) {
      message.success({
        content: 'Logged in successfully!',
        style: { marginTop: '20vh' },
      });
      form.resetFields();
      onClose();
      
      // I-trigger ang paglipat patungo sa ClientDashboard
      if (onLoginSuccess) {
        onLoginSuccess();
      }
    } else {
      message.error({
        content: 'Invalid email or password!',
        style: { marginTop: '20vh' },
      });
    }
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
      className="login-modal"
    >
      <Card bordered={false} className="login-card">
        <div className="login-title-wrapper">
          <h3 className="login-title">
            LOG IN TO ACCOUNT
          </h3>
        </div>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleLogin}
          requiredMark={false}
          initialValues={{
            email: defaultEmail,
            password: defaultPassword,
          }}
        >
          <Form.Item
            name="email"
            label={<span className="login-label">Email</span>}
            rules={[
              { required: true, message: 'Please input your email' },
              { type: 'email', message: 'Please enter a valid email' }
            ]}
            style={{ marginBottom: '18px' }}
          >
            <Input size="large" className="login-input" />
          </Form.Item>

          <Form.Item
            name="password"
            label={<span className="login-label">Password</span>}
            rules={[{ required: true, message: 'Please input your password' }]}
            style={{ marginBottom: '30px' }}
          >
            <Input.Password size="large" className="login-input" />
          </Form.Item>

          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
            <Button 
              type="primary"
              htmlType="submit"
              className="login-action-btn"
            >
              Log in
            </Button>

            <Button 
              type="default"
              onClick={handleClear}
              className="login-action-btn"
            >
              Clear
            </Button>
          </div>
        </Form>
      </Card>
    </Modal>
  );
}

export default Login;