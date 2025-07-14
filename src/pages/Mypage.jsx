import styled from 'styled-components';
import { useEffect, useState } from 'react';
import axiosInstance from '../auth/axiosInstance';
import { SendModal } from '../components/SendModal';

const PageContainer = styled.div`
  padding: 100px 32px 48px;
  max-width: 800px;
  margin: 0 auto;
`;

const Section = styled.section`
  margin-bottom: 32px;
`;

const Title = styled.h2`
  font-size: 24px;
  color: #20a495;
  margin-bottom: 12px;
`;

const Box = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
`;

const WalletInfo = styled.div`
  font-size: 16px;
  margin-bottom: 8px;
`;

const TransactionList = styled.ul`
  list-style: none;
  padding: 0;
`;

const TransactionItem = styled.li`
  padding: 12px 0;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
`;

const Label = styled.span`
  font-weight: bold;
`;

const SendButton = styled.button`
  margin-top: 16px;
  padding: 10px 16px;
  background-color: #20a495;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: #1c8f84;
  }
`;

export function Mypage() {
  const [wallet, setWallet] = useState('');
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [publicKey, setPublicKey] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // 지갑 주소 & 잔액 조회
    axiosInstance.get('/users/info')
      .then(res => {
        setWallet(res.data.wallet_address);
        setPublicKey(res.data.wallet_public_key);
        return axiosInstance.get('/users/balance');
      })
      .then(res => {
        setBalance(res.data.balance);
      })
      .catch(err => {
        console.error('지갑 정보 불러오기 실패:', err);
      });

    // 거래 내역 조회
    axiosInstance.get('/transactions/transactions')
      .then(res => setTransactions(res.data.transactions))
      .catch(err => console.error('거래 내역 불러오기 실패:', err));
  }, []);

  const handleSend = () => setShowModal(true);

  return (
    <PageContainer>
      <Section>
        <Title>🧾 지갑 정보</Title>
        <Box>
          <WalletInfo><Label>지갑 주소:</Label> {wallet}</WalletInfo>
          <WalletInfo><Label>잔액:</Label> {Number(balance).toFixed(8)} HNC</WalletInfo>
          <SendButton onClick={handleSend}>송금하기</SendButton>
        </Box>
      </Section>

      <Section>
        <Title>📜 입출금 내역</Title>
        <Box>
          <TransactionList>
            {transactions.length === 0 ? (
              <p>입출금 내역이 없습니다.</p>
            ) : (
              transactions.map(tx => (
                <TransactionItem key={tx.id}>
                  <span>{tx.type === 'deposit' ? '입금' : '출금'} - {tx.amount} HNC</span>
                  <span>{new Date(tx.timestamp).toLocaleString()}</span>
                </TransactionItem>
              ))
            )}
          </TransactionList>
        </Box>
      </Section>

      {/* 송금 모달 */}
      {showModal && <SendModal onClose={() => setShowModal(false)} publicKey={publicKey}/>}
    </PageContainer>
  );
}