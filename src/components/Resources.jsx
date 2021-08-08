import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import {  fetchResources } from '../API'

import { Container, Row, Col} from 'react-bootstrap'

const Resources = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(fetchResources());
    }, []); // eslint-disable-line

    const allResources = useSelector(state => state.resources.resources);

    return (
        <div>
            {typeof allResources !== 'undefined' && allResources.length && (
            <Container>
                <Row className="justify-content-center">
                    {allResources.map((items, index) => {
                        return (
                            <Col sm={12} md={4} key={index} className="text-center py-4 px-3"
                            onClick={() => history.push(`/resources/${items.id}`)}>
                                <div style={{backgroundColor: `${items.color}`, height: 300, cursor: "pointer"}} className="d-flex align-items-center justify-content-center">
                                    <div>
                                        <h3 className="py-3 fw-bold">{items.name}</h3>
                                        <h3 className="py-3 fw-bold">{items.year}</h3>
                                    </div>
                                </div>
                            </Col>
                        )
                    })}
                </Row>
            </Container>
            )}
        </div>
    )
}

export default Resources
