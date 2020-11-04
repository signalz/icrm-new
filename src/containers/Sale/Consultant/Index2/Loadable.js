import React from 'react';
import loadable from '../../../../utils/loadable';
import LoadingSpin from "../../../../components/LoadingSpin";

export default loadable(() => import('./index'), {
  fallback: <LoadingSpin />,
});
