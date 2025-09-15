import DiceVRF from 0xf4a03341c4a71870

transaction {
    prepare(acct: &Account) {}

    execute {
        let result = DiceVRF.roll()
        log(result)
    }
}
