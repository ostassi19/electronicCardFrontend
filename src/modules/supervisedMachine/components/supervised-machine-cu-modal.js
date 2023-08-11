import React, {useState} from "react";
import {FiEdit} from "react-icons/fi";
import {IoMdAddCircle} from "react-icons/io";
import {HiSave} from "react-icons/hi";
import {Alert, Button, Card, CardBody, CardHeader, Form, FormGroup, InputGroup, Modal, ModalBody} from "reactstrap";
import {useDispatch, useSelector} from "react-redux";
import httpClient from '../../../core/http/http-client';
import Loader from "react-js-loader";
import maintenancesReducer from "../reducer";
import {addMaintenance, addSupervisedMachine, updateMaintenance, updateSupervisedMachine} from "../actions";
import supervisedMachinesReducer from "../reducer";


function SupervisedMachineCuModal({type, id, nameValue,mesageValue}) {
    const [modalOpen, setModalOpen] = React.useState(false);
    const supervisedMachines = useSelector(state => state.supervisedMachinesReducer.supervisedMachines);
    const [name, setName] = useState(nameValue);
    const [message, setMessage] = useState(mesageValue);
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
            setName('');
            setMessage('');

        } else if (type === 'edit') {
            let cancelUpdate = false;
            let i = 0;
            while (!cancelUpdate && i < supervisedMachines.length) {
                if (supervisedMachines[i].id === id) {
                    setName(supervisedMachines[i].name);
                    setMessage(supervisedMachines[i].message);
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
        if (name === "" || message === "") {
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
            const url = '/supervisedMachine/' + id.toString();
            httpClient.put(url, {name: name, message: message}).then(
                res => {
                    dispatch(updateSupervisedMachine(res.data))
                    setError({
                        flag: false,
                        msg: ''
                    });
                    setSucces({
                        flag: true,
                        msg: "Machine à superviser a été modifié avec succés "
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
        if (name === "") {
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
            httpClient.post('/supervisedMachine', {name: name, message: message}).then(
                response => {
                    dispatch(addSupervisedMachine(response.data));
                    setError({
                        flag: false,
                        msg: ''
                    });
                    setSucces({
                        flag: true,
                        msg: "Machine à superviser a été ajouté avec succés "
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
                        msg: 'La machine à superviser existe déja'
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
                                    {type === "add" ? "Création d'une machine à superviser " : null}
                                    {type === "edit" ? "Modification  d'une machine à superviser " : null}
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
                                            htmlFor="name">
                                            Nom :
                                        </label>
                                        <input
                                            style={{
                                                width: '100%',
                                                height: '35px'
                                            }}
                                            name="name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}/>
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup className="mb-3">
                                    <InputGroup>
                                        <label htmlFor="message">
                                            Message :
                                        </label>
                                        <input
                                            style={{
                                            width: '100%',
                                            height: '35px'
                                        }}
                                               name="message"
                                               value={message}
                                               onChange={(e) => setMessage(e.target.value)}/>
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

export default SupervisedMachineCuModal;
