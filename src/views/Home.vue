<template>
  <v-card max-width="400" class="mx-auto mt-10" relative>
    <dialogComponent  v-model="showEditForm" :select-edit-item="selectEditItem" />
    <v-app-bar absolute>

      <v-app-bar-title>контакты</v-app-bar-title>
    </v-app-bar>
    <v-container class="mt-16 pt-10">
      <v-row>
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
                <v-img :src="`https://lorempixel.com/590/59${item.id}/`"></v-img>
              </v-avatar>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, onMounted, computed, ref } from 'vue';
import { key } from "@/store"
import { useStore } from 'vuex'
import dialogComponent from '../components/utils/dialog.vue'
import ContactType from '@/types/contactType'
export default defineComponent({
  components: {
    dialogComponent
  },
  setup() {
    const store = useStore(key)
    const contactList = computed(() => store.getters.getContact);

    const showEditForm = ref(false)
    const selectEditItem = ref()


    const removeContact = (id: number) => {
     store.commit('REMOVE_CONTACT_ITEM', id)
    }

    const editContact = (item: ContactType) => {
      selectEditItem.value = item
      showEditForm.value = !showEditForm.value
    }


    onMounted(() => {
      store.dispatch('getContactItem');
    })

    return {  store, contactList, removeContact, editContact, showEditForm, selectEditItem }
  }})


</script>
