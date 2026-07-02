import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fullName: "",
  nationalId: "",
  createdAt: "",
};

// function customerReducer(state = initialCustomerState, action) {
//   switch (action.type) {
//     case "customer/create":
//       return {
//         ...state,
//         fullName: action.payload.fullName,
//         nationId: action.payload.nationalId,
//         createdAt: action.payload.createdAt,
//       };
//     case "customer/updateName":
//       return {
//         ...state,
//         fullName: action.payload,
//       };
//     default:
//       return state;
//   }
// }

// export function createCustomer(fullName, nationId) {
//   return {
//     type: "customer/create",
//     payload: {
//       fullName,
//       nationId,
//       createdAt: new Date().toISOString(),
//     },
//   };
// }

// export function updateCustomerName(name) {
//   return {
//     type: "customer/updateName",
//     payload: name,
//   };
// }

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    createCustomer: {
      prepare(fullName, nationalId) {
        return {
          payload: {
            fullName,
            nationalId,
            createdAt: new Date().toISOString(),
          },
        };
      },

      reducer(state, action) {
        state.fullName = action.payload.fullName;
        state.nationalId = action.payload.nationalId;
        state.createdAt = action.payload.createdAt;
      },
    },

    updateCustomerName(state, action) {
      state.fullName = action.payload.fullName;
    },
  },
});

console.log(customerSlice);

export const { createCustomer, updateCustomerName } = customerSlice.actions;

export default customerSlice.reducer;
