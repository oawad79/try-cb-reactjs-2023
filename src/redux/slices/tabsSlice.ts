import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: ActiveTab = {activeTab: "1"}

export enum TabsActionTypes {
  ACTIVE_TAB_REQUEST = '@@route/ACTIVE_TAB_REQUEST'
}

const tabsSlice = createSlice({
    name: 'tabs',
    initialState,
    reducers: {
        activeTab: (_state, action: PayloadAction<ActiveTab>) => {
            return action.payload
        }
    },
    extraReducers: () => {
        //used to handle actions created in another slice (external ones)
        //reducers defined here does not generate actions like the ones in "reducers"
    }
});

export default tabsSlice.reducer
export const { activeTab } = tabsSlice.actions