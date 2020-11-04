import styled from 'styled-components';

export const StyledItem = styled.form`
  &&& {
    .ant-form-item {
      margin-bottom: 10px;
    }
    .ant-form-explain {
      font-size: 13px;
    }
    .ant-input {
      font-size: 15px;
      width: 100%;
      height: 35px;
      &.ant-input-disabled {
        color: #666;
      }
    }
    .ant-form-item-label {
      line-height: 24px;
      label {
        color: ${({ color }) => color || 'rgb(51, 51, 51)'};
        font-weight: bold;
        &::before {
          display: none;
        }
      }
    }
  }
`;
