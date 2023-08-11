import React, {useState} from "react";
import {FiEdit} from "react-icons/fi";
import {IoMdAddCircle} from "react-icons/io";
import {HiSave} from "react-icons/hi";
import {Alert, Button, Card, CardBody, CardHeader, Form, FormGroup, InputGroup, Modal, ModalBody} from "reactstrap";
import {useDispatch, useSelector} from "react-redux";
import httpClient from '../../../core/http/http-client';
import Loader from "react-js-loader";
import maintenancesReducer from "../reducer";
import {
    addMaintenance, addProductivity,
    addSupervisedMachine,
    updateMaintenance,
    updateProductivity,
    updateSupervisedMachine
} from "../actions";
import supervisedMachinesReducer from "../reducer";
import productivitiesReducer from "../reducer";


function ProductivityCuModal({type, id, referenceValue,articleNameValue,pieceNumberValue,yieldValue}) {
    const [modalOpen, setModalOpen] = React.useState(false);
    const productivities = useSelector(state => state.productivitiesReducer.productivities);
    const [reference, setReference] = useState(referenceValue);
    const [articleName, setArticleName] = useState(articleNameValue);
    const [pieceNumber, setPieceNumber] = useState(pieceNumberValue);
    const [yieldd, setyield] = useState(yieldValue);
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
            setArticleName('');
            setPieceNumber('');
            setyield('')

        } else if (type === 'edit') {
            let cancelUpdate = false;
            let i = 0;
            while (!cancelUpdate && i < productivities.length) {
                if (productivities[i].id === id) {
                    setReference(productivities[i].reference);
                    setArticleName(productivities[i].articleName);
                    setPieceNumber(productivities[i].pieceNumber);
                    setyield(productivities[i].yield);
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
        if (reference === "" || articleName === "") {
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
            const url = '/productivity/' + id.toString();
            httpClient.put(url, {reference: reference, articleName: articleName,
                                        pieceNumber:pieceNumber, yield: yieldd}).then(
                res => {
                    dispatch(updateProductivity(res.data))
                    setError({
                        flag: false,
                        msg: ''
                    });
                    setSucces({
                        flag: true,
                        msg: "Productivité a été modifié avec succés "
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
            httpClient.post('/productivity', {reference: reference, articleName: articleName,
                                                pieceNumber:pieceNumber, yield: yieldd}).then(
                response => {
                    dispatch(addProductivity(response.data));
                    setError({
                        flag: false,
                        msg: ''
                    });
                    setSucces({
                        flag: true,
                        msg: "Productivité a été ajouté avec succés "
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
                        msg: 'Productivité existe déja'
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
                                    {type === "add" ? "Création d'une productivité " : null}
                                    {type === "edit" ? "Modification  d'une productivité " : null}
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
                                            Référence :
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
                                        <label htmlFor="articleName">
                                            Nom article :
                                        </label>
                                        <input
                                            style={{
                                            width: '100%',
                                            height: '35px'
                                        }}
                                               name="articleName"
                                               value={articleName}
                                               onChange={(e) => setArticleName(e.target.value)}/>
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup className="mb-3">
                                    <InputGroup>
                                        <label htmlFor="pieceNumber">
                                            Nombre de pièce :
                                        </label>
                                        <input
                                            style={{
                                                width: '100%',
                                                height: '35px'
                                            }}
                                            name="pieceNumber"
                                            value={pieceNumber}
                                            onChange={(e) => setPieceNumber(e.target.value)}/>
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup className="mb-3">
                                    <InputGroup>
                                        <label htmlFor="yieldd">
                                            Rendement :
                                        </label>
                                        <input
                                            style={{
                                                width: '100%',
                                                height: '35px'
                                            }}
                                            name="yieldd"
                                            value={yieldd}
                                            onChange={(e) => setyield(e.target.value)}/>
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

export default ProductivityCuModal;
