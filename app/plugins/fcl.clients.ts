import * as fcl from "@onflow/fcl";

export default defineNuxtPlugin(() => {
  fcl
    .config()
    .put("app.detail.title", "My Nuxt Flow App")
    .put(
      "app.detail.icon",
      "https://avatars.githubusercontent.com/u/62387156?s=200"
    )
    .put("accessNode.api", "https://rest-testnet.onflow.org") // Testnet RPC
    .put("discovery.wallet", "https://fcl-discovery.onflow.org/testnet/authn"); // Wallet Discovery
});
