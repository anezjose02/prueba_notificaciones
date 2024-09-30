import {Button, Col, Container, Row} from "react-bootstrap";
import {MegaMenu} from "primereact/megamenu";
import {Outlet, useNavigate, useLocation, useParams, matchPath} from "react-router-dom";
import {SwalReact} from "../utils/SwalConfig";
import {useRoute} from "../../router/AdminRouterContext";
import {useHeaderContext} from "../../context/HeaderContext";
import {Footer} from "./Footer";
import {useFetchQuery} from "../hooks/UseFetchQuery";
import {useEffect, useState} from 'react';
import { FaBars } from 'react-icons/fa';

export const AdminLayout = () => {
    const {headerTitle} = useHeaderContext();
    const routeData = useRoute();
    const navigate = useNavigate();
    const routeParams = useParams();
    const location = useLocation();

    let params = {};

    const authUserQuery = useFetchQuery('admin.users.getAuthUser', params, 'authUser');

    useEffect(() => {
        if (authUserQuery.isFetched) {
            const user = authUserQuery?.data?.user;
            if (user.user_rol_id === 2) {
                SwalReact.fire({
                    icon: 'error',
                    title: '¡Acceso denegado!',
                    text: 'No tiene permisos para acceder a esta página.',
                    showConfirmButton: true,
                    confirmButtonText: 'Volver al inicio',
                    heightAuto: false
                }).then(() => {
                    navigate('/employess/login');
                });
            }
        }
    }, [authUserQuery.isFetched, authUserQuery?.data?.user, navigate]);

    const items = [
        {
            label: !isSidebarCollapsed && <label className={'text-white'}>Dashboard</label>,
            icon: <img src={'/assets/Administrador/icons/dashboard.svg'} className={'sidebar-icon'}/>,
            command: () => {
                navigate(`/admin/dashboard`, {replace: true});
            },
            style: {backgroundColor: location.pathname.startsWith('/admin/dashboard') ? '#EC1C24' : ''}
        },
        {
            label: <label className={'text-white'}>Usuarios</label>,
            icon: <img src={'/assets/Administrador/icons/users.svg'} className={'sidebar-icon'}/>,
            command: () => {
                navigate(`/admin/users`, {replace: true});
            },
            style: {backgroundColor: location.pathname.startsWith('/admin/users') ? '#EC1C24' : ''}
        },
        {
            label: <label className={'text-white'}>Tareas</label>,
            icon: <img src={'/assets/Administrador/icons/alert.svg'} className={'sidebar-icon'}/>,
            command: () => {
                navigate(`/admin/tasks`, {replace: true});
            },
            style: {backgroundColor: location.pathname.startsWith('/admin/tasks') ? '#EC1C24' : ''}
        },
    ];

    const getCurrentRouteMetadata = () => {
        const path = Object.keys(routeData).find(path =>
            matchPath(
                { path, exact: true, strict: true },
                location.pathname,
            )
        );
        return path ? routeData[path] : null;
    };

    const getParentRouteUrl = (parentRoute) => {
        let url = parentRoute;
        for (const param in routeParams) {
            url = url.replace(`:${param}`, routeParams[param]);
        }
        return url;
    };

    const metadata = getCurrentRouteMetadata();
    const parentRoute = metadata ? getParentRouteUrl(metadata.parent) : null;

    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarCollapsed(!isSidebarCollapsed);
    };


    const handleLogout =  () => {
        try {
            SwalReact.fire({
                title: '<div class="text-black-input">Cierre de sesión</div>',
                text: '¿Estás seguro de que deseas cerrar sesión?',
                showConfirmButton: true,
                confirmButtonText: 'Cerrar sesión',
                showCancelButton: true,
                cancelButtonText: 'Cancelar',
            }).then(async (result) => {
                if (result.isConfirmed) {
                    axios.post(route("admin.auth.logout"))
                        .then(response => {
                            window.location.replace('/');
                        })
                        .catch(error => {
                            console.error(error);
                        });
                }
            })

        } catch (error) {
            SwalReact.fire({
                icon: 'error',
                title: '¡Error!',
                text: 'Error al cerrar sesión: '+ error,
                showConfirmButton: false,
                timer: 2000,
            }).then(() => {
                window.location.replace('/admin/dahboard');
            })
        }
    };

    return (
        <Container fluid className={`h-screen m-0 p-0 overflow-x-hidden ${isSidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
            <Row className='hh-100'>
                <Col xs={isSidebarCollapsed ? 1 : 2} className='p-0 h-screen bg-black-dark sticky top-0 flex flex-column'>
                    <div className={"sidebar-header px-4"}>
                        <button onClick={toggleSidebar} className='menu-icon-button'>
                            <FaBars size={30} color="white"/>
                        </button>
                    </div>

                    {!isSidebarCollapsed && (
                        <MegaMenu
                            model={items}
                            orientation="vertical"
                            className={"px-2 pt-0 bg-black-dark sidebar-menu overflow-y-auto"}
                        />
                    )}

                    <div className='mt-auto px-2'>
                        <Button className={'bg-black-dark logout-btn'} onClick={handleLogout}>
                            <img src={'/assets/Administrador/icons/logout.svg'} className={'sidebar-icon'}/>
                            {!isSidebarCollapsed && 'Cerrar sesión'}
                        </Button>
                    </div>
                </Col>

                <Col xs={isSidebarCollapsed ? 11 : 10}>
                    <Row className='justify-content-end'>
                        <Col xs={12} className={'center-content header-user'}>
                            <img src={authUserQuery.data?.user?.image?.url} className={'header-avatar'}/>
                            {!isSidebarCollapsed && (
                                <div style={{ display: 'block' }}>
                                    <h2 style={{ fontSize: '1rem', margin: 0 }}>{authUserQuery.data?.user?.name}</h2>
                                </div>
                            )}
                        </Col>

                        <Col xs={12} className={'center-content header-title mt-2 padding-table'}>
                            {metadata?.parent !== "#" && (
                                <img
                                    src={'/assets/Administrador/icons/arrow-left.svg'}
                                    className={'header-icon'}
                                    onClick={() => navigate(parentRoute, { replace: true })}/>
                            )}
                            {metadata?.icon && <img src={metadata?.icon} className='title-icon'/>}
                            <h1 style={{fontSize: '30px', margin: '0px', color:'black'}}>
                                {metadata?.title} {headerTitle && ` - ${headerTitle}`}
                            </h1>
                        </Col>
                    </Row>

                    <Row className='justify-content-center margin-content'>
                        <div className={'module-container'}>
                            <Outlet/>
                            <Footer/>
                        </div>
                    </Row>
                </Col>
            </Row>
        </Container>


    );
}
