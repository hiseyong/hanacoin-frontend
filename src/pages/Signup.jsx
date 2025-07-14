import axios from 'axios';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PrivateKeyDisplay } from '../components/PrivateKeyDisplay';
import {Spinner} from '../components/LoadingSpinner';

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

const KeyBox = styled.div`
  background-color: #f1f1f1;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  word-break: break-all;
  font-family: monospace;
  font-size: 14px;
  margin-bottom: 16px;
  position: relative;
`;

const CopyButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  background-color: #20a495;
  color: white;
  border: none;
  padding: 4px 10px;
  font-size: 12px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #178575;
  }
`;

export function Signup(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [privateKey, setPrivateKey] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(()=>{
        if (props.token) {
            navigate('/');
        }
    })

    const signupHandle = () => {
        if (!username || !password || !passwordConfirm) {
            alert("아이디와 비밀번호를 입력해주세요.");
            return;
        }
        if (password !== passwordConfirm) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }
        setIsLoading(true);
        axios.post('https://hanacoin.hasclassmatching.com/users/signup', { "username":username, "password":password })
            .then(response => {
                console.log("회원가입 성공:", response.data);
                setPrivateKey(response.data.private_key);
                setIsLoading(false);
            })
            .catch(error => {
                console.error("로그인 중 오류 발생:", error);
                alert(error.response.data.detail);
                setIsLoading(false);
            }
        );
    }
    const copyToClipboard = () => {
        navigator.clipboard.writeText(privateKey)
        .then(() => alert("클립보드에 복사되었습니다."))
        .catch(err => alert("복사 실패: " + err));
    };
    if (privateKey === null) {
        return (
            <Container>
            <LoginBox>
                <Title>Hi-Market</Title>
                <div>
                    <Label htmlFor="username">username</Label>
                    <Input type="text" placeholder="username" onChange={(e)=>{setUsername(e.target.value)}} value={username}/>
                </div>
                <div>
                    <Label htmlFor="password">password</Label>
                    <Input id="password" type="password" placeholder="password" onChange={(e)=>{setPassword(e.target.value)}} value={password}/>
                </div>
                <div>
                    <Label htmlFor="password">password confirm</Label>
                    <Input id="passwordconfirm" type="password" placeholder="password confirm" onChange={(e)=>{setPasswordConfirm(e.target.value)}} value={passwordConfirm}/>
                </div>
                <Button onClick={signupHandle}>회원가입</Button>
                <SignupOption>
                이미 계정이 있으신가요?
                <Link to="/login">{isLoading ? <Spinner /> : '회원가입'}</Link>
                </SignupOption>
            </LoginBox>
            </Container>
        );
    } else {
        return (
            <Container>
                <LoginBox>
                    <Title>개인 키 저장 안내</Title>
                    <p>본 사이트는 사용자의 암호화폐 지갑 개인 키를 저장하지 않습니다.</p>
                    <p>다음 지갑 개인 키를 안전히 보관하세요</p>
                    <p>당신의 개인 키:</p>
                    <PrivateKeyDisplay privateKey={privateKey} />
                    <Button onClick={() => navigate('/login')}>로그인 하러 가기</Button>
                </LoginBox>
            </Container>
        );
    }
}