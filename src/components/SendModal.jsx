import styled from 'styled-components';
import { useState } from 'react';
import axiosInstance from '../auth/axiosInstance';

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
  background: white;
  padding: 24px;
  border-radius: 12px;
  max-width: 400px;
  width: 100%;
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
  background-color: ${props => props.cancel ? '#ccc' : '#20a495'};
  color: ${props => props.cancel ? '#333' : 'white'};

  &:hover {
    background-color: ${props => props.cancel ? '#aaa' : '#1c8f84'};
  }
`;

export function SendModal({ onClose }) {
  const [receiver, setReceiver] = useState('');
  const [amount, setAmount] = useState('');

  const confirmSend = () => {
    if (!receiver || !amount || parseFloat(amount) <= 0) {
      alert('유효한 값을 입력하세요.');
      return;
    }

    axiosInstance.post('/transactions/send', {
      "receiver_address": receiver,
      "amount": parseFloat(amount),
    })
      .then(() => {
        alert('송금이 완료되었습니다.');
        onClose();
      })
      .catch(err => {
        console.error('송금 실패:', err);
        alert('송금에 실패했습니다.');
      });
  };

  return (
    <Overlay>
      <ModalContent>
        <ModalTitle>송금하기</ModalTitle>
        <Input
          placeholder="수신자 지갑 주소"
          value={receiver}
          onChange={(e) => setReceiver(e.target.value)}
        />
        <Input
          placeholder="보낼 금액 (HNC)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          type="number"
          min="0"
        />
        <ModalActions>
          <ModalButton cancel onClick={onClose}>취소</ModalButton>
          <ModalButton onClick={confirmSend}>보내기</ModalButton>
        </ModalActions>
      </ModalContent>
    </Overlay>
  );
}