import React from 'react';
import { Spin } from 'antd';

import Wrapper from './Wrapper';

const LoadingSpin = () => (
    <Wrapper>
        <Spin size="large"/>
    </Wrapper>
);

export default LoadingSpin;
