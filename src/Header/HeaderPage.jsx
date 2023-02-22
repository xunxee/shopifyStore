import { useCallback } from 'react';

import { useNavigate } from 'react-router-dom';

import HeaderContainer from './HeaderContainer';

export default function HeaderPage() {
  const navigate = useNavigate();

  const handleClick = useCallback(
    (url) => {
      navigate(url);
    },
    [navigate],
  );

  const handleKeyDown = useCallback((url) => {
    navigate(url);
  }, [navigate]);

  return (
    <HeaderContainer
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    />
  );
}
