<template>
  <div class="users-add">
    <div class="columns">
      <div class="column is-10">
        <form @submit.prevent="add" action="#">
          <div class="columns">
            <div class="column is-6"> 
              <label class="label">Name</label>
              <p class="control">
                <input class="input" type="text" placeholder="Name" v-model="form.name">
              </p>
              <label class="label">Phone</label>
              <p class="control">
                <input class="input" type="text" placeholder="Phone" v-model="form.phone">
              </p>
              <label class="label">Website</label>
              <p class="control">
                <input class="input" type="text" placeholder="Website" v-model="form.website">
              </p>
            </div>
            <div class="column is-6"> 
              <label class="label">Email</label>
              <p class="control">
                <input class="input" type="text" placeholder="Email" v-model="form.email">
              </p>
              <label class="label">Address</label>
              <p class="control">
                <input class="input" type="text" placeholder="Address" v-model="form.address">
              </p>
            </div>
          </div>

          <div class="field is-horizontal">
            <div class="field-body">
              <div class="field">
                <div class="control">
                  <button
                    class="button is-primary"
                    :class="{'is-loading': isSubmitting}"
                    :disabled="isSubmitting"
                    type="submit">
                    Create
                  </button>
                </div>
              </div>
            </div>
          </div>

        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive } from 'vue'
import { useStore } from 'vuex'

export default {
  setup() {
    const { dispatch } = useStore()
    const isSubmitting = ref(false)
    const form = reactive({
      name: '',
      phone: '',
      website: '',
      email: '',
      address: ''
    })

    function add() {
      isSubmitting.value = true
      dispatch('users/add', form).then(() => {
        alert('Success!')
      }).catch((err) => {
        alert(err.message)
      }).finally(() => {
        isSubmitting.value = false
      })
    }

    return {
      add,
      form,
      isSubmitting
    }
  }
}
</script>
