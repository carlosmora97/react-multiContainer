import { BrowserRouter } from 'react-router-dom';
import { Routes, Route, NavLink, Navigate } from 'react-router-dom';

import logo from '../assets/react.svg'
import { Fib } from '../Fib/components/Fib';

export const Navigation = () => {
    return (
        <BrowserRouter>
            <div className="main-layout">
                <nav>
                    <img src={ logo } alt="React Logo" />
                    <ul>
                        <li>
                            <NavLink to="/fib" className={ ({ isActive }) => isActive ? 'nav-active' : '' }>fib</NavLink>
                        </li>
                        <li>
                            <NavLink to="/about" className={ ({ isActive }) => isActive ? 'nav-active' : '' }>About</NavLink>
                        </li>
                        <li>
                            <NavLink to="/users" className={ ({ isActive }) => isActive ? 'nav-active' : '' }>Users</NavLink>
                        </li>
                    </ul>
                </nav>


                <Routes>
                    <Route path="about" element={ <h1>About Page</h1> } />
                    <Route path="users" element={ <h1>Users Page</h1> } />
                    <Route path="fib" element={ <Fib/> } />
                    
                    <Route path="/*" element={ <Navigate to="/fib" replace /> } />
                </Routes>

            </div>
        </BrowserRouter>
    )
}
