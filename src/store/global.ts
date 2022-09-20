import { Module } from 'vuex';
import { GlobalDataProps } from './index';

export interface GlobalStatus {
  requestNumber: number;
  opNames: { [key: string]: boolean };
  error: {
    status: boolean;
    message?: string;
  };
}
const global: Module<GlobalStatus, GlobalDataProps> = {
  state: {
    requestNumber: 0,
    opNames: {},
    error: {
      status: false,
    },
  },
  mutations: {
    startLoading(state, { opName }) {
      state.requestNumber++;
      if (opName) {
        state.opNames[opName] = true;
      }
    },
  },
  actions: {},
  getters: {
    isLoading: (state) => {
      return state.requestNumber > 0;
    },
  },
};

export default global;
