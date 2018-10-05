import { handleActions, createAction } from 'redux-actions';
import { Map, List, fromJS } from 'immutable';
import * as WebAPI from 'lib/web-api';
import { pender } from 'redux-pender';

// ActionType
const CREATE_MEMO = 'memo/CREATE_MEMO';
const GET_INITIAL_MEMO = 'memo/GET_INITIAL_MEMO';
const GET_RECENT_MEMO = 'memo/GET_RECENT_MEMO';
const UPDATE_MEMO = 'memo/UPDATE_MEMO';
const DELETE_MEMO = 'memo/DELETE_MEMO';
const GET_PREVIOUS_MEMO = 'memo/GET_PREVIOUS_MEMO';

// ActionCreaters
export const createMemo = createAction(CREATE_MEMO, WebAPI.createMemo); // { title, body }
export const getInitialMemo = createAction(
  GET_INITIAL_MEMO,
  WebAPI.getInitialMemo
);
export const getRecentMemo = createAction(
  GET_RECENT_MEMO,
  WebAPI.getRecentMemo
);
// createActions의 두번째 파라미터는 meta 데이터를 만들 때 사용된다.
export const updateMemo = createAction(
  UPDATE_MEMO,
  WebAPI.updateMemo,
  payload => payload
); // { id, memo: {title, body}}
export const deleteMemo = createAction(
  DELETE_MEMO,
  WebAPI.deleteMemo,
  payload => payload
); // id

export const getPreviousMemo = createAction(
  GET_PREVIOUS_MEMO,
  WebAPI.getPreviousMemo
); // endCursor

// InitialState
const initialState = Map({
  data: List()
});

// Reducer
export default handleActions(
  {
    // 초기 메모 로딩
    ...pender({
      type: GET_INITIAL_MEMO,
      onSuccess: (state, action) =>
        state.set('data', fromJS(action.payload.data))
    }),
    /// 신규 메모 로딩
    ...pender({
      type: GET_RECENT_MEMO,
      onSuccess: (state, action) => {
        // 데이터 리스트의 앞부분에 새 데이터를 붙여준다.
        const data = state.get('data');
        return state.set('data', fromJS(action.payload.data).concat(data));
      }
    }),
    // 메모 업데이트
    ...pender({
      type: UPDATE_MEMO,
      onSuccess: (state, action) => {
        const {
          id,
          memo: { title, body }
        } = action.meta;
        const index = state
          .get('data')
          .findIndex(memo => memo.get('id') === id);
        return state.updateIn(['data', index], memo =>
          memo.merge({ title, body })
        );
      }
    }),
    // 메모 삭제
    ...pender({
      type: DELETE_MEMO,
      onSuccess: (state, action) => {
        const id = action.meta;
        const index = state
          .get('data')
          .findIndex(memo => memo.get('id') === id);
        return state.deleteIn(['data', index]);
      }
    }),
    // 이전 메모 로딩
    ...pender({
      type: GET_PREVIOUS_MEMO,
      onSuccess: (state, action) => {
        // 데이터 리스트의 뒷부분에 새 데이터를 붙여준다.
        const data = state.get('data');
        return state.set('data', data.concat(fromJS(action.payload.data)));
      }
    })
  },
  initialState
);
