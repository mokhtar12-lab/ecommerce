import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { logOut } from "../../../store/auth/authSlice"; 
import { NavLink } from "react-router-dom";


import "./navStyle.css"
import { Nav, Navbar, NavDropdown } from "react-bootstrap";


function Nav_Bar() {
    const dispatch = useAppDispatch()

    const {accessToken, user} = useAppSelector(state=> state.auth)


    return(
        <>
            <div className="navbar">
                <ul className="nav pages-links">
                    <li className="nav-item"> <NavLink to={"/"} className="nav-link" >Home</NavLink> </li>
                    <li className="nav-item"> <NavLink to={"/about"} className="nav-link" >About</NavLink> </li>
                    <li className="nav-item"> <NavLink to={"/contact"} className="nav-link">ContactUs</NavLink> </li>
                    <li className="nav-item"> <NavLink to={"/products"} className="nav-link">Products</NavLink> </li>
                </ul>


                <ul className="nav othe-links ">
                {
                    accessToken? <>
                        <Navbar className="nav othe-links" variant="dark" >
                            <Nav variant="secondary">
                                <NavDropdown
                                title={`Welcome: ${user?.fullname}`}
                                menuVariant="dark">
                                    <NavDropdown.Item active={false} as={NavLink} to={"/profile"}>Profile</NavDropdown.Item>
                                    <hr />
                                    <NavDropdown.Item active={false} as={NavLink} to={"/SignUp"} onClick={()=>{dispatch(logOut())}}>logOut</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        </Navbar>

                    </>:
                    <>
                        <li className="nav-item"> <NavLink to={"/Login"} className="nav-link">Login</NavLink> </li>
                        <li className="nav-item"> <NavLink to={"/SignUp"} className="nav-link">SignUp</NavLink> </li>
                    </>
                }
                </ul>

            </div>
        </>
    )
}

export default Nav_Bar;