const INCREASE = 'INCREASE' as const;
const DECREASE = 'DECREASE' as const;

export const increase = (count: number) => ({
  type: INCREASE,
  count,
});

export const decrease = (count: number) => ({
  type: DECREASE,
  count,
});

const initialState = {
  count: 0,
};

type initialState1 = {count: number};
export const counter = (
  state: initialState1 = initialState,
  action: ReturnType<typeof increase> | ReturnType<typeof decrease>,
) => {
  switch (action.type) {
    case INCREASE:
      return {
        ...state,
        count: state.count + 1,
      };
    case DECREASE:
      return {
        ...state,
        count: state.count - 1,
      };
    default:
      return state;
  }
};
