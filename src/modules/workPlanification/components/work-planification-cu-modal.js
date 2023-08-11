import React, {useState} from "react";
import {FiEdit} from "react-icons/fi";
import {IoMdAddCircle} from "react-icons/io";
import {HiSave} from "react-icons/hi";
import {Alert, Button, Card, CardBody, CardHeader, Form, FormGroup, InputGroup, Modal, ModalBody} from "reactstrap";
import {useDispatch, useSelector} from "react-redux";
import httpClient from '../../../core/http/http-client';
import Loader from "react-js-loader";
import maintenancesReducer from "../reducer";
import {addMaintenance, addWorkPlanification, updateMaintenance, updateWorkPlanification} from "../actions";
import workPlanificationsReducer from "../reducer";


function WorkPlanificationCuModal({type, id, jobValue, planValue,identityValue}) {
    const [modalOpen, setModalOpen] = React.useState(false);
    const workPlanifications = useSelector(state => state.workPlanificationsReducer.workPlanifications);
    const [job, setJob] = useState(jobValue);
    const [plan, setPlan] = useState(planValue);
    const [identity, setIdentity] = useState(identityValue);
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
            setJob('');
            setPlan('');
            setIdentity('');

        } else if (type === 'edit') {
            let cancelUpdate = false;
            let i = 0;
            while (!cancelUpdate && i < workPlanifications.length) {
                if (workPlanifications[i].id === id) {
                    setJob(workPlanifications[i].job);
                    setPlan(workPlanifications[i].plan);
                    setIdentity(workPlanifications[i].identity)
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
        if (job === "" || plan === "") {
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
            const url = '/workPlanification/' + id.toString();
            httpClient.put(url, {job: job, plan: plan,
                                identity : identity}).then(
                res => {
                    dispatch(updateWorkPlanification(res.data))
                    setError({
                        flag: false,
                        msg: ''
                    });
                    setSucces({
                        flag: true,
                        msg: "Plan de travail a été modifié avec succés "
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
        if (plan === "") {
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
            httpClient.post('/workPlanification', {job: job, plan: plan,
                                                            identity : identity}).then(
                response => {
                    dispatch(addWorkPlanification(response.data));
                    setError({
                        flag: false,
                        msg: ''
                    });
                    setSucces({
                        flag: true,
                        msg: "Plan de travail a été ajouté avec succés "
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
                        msg: 'Le plan de travail existe déja'
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
                                            htmlFor="job">
                                            métier :
                                        </label>
                                        <input
                                            style={{
                                                width: '100%',
                                                height: '35px'
                                            }}
                                            name="job"
                                            value={job}
                                            onChange={(e) => setJob(e.target.value)}/>
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup className="mb-3">
                                    <InputGroup>
                                        <label htmlFor="plan">
                                            Plan de travail :
                                        </label>
                                        <input
                                            style={{
                                            width: '100%',
                                            height: '35px'
                                        }}
                                               name="plan"
                                               value={plan}
                                               onChange={(e) => setPlan(e.target.value)}/>
                                    </InputGroup>
                                </FormGroup>
                                    <FormGroup>
                                        <InputGroup>
                                            <label htmlFor="identity">
                                                Identité :
                                            </label>
                                            <input
                                                style={{
                                                    width: '100%',
                                                    height: '35px'
                                                }}
                                                value={identity}
                                                onChange={(e) => setIdentity(e.target.value)}/>
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

export default WorkPlanificationCuModal;
