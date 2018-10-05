import React from 'react';
import styled from 'styled-components';
import { media } from 'lib/styleUtils';
import Memo from './Memo';

const Wrapper = styled.div`
  display: block;
  margin-top: 0.5rem;
  font-size: 0px; /** inline-block 위아래 사이에 생기는 여백 제거 */

  ${media.mobile`
    margin-top: 0.25rem;
  `};
`;

/**
 *
 * @param {List} memos
 * @param {Function} onOpen
 */
const MemoList = ({ memos, onOpen }) => {
  const memoList = memos.map(memo => (
    <Memo key={memo.get('id')} memo={memo} onOpen={onOpen} />
  ));

  return <Wrapper>{memoList}</Wrapper>;
};

export default MemoList;
