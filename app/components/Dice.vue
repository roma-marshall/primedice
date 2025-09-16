<template>
  <div class="space-y-5">
    <div class="flex flex-col items-center">
      <span>
        🎲 Prime Dice — a simple and exciting game on the Flow blockchain.
      </span>

      <span> The player rolls two dice 🎲 🎲 </span>

      <span> if the sum > 7 — you win ✅ </span>

      <span> if the sum <= 7 — you lose ❌ </span>

      <span>
        All bets 💰 and results 📜 are secured by smart contracts 🔗
      </span>

      <span> ensuring fairness ⚖️ and transparency 👀 </span>
    </div>

    <div class="flex flex-col items-center h-10">
      <span v-if="resultDice" class="text-xl font-semibold">
        {{ resultDice }}
      </span>
    </div>

    <div class="flex justify-center space-x-20">
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
        <input
          type="number"
          class="flex w-20 p-2 border rounded-lg"
          v-model.number="bet"
        />
        <button
          @click="roll"
          class="px-4 py-2 text-white rounded-lg active:scale-95 transition cursor-pointer"
          :class="bet < 1 ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'"
          :disabled="bet < 1"
        >
          Roll Dice
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import * as fcl from "@onflow/fcl";

const oppLeft = ref(1);
const oppRight = ref(1);
const diceLeft = ref(1);
const diceRight = ref(1);
const resultDice = ref("");
const bet = ref(1);
const { user } = useUser();

const rollDice = () => {
  diceLeft.value = Math.floor(Math.random() * 6) + 1;
  diceRight.value = Math.floor(Math.random() * 6) + 1;

  oppLeft.value = Math.floor(Math.random() * 6) + 1;
  oppRight.value = Math.floor(Math.random() * 6) + 1;

  const mySum = diceLeft.value + diceRight.value;
  const oppSum = oppLeft.value + oppRight.value;

  if (mySum > oppSum) {
    resultDice.value = "✅ You win!";
  } else if (mySum < oppSum) {
    resultDice.value = "❌ Opponent wins!";
  } else {
    resultDice.value = "🤝 Draw!";
  }
};

const result = ref<number | null>(null);
const loading = ref(false);

const roll = async () => {
  try {
    loading.value = true;
    result.value = null;

    const txId = await fcl.mutate({
      cadence: `
            import DiceVRF from 0xf4a03341c4a71870

            transaction {
            prepare(acct: &Account) {}
            execute {
                let result = DiceVRF.roll()
                log(result)
            }
            }
        `,
      proposer: fcl.authz as any,
      payer: fcl.authz as any,
      authorizations: [fcl.authz as any],
      limit: 50,
    });

    resultDice.value = "🔄️ Loading transaction...";

    const txResult = await fcl.tx(txId).onceSealed();
    const logs = txResult.events
      .filter((event) => event.type === "flow.Log")
      .map((event) => event.data.message);

    console.log(logs);
    console.log("Tx sent:", txId);

    const sealed = await fcl.tx(txId).onceSealed();
    console.log("Tx sealed:", sealed);

    const diceEvent = sealed.events.find((e: any) =>
      e.type.includes("DiceVRF.DiceRolled")
    );

    if (diceEvent) {
      result.value = diceEvent.data.result;
    } else {
      console.warn("No dice result found in events");
      rollDice();
    }
  } catch (e) {
    console.error("Error rolling dice:", e);
  } finally {
    loading.value = false;
  }
};
</script>
