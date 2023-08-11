import React, {useState} from "react";
import {FiEdit} from "react-icons/fi";
import {IoMdAddCircle} from "react-icons/io";
import {HiSave} from "react-icons/hi";
import {Alert, Button, Card, CardBody, CardHeader, Form, FormGroup, InputGroup, Modal, ModalBody} from "reactstrap";
import {useDispatch, useSelector} from "react-redux";
import httpClient from '../../../core/http/http-client';
import Loader from "react-js-loader";
import maintenancesReducer from "../reducer";
import {addMaintenance, updateMaintenance} from "../actions";


function MaintenanceCuModal({type, id, referenceValue, exchangePieceValue,interventionDateValue,affectedTaskValue}) {
    const [modalOpen, setModalOpen] = React.useState(false);
    const maintenances = useSelector(state => state.maintenancesReducer.maintenances);
    const [reference, setReference] = useState(referenceValue);
    const [exchangePiece, setExchangePiece] = useState(exchangePieceValue);
    const [interventionDate, setInterventionDate] = useState(interventionDateValue);
    const [affectedTask, setAffectedTask] = useState(affectedTaskValue);
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
            setReference('');
            setExchangePiece('');
            setInterventionDate('');
            setAffectedTask('');

        } else if (type === 'edit') {
            let cancelUpdate = false;
            let i = 0;
            while (!cancelUpdate && i < maintenances.length) {
                if (maintenances[i].id === id) {
                    setReference(maintenances[i].reference);
                    setExchangePiece(maintenances[i].exchangePiece);
                    setInterventionDate(maintenances[i].interventionDate)
                    setAffectedTask(maintenances[i].affectedTask)
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
        if (reference === "" || exchangePiece === ""|| interventionDate === ""|| affectedTask === "") {
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
            console.log("id ",id)
            const url = '/maintenance/' + id.toString();
            httpClient.put(url, {reference: reference, exchangePiece: exchangePiece,
                                interventionDate : interventionDate, affectedTask : affectedTask}).then(
                res => {
                    dispatch(updateMaintenance(res.data))
                    setError({
                        flag: false,
                        msg: ''
                    });
                    setSucces({
                        flag: true,
                        msg: "Maintenance a été modifié avec succés "
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
        if (reference === "") {
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
            httpClient.post('/maintenance', {reference: reference, exchangePiece: exchangePiece,
                interventionDate : interventionDate, affectedTask : affectedTask}).then(
                response => {
                    dispatch(addMaintenance(response.data));
                    setError({
                        flag: false,
                        msg: ''
                    });
                    setSucces({
                        flag: true,
                        msg: "Maintenance a été ajouté avec succés "
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
                        msg: 'La maintenance existe déja'
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
                                            htmlFor="reference">
                                            Reference :
                                        </label>
                                        <input
                                            style={{
                                                width: '100%',
                                                height: '35px'
                                            }}
                                            name="reference"
                                            value={reference}
                                            onChange={(e) => setReference(e.target.value)}/>
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup className="mb-3">
                                    <InputGroup>
                                        <label htmlFor="exchangePiece">
                                            Pièce à échanger :
                                        </label>
                                        <input
                                            style={{
                                            width: '100%',
                                            height: '35px'
                                        }}
                                               name="exchangePiece"
                                               value={exchangePiece}
                                               onChange={(e) => setExchangePiece(e.target.value)}/>
                                    </InputGroup>
                                </FormGroup>
                                    <FormGroup>
                                        <InputGroup>
                                            <label htmlFor="interventionDate">
                                                Date d'intervention :
                                            </label>
                                            <input
                                                type={"date"}
                                                style={{
                                                    width: '100%',
                                                    height: '35px'
                                                }}
                                                value={interventionDate}
                                                onChange={(e) => setInterventionDate(e.target.value)}/>
                                        </InputGroup>
                                    </FormGroup>
                                <FormGroup>
                                    <InputGroup>
                                        <label htmlFor="affectedTask">
                                            Tache affectée :
                                        </label>
                                        <input
                                            style={{
                                                width: '100%',
                                                height: '35px'
                                            }}
                                            value={affectedTask}
                                            onChange={(e) => setAffectedTask(e.target.value)}/>
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

export default MaintenanceCuModal;
