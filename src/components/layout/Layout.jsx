// -components
import Header from '../header/Header'
import Footer from '../footer/Footer'
// -react-router-dom
import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <div>
        <Header />
        <Outlet />
        <Footer/>
    </div>
  )
}
