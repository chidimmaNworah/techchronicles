import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Store } from '../Store';

export default function ProtectedRoute({ children }) {
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';
  const { state } = useContext(Store);
  const { userInfo } = state;
  return userInfo ? children : <Navigate to={`/signin?redirect=${redirect}`} />;
}
