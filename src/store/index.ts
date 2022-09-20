import { createStore } from 'vuex';
import user, { userProps } from './user';
import global, { GlobalStatus } from './global';
export interface GlobalDataProps {
  user: userProps;
  global: GlobalStatus;
}

const store = createStore({
  modules: {
    user,
    global,
  },
});
export default store;
