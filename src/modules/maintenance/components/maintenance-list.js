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
import {setMaintenances} from "../actions";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import maintenancesReducer from "../reducer";
import MaintenanceCuModal from "./maintenance-cu-modal";

const MaintenanceList = () => {
    const dispatch = useDispatch();
    const getMaintenances = () => {
        httpClient.get('/maintenance').then(
            response => {
                dispatch(setMaintenances(response.data));
            }
        )
    }

    useEffect(() => getMaintenances()
        , [])
    const maintenances = useSelector(state => state.maintenancesReducer.maintenances);

    return (
        <>
            <Header/>

            <Container fluid>
                <Row>
                    <div className="col m-0 p-0">
                        <Card className="shadow">
                            <CardHeader className="border-0">
                                <h3 className="border-0 text-center">LISTE DES MAINTENANCES
                                    <MaintenanceCuModal type="add"
                                                     titleValue=""/>
                                </h3>

                            </CardHeader>
                            <Table className="align-items-center table-flush" responsive>
                                <thead className="thead-light">
                                <tr>
                                    <th scope="col">Référence</th>
                                    <th scope="col">Pièce à échanger</th>
                                    <th scope="col">Date d'intervention</th>
                                    <th scope="col">Tache affectée</th>
                                    <th scope="col">Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    maintenances.map(maintenance => (
                                        <tr key={maintenance.id}>
                                            <td>{maintenance.reference}</td>
                                            <td>{maintenance.exchangePiece}</td>
                                            <td>{new Date(maintenance.interventionDate).toLocaleDateString()}</td>
                                            <td>{maintenance.affectedTask}</td>
                                            <td>
                                                <td>
                                                    {/*<ThematicDeleteModal id={thematic.id}*/}
                                                    {/*                     getThematics={getThematics}/>*/}
                                                    <MaintenanceCuModal type="edit" id={maintenance.id}
                                                                     reference={maintenance.reference}
                                                                        exchangePiece={maintenance.exchangePiece}
                                                                        interventionDate={maintenance.interventionDate}
                                                                        affectedTask={maintenance.affectedTask}
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

export default MaintenanceList;
