import Link from 'next/link'
import { Container } from 'reactstrap'
import Layout from '../components/Layout'

const Index = () => {
    return (
        <Layout>
            <section className="home">
                <Container>
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
                            <div class="btn-section d-flex">
                                <Link href="/signup">
                                    <a class="btn-start">Get started</a>
                                </Link>
                            </div>
                        </div>
                        <div class="home-image">
                            <img src="images/illustration.svg" alt="home image" />
                        </div>
                    </div>
                </Container>
                <img src="/images/curve.svg" alt="Curve image" className="curve-image" />
            </section>
            <style jsx>
                {`  
                .d-flex {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
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
                    bottom: 0px;
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
        </Layout>
    )
}

export default Index