access(all) contract DiceVRF {

    access(all) event DiceRolled(result: Int)

    access(all) fun roll(): Int {
        let seed = getCurrentBlock().height
        return Int(seed % UInt64(6)) + 1
    }
}
