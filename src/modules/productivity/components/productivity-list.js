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
import { setProductivities} from "../actions";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {Link} from "react-router-dom";
import ProductivityCuModal from "./productivity-cu-modal";
import productivitiesReducer from "../reducer";

const ProductivityList = () => {
    const dispatch = useDispatch();
    const getProductivities = () => {
        httpClient.get('/productivity').then(
            response => {
                dispatch(setProductivities(response.data));
            }
        )
    }

    useEffect(() => getProductivities()
        , [])
    const productivities = useSelector(state => state.productivitiesReducer.productivities);

    return (
        <>
            <Header/>

            <Container fluid>
                <Row>
                    <div className="col m-0 p-0">
                        <Card className="shadow">
                            <CardHeader className="border-0">
                                <h3 className="border-0 text-center">LISTE DES PRODUCTIVITES
                                    <ProductivityCuModal type="add"
                                                         titleValue=""/>
                                </h3>

                            </CardHeader>
                            <Table className="align-items-center table-flush" responsive>
                                <thead className="thead-light">
                                <tr>
                                    <th scope="col">Référence</th>
                                    <th scope="col">Nom article</th>
                                    <th scope="col">Nombre de pièce</th>
                                    <th scope="col">Rendement</th>
                                    <th scope="col">Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    productivities.map(productivity => (
                                        <tr key={productivity.id}>
                                            <td>{productivity.reference}</td>
                                            <td>{productivity.articleName}</td>
                                            <td>{productivity.pieceNumber}</td>
                                            <td>{productivity.yield}</td>
                                            <td>
                                                <td>
                                                    {/*<ThematicDeleteModal id={thematic.id}*/}
                                                    {/*                     getThematics={getThematics}/>*/}
                                                    <ProductivityCuModal type="edit" id={productivity.id}
                                                                         reference={productivity.reference}
                                                                         articleName={productivity.message}
                                                                         pieceNumber={productivity.pieceNumber}
                                                                         yield={productivity.yield}
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

export default ProductivityList;
