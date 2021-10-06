import ContactType from '../types/contactType'
import { StoreStateTypes } from '@/types/StateType'
import { Commit } from 'vuex';
import Geo from "@/types/Geo";

export const ContactStore = {
  state: {
    contacts: [],
  },
  getters: {
    getContact(state: StoreStateTypes): ContactType[] {
      return state.contacts
    },
  },
  actions: {
    async getContactItem  ({ commit }: { commit: Commit }): Promise<void>   {
      const result = await fetch("https://jsonplaceholder.typicode.com/users");
      commit("UPDATE_CONTACT_LIST", await result.json());
    }
  },
  mutations: {
    UPDATE_CONTACT_LIST(state: {contacts: ContactType}, data: ContactType): void {
      state.contacts = data
    },
    REMOVE_CONTACT_ITEM(state: {contacts: Array<ContactType>}, id: number): void {
      state.contacts = state.contacts.filter(item => item.id !== id)
    },
    EDIT_CONTACT_ITEM(state: {contacts: Array<ContactType>}, newData: {id: number; name: string; email: string; phone: string}): void {
     const mutableContact = (state.contacts.find(item => item.id === newData.id)) as ContactType
      mutableContact.name = newData.name
      mutableContact.email = newData.email
      mutableContact.phone = newData.phone
    },
    ADD_CONTACT_ITEM(state: {contacts: Array<ContactType>}, newData: {id: number; name: string; email: string; phone: string}): void {
    state.contacts.unshift({
      address: {
        street: 'string',
        suite: 'string',
        city: 'string',
        zipcode: 'string',
        geo: {
          lat: 'string',
          lng: 'string'
        }
      },
      company: {
        name: 'string',
        catchPhrase: 'string',
        bs: 'string'
      },
      email: newData.email,
      phone: newData.phone,
      username: 'qSatan1s',
      website: 'qSatan1s',
      id: newData.id,
      name: newData.name
    })
    },
  },
}
