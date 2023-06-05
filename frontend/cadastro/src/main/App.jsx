import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import './App.css'
import React from 'react'
import Logo from    '../components/templete/logo/logo'
import Nav from '../components/templete/Nav/Nav'

import Footer from '../components/templete/Footer/footer'
import { BrowserRouter } from 'react-router-dom'
import Routes from './Routes'


export default props => 
<BrowserRouter>
<div className='app'>
        <Logo/>
        <Nav/>
        <Routes/>
         <Footer/>

        </div>

</BrowserRouter>