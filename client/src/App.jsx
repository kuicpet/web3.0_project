import { Navbar, Welcome, Services, Transactions, Footer } from './components'

const App = () => {
  return (
    <div className='min-h-screen'>
      <div className='gradient-bg-welcome'>
        <Navbar />
        <Welcome />
        <Services />
      </div>
      <Transactions />
      <Footer />
    </div>
  )
}

export default App
