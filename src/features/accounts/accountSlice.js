const initialAccountState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
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
        isLoading: false,
      };
    case "account/payloan":
      return {
        balance: state.balance - state.loan,
        loan: 0,
        loanPurpose: "",
      };
    case "accounts/currencyConverting": {
      return {
        ...state,
        isLoading: true,
      };
    }

    default:
      return state;
  }
}

export function deposite(amount, currency) {
  if (currency === "USD") return { type: "account/deposite", payload: amount };

  return async function (dispatch, getState) {
    dispatch("accounts/currencyConverting");

    // API Call

    const res = await fetch(
      `https://api.frankfurter.dev/v1/latest?amount=${amount}&from=${currency}&to=USD`,
    );

    const {
      rates: { USD },
    } = await res.json();

    dispatch({ type: "account/deposite", payload: USD });
  };
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
