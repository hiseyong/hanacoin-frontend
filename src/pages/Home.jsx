import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Spinner } from '../components/LoadingSpinner';
import { useEffect, useState } from 'react';
import axiosInstance from '../auth/axiosInstance';

const PageContainer = styled.div`
  padding: 100px 32px 48px;
  max-width: 1200px;
  margin: 0 auto;
  box-sizing: border-box;
`;

const Section = styled.section`
  margin-bottom: 48px;
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  color: #20a495;
  margin-bottom: 16px;
  border-bottom: 2px solid #20a495;
  padding-bottom: 8px;
`;

// 기본 카드 (hover 없음)
const StaticCard = styled.div`
  flex: 1 1 calc(33.333% - 16px);
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  padding: 16px;
  box-sizing: border-box;
`;

// 추천 거래용 카드 (hover 있음)
const LinkCard = styled(Link)`
  flex: 1 1 calc(33.333% - 16px);
  text-decoration: none;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  padding: 16px;
  box-sizing: border-box;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-4px);
  }
`;

const CardTitle = styled.h3`
  font-size: 18px;
  color: #333;
  margin-bottom: 8px;
`;

const CardContent = styled.p`
  font-size: 14px;
  color: #666;
`;

const CardPrice = styled.p`
  font-size: 14px;
  color: #20a495;
  font-weight: bold;
`;

const CardList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
`;

export function Home() {
  const [deals, setDeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [wallet, setWallet] = useState('');
  const [balance, setBalance] = useState(0);

    useEffect(()=>{
    axiosInstance.get('/users/info')
      .then(res => {
        setWallet(res.data.wallet_address);
        return axiosInstance.get('/users/balance');
      })
      .then(res => {
        setBalance(res.data.balance);
      })
      .catch(err => {
        console.error('지갑 정보 불러오기 실패:', err);
      });
        axiosInstance.get('/alerts/recommended_deal')
        .then(response => {
            setDeals(response.data.recommended);
            setIsLoading(false);
        })
        .catch(error => {
            console.error("Error fetching deals:", error);
            setIsLoading(false);
        });
    }, [])

  return (
    <PageContainer>
      {/* 공지사항 */}
      <Section>
        <SectionTitle>📌 공지사항</SectionTitle>
        <CardList>
          <StaticCard>
            <CardTitle>송금 및 구매 기능 관련 안내</CardTitle>
            <CardContent>구현이 안되어서 이용이 불가능합니다.</CardContent>
          </StaticCard>
          <StaticCard>
            <CardTitle>진로연계 발표 안내</CardTitle>
            <CardContent>오는 7월 15일, 진로연계 발표가 있습니다.</CardContent>
          </StaticCard>
        </CardList>
      </Section>

      {/* 계좌 정보 */}
      <Section>
        <SectionTitle>🧾 지갑 정보</SectionTitle>
        <CardList>
          <StaticCard>
            <CardTitle>지갑 주소</CardTitle>
            <CardContent>{wallet}</CardContent>
          </StaticCard>
          <StaticCard>
            <CardTitle>계좌 잔고</CardTitle>
            <CardContent>{Number(balance).toFixed(8)} HNC</CardContent>
          </StaticCard>
        </CardList>
      </Section>

      {/* 추천 거래 */}
      <Section>
        <SectionTitle>🔥 추천 거래</SectionTitle>
        {isLoading ? (
          <Spinner />
        ) : deals.length === 0 ? (
          <p>추천 거래가 없습니다.</p>
        ) : <CardList>
            {
                deals.map(deal => (
                    <LinkCard key={deal.id} to={`/product/${deal.id}`}>
                        <CardTitle>{deal.title}</CardTitle>
                        <CardPrice>{deal.price} HNC</CardPrice>
                        <CardContent>{deal.description}</CardContent>
                    </LinkCard>
                ))
            }
        </CardList>
        }
      </Section>
    </PageContainer>
  );
}