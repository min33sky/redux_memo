import oc from 'open-color';
import { media } from 'lib/styleUtils';
import styled from 'styled-components';

/**
 * 메모 작성 컴포넌트의 틀이 되는 컴포넌트
 * : 특별한 기능은 없이 보여주는 용도
 */
const WhiteBox = styled.div`
  width: 700px;
  margin: 0 auto;
  padding: 1rem;

  background: white;
  color: ${oc.gray[6]};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);

  cursor: text;

  &:hover {
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  }

  ${media.desktop`
    width: 500px;
  `};

  ${media.tablet`
    width: 100%;
  `};
`;

export default WhiteBox;
