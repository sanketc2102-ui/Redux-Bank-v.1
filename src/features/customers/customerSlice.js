const initialCustomerState = {
  fullName: "",
  nationalId: "",
  createdAt: "",
};

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

export function createCustomer(fullName, nationId) {
  return {
    type: "customer/create",
    payload: {
      fullName,
      nationId,
      createdAt: new Date().toISOString(),
    },
  };
}

export function updateCustomerName(name) {
  return {
    type: "customer/updateName",
    payload: name,
  };
}

export default customerReducer;
