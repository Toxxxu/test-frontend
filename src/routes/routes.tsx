import React from 'react';
import { Routes as ReactRouterRoutes, Route } from 'react-router-dom';

import { HomePage } from '../pages/home.page';
import { SuccessPage } from '../pages/success.page';

const Routes: React.FC = () => {
  return (
    <ReactRouterRoutes>
      <Route path="/" element={<HomePage />} />
      <Route path="/success" element={<SuccessPage />} />
    </ReactRouterRoutes>
  );
}

export { Routes };
