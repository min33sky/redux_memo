import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as uiActions from 'store/modules/ui';
import * as memoActions from 'store/modules/memo';
import { MemoViewer } from 'components/MemoViewer';

class MemoViewerContainer extends Component {
  handleChange = e => {
    const { name, value } = e.target;
    const { UIActions } = this.props;

    UIActions.changeViewerInput({
      name,
      value
    });
  };

  handleUpdate = () => {
    const { MemoActions, UIActions, memo } = this.props;
    const { id, title, body } = memo.toJS();
    MemoActions.updateMemo({
      id,
      memo: { title, body }
    });
    UIActions.closeViewer();
  };

  handleDelete = () => {
    const { MemoActions, UIActions, memo } = this.props;
    const { id } = memo.toJS();
    MemoActions.deleteMemo(id);
    UIActions.closeViewer();
  };

  render() {
    const { visible, memo, UIActions } = this.props;
    const { title, body } = memo.toJS();
    const { handleChange, handleUpdate, handleDelete } = this;

    return (
      <MemoViewer
        visible={visible}
        title={title}
        body={body}
        onChange={handleChange}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
        onClose={UIActions.closeViewer}
      />
    );
  }
}

export default connect(
  state => ({
    visible: state.ui.getIn(['memo', 'open']),
    memo: state.ui.getIn(['memo', 'info'])
  }),
  dispatch => ({
    UIActions: bindActionCreators(uiActions, dispatch),
    MemoActions: bindActionCreators(memoActions, dispatch)
  })
)(MemoViewerContainer);
