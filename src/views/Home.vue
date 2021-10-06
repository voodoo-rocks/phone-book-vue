<template>
  <v-card max-width="400" min-height="600" min-width="400"  class="fill-height mx-auto mt-10" relative @click.stop="drawer = false">

    <v-navigation-drawer
      v-model="drawer"
      app
      absolute
      bottom
      temporary
    >
      <v-list-item>
        <v-avatar
          color="indigo"
          size="60"
        >
          <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
        </v-avatar>

        <v-list-item-content>
          <v-list-item-title class="ml-2">Kirill Bashlykov</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item link>
          <v-list-item-title class="d-flex justify-space-between" @click.stop="addNewContact">
            <span class="mr-5">Добавить контакт</span>
            <v-icon >
              mdi-contacts
            </v-icon>
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <dialogComponent v-model="showEditForm"  :select-edit-item="selectEditItem" @editContact="editContact({name: '', phone: '', email: ''})" />
    <v-app-bar absolute>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>




      <v-app-bar-title>контакты</v-app-bar-title>
    </v-app-bar>
    <v-container class="mt-16 pt-10" >
      <v-row >
        <v-col v-for="(item) in contactList" :key="item.id" cols="12">
          <v-card :color="item.color" dark>
            <div class="d-flex flex-no-wrap justify-space-between">
              <div>
                <v-card-title
                  class="text-h5"
                  v-text="item.name"
                ></v-card-title>
                <v-card-subtitle v-text="item.title"></v-card-subtitle>
                 <v-card-text  class="py-0" v-text="item.phone"></v-card-text>
                 <v-card-text class="py-0" v-text="item.email"></v-card-text>
                <v-card-actions>
                  <v-btn
                    outlined
                    color="indigo"
                    small
                    rounded
                    @click="editContact(item)"
                  >
                    <v-icon >
                      mdi-pencil
                    </v-icon>
                  </v-btn>

                  <v-btn
                    outlined
                    color="error"
                    small
                    rounded
                    @click="removeContact(item.id)"
                  >
                    <v-icon >
                      mdi-delete
                    </v-icon>
                  </v-btn>
                </v-card-actions>
              </div>
              <v-avatar class="ma-3" size="125" tile>
                <v-img :src="`https://lorempixel.com/580/58${item.id - 1}/`"></v-img>
              </v-avatar>
            </div>
          </v-card>
        </v-col>



        <v-list-item-title v-if="contactList == 0" fluid style="height: 300px; margin: 0; padding: 0; width: 100%" class="d-flex justify-center align-center" @click.stop="addNewContact">
          <span class="mr-5">Добавить контакт</span>
          <v-icon >
            mdi-contacts
          </v-icon>
        </v-list-item-title>
      </v-row>


    </v-container>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, onMounted, computed, ref } from "vue";
import { key } from "@/store"
import { useStore } from 'vuex'
import dialogComponent from '@/components/utils/dialog.vue'
import ContactType from '@/types/contactType'
export default defineComponent({
  components: {
    dialogComponent
  },
  setup() {
    const store = useStore(key)
    const contactList = computed(() => store.getters.getContact);



    const showEditForm = ref(false)
    const drawer = ref(false)
    const selectEditItem = ref()


    const removeContact = (id: number) => {
     store.commit('REMOVE_CONTACT_ITEM', id)
    }

    const editContact = (item: ContactType)  => {

      selectEditItem.value = item
      showEditForm.value = !showEditForm.value
    }


    const addNewContact = () => {
      showEditForm.value = true
      drawer.value = false
    }


    onMounted(() => {
      store.dispatch('getContactItem');
    })





    return {  store, contactList, removeContact, editContact, addNewContact, showEditForm, selectEditItem, drawer }
  }})


</script>
