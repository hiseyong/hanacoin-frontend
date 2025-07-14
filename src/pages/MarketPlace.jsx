import styled from 'styled-components';
import { useEffect, useState } from 'react';
import axiosInstance from '../auth/axiosInstance';
import { Link } from 'react-router-dom';


const categories = ['전체', '책', '학습자료', '문구', '음식', '기타'];
const categoryMap = {
  책: 'book',
  학습자료: 'study',
  문구: 'stationery',
  음식: 'food',
  기타: 'general',
};

const PageContainer = styled.div`
  padding: 100px 32px 48px;
  max-width: 1200px;
  margin: 0 auto;
`;

const CategoryFilter = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 32px;
  flex-wrap: wrap;
`;

const CategoryButton = styled.button`
  padding: 8px 16px;
  background-color: ${props => (props.active ? '#20a495' : '#ffffff')};
  color: ${props => (props.active ? '#ffffff' : '#333')};
  border: 1px solid #20a495;
  border-radius: 20px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: #20a495;
    color: #fff;
  }
`;

const CardList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
`;

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
  font-size: 16px;
  color: #333;
  margin-bottom: 6px;
`;

const CardPrice = styled.p`
  font-size: 14px;
  color: #20a495;
  font-weight: bold;
`;

export function MarketPlace() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('전체');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const paramObj = category === '전체' ? {} : { category: categoryMap[category] };

        const res = await axiosInstance.get('/markets/products', {
          params: paramObj,
        });
        setProducts(res.data);
      } catch (err) {
        console.error('상품 목록 가져오기 실패:', err);
      }
    };

    fetchProducts();
  }, [category]);

  return (
    <PageContainer>
      <CategoryFilter>
        {categories.map(cat => (
          <CategoryButton
            key={cat}
            active={category === cat}
            onClick={() => setCategory(cat)}
          >
            {cat}
          </CategoryButton>
        ))}
      </CategoryFilter>

      <CardList>
        {products.map(product => (
          <LinkCard key={product.id} to={`/product/${product.id}`}>
            <CardTitle>{product.title}</CardTitle>
            <CardPrice>{product.price} HNC</CardPrice>
          </LinkCard>
        ))}
      </CardList>
    </PageContainer>
  );
}