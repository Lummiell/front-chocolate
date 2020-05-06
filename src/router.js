import React from 'react'
import {BrowserRouter,Switch,Route} from 'react-router-dom'
import Login from './Pages/Login/index.js'
function Router(){
    
    return(
        <BrowserRouter>
        <Switch>
            <Route path='/' exact component={Login} />
        </Switch>
        </BrowserRouter>
    )
}

export default Router;