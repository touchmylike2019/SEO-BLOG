
const Lab = () => {
    return (
        <div>
            <header>
                <div className="container">
                    <nav className="nav d-flex">
                        <a href="#" className="logo">
                            BESTCULLING BLOG
                    </a>
                        <div className="burger">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                        <div className="navigation-bar">
                            <ul>
                                <li><a href="#">About </a></li>
                                <li><a href="#">Services</a></li>
                                <li><a href="#">features</a></li>
                                <li><a href="#">resources</a></li>
                                <li><a href="#" className="btnx">Login</a></li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </header>
            <section className="home">
                <div className="container">
                    <img src="/images/shape1.svg" alt="shape" className="shape shape1" />
                    <img src="/images/shape2.svg" alt="shape" className="shape shape2" />
                    <img src="/images/shape3.svg" alt="shape" className="shape shape3" />
                    <img src="/images/shape4.svg" alt="shape" className="shape shape4" />
                    <img src="/images/shape5.svg" alt="shape" className="shape shape5" />
                    <div className="home-wrapper d-flex">
                        <div className="col-left">
                            <h1>Protect <br />
                                The one You Love</h1>
                                <p>choose suitable life insurance plans <br />
                        as per your need</p>
                        <ul>
                        <li><img src="images/health.svg" alt="health" />Health</li>
                        <li><img src="images/car.svg" alt="car" />Car</li>
                        <li><img src="images/home.svg" alt="Home" />Home</li>
                    </ul>
                            </div>
                        </div>
                    </div>
                    <img src="/images/curve.svg" alt="Curve image" className="curve-image" />
                </section>
                <style jsx>
                    {`
                a {
                    text-decoration: none;
                }  
                .d-flex {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                header {
                    position: relative;
                    height: 83px;
                    width: 100%;
                    line-height: 1.3;
                }
                nav {
                    height: 83px;
                    width: 100%;
                    padding: 20px 0;
                }
                  
                .navigation-bar ul {
                    padding: 0;
                    margin: 0;
                }
                .navigation-bar ul li {
                    display: inline-block;
                    margin: 0 25px;
                }
                .navigation-bar ul li:last-child {
                    margin-right: 0px;
                  }
                  .navigation-bar ul li a {
                    font-size: 14px;
                    color: #222222;
                    font-weight: normal;
                    text-transform: capitalize;
                    transition: all 0.3s ease-in-out;
                  }
                .navigation-bar ul li a:hover {
                    color: #00c894;
                }
                .navigation-bar ul li a.btnx {
                    display: inline-block;
                    padding: 10px 28px;
                    border-radius: 5px;
                    background-color: #d9fce7;
                    font-weight: normal;
                    font-weight: 600;
                    color: #00c894;
                  }
                  .navigation-bar ul li a.btnx:hover {
                    background-color: #00c894;
                    color: #fff;
                  }
                  .home {
                    position: relative;
                    height: 100%;
                    min-height: 90vh;
                  }
                  .home-wrapper {
                    height: 100%;
                    min-height: 90vh;
                    flex-wrap: wrap;
                  }
                  .home .col-left {
                    width: 50%;
                  }
                  .home .home-image {
                    width: 50%;
                    text-align: right;
                  }
                  
                  .col-left h1 {
                    font-size: 40px;
                    font-weight: 800;
                    line-height: 50px;
                    color: #222;
                    margin-bottom: 20px;
                  }
                  col-left p {
                    font-weight: normal;
                    font-size: 15px;
                    color: #636363;
                    margin-bottom: 50px;
                  }
                  .col-left ul {
                    padding: 0px;
                    margin: 0px;
                  }
                  .col-left ul li {
                    list-style: none;
                    font-weight: normal;
                    font-size: 15px;
                    line-height: normal;
                    color: #636363;
                    margin-bottom: 20px;
                  }
                  .col-left ul li img {
                    vertical-align: bottom;
                    margin-right: 10px;
                  }
                  .btn-section {
                    justify-content: flex-start;
                    margin-top: 40px;
                  }
                  
                  .btn-section .btn-start {
                    display: inline-block;
                    padding: 10px 20px;
                    font-weight: 600;
                    font-size: 16px;
                    line-height: normal;
                    color: #fff;
                    background-color: #00c894;
                    text-transform: capitalize;
                    box-shadow: 0px 4px 15px rgba(0, 200, 148, 0.15);
                    border-radius: 3px;
                  }
                  .btn-section .btn-play {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin-left: 26px;
                    color: #222;
                    font-size: 16px;
                    line-height: normal;
                    text-transform: capitalize;
                  }
                  .btn-section .btn-play span {
                    margin-right: 18px;
                  }
                  .curve-image {
                    position: absolute;
                    top: auto;
                    bottom: -18px;
                    left: 0;
                  }
                  
                  .shape {
                    position: absolute;
                  }
                  
                  .shape1 {
                    top: 15%;
                  }
                  .shape2 {
                    top: 20%;
                    left: 50%;
                  }
                  .shape3 {
                    top: 45%;
                    left: 40%;
                  }
                  .shape4 {
                    top: 78%;
                    left: 25%;
                  }
                  .shape5 {
                    top: 70%;
                    left: 55%;
                  }
            `}
                </style>
        </div>
    )
}

export default Lab