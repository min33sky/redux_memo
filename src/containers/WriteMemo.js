import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { InputPlaceholder, WhiteBox } from 'components/WriteMemo';
import { InputSet, SaveButton } from 'components/Shared';
import enhanceWithClickOutside from 'react-click-outside'; // 컴포넌트 외각 감지
import * as uiActions from 'store/modules/ui';
import * as memoActons from 'store/modules/memo';

/**
 * 글 작성 컨테이너
 */
class WriteMemo extends Component {
  handleFocus = () => {
    const { focused, UiActions } = this.props;

    // 포커스 된 상태가 아닐 때만 실행한다.
    if (!focused) {
      UiActions.focusInput();
    }
  };

  handleClickOutside = () => {
    const { UiActions, focused, title, body } = this.props;

    if (focused) {
      if (title !== '' || body !== '') return; // 만약에 title이나 body가 비어있지 않다면 유지
      UiActions.blurInput();
    }
  };

  handleChange = e => {
    const { name, value } = e.target;
    const { UiActions } = this.props;

    UiActions.changeInput({ name, value });
  };

  handleCreate = async () => {
    const { MemoActions, UiActions, title, body, cursor } = this.props;
    try {
      // 메모 생성 API 호출
      await MemoActions.createMemo({ title, body });
      // 신규 메모를 불러온다.
      // cursor가 존재하지 않는다면, 0을 cursor로 설정한다.
      await MemoActions.getRecentMemo(cursor ? cursor : 0);
      UiActions.resetInput();
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { handleFocus, handleChange, handleCreate } = this;
    const { focused, title, body } = this.props;

    return focused ? (
      <WhiteBox>
        <InputSet onChange={handleChange} title={title} body={body} />
        <SaveButton onClick={handleCreate} />
      </WhiteBox>
    ) : (
      <WhiteBox onClick={handleFocus}>
        <InputPlaceholder />
      </WhiteBox>
    );
  }
}

export default connect(
  state => ({
    focused: state.ui.getIn(['write', 'focused']),
    title: state.ui.getIn(['write', 'title']),
    body: state.ui.getIn(['write', 'body']),
    cursor: state.memo.getIn(['data', 0, 'id']) // 리스트의 첫번째 값의 id값
  }),
  dispatch => ({
    UiActions: bindActionCreators(uiActions, dispatch),
    MemoActions: bindActionCreators(memoActons, dispatch)
  })
)(enhanceWithClickOutside(WriteMemo));
