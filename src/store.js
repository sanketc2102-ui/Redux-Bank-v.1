import { combineReducers, createStore } from "redux";

const initialAccountState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

const initialCustomerState = {
  fullName: "",
  nationalId: "",
  createdAt: "",
};

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

const store = createStore(rootReducer);

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

function customerReducer(state = initialCustomerState, action) {
  switch (action.type) {
    case "customer/create":
      return {
        ...state,
        fullName: action.payload.fullName,
        nationId: action.payload.nationalId,
        createdAt: action.payload.createdAt,
      };
    case "customer/updateName":
      return {
        ...state,
        fullName: action.payload,
      };
  }
}

function deposite(amount) {
  return { type: "account/deposite", payload: amount };
}

function withdraw(amount) {
  return { type: "account/withdraw", payload: amount };
}

function requestLoan(amount, purpose) {
  return { type: "account/deposite", payload: { amount, purpose } };
}
function loanPaid() {
  return { type: "account/payloan" };
}

function createCustomer(fullName, nationId) {
  return {
    type: "customer/create",
    payload: {
      fullName,
      nationId,
      createdAt: new Date().toISOString(),
    },
  };
}

function updateCustomerName(name) {
  return {
    type: "customer/updateName",
    payload: name,
  };
}

export default store;
