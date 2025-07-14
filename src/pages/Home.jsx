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

    useEffect(()=>{
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
      {/* 최신 소식 */}
      <Section>
        <SectionTitle>📢 최신 소식</SectionTitle>
        <CardList>
          <StaticCard>
            <CardTitle>출시 기념 이벤트 진행 중!</CardTitle>
            <CardContent>지금 가입하면 HANA 코인 10개 지급!</CardContent>
          </StaticCard>
          <StaticCard>
            <CardTitle>앱 기능 업데이트 안내</CardTitle>
            <CardContent>지갑 연동 및 거래 상세 페이지 개선 완료</CardContent>
          </StaticCard>
        </CardList>
      </Section>

      {/* 공지사항 */}
      <Section>
        <SectionTitle>📌 공지사항</SectionTitle>
        <CardList>
          <StaticCard>
            <CardTitle>고객센터 운영 시간 변경 안내</CardTitle>
            <CardContent>평일 9시~18시로 단축 운영됩니다.</CardContent>
          </StaticCard>
          <StaticCard>
            <CardTitle>서비스 이용약관 개정</CardTitle>
            <CardContent>2025년 8월 1일부터 새로운 약관이 적용됩니다.</CardContent>
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