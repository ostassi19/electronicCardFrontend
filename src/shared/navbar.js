import {
    Container,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Media,
    Nav,
    Navbar,
    UncontrolledDropdown,
} from "reactstrap";
import {FaUserAlt} from 'react-icons/fa';
import {useDispatch} from "react-redux";
import {deconnexion} from "modules/login/actions";
import {NavLink, useHistory} from "react-router-dom";

const AppNavbar = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const onDeconnexion = () => {
        localStorage.removeItem('token');
        dispatch(deconnexion());
        history.push('/connexion');
    }

    return (
        <>
            <Container fluid>
                <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
                    <Nav className="align-items-center d-none d-md-flex" style={{width: "90%"}} navbar>

                        <NavLink className="navLink" to="/maintenances">
                            Maintenance
                        </NavLink>

                        <NavLink to="/supervisedMachine" className="navLink">
                            Machine à supervisé
                        </NavLink>
                        <NavLink to="/productivity" className="navLink">
                            Productivité
                        </NavLink>

                        <NavLink to="/workPlanification" className="navLink">
                            Plan de travail
                        </NavLink>

                        <NavLink to="/alert" className="navLink">
                            Alerte
                        </NavLink>
                    </Nav>
                    <UncontrolledDropdown nav>
                        <DropdownToggle className="pr-0" nav>
                            <Media className="align-items-center">
                                  <span className="avatar avatar-sm rounded-circle">
                                    <FaUserAlt/>
                                  </span>
                                <Media className="ml-2 d-none d-lg-block">
                                    <span className="mb-0 text-sm font-weight-bold admin-label">
                                      Admin
                                    </span>
                                </Media>
                            </Media>
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-arrow" right>
                            <DropdownItem onClick={() => onDeconnexion()}>
                                <i className="ni ni-user-run"/>
                                <span>Se déconnecter</span>
                            </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </Navbar>
            </Container>

        </>
    );
};

export default AppNavbar;
