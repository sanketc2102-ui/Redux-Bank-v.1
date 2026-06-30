import { createStore } from "redux";

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

const store = createStore(reducer);

function reducer(state = initialState, action) {
  switch (action.type) {
    case "account/deposite":
      return { ...state, balance: state.balance + action.payload };
    case "account/withdraw":
      return { ...state, balance: state.balance - action.payload };
    case "account/requestLoan":
      if (state.loan > 0) return;

      return {
        ...state,
        loan: state.loan + action.payload.amount,
        balance: state.balance + action.payload.amount,
        loanPurpose: action.payload.purpose,
      };
    case "account/payloan":
      return {
        balance: state.balance - state.loan,
        loan: 0,
        loanPurpose: "",
      };

    default:
      return state;
  }
}

store.dispatch({ type: "account/deposite", payload: 500 });
store.dispatch({ type: "account/withdraw", payload: 250 });
store.dispatch({
  type: "account/requestLoan",
  payload: { amount: 12500, purpose: "to buy new furniture" },
});

store.dispatch({ type: "account/payloan" });

console.log(store.getState());

export default store;
