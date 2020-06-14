import React from 'react'
import {BrowserRouter,Switch,Route} from 'react-router-dom'
import Login from './Pages/Login/index.js'
import Home from './Pages/Home/index.js'
import NovoUsuario from './Pages/NovoUsuario/index.js'
import EditarPerfil from './Pages/EditarPerfil'
function Router(){
    
    return(
        <BrowserRouter>
        <Switch>
            <Route path='/' exact component={Login} />
            <Route path='/NovoUsuario' component={NovoUsuario}/>
            <Route path='/Home' component={Home} />
            <Route path='/EditarPerfil' component={EditarPerfil}/>
        </Switch>
        </BrowserRouter>
    )
}

export default Router;