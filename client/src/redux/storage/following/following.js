import API from 'api/api';

/* ------------------------------ action types ------------------------------ */
const READ_FOLLOWING_DATA = '현재 사용자의 관심키워드에 해당하는 질문 조회';
const GET_FOLLOWING_DATA = '현재 사용자의 관심키워드에 해당하는 질문 요청';
const GET_FOLLOWING_DATA_SUCCESS = '관심키워드에 해당하는 질문 요청 성공';
const GET_FOLLOWING_DATA_FAILURE = '관심키워드에 해당하는 질문 요청 실패';

/* ---------------------------------- thunk --------------------------------- */
export const fetchFollowingData = (hashtags = [], currentTag = '') => async dispatch => {

  const interests = hashtags.join('+');

  // TODO: 리로드하는 경우 아니면 기존 정보 조회하도록 조건 추가할 것

  // 요청 시작
  dispatch({ type: GET_FOLLOWING_DATA, currentTag });

  try {
    // API 호출
    const followingData = await API(`/api/questions/following/${interests}`);

    // 성공했을 때
    dispatch({ type: GET_FOLLOWING_DATA_SUCCESS, followingData });
  } catch (error) {
    // 실패했을 때
    dispatch({ type: GET_FOLLOWING_DATA_FAILURE, error });
  }
};

/* ------------------------- initial state + reducer ------------------------ */
const initialState = {
  isLoading: false,
  currentTag: 'All',
  followingData: null,
  error: null,
};

export const followingReducer = (
  state = initialState,
  { type, followingData, error, currentTag }
) => {
  switch (type) {
    case READ_FOLLOWING_DATA:
      return state;

    case GET_FOLLOWING_DATA:
      return {
        ...state,
        isLoading: true,
        currentTag,
      };

    case GET_FOLLOWING_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        followingData,
      };

    case GET_FOLLOWING_DATA_FAILURE:
      return {
        ...state,
        isLoading: false,
        error,
      };

    default:
      return state;
  }
};