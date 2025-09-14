<template>
  <div>
    <div class="flex flex-col py-20">
        <div class="flex justify-around my-auto">
            <div class="flex justify-center items-center text-lg border size-24">
                {{ diceLeft }}
                </div>
            <div class="flex justify-center items-center text-lg border size-24">
                {{ diceRight }}
            </div>
        </div>
        <div class="flex justify-center">
            <button @click=roll class="border rounded-lg py-1 px-5 bg-gray-200 cursor-pointer active:bg-fuchsia-200 active:scale-95 transition transform dutaion-150">roll dice</button>
        </div>
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