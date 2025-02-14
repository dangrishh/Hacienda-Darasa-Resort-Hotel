import React from 'react';
import { AntDesignOutlined } from '@ant-design/icons';
import { Button, ConfigProvider, Space } from 'antd';
import { createStyles } from 'antd-style';

const useStyle = createStyles(({ prefixCls, css }) => ({
  linearGradientButton: css`
    position: absolute;
    top: 30px;  /* Adjust this value to control the distance from the top */
    right: 20px; /* Adjust this value to control the distance from the right */
    width: 150px;
    height: 60px;
    
    &.${prefixCls}-btn-primary:not([disabled]):not(.${prefixCls}-btn-dangerous) {
      > span {
        position: relative;
      }

      &::before {
        content: '';
        background: linear-gradient(135deg, #6253e1, #52ff33);
        position: absolute;
        inset: -1px;
        opacity: 1;
        transition: all 0.3s;
        border-radius: inherit;
      }

      &:hover::before {
        opacity: 0;
      }
    }
  `,
}));

const App: React.FC = () => {
  const { styles } = useStyle();

  return (
    <ConfigProvider
      button={{
        className: styles.linearGradientButton,
      }}
    >
      <Button type="primary" size="large" icon={<AntDesignOutlined />}>
        Login
      </Button>
    </ConfigProvider>
  );
};

export default App;
