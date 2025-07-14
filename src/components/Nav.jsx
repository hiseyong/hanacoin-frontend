import styled, { css } from 'styled-components';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from '../auth/AuthContext';

const NavContainer = styled.nav`
  position: fixed;
  top: 0;
  width: 100%;
  height: 64px;
  background-color: #ffffff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32px;
  box-sizing: border-box;
  overflow-x: hidden;
  z-index: 1000;
`;

const LeftMenu = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const RightMenu = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-left: auto;
`;

const Logo = styled(Link)`
  font-size: 20px;
  font-weight: bold;
  color: #20a495;
  text-decoration: none;
`;

const MenuItem = styled(Link)`
  color: #333;
  text-decoration: none;
  font-size: 16px;
  padding: 6px 12px;
  border-radius: 6px;
  transition: background-color 0.2s;

  ${(props) =>
    props.isactive &&
    css`
      background-color: #e0f5f1;
      font-weight: 600;
      color: #20a495;
    `}

  &:hover {
    background-color: #f1f1f1;
  }
`;

const AuthButton = styled.button`
  background-color: transparent;
  border: 1px solid #20a495;
  color: #20a495;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: #20a495;
    color: white;
  }
`;

export function Nav() {
  const { token, username, setToken, setUsername } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const currentPath = location.pathname;

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUsername(null);
    navigate('/login');
  };

  useEffect(()=>{
    if(token === null && currentPath !== '/login' && currentPath !== '/signup') {
      navigate('/login');
    }
  }, [token, currentPath, navigate])

  return (
    <NavContainer>
      <LeftMenu>
        <Logo to="/">Hi - Market</Logo>
        {token !== null && (
          <>
            <MenuItem to="/marketplace" isactive={currentPath === '/marketplace'}>마켓플레이스</MenuItem>
            <MenuItem to="/mypage" isactive={currentPath === '/mypage'}>마이페이지</MenuItem>
            <MenuItem to="/uploadproduct" isactive={currentPath === '/uploadproduct'}>판매 등록</MenuItem>
          </>
        )}
      </LeftMenu>
      <RightMenu>
        {token !== null ? (
          <>
            <h3 style={{ fontWeight: 300 }}>{username}님</h3>
            <AuthButton onClick={handleLogout}>로그아웃</AuthButton>
          </>
        ) : (
          <>
            <MenuItem to="/login" isactive={currentPath === '/login'}>로그인</MenuItem>
            <MenuItem to="/signup" isactive={currentPath === '/signup'}>회원가입</MenuItem>
          </>
        )}
      </RightMenu>
    </NavContainer>
  );
}