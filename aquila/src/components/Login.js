import React from 'react';
import { Modal, Card, Form, Input, Button, message } from 'antd';
import '../css/Login.css';
import axios from 'axios';

function Login({ visible, onClose }) {
  const [form] = Form.useForm();

  const handleLogin = async (values) => {
  try {
    const response = await axios.post('http://localhost:5000/api/login', {
      email: values.email,
      password: values.password
    });

    message.success({
      content: response.data.message || 'Logged in successfully!',
      style: { marginTop: '20vh' },
    });
    form.resetFields();
    onClose();
  } catch (error) {
    message.error({
      content: error.response?.data?.message || 'Invalid email or password!',
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
      <Card
        bordered={false}
        className="login-card"
      >
        <div className="login-heading">
          <h3 className="login-title">
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
            label={<span className="login-label">Email</span>}
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Please enter a valid email!' },
            ]}
            style={{ marginBottom: '18px' }}
          >
            <Input size="large" className="login-input" />
          </Form.Item>

          <Form.Item
            name="password"
            label={<span className="login-label">Password</span>}
            rules={[{ required: true, message: 'Please input your password!' }]}
            style={{ marginBottom: '30px' }}
          >
            <Input.Password size="large" className="login-input" />
          </Form.Item>

          <div className="login-button-group">
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