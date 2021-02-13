import { useState } from 'react'
import Link from 'next/link'
import Router from 'next/router'
import { APP_NAME } from '../config'
import { isAuth, signout } from '../actions/auth'
import NProgress from 'nprogress'
import {
    Container,
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
    NavLink,
} from 'reactstrap'


Router.onRouteChangeStart = url => NProgress.start()
Router.onRouteChangeComplete = url => NProgress.done()
Router.onRouteChangeError = url => NProgress.done()

const Header = () => {
    const [isOpen, setIsOpen] = useState(false)

    const toggle = () => {
        setIsOpen(!isOpen)
    }

    return (
        <Container>
            <Navbar className="nav" light expand="md">
                <Link href="/">
                    <NavLink className="font-weight-bold">{APP_NAME}</NavLink>
                </Link>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <>
                            <NavItem>
                                <Link href="/blogs">
                                    <NavLink>บทความ</NavLink>
                                </Link>
                            </NavItem>
                        </>
                        {
                            !isAuth() && (
                                <>
                                    <NavItem>
                                        <Link href="/signin">
                                            <NavLink>เข้าสู่ระบบ</NavLink>
                                        </Link>
                                    </NavItem>
                                    <NavItem>
                                        <Link href="/signup">
                                            <NavLink>สมัครสมาชิก</NavLink>
                                        </Link>
                                    </NavItem>
                                </>
                            )
                        }

                        {isAuth() && isAuth().role === 0 && (
                            <NavItem>
                                <Link href="/user">
                                    <NavLink>{`${isAuth().name}'s Dashboard`}</NavLink>
                                </Link>
                            </NavItem>
                        )}

                        {isAuth() && isAuth().role === 1 && (
                            <NavItem>
                                <Link href="/admin">
                                    <NavLink>{`${isAuth().name}'s Dashboard`}</NavLink>
                                </Link>
                            </NavItem>
                        )}
                        <NavItem>
                            <Link href="/lab">
                                <NavLink>เเลป</NavLink>
                            </Link>
                        </NavItem>

                        {
                            isAuth() && (
                                <NavItem>
                                    <NavLink className="btnx" onClick={() => signout(() => Router.replace(`/signin`))}>ออกจากระบบ</NavLink>
                                </NavItem>
                            )
                        }
                    </Nav>
                </Collapse>
                <style jsx>
                        {`
                        .Component{
                            background-color: red
                            }
                        `}
                </style>
            </Navbar>
        </Container>
    )
}

export default Header