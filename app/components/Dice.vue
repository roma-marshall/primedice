<template>
  <div>
    <div class="flex justify-around">
        <div class="flex justify-center items-center text-lg border size-24">
            {{ diceLeft }}
            </div>
        <div class="flex justify-center items-center text-lg border size-24">
            {{ diceRight }}
        </div>
    </div>
    <div v-if="user.addr" class="flex flex-col items-center space-y-4">
        <span>Place your bet (min bet 1 $FLOW)</span>
        <div class="flex space-x-4">
            <input type="number" class="flex w-20 p-2 border rounded-lg" v-model.number=bet>
            <button @click="roll" class="px-4 py-2 text-white rounded-lg active:scale-95 transition cursor-pointer"
                    :class="bet < 1 ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'"
                    :disabled="bet < 1">
                Roll Dice
            </button>
        </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const diceLeft = ref(1)
const diceRight = ref(1)
const bet = ref(1)
const { user } = useUser()

const roll = () => {
    diceLeft.value = Math.floor(Math.random() * 6) + 1
    diceRight.value = Math.floor(Math.random() * 6) + 1
}
</script>