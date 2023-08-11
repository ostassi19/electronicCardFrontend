import React, {useState} from "react";
import {FiEdit} from "react-icons/fi";
import {IoMdAddCircle} from "react-icons/io";
import {HiSave} from "react-icons/hi";
import {Alert, Button, Card, CardBody, CardHeader, Form, FormGroup, InputGroup, Modal, ModalBody} from "reactstrap";
import {useDispatch, useSelector} from "react-redux";
import httpClient from '../../../core/http/http-client';
import Loader from "react-js-loader";
import maintenancesReducer from "../reducer";
import {addAlerte, addMaintenance, updateAlerte, updateMaintenance} from "../actions";


function AlerteCuModal({type, id, alertValue, descriptionValue,locationValue}) {
    const [modalOpen, setModalOpen] = React.useState(false);
    const alertes = useSelector(state => state.alertesReducer.alertes);
    const [alert, setAlert] = useState(alertValue);
    const [description, setDescription] = useState(descriptionValue);
    const [location, setLocation] = useState(locationValue);
    const [launchloader, setLaunchLoader] = useState(false);
    const [succes, setSucces] = useState({
        flag: false,
        msg: ''
    });
    const [error, setError] = useState({
        flag: false,
        msg: ''
    })

    const dispatch = useDispatch();

    const close = () => {
        setSucces({
            flag: false,
            msg: ''
        });
        setError({
            flag: false,
            msg: ''
        })
        if (type === 'add') {
            setAlert('');
            setDescription('');
            setLocation('');

        } else if (type === 'edit') {
            let cancelUpdate = false;
            let i = 0;
            while (!cancelUpdate && i < alertes.length) {
                if (alertes[i].id === id) {
                    setAlert(alertes[i].alert);
                    setDescription(alertes[i].description);
                    setLocation(alertes[i].location)
                    cancelUpdate = true;
                } else {
                    i++;
                }
            }
        }
        setModalOpen(!modalOpen)
    }
    const edit = (e) => {
        e.preventDefault();
        if (alert === "" || description === ""|| location === "") {
            setSucces({
                flag: false,
                msg: ''
            });
            setError({
                flag: true,
                msg: 'Veuillez rensigner tous les champs obligatoires'
            });
        } else {
            setLaunchLoader(true);
            const url = '/alert/' + id.toString();
            httpClient.put(url, {alert: alert, description: description,
                                location : location}).then(
                res => {
                    dispatch(updateAlerte(res.data))
                    setError({
                        flag: false,
                        msg: ''
                    });
                    setSucces({
                        flag: true,
                        msg: "Alerte a été modifié avec succés "
                    });
                    setLaunchLoader(false);
                }
            ).catch(error => {
                setError({
                        flag: true,
                        msg: 'modification a échoué'
                    }
                )
                setLaunchLoader(false);
            })

        }
    }
    const add = (e) => {
        e.preventDefault();
        if (alert === "") {
            setSucces({
                flag: false,
                msg: ''
            });
            setError({
                flag: true,
                msg: 'Veuillez rensigner tous les champs obligatoires'
            });
        } else {
            setLaunchLoader(true);
            httpClient.post('/alert', {alert: alert, description: description,
                                                location : location}).then(
                response => {
                    dispatch(addAlerte(response.data));
                    setError({
                        flag: false,
                        msg: ''
                    });
                    setSucces({
                        flag: true,
                        msg: "Alerte a été ajouté avec succés "
                    });
                    setLaunchLoader(false);
                }
            ).catch(
                error => {
                    setSucces({
                        flag: false,
                        msg: ''
                    });
                    setError({
                        flag: true,
                        msg: 'Alerte existe déja'
                    });
                    setLaunchLoader(false);
                }
            )
        }

    }
    return (
        <>
            {
                type === "add" ? <IoMdAddCircle className="mx-1 add-icon right-float"
                                                onClick={() => setModalOpen(!modalOpen)}/> : null
            }
            {
                type === "edit" ? <FiEdit className="golden-icon" onClick={() => setModalOpen(!modalOpen)}/> : null
            }

            <Modal
                className="modal-dialog-centered"
                size="sm"
                toggle={() => setModalOpen(!modalOpen)}
                isOpen={modalOpen}>
                <div className="modal-body p-0">
                    <Card className="bg-secondary shadow border-0">
                        <CardHeader className="bg-transparent ">
                            <button
                                aria-label="Close"
                                className="close"
                                data-dismiss="modal"
                                type="button"
                                onClick={() => close()}>
                                <span aria-hidden={true}>×</span>
                            </button>
                            <div className="text-muted text-center ">
                                <small>
                                    {type === "add" ? "Création d'une maintenance " : null}
                                    {type === "edit" ? "Modification d'une maintenance " : null}
                                </small>
                            </div>
                        </CardHeader>
                        <CardBody>
                            {
                                error.flag  ?
                                    <Alert color="danger text-center m-0 p-0">
                                         <span>
                                            <i className="ni ni-bell-55"/>
                                          </span>{" "}
                                        <span>
                                            <strong>{error.msg}!</strong>
                                        </span>
                                    </Alert>
                                    : null
                            }
                            {
                                succes.flag  ?
                                    <Alert color="success text-center m-0 p-0">
                                        <span>
                                            <i className="ni ni-check-bold"/>
                                        </span>{" "}
                                        <span>
                                            <strong>{succes.msg}!</strong>
                                        </span>
                                    </Alert>
                                    : null
                            }
                            <Form role="form"
                                  onSubmit={type === 'edit' ? edit : add}>
                                <FormGroup className="mb-3">
                                    <InputGroup>
                                        <label
                                            htmlFor="alert">
                                            Alerte :
                                        </label>
                                        <input
                                            style={{
                                                width: '100%',
                                                height: '35px'
                                            }}
                                            name="alert"
                                            value={alert}
                                            onChange={(e) => setAlert(e.target.value)}/>
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup className="mb-3">
                                    <InputGroup>
                                        <label htmlFor="description">
                                            Description :
                                        </label>
                                        <input
                                            style={{
                                            width: '100%',
                                            height: '35px'
                                        }}
                                               name="description"
                                               value={description}
                                               onChange={(e) => setDescription(e.target.value)}/>
                                    </InputGroup>
                                </FormGroup>
                                    <FormGroup>
                                        <InputGroup>
                                            <label htmlFor="interventionDate">
                                                Emplacement :
                                            </label>
                                            <input
                                                style={{
                                                    width: '100%',
                                                    height: '35px'
                                                }}
                                                value={location}
                                                onChange={(e) => setLocation(e.target.value)}/>
                                        </InputGroup>
                                    </FormGroup>

                                <div className="text-center">
                                    <Button
                                        className="my-4"
                                        color="primary"
                                        type="submit">
                                        Enregistrer
                                    </Button>
                                </div>
                            </Form>
                        </CardBody>
                    </Card>
                </div>
            </Modal>
        </>
    );
}

export default AlerteCuModal;
