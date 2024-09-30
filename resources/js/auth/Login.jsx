import {Row, Col, Card, Form, Button, Alert} from 'react-bootstrap';
import {LoginForm} from "./LoginForm";
import React from "react";

export const Login = () => {
    return (
        <>
            <Row className={"w-100 vh-100 m-0 overflow-hidden mt-8"}>
                <Col className={"d-flex justify-content-center align-items-center"}>
                    <Card className={"overflow-hidden"}
                          style={{
                              maxWidth: '1200px',
                              maxHeight:'1000px',
                              width:'100%',
                              height:'100%',
                              borderRadius: '5px',
                              backgroundColor: 'white'}}>
                        <Row className={"h-100"}>
                            <Col md={7}
                                 className={"login-cover"}>
                            </Col>
                            <Col md={5}
                                 className={"d-flex justify-content-center align-items-center"}>
                                <Row className={"h-100"}>
                                    <Col md={12}
                                         className={"d-flex justify-content-center align-items-end"}>
                                        <div>
                                            <h1 className={"text-black bold"}>INICIAR SESIÓN</h1>
                                        </div>
                                    </Col>
                                    <Col md={12}
                                         className={"d-flex justify-content-center align-items-center"}>
                                        <div style={{ padding: '20px', marginLeft: '20px', fontSize: '19px', color:'#181818' }}>
                                            <p>¡Bienvenido al inicio de sesión!</p>
                                        </div>
                                    </Col>
                                    <Col md={12} >
                                        <LoginForm/>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Card>
                </Col>
                <Col md={12}>
                    <p className={"text-black login-footer"}>© 2024. Todos los derechos reservados.</p>
                </Col>
            </Row>
        </>
    )
}
