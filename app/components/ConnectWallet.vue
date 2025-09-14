<template>
  <div class="flex flex-col items-center gap-4">
    <button
      v-if="!user.addr"
      @click="connect"
      class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 active:scale-95 transition"
    >
      Connect Wallet
    </button>

    <div v-else class="flex flex-col items-center gap-2">
      <p class="text-sm text-gray-700">Address: {{ user.addr }}</p>
      <button
        @click="disconnect"
        class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 active:scale-95 transition"
      >
        Disconnect
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as fcl from '@onflow/fcl'

const user = ref<any>({ addr: null })

onMounted(() => {
  fcl.currentUser().subscribe((currentUser) => {
    user.value = currentUser
  })
})

const connect = async () => {
  await fcl.authenticate()
}

const disconnect = async () => {
  await fcl.unauthenticate()
}
</script>
