import React, {useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { fetchResourcesById } from '../API'

import { Container, Row, Col} from 'react-bootstrap'

const SingleResources = () => {
    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        dispatch(fetchResourcesById(id));
      }, [id]); // eslint-disable-line

    const singleResources = useSelector(state => state.resources.resources.data)
    
    return (
        <div>
            {typeof singleResources !== 'undefined' && (
            <Container>
                <Row className="justify-content-center">
                    <Col sm={12} md={6} className="text-center py-4 px-3">
                        <div style={{backgroundColor: `${singleResources.color}`, height: 500, cursor: "pointer"}} className="d-flex align-items-center justify-content-center">
                            <div>
                                <h2 className="py-3 fw-bold">{singleResources.name}</h2>
                                <h2 className="py-3 fw-bold">{singleResources.year}</h2>
                                <p className="text-start m-0 pt-3">pantone_value</p>
                                <h1>{singleResources.pantone_value}</h1>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
            )}
        </div>
    )
}

export default SingleResources;
