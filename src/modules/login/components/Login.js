import {
    Alert,
    Button,
    Card,
    CardBody,
    CardHeader,
    Col,
    Container,
    Form,
    FormGroup,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Row
} from "reactstrap";
import {FaUserAlt} from 'react-icons/fa';
import {AiFillEye, AiFillEyeInvisible} from 'react-icons/ai';
import MyComponent from 'react-fullpage-custom-loader'

import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Redirect, useHistory} from "react-router-dom";
import {fail, succes} from "modules/login/actions"
import httpClient from 'core/http/http-client';

const Login = () => {
    const mainContent = React.useRef(null);
    const isLogged = useSelector(state => state.loginReducer.isLogged);
    const [isPasswordHidden, setPasswordHideness] = useState(true)
    const error = useSelector(state => state.loginReducer.error);
    const [showLoader, setShowLoader] = useState(false);
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    const onLogin = (e) => {
        e.preventDefault();
        setShowLoader(true);
        httpClient.post("/users/login", {
            email: email, password: password
        }).then(response => {
            localStorage.setItem('token', response.data.token);
            console.log(response.data)
            dispatch(succes())
            setTimeout(() => {
                setShowLoader(false);
                history.push('maintenances');
            }, 300)
        }).catch(error => {
            dispatch(fail());
            setTimeout(() => {
                setShowLoader(false)
            }, 300)
        })

        ;

    }
    if (!isLogged) {
        return (

            <div className="main-content" ref={mainContent}>
                <div className="header bg-gradient-info py-lg-6">
                    <Container>
                        <div className="header-body text-center mb-7">
                            <Row className="justify-content-center">
                                <Col lg="5" md="7">
                                    <h1 className="text-white">Bienvenue dans HoussemRix votre outil de gestion des
                                        machines</h1>

                                </Col>
                            </Row>
                        </div>
                    </Container>
                    <div className="separator separator-bottom separator-skew zindex-100">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            preserveAspectRatio="none"
                            version="1.1"
                            viewBox="0 0 2560 100"
                            x="0"
                            y="0">
                            <polygon
                                className="fill-default"
                                points="2560 0 2560 100 0 100"/>
                        </svg>
                    </div>
                </div>
                {/* Page content */}
                <Container className="mt--8 pb-5">
                    <Row className="justify-content-center">
                        <Col lg="5" md="7">
                            <Card className="bg-secondary shadow border-0">
                                <CardHeader className="bg-transparent">
                                    <div className="btn-wrapper text-center">
                                        <FaUserAlt style={{color: "#6a274d", fontSize: "60px"}}/>
                                    </div>
                                </CardHeader>
                                <CardBody className="pt-0">
                                    <div className="text-center text-muted">
                                        {error ? <Alert color="danger">
                                                  <span className="alert-inner--icon">
                                                        <i className="ni ni-bell-55"/>
                                                  </span>{" "}
                                            <span className="alert-inner--text">
                                                        Identifiants <strong>incorrects!</strong>
                                                    </span>
                                        </Alert> : null}
                                    </div>

                                    <Form role="form" onSubmit={onLogin}>
                                        <FormGroup className="mb-3">
                                            <InputGroup className="input-group-alternative">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <i className="ni ni-email-83"/>
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    placeholder="Identifiant"
                                                    type="text"
                                                    autoComplete="new-email"
                                                    required
                                                />
                                            </InputGroup>
                                        </FormGroup>
                                        <FormGroup>
                                            <InputGroup className="input-group-alternative">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <i className="ni ni-lock-circle-open"/>
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    placeholder="Mot de pass"
                                                    type={isPasswordHidden ? 'password' : 'text'}
                                                    autoComplete="new-password"
                                                    required
                                                />
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        {isPasswordHidden ?
                                                            <AiFillEye onClick={() => setPasswordHideness(false)}
                                                                       className="ni ni-lock-circle-open primary-icon"/> : null}
                                                        {!isPasswordHidden ? <AiFillEyeInvisible
                                                            onClick={() => setPasswordHideness(true)}
                                                            className="ni ni-lock-circle-open primary-icon"/> : null}
                                                    </InputGroupText>
                                                </InputGroupAddon>

                                            </InputGroup>
                                        </FormGroup>

                                        <div className="text-center">
                                            <Button className="my-4" color="primary" type="submit">
                                                Se connecter
                                            </Button>
                                        </div>
                                    </Form>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
                {showLoader ? <MyComponent sentences={[]}/> : null}
            </div>);
    } else {
        return <Redirect to="maintenances"/>
    }
};

export default Login;
