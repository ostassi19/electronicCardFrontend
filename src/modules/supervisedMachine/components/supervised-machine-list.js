import {
    Card,
    CardFooter,
    CardHeader,
    Container,
    Pagination,
    PaginationItem,
    PaginationLink,
    Row,
    Table,
    Button
} from "reactstrap";
import Header from "shared/header.js";
import httpClient from "../../../core/http/http-client";
import { setSupervisedMachines} from "../actions";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {Link} from "react-router-dom";
import {BsPencilSquare} from "react-icons/all";
import SupervisedMachineCuModal from "./supervised-machine-cu-modal";
import supervisedMachinesReducer from "../reducer";

const SupervisedMachineList = () => {
    const dispatch = useDispatch();
    const getSupervisedMachines = () => {
        httpClient.get('/supervisedMachine').then(
            response => {
                dispatch(setSupervisedMachines(response.data));
            }
        )
    }

    useEffect(() => getSupervisedMachines()
        , [])
    const supervisedMachines = useSelector(state => state.supervisedMachinesReducer.supervisedMachines);

    return (
        <>
            <Header/>

            <Container fluid>
                <Row>
                    <div className="col m-0 p-0">
                        <Card className="shadow">
                            <CardHeader className="border-0">
                                <h3 className="border-0 text-center">LISTE DES MACHINE A SUPERVISER
                                    <SupervisedMachineCuModal type="add"
                                                              titleValue=""/>
                                </h3>

                            </CardHeader>
                            <Table className="align-items-center table-flush" responsive>
                                <thead className="thead-light">
                                <tr>
                                    <th scope="col">Nom</th>
                                    <th scope="col">Message</th>
                                    <th scope="col">Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    supervisedMachines.map(supervisedMachine => (
                                        <tr key={supervisedMachine.id}>
                                            <td>{supervisedMachine.name}</td>
                                            <td>{supervisedMachine.message}</td>
                                            <td>
                                                <td>
                                                    {/*<ThematicDeleteModal id={thematic.id}*/}
                                                    {/*                     getThematics={getThematics}/>*/}
                                                    <SupervisedMachineCuModal type="edit" id={supervisedMachine.id}
                                                                              name={supervisedMachine.name}
                                                                              message={supervisedMachine.message}
                                                    />
                                                </td>
                                            </td>
                                        </tr>
                                    ))
                                }
                                </tbody>
                            </Table>
                            <CardFooter className="py-4">
                                <nav aria-label="...">
                                    <Pagination
                                        className="pagination justify-content-end mb-0"
                                        listClassName="justify-content-end mb-0"
                                    >
                                        <PaginationItem className="disabled">
                                            <PaginationLink
                                                href="#pablo"
                                                onClick={(e) => e.preventDefault()}
                                                tabIndex="-1"
                                            >
                                                <i className="fas fa-angle-left"/>
                                                <span className="sr-only">Previous</span>
                                            </PaginationLink>
                                        </PaginationItem>
                                        <PaginationItem className="active">
                                            <PaginationLink
                                                href="#pablo"
                                                onClick={(e) => e.preventDefault()}
                                            >
                                                1
                                            </PaginationLink>
                                        </PaginationItem>
                                        <PaginationItem>
                                            <PaginationLink
                                                href="#pablo"
                                                onClick={(e) => e.preventDefault()}
                                            >
                                                2 <span className="sr-only">(current)</span>
                                            </PaginationLink>
                                        </PaginationItem>
                                        <PaginationItem>
                                            <PaginationLink
                                                href="#pablo"
                                                onClick={(e) => e.preventDefault()}
                                            >
                                                3
                                            </PaginationLink>
                                        </PaginationItem>
                                        <PaginationItem>
                                            <PaginationLink
                                                href="#pablo"
                                                onClick={(e) => e.preventDefault()}
                                            >
                                                <i className="fas fa-angle-right"/>
                                                <span className="sr-only">Next</span>
                                            </PaginationLink>
                                        </PaginationItem>
                                    </Pagination>
                                </nav>

                            </CardFooter>
                        </Card>
                    </div>
                </Row>


            </Container>
        </>
    );

};

export default SupervisedMachineList;
