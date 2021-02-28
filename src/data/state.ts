import { combineReducers } from './combineReducers';
import { deliveriesReducer } from './deliveries/deliveries.reducer';
import { userReducer } from './user/user.reducer';

export const initialState: AppState = {
  data: {
    schedule: { groups: [] } as any,
    deliveries: [],
    orders: [],
    favorites: [],
    locations: [],
    allTracks: [],
    filteredTracks: [],
    mapCenterId: 0,
    loading: false,
    menuEnabled: true
  },
  user: {
    hasSeenTutorial: false,
    darkMode: false,
    isLoggedin: false,
    loading: false
  }
};

export const reducers = combineReducers({
  data: deliveriesReducer,
  user: userReducer
});

export type AppState = ReturnType<typeof reducers>;
