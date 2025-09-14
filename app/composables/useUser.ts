import { ref, onMounted } from 'vue'
import * as fcl from '@onflow/fcl'

// реактивное состояние пользователя
const user = ref<any>({ addr: null })

export function useUser() {
  // подписка на изменения пользователя при монтировании
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
