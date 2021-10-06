<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
    >
      <v-card>
        <v-card-text>
          <v-container>
            <v-row>
              <label class="d-flex flex-column">Name
                <input  v-model="name" :placeholder="selectEditItem.name" class="text-h5" />
              </label>
              <label class="d-flex flex-column">Email
                <input  v-model="email" :placeholder="selectEditItem.email" class="text-h6" />
              </label>
              <label class="d-flex flex-column">Phone
                <input  v-model="phone" :placeholder="selectEditItem.phone" class="text-h6" />
              </label>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="closeDialog"
          >
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="saveContact"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>


<script lang="ts">
import { defineComponent, ref, watch, PropType } from 'vue';
import { key } from "@/store"
import { useStore } from 'vuex'
import ContactType from '@/types/contactType'


export default defineComponent({

  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    selectEditItem: {
      type: Object as PropType <ContactType>,
      required: true
    },
  },
  emits: ['editContact'],
  setup(props, {  emit }) {
    const store = useStore(key)


    const dialog = ref(false)
    const name = ref()
    const email = ref()
    const phone = ref()
    const closeDialog = () => {
      emit('editContact')
      name.value = null
      dialog.value = false
    }



    const saveContact = async () => {
      await store.commit('EDIT_CONTACT_ITEM',
        {id: props.selectEditItem.id, name: String(name.value), email: String(email.value), phone:  String(phone.value)})
      closeDialog()
    }



    watch(() => props.modelValue, () => {
      dialog.value = !dialog.value
      name.value = props.selectEditItem.name
      email.value  = props.selectEditItem.email
      phone.value  = props.selectEditItem.phone
    });


    return {dialog, closeDialog, saveContact, name, email, phone}
  }
})
</script>
