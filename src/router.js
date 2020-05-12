import React from 'react'
import {BrowserRouter,Switch,Route} from 'react-router-dom'
import Login from './Pages/Login/index.js'
import Home from './Pages/Home/index.js'
import NovoUsuario from './Pages/NovoUsuario/index.js'
function Router(){
    
    return(
        <BrowserRouter>
        <Switch>
            <Route path='/' exact component={Login} />
            <Route path='/NovoUsuario' component={NovoUsuario}/>
            <Route path='/Home' component={Home} />
        </Switch>
        </BrowserRouter>
    )
}

export default Router;