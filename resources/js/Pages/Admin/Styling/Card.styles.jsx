import styled from 'styled-components';


export const CardContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 10px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
`;

export const CardInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

export const InfoText = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CardActions = styled.div`
  display: flex;
  gap: 5px;
`;

export const Button = styled.button`
  padding: 5px 10px;
  border: none;
  background-color: #6e3aa7;
  color: white;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #5a2c85;
  }
`;

export const Input = styled.input`
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
`;
