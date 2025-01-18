import React from 'react'
import Header from './components/Pages/Header'
import Footer from './components/Pages/Footer'
import Landing from './components/Pages/Landing'
import styled from 'styled-components'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Products from './components/Pages/Products'
import How from './components/Pages/How'
import Artisan from './components/Pages/Artisan'
import Contact from './components/Pages/Contact'
import Signup from './components/Pages/Signup'
import Signin from './components/Pages/Signin'
import Profile from './components/Pages/Profile'
import PrivateRoute from './components/Routes/PrivateRoute'
import QuotesForm from './components/Pages/QuotesForm'
import MyQuotes from './components/Pages/MyQuotes'
import AboutUs from './components/Pages/AboutUs'
import QuotesAdmin from './components/AdminPages/QuotesAdmin'
import QuotesAction from './components/AdminPages/QuotesAction'
import PrivateAdminRoute from './components/Routes/PrivateAdminRoute'
import AdminDB from './components/AdminPages/AdminDB'
import UserList from './components/AdminPages/UserList'
import AdminLayout from './components/AdminPages/AdminLayout'


const Container = styled(Router)`
  display: flex;
  flex-direction: column;
  gap: 3em;
`

function App() {
  function RouteWithHeader(){
    const location = useLocation()

    const hideHeaderRoutes = ['/signup', '/signin', '/quote-form', '/admin/quotes', '/admin/actions/:id', '/admin/users', '/admin']

    const shouldHideHeader = hideHeaderRoutes.some(route => location.pathname.startsWith(route))

    return(
      <>{!shouldHideHeader && <Header/>}</>
    )
  }

  function RouteWithFooter(){
    const location = useLocation()

    const hideFooterRoutes = ['/signup', '/signin', '/quote-form', '/admin/quotes', '/admin/actions/:id ', '/admin/users', '/admin']

    const shouldHideFooter = hideFooterRoutes.some(route => location.pathname.startsWith(route))

    return(
      <>{!shouldHideFooter && <Footer/>}</>
    )
  }

  
  return (
    <Container>
      <RouteWithHeader/>

      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/products' element={<Products/>}/>
        <Route path='/how-it-works' element={<How/>}/>
        <Route path='/artisan' element={<Artisan/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/signin' element={<Signin/>}/>
        <Route path='/about-us' element={<AboutUs/>}/>
        <Route element={<PrivateRoute/>}>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/quote-form' element={<QuotesForm/>}/>
          <Route path='/quotes' element={<MyQuotes/>}/>
        </Route>
        <Route element={<PrivateAdminRoute/>}>
          <Route path='/admin' element={<AdminLayout/>}>
            <Route index element={<AdminDB/>}/>
            <Route path='/admin/quotes' element={<QuotesAdmin/>}/>
            <Route path='/admin/actions/:id' element={<QuotesAction/>}/>
            <Route path='/admin/users' element={<UserList/>}/>
          </Route>
        </Route>
        
      </Routes>

      <RouteWithFooter/>
    </Container>
  )
}

export default App