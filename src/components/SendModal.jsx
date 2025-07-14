import styled from 'styled-components';
import { useState } from 'react';
import axiosInstance from '../auth/axiosInstance';
import { ec as EC } from 'elliptic';
import sha256 from 'crypto-js/sha256';

const ec = new EC('secp256k1');

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1001;
`;

const ModalContent = styled.div`
  background: ${({ status }) =>
    status === "true" ? '#e0f7f7' : status === "false" ? '#ffe0e0' : 'white'};
  padding: 24px;
  border-radius: 12px;
  max-width: 400px;
  width: 100%;
  transition: background 0.3s ease;
`;

const ModalTitle = styled.h3`
  margin-bottom: 16px;
  color: #333;
`;

const Input = styled.input`
  width: 95%;
  margin-bottom: 12px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
`;

const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`;

const ModalButton = styled.button`
  padding: 8px 12px;
  font-size: 14px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  background-color: ${props => props.cancel ? '#ccc' : props.verified ? '#13b0a3' : '#20a495'};
  color: ${props => props.cancel ? '#333' : 'white'};

  &:hover {
    background-color: ${props => props.cancel ? '#aaa' : props.verified ? '#0e958a' : '#1c8f84'};
  }
`;

export function SendModal({ onClose, publicKey }) {
  const [receiver, setReceiver] = useState('');
  const [amount, setAmount] = useState('');
  const [verified, setVerified] = useState('null');
  const [privateKey, setPrivateKey] = useState('');

  const verifySignature = () => {
  try {
    const tx = {
      from: '',
      to: receiver,
      amount: parseFloat(amount),
      timestamp: Date.now()
    };

    const msgHash = sha256(JSON.stringify(tx)).toString();

    const key = ec.keyFromPrivate(privateKey);
    const signature = key.sign(msgHash);

    // 🔽 공개키 형식 보정 (04 prefix 추가)
    const fixedPublicKey = publicKey.startsWith('04') ? publicKey : '04' + publicKey;
    const recoveredKey = ec.keyFromPublic(fixedPublicKey, 'hex');

    const isValid = recoveredKey.verify(msgHash, signature);

    if (isValid) {
      setVerified("true");
      alert("유효한 서명입니다 ✅");
    } else {
      setVerified("false");
      alert("서명 검증 실패 ❌");
    }
  } catch (err) {
    console.error("검증 실패:", err);
    alert("서명 중 오류 발생");
    setVerified("false");
  }
};

  return (
    <Overlay>
      <ModalContent status={verified}>
        <ModalTitle>트랜잭션 서명</ModalTitle>
        <Input
          placeholder="수신자 지갑 주소"
          value={receiver}
          onChange={(e) => setReceiver(e.target.value)}
          disabled={verified === "true"}
        />
        <Input
          placeholder="본인 지갑 개인 키"
          value={privateKey}
          onChange={(e) => setPrivateKey(e.target.value)}
          disabled={verified === "true"}
        />
        <Input
          placeholder="보낼 금액 (HNC)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          type="number"
          min="0"
          disabled={verified === "true"}
        />
        <ModalActions>
          <ModalButton cancel onClick={onClose}>취소</ModalButton>
          <ModalButton onClick={verifySignature} verified={verified}>
            {verified === "true" ? "✅ 서명됨" : "🔐 서명 확인"}
          </ModalButton>
        </ModalActions>
      </ModalContent>
    </Overlay>
  );
}