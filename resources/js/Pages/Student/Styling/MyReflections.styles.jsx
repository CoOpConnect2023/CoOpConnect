import styled from "styled-components";



export const Container = styled.div`
      padding: 20px;
    `;

    export const Title = styled.h1`
      font-size: 24px;
      font-weight: bold;
      margin-bottom: 20px;
    `;

    export const ReflectionItem = styled.div`
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px;
      margin-bottom: 10px;
      border: 1px solid #ddd;
      border-radius: 8px;
      background-color: #fff;
    `;

    export const ReflectionInfo = styled.div`
      display: flex;
      flex-direction: column;
    `;

    export const ReflectionTitle = styled.span`
      font-size: 16px;
      font-weight: bold;
    `;

    export const ReflectionSize = styled.span`
      font-size: 14px;
      color: #666;
    `;

    export const ButtonGroup = styled.div`
      display: flex;
      gap: 10px;
    `;

    export const ViewButton = styled.button`
      padding: 8px 16px;
      font-size: 14px;
      color: #fff;
      background-color: #6B538C;
      border: none;
      border-radius: 12px;
      cursor: pointer;

      &:hover {
        background-color: #7b1fa2;
      }
    `;

    export const ShareButton = styled.button`
      padding: 8px 16px;
      font-size: 14px;
      color: #fff;
      background-color: #b39ddb;
      border: none;
      border-radius: 12px;
      cursor: pointer;

      &:hover {
        background-color: #9575cd;
      }
    `;

    export const DeleteButton = styled.button`
      padding: 8px 16px;
      font-size: 14px;
      color: #fff;
      background-color: #f44336;
      border: none;
      border-radius: 12px;
      cursor: pointer;

      &:hover {
        background-color: #d32f2f;
      }
    `;

    export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalContent = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 80%;
  max-width: 600px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const ModalBody = styled.div`
  margin-bottom: 20px;
`;

export const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const CloseButton = styled.button`
  background: #f44336;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
  cursor: pointer;

  &:hover {
    background: #d32f2f;
  }
`;
