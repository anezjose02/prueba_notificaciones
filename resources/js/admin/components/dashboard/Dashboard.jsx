import { Col, Container, Row } from "react-bootstrap";
import { StatCard } from "./StatCard";
import { useFetchQuery } from "../../hooks/UseFetchQuery";

export const Dashboard = () => {
    let params = {};

    const tasksQuery = useFetchQuery('admin.tasks.completedTasks', params, 'tasks');
    const tasksData = tasksQuery?.data?.tasks || [];
    const colors = {
        color_1: '#EC1C24',
        color_2: '#272727',
        color_3: '#939393',
    }
    const statCards = [
        {
            id: '1',
            text: 'Tareas asignadas',
            value: tasksData?.length,
            color: colors.color_1,
        },
        {
            id: '2',
            text: 'Tareas recibidas',
            value: tasksData.filter(task => task.status.name === 'Entregado').length,
            color: colors.color_1,
        },
        {
            id: '3',
            text: 'Tareas Leidas',
            value: tasksData.filter(task => task.status.name === 'Leido').length,
            color: colors.color_1,
        },
        {
            id: '4',
            text: 'Tareas pendientes',
            value: tasksData.filter(task => task.status.name === 'Pendiente').length,
            color: colors.color_2,
        },
        {
            id: '5',
            text: 'Tareas completadas',
            value: tasksData.filter(task => task.status.name === 'Completado').length,
            color: colors.color_2,
        },
        {
            id: '6',
            text: 'Tareas eliminadas',
            value: tasksData.filter(task => task.status.name === 'Eliminado').length,
            color: colors.color_2,
        },
    ];

    const firstRowCards = statCards.slice(0, 3);
    const secondRowCards = statCards.slice(3, 6);

    return (
        <Container fluid>
            <Row gap={4}>
                <Col md={12}>
                    <Row className='mb-4'>
                        {firstRowCards.map(({ text, value, color, id }) => (
                            <Col key={id} md={4} className="mb-4">
                                <StatCard text={text} value={value} color={color} />
                            </Col>
                        ))}
                    </Row>
                </Col>
            </Row>
            <Row gap={4}>
                <Col md={12}>
                    <Row className='mb-4'>
                        {secondRowCards.map(({ text, value, color, id }) => (
                            <Col key={id} md={4} className="mb-4">
                                <StatCard text={text} value={value} color={color} />
                            </Col>
                        ))}
                    </Row>
                </Col>
            </Row>
        </Container>
    );
};
