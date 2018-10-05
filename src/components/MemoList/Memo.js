import React, { Component } from 'react';
import styled from 'styled-components';
import { media } from 'lib/styleUtils';
import oc from 'open-color';

// 화면 크기에 따라 일정 비율로 가로 사이즈를 설정합니다.
const Sizer = styled.div`
  display: inline-block;
  width: 25%;
  padding: 0.5rem;

  ${media.desktop`
      width: 33.3333%;
  `};

  ${media.mobile`
      width: 50%;
      padding: 0.25rem;
  `};
`;

// 정사각형을 만들어준다. (padding-top은 값을 %로 설정하였을 때 부모 엘리먼트의 width의 비율로 적용된다.)
const Square = styled.div`
  padding-top: 100%;
  position: relative;
  background: white;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);

  &:hover {
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  }
`;

// 실제 내용이 들어가는 부분이다.
const Contents = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;
  bottom: 1rem;
  right: 1rem;
  /* 텍스트가 길어지면 새 줄 생성. 박스 밖의 것은 숨김 */
  white-space: pre-wrap;
  overflow: hidden;
`;

// 제목
const Title = styled.div`
  font-size: 1.25rem;
  font-weight: 500;
  margin-bottom: 1rem;
`;

// 내용
const Body = styled.div`
  font-size: 1.1rem;
  font-weight: 300;
  color: ${oc.gray[7]};
`;

class Memo extends Component {
  handleClick = () => {
    const { memo, onOpen } = this.props;
    onOpen(memo);
  };

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.memo !== this.props.memo;
  }

  render() {
    const { title, body } = this.props.memo.toJS();
    const { handleClick } = this;

    return (
      <Sizer>
        <Square onClick={handleClick}>
          <Contents>
            {title && <Title>{title}</Title>}
            <Body>{body}</Body>
          </Contents>
        </Square>
      </Sizer>
    );
  }
}

export default Memo;
