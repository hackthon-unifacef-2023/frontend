import { Modal } from 'react-bootstrap';
import styled from 'styled-components';

export const CustomModal = styled(Modal)`
  text-align: center;
  & .modal-content {
    background-color: transparent;
    border: 0;
  }
`;
