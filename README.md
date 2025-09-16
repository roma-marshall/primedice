# Prime Dice 🎲

Prime Dice is a simple decentralized dice game **built on Flow blockchain**.  
Players can roll two dice and interact with smart contracts written in **Cadence** to ensure fairness and transparency.

## 🚀 Features

- Provably fair dice rolls (1–6) on Flow
- Wallet connection via [Flow FCL](https://github.com/onflow/fcl)
- Smart contracts written in [Cadence](https://cadence-lang.org/)
- Frontend powered by Nuxt 3 + TailwindCSS

## 📦 Tech Stack

- **Flow Blockchain**
- **Cadence Smart Contracts**
- **Nuxt 3 (Vue 3)**
- **TailwindCSS**
- **FCL (Flow Client Library)**

## 🔗 Contracts

Deployed on **Flow Testnet**:

- DiceVRF: [`0xf4a03341c4a71870`](https://testnet.flowscan.io/contract/A.f4a03341c4a71870.DiceVRF)

---

### 🎲 Example Transaction (`transactions/roll.cdc`)

```cadence
import DiceVRF from 0xf4a03341c4a71870

transaction {
    prepare(acct: &Account) {}

    execute {
        let result = DiceVRF.roll()
        log(result)
    }
}
```

## 🧩 Getting Started

Clone the repo and install dependencies:

```bash
git clone https://github.com/roma-marshall/primedice.git
cd primedice
npm install
npm run dev
```

## 📄 License

MIT License
