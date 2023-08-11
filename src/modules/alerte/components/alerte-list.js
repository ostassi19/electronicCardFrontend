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
import {setAlertes, setMaintenances} from "../actions";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import maintenancesReducer from "../reducer";
import AlerteCuModal from "./alerte-cu-modal";

const AlerteList = () => {
    const dispatch = useDispatch();
    const getAlertes = () => {
        httpClient.get('/alert').then(
            response => {
                dispatch(setAlertes(response.data));
            }
        )
    }

    useEffect(() => getAlertes()
        , [])
    const alertes = useSelector(state => state.alertesReducer.alertes);

    return (
        <>
            <Header/>

            <Container fluid>
                <Row>
                    <div className="col m-0 p-0">
                        <Card className="shadow">
                            <CardHeader className="border-0">
                                <h3 className="border-0 text-center">LISTE DES ALERTES
                                    <AlerteCuModal type="add"
                                                   titleValue=""/>
                                </h3>

                            </CardHeader>
                            <Table className="align-items-center table-flush" responsive>
                                <thead className="thead-light">
                                <tr>
                                    <th scope="col">Alerte</th>
                                    <th scope="col">Description</th>
                                    <th scope="col">Emplacement</th>
                                    <th scope="col">Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    alertes.map(alerte => (
                                        <tr key={alerte.id}>
                                            <td>{alerte.alert}</td>
                                            <td>{alerte.description}</td>
                                            <td>{alerte.location}</td>
                                            <td>
                                                <td>
                                                    {/*<ThematicDeleteModal id={thematic.id}*/}
                                                    {/*                     getThematics={getThematics}/>*/}
                                                    <AlerteCuModal type="edit" id={alerte.id}
                                                                   alert={alerte.alert}
                                                                   description={alerte.description}
                                                                   location={alerte.location}
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

export default AlerteList;
