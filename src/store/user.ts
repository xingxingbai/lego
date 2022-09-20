import { Module } from 'vuex';
import { GlobalDataProps } from './index';
export interface UserDataProps {
  username?: string;
  id?: string;
  phoneNumber?: string;
  nickName?: string;
  description?: string;
  updatedAt?: string;
  createdAt?: string;
  iat?: number;
  exp?: number;
  picture?: string;
  gender?: string;
}

export interface userProps {
  isLogin: boolean;
  token: string;
  data: UserDataProps;
}

const user: Module<userProps, GlobalDataProps> = {
  state: {
    isLogin: false,
    data: {},
    token: localStorage.getItem('token') || '222',
  },
  mutations: {},
  actions: {},
};
export default user;
