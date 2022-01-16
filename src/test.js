const a  =  require('./json/vesting.json');
const {abi} = require('./abi/VestingContract.json');
const BigNumber = require('bignumber.js');
const ethers = require('ethers');
const fs = require('fs');

let r = [];
for (let i = 0; i < a.length; i++) {
    const {topics: [,contract, beneficiary, amount]} = a[i];
    r.push({
        contract: ethers.utils.getAddress(contract.substring(contract.length - 40, contract.length)),
        beneficiary:  ethers.utils.getAddress(beneficiary.substring(contract.length - 40, contract.length)),
        amount: (new BigNumber(amount)).div('1e+18').toString()
    });
}

// 8976562164322621058071882


r.sort((a,b) => {
    return (new BigNumber(a.amount)).lt(new BigNumber(b.amount)) ? -1: 1;
});
console.table(r);
fs.writeFileSync(`${__dirname}/json/vesting-creator.json`,JSON.stringify(r));


(async()=>{
    const provider = new ethers.providers.StaticJsonRpcProvider('https://bsc-dataseed.binance.org/')
    const vestingContract = new ethers.Contract('0x68Dce6819e470B2E3Fb894fCC2Dd45a0d1F81bf4', abi, provider);
    console.log(await vestingContract.getVestingSchedule());
    const {beneficiary,
    startVesting,
    totalBlocks,
    consumedBlocks,
    releaseType,
    unlockAmountPerBlock,
    remain} = await vestingContract.getVestingSchedule();


})();