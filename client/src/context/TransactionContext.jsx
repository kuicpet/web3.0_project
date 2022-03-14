import React, { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import { contractABI, contractAddress } from '../utils/constants'
import toast, { Toaster } from 'react-hot-toast'

export const TransactionContext = React.createContext()

const { ethereum } = window
const notify = () => toast('Connect your Wallet')

// get ethereum contract
const getEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum)
  const signer = provider.getSigner()
  const transactionContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  )

  /*console.log({
    provider,
    signer,
    transactionContract,
  })*/
  return transactionContract
}

export const TransactionProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState('')
  const [formData, setFormData] = useState({
    addressTo: '',
    amount: '',
    keyword: '',
    message: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [transactionCount, setTransactionCount] = useState(
    localStorage.getItem('transactionCount')
  )
  const [transactions, setTransactions] = useState([])

  const handleChange = (e, name) => {
    setFormData((prevState) => ({ ...prevState, [name]: e.target.value }))
  }

  // get all transactions
  const getAllTransactions = async () => {
    try {
      if (!ethereum) return alert('Please install metamask')
      const transactionContract = getEthereumContract()
      const availableTransactions =
        await transactionContract.getAllTransactions()
      const structuredTransactions = availableTransactions.map(
        (transaction) => ({
          addressTo: transaction.receiver,
          addressFrom: transaction.sender,
          timestamp: new Date(
            transaction.timestamp.toNumber() * 1000
          ).toLocaleString(),
          message: transaction.keyword,
          keyword: transaction.keyword,
          amount: parseInt(transaction.amount._hex) / 10 ** 18,
        })
      )
      //console.log(availableTransactions)
      // console.log(structuredTransactions)
      setTransactions(structuredTransactions)
    } catch (error) {
      console.log(error)
    }
  }

  // dheck if wallet is connected
  const checkIfWalletIsConnected = async () => {
    try {
      if (!ethereum) return alert('Please install metamask')
      const accounts = await ethereum.request({ method: 'eth_accounts' })
      // console.log(accounts)
      if (accounts.length) {
        setCurrentAccount(accounts[0])
        getAllTransactions()
      } else {
        console.log('No accounts found')
      }
      setCurrentAccount(accounts[0])
    } catch (error) {
      console.log(error)
      throw new Error('No Ethereum Object')
    }
  }

  // check for transactions
  const checkIfTransactionsExist = async () => {
    try {
      const transactionContract = getEthereumContract()
      const transactionCount = await transactionContract.getTransactionCount()
      window.localStorage.setItem('transactionCount', transactionCount)
    } catch (error) {
      console.log(error)
      throw new Error('No Ethereum Object')
    }
  }

  // connect to metamask wallet
  const connectWallet = async () => {
    try {
      if (!ethereum) return alert('Please install metamask')
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' })

      setCurrentAccount(accounts[0])
    } catch (error) {
      console.log(error)
      throw new Error('No Ethereum Object')
    }
  }

  // disconnect Wallet
  const disconnectWallet = () => {
    setCurrentAccount('')
  }

  // send transaction to the blockchain
  const sendTransaction = async () => {
    try {
      if (!ethereum) return alert('Please install metamask')
      const { addressTo, amount, keyword, message } = formData
      const transactionContract = getEthereumContract()
      const parsedAmount = ethers.utils.parseEther(amount)

      // Send Ethereum
      await ethereum.request({
        method: 'eth_sendTransaction',
        params: [{ from: currentAccount, to: addressTo }],
        gas: '0x5208', // 21000 gwei
        value: parsedAmount._hex,
      })

      // Save to Blockchain
      const transactionHash = await transactionContract.addToBlockChain(
        addressTo,
        parsedAmount,
        keyword,
        message
      )
      setIsLoading(true)
      // console.log(`Loading -- ${transactionHash.hash}`)
      await transactionHash.wait()
      setIsLoading(false)
      // console.log(`Success -- ${transactionHash.hash}`)

      const transactionCount = await transactionContract.getTransactionCount()
      setTransactionCount(transactionCount.toNumber())
      window.reload()
    } catch (error) {
      console.log(error)
      throw new Error('No Ethereum Object')
    }
  }

  useEffect(() => {
    checkIfWalletIsConnected()
    checkIfTransactionsExist()
  }, [])

  return (
    <TransactionContext.Provider
      value={{
        connectWallet,
        currentAccount,
        formData,
        setFormData,
        handleChange,
        sendTransaction,
        transactions,
        isLoading,
        disconnectWallet
      }}
    >
      {children}
    </TransactionContext.Provider>
  )
}
