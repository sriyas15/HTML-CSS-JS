import './App.css'
import AllRoutes from './routes/AllRoutes'
import Header from './components/Header'
import Footer from './components/Footer'
import DarkModeContext from './context/DarkModeContext'

function App() {

  return (
    <>
    <DarkModeContext>

      <Header/>
      <AllRoutes/>
      <Footer/>

    </DarkModeContext>
    </>
  )
}

export default App
