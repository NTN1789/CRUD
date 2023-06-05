import {Routes , Route } from 'react-router-dom'
import Home from '../components/Home/home';
import UserCrud from '../components/User/userCrud';


export default props => (
<Routes>

<Route exact path="/" element={<Home/>} />
<Route path="/users" element={<UserCrud/>} />
<Route path="*" element={<Home/>} />


</Routes>
);