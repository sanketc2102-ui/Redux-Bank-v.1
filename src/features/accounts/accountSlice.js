const initialAccountState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

function accountReducer(state = initialAccountState, action) {
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

export function deposite(amount) {
  return { type: "account/deposite", payload: amount };
}

export function withdraw(amount) {
  return { type: "account/withdraw", payload: amount };
}

export function requestLoan(amount, purpose) {
  return { type: "account/requestLoan", payload: { amount, purpose } };
}
export function loanPaid() {
  return { type: "account/payloan" };
}

export default accountReducer;
