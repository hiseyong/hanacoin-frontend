import axios from 'axios';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {Spinner} from '../components/LoadingSpinner';
import { useAuth } from '../auth/AuthContext';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f7fa;
`;

const LoginBox = styled.div`
  width: 400px;
  padding: 40px;
  border-radius: 12px;
  background-color: #ffffff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  margin-bottom: 24px;
  text-align: center;
  color: #333;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  color: #555;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
  box-sizing: border-box;
`;

const Button = styled.button`
  width: 100%;
  padding: 12px 16px;
  background-color: #20a495;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: 0.2s ease;

  &:hover {
    background-color: #4338ca;
  }
`;

const SignupOption = styled.div`
  margin-top: 24px;
  text-align: center;
  font-size: 14px;
  color: #666;

  a {
    color: #20a495;
    text-decoration: none;
    margin-left: 8px;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export function Login() {
  const [usernameInput, setUsernameInput] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const { token, setToken, setUsername } = useAuth(); // 🔹 props 대신 Context

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token, navigate]);

  const loginHandle = () => {
    if (!usernameInput || !password) {
      alert("아이디와 비밀번호를 입력해주세요.");
      return;
    }

    setIsLoading(true);
    axios.post('https://hanacoin.hasclassmatching.com/users/login', {
      username: usernameInput,
      password,
    })
      .then((response) => {
        setToken(response.data.access_token);
        setUsername(usernameInput);
        localStorage.setItem('token', response.data.access_token);
        localStorage.setItem('username', usernameInput);
        setIsLoading(false);
        navigate('/');
      })
      .catch((error) => {
        console.error("로그인 중 오류 발생:", error);
        alert(error.response?.data?.detail || '로그인 실패');
        setIsLoading(false);
      });
  };

  return (
    <Container>
      <LoginBox>
        <Title>Hi-Market</Title>
        <div>
          <Label htmlFor="username">username</Label>
          <Input
            type="text"
            placeholder="username"
            onChange={(e) => setUsernameInput(e.target.value)}
            value={usernameInput}
          />
        </div>
        <div>
          <Label htmlFor="password">password</Label>
          <Input
            id="password"
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <Button onClick={loginHandle} disabled={isLoading}>
          {isLoading ? <Spinner /> : '로그인'}
        </Button>
        <SignupOption>
          아직 회원이 아니신가요?
          <Link to="/signup">회원가입</Link>
        </SignupOption>
      </LoginBox>
    </Container>
  );
}