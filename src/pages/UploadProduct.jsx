import styled from 'styled-components';
import { useState } from 'react';
import axiosInstance from '../auth/axiosInstance';
import { useNavigate } from 'react-router-dom';

const categoryMap = {
  책: 'book',
  학습자료: 'study',
  문구: 'stationery',
  음식: 'food',
  기타: 'general',
};

const methodMap = {
  온라인: 'online',
  오프라인: 'offline',
};

const PageContainer = styled.div`
  padding: 100px 32px 48px;
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled.h2`
  font-size: 24px;
  color: #20a495;
  margin-bottom: 24px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-weight: bold;
  color: #333;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 14px;
  border-radius: 6px;
  border: 1px solid #ccc;
`;

const TextArea = styled.textarea`
  padding: 10px;
  font-size: 14px;
  border-radius: 6px;
  border: 1px solid #ccc;
  resize: vertical;
`;

const Select = styled.select`
  padding: 10px;
  font-size: 14px;
  border-radius: 6px;
  border: 1px solid #ccc;
`;

const Button = styled.button`
  background-color: #20a495;
  color: white;
  font-size: 16px;
  padding: 12px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 16px;

  &:hover {
    background-color: #1a877b;
  }
`;

const categories = ['책', '학습자료', '문구', '음식', '기타'];
const methods = ['온라인', '오프라인'];

export function UploadProduct() {
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [category, setCategory] = useState(categories[0]);
  const [method, setMethod] = useState(methods[0]);
  const [price, setPrice] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !desc || !price) {
      alert('모든 필드를 입력해주세요.');
      return;
    }

    try {
        await axiosInstance.post('/markets/products', {
            "title": name,
            "description": desc,
            "price": parseFloat(price),
            "category": categoryMap[category], 
            "method": methodMap[method],
        });
      alert('상품이 등록되었습니다.');
      navigate('/marketplace');
    } catch (err) {
      console.error('상품 업로드 실패:', err);
      alert('상품 업로드 중 오류가 발생했습니다.');
    }
  };

  return (
    <PageContainer>
      <Title>📦 판매 상품 등록</Title>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>제목</Label>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </FormGroup>

        <FormGroup>
          <Label>설명</Label>
          <TextArea rows="4" value={desc} onChange={(e) => setDesc(e.target.value)} />
        </FormGroup>

        <FormGroup>
          <Label>카테고리</Label>
          <Select value={category} onChange={(e) => setCategory(e.target.value)}>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </Select>
        </FormGroup>

        <FormGroup>
          <Label>거래 방식</Label>
          <Select value={method} onChange={(e) => setMethod(e.target.value)}>
            {methods.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </Select>
        </FormGroup>

        <FormGroup>
          <Label>가격 (HNC)</Label>
          <Input
            type="number"
            min="0"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </FormGroup>

        <Button type="submit">상품 등록</Button>
      </Form>
    </PageContainer>
  );
}