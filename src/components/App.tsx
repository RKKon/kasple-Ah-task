import React from 'react';
import '../App.css';
import UsersTable from './UsersTable.tsx';
import { Layout, Space } from 'antd';


function App() {
  const { Content, Footer, Header } = Layout
  return (
    <div>
      <Layout>
        <Header className="header">
          <h1>Best user control panel</h1>
        </Header>
        <Content style={{ padding: '20px' }}>
          <UsersTable />
        </Content>
        <Footer className="footer">
          <Space size="middle">
            <a href="https://t.me/RKFrostmorn" target="_blank" rel="noopener noreferrer">Связаться в Telegram</a>
            <a href="https://github.com/RKKon/kasple-Ah-task" target="_blank" rel="noopener noreferrer">GitHub на этот проект</a>
          </Space>
        </Footer>
      </Layout>
    </div >
  );
}

export default App;
