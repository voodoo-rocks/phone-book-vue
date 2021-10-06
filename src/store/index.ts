
import { InjectionKey } from 'vue';
import { createStore, Store } from 'vuex';
import { ContactStore } from './contacts'

type State = Record<string, unknown>;

export const key: InjectionKey<Store<State>> = Symbol('StoreInjectionKey');
export const store = createStore({
  modules: {
    ContactStore,
  },
})
