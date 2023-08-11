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
import { setWorkPlanifications} from "../actions";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import WorkPlanificationCuModal from "./work-planification-cu-modal";
import workPlanificationsReducer from "../reducer";

const WorkPlanificationList = () => {
    const dispatch = useDispatch();
    const getWorkPlanifications = () => {
        httpClient.get('/workPlanification').then(
            response => {
                dispatch(setWorkPlanifications(response.data));
            }
        )
    }

    useEffect(() => getWorkPlanifications()
        , [])
    const workPlanifications = useSelector(state => state.workPlanificationsReducer.workPlanifications);

    return (
        <>
            <Header/>

            <Container fluid>
                <Row>
                    <div className="col m-0 p-0">
                        <Card className="shadow">
                            <CardHeader className="border-0">
                                <h3 className="border-0 text-center">LISTE DES PLANIFICATION DE TRAVAIL
                                    <WorkPlanificationCuModal type="add"
                                                              titleValue=""/>
                                </h3>

                            </CardHeader>
                            <Table className="align-items-center table-flush" responsive>
                                <thead className="thead-light">
                                <tr>
                                    <th scope="col">Métier</th>
                                    <th scope="col">Plan de travail</th>
                                    <th scope="col">Identité</th>
                                    <th scope="col">Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    workPlanifications.map(workPlanification => (
                                        <tr key={workPlanification.id}>
                                            <td>{workPlanification.job}</td>
                                            <td>{workPlanification.plan}</td>
                                            <td>{workPlanification.identity}</td>
                                            <td>
                                                <td>
                                                    <WorkPlanificationCuModal type="edit" id={workPlanification.id}
                                                                              job={workPlanification.job}
                                                                              plan={workPlanification.plan}
                                                                              identity={workPlanification.identity}
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

export default WorkPlanificationList;
