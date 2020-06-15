import React from 'react'
import {BrowserRouter,Switch,Route} from 'react-router-dom'
import Login from './Pages/Login/index.js'
import Home from './Pages/Home/index.js'
import NovoUsuario from './Pages/NovoUsuario/index.js'
import EditarPerfil from './Pages/EditarPerfil'
import Grupo from './Pages/Grupo'
import Grupos from './Pages/Grupos'
function Router(){
    
    return(
        <BrowserRouter>
        <Switch>
            <Route path='/' exact component={Login} />
            <Route path='/NovoUsuario' component={NovoUsuario}/>
            <Route path='/Home' component={Home} />
            <Route path='/EditarPerfil' component={EditarPerfil}/>
            <Route path='/Grupos' exact component={Grupos}/>
            <Route path='/Grupos/:id' component={Grupo}/>
        </Switch>
        </BrowserRouter>
    )
}

export default Router;