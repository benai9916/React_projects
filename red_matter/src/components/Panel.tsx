import React, {useState, useRef, useEffect, FunctionComponent} from 'react'
import {Container, Row, Col, Button} from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux";

import { drawRectangle, addColor } from '../store/slice/addRectangle';
import {RootState} from '../store/index';

import Canvas from './Canvas'

const Panel: FunctionComponent = () => {
    const [id, seId] = useState<number>(1);
    const inputRef = useRef<HTMLInputElement>(null);
    const [rectColor, setRectColor] = useState<string>('');
    const dispatch = useDispatch()

    useEffect(() => {
        inputRef?.current?.focus()
    })

    const rect = useSelector((states: RootState) => states.rectangle);


    const addRectangle = () => {
        setRectColor('')
        seId(id + 1)
        dispatch(drawRectangle({
            id: String(id),
            x: Math.floor(Math.random() * 300) + 1,
            y: Math.floor(Math.random() * 300) + 1,
            width: Math.floor(Math.random() * 100) + 1,
            height: Math.floor(Math.random() * 100) + 1,
            color: `#000`,
        }))
    }

    const changeColor = (e: React.ChangeEvent<HTMLInputElement>, id:String) => {
        setRectColor('')
        setRectColor(e.target.value)
            dispatch(addColor({
                id: String(id),
                color: e.target.value
            }))
    }

    return (
        <>
            <Container>
                <Row>
                    <Col sm={4} className="text-center my-auto">
                        <Button className="btn-secondary btn-lg px-4" onClick={() => addRectangle()}>Add Rectangle</Button>
                    </Col>
                    <Col sm={8}>
                        <Canvas rects={rect}/>
                    </Col>
                </Row>
                <Row className="justify-content-center mt-4">
                    <Col sm={5} className="text-center">
                            {rect.list.map((itm, idx) => {
                                return (
                                    <>
                                    <div key={itm.x} className="d-flex my-4">
                                    <h4 key={itm.id} className="pe-5">Rectange {itm.id}</h4>
                                    <input key={itm.color} type="text" name="color" value={itm.color} 
                                    onChange={(e) => changeColor(e, itm.id)} ref={inputRef}/>
                                    </div>
                                    </>
                                )
                                }
                            )}
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Panel
