<template>
  <div>
    <div class="flex justify-around my-auto">
        <div class="flex justify-center items-center text-lg border size-24">
            {{ diceLeft }}
            </div>
        <div class="flex justify-center items-center text-lg border size-24">
            {{ diceRight }}
        </div>
    </div>
    <div class="flex justify-center">
        <button @click=roll class="px-4 py-2 bg-fuchsia-500 text-white rounded-lg hover:bg-fuchsia-600 active:scale-95 transition">Roll Dice</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const diceLeft = ref(1)
const diceRight = ref(1)

const roll = () => {
    diceLeft.value = Math.floor(Math.random() * 6) + 1
    diceRight.value = Math.floor(Math.random() * 6) + 1
}
</script>