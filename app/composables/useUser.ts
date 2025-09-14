import { ref, onMounted } from 'vue'
import * as fcl from '@onflow/fcl'

const user = ref<any>({ addr: null })

export function useUser() {
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

  return {
    user,
    connect,
    disconnect,
  }
}
