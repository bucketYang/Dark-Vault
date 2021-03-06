import { earnContractABI } from "../configure";

export const deposit = async ({web3, address, isAll, amount, contractAddress}) => {
  // console.log(`=====================================deposit begin=====================================`)
  console.log(`
    address:${address}\n
    contractAddress:${contractAddress}\n
    amount:${amount}
  `)
  const contract = new web3.eth.Contract(earnContractABI, contractAddress);
  const data = await _deposit({web3, contract,isAll, amount,  address});
  // console.log(`=====================================deposit success=====================================`)
  return data;
}

const _deposit = ({web3, contract, amount, isAll, address}) => {
  return new Promise((resolve, reject) => {
    // console.log(isAll)
    if(isAll) {
      contract.methods.depositAll().send({ from: address }).on('transactionHash', function(hash){
        console.log(hash)
        resolve(hash)
      })
      .on('confirmation', function(confirmationNumber, receipt){
        console.log(confirmationNumber, receipt);
      })
      .on('receipt', function(receipt){
        console.log(receipt);
      })
      .on('error', function(error) {
        console.log(error)
      })
      .catch((error) => {
        console.log(error)
        reject(error)
      })
    } else {
      contract.methods.deposit(amount).send({ from: address }).on('transactionHash', function(hash){
        console.log(hash)
        resolve(hash)
      })
      .on('confirmation', function(confirmationNumber, receipt){
        console.log(confirmationNumber, receipt);
      })
      .on('receipt', function(receipt){
        console.log(receipt);
      })
      .on('error', function(error) {
        console.log(error)
      })
      .catch((error) => {
        console.log(error)
        reject(error)
      })
    }
  })
}