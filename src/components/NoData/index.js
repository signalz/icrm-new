import React from 'react';
import { injectIntl } from 'react-intl';
import { Empty } from 'antd';

function NoData({ intl }) {
  return (
    <div className="d-flex justify-content-center">
      <Empty
        description={
          <span>
            No Data
          </span>
        }
      >
      </Empty>
    </div>
  );
}

export default injectIntl(NoData);
