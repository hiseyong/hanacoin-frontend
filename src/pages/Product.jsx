import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import axiosInstance from '../auth/axiosInstance';

const PageContainer = styled.div`
  padding: 100px 32px 48px;
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 28px;
  margin-bottom: 16px;
  color: #333;
`;

const Meta = styled.div`
  font-size: 14px;
  color: #888;
  margin-bottom: 16px;
`;

const Price = styled.div`
  font-size: 22px;
  color: #20a495;
  font-weight: bold;
  margin-bottom: 24px;
`;

const Description = styled.p`
  font-size: 16px;
  line-height: 1.6;
  color: #555;
  white-space: pre-wrap;
`;

const Button = styled.button`
  margin-top: 32px;
  padding: 12px 24px;
  background-color: #20a495;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #188c7b;
  }
`;

export function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axiosInstance.get(`/markets/product/${id}`)
      .then(res => setProduct(res.data))
      .catch(err => console.error('상품 상세 조회 실패:', err));
  }, [id]);

  if (!product) {
    return <PageContainer>상품 정보를 불러오는 중입니다...</PageContainer>;
  }

  return (
    <PageContainer>
      <Title>{product.title}</Title>
      <Meta>
        등록일: {new Date(product.created_at).toLocaleDateString()} | 카테고리: {product.category} | 방식: {product.method}
      </Meta>
      <Price>{product.price} HNC</Price>
      <Description>{product.description}</Description>
      <Button onClick={() => alert('구매 기능은 준비 중입니다.')}>구매하기</Button>
    </PageContainer>
  );
}