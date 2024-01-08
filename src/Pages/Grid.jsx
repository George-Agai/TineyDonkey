import Attum from '../TineyDonkeyAssets/20231220_114516.jpg'
import WinterSoldier from '../TineyDonkeyAssets/20231220_113933.jpg'
import Teeny from '../TineyDonkeyAssets/20231220_114903.jpg'
import Biggie from '../TineyDonkeyAssets/20231220_113800.jpg'
import StarLord from '../TineyDonkeyAssets/20231220_113148.jpg'
import Velma from '../TineyDonkeyAssets/20231220_113418.jpg'
import Groot from '../TineyDonkeyAssets/20231220_112850.jpg'

function Grid() {
    return (
        <div>
            <main>
                <div className="container">
                    <div className='flex-column-align-center' style={{ width: '100%' }}>
                        <h1 className="main-title">Featured Products</h1>
                        <p className="min-content">Check out latest updates</p>
                    </div>
                    <div className="product-grid">
                        <div className="card">
                            <img src={Attum} alt="Attum" className="card__img" />
                            <div className="card__content flex-column-align-center">
                                <h2 className="card__title">Lorem, ipsum dolor.</h2>
                                <p className="card__price">KSh350.00</p>
                                <button  className='cta-button' style={{padding: '15px 20px'}}>Add to cart</button>
                            </div>
                        </div>

                        <div className="card stacked">
                            <img src={Teeny} alt="Teeny" className="card__img" />
                            <div className="card__content flex-column-align-center">
                                <h2 className="card__title">Ullam, cum ut.</h2>
                                <p className="card__price">KSh315.00</p>
                                <button  className='cta-button' style={{padding: '15px 20px'}}>Add to cart</button>
                            </div>
                        </div>
                        <div className="card stacked">
                            <img src={WinterSoldier} alt="WinterSoldier" className="card__img" />
                            <div className="card__content flex-column-align-center">
                                <h2 className="card__title">Libero, ab dolorem?</h2>
                                <p className="card__price">KSh225.00</p>
                                <button  className='cta-button' style={{padding: '15px 20px'}}>Add to cart</button>
                            </div>
                        </div>
                        <div className="card stacked">
                            <img src={Velma} alt="Velma" className="card__img" />
                            <div className="card__content flex-column-align-center">
                                <h2 className="card__title">Minima, earum ipsam.</h2>
                                <p className="card__price">KSh500.00</p>
                                <button  className='cta-button' style={{padding: '15px 20px'}}>Add to cart</button>
                            </div>
                        </div>
                        <div className="card stacked">
                            <img src={Biggie} alt="Biggie" className="card__img" />
                            <div className="card__content flex-column-align-center">
                                <h2 className="card__title">Odio, nam conse.</h2>
                                <p className="card__price">KSh255.00</p>
                                <button  className='cta-button' style={{padding: '15px 20px'}}>Add to cart</button>
                            </div>
                        </div>
                        <div className="card stacked">
                            <img src={StarLord} alt="StarLord" className="card__img" />
                            <div className="card__content flex-column-align-center">
                                <h2 className="card__title">Quidem, aut!</h2>
                                <p className="card__price">KSh345.00</p>
                                <button  className='cta-button' style={{padding: '15px 20px'}}>Add to cart</button>                           
                            </div>
                        </div>
                        <div className="card stacked">
                            <img src={Groot} alt="Groot" className="card__img" />
                            <div className="card__content flex-column-align-center">
                                <h2 className="card__title">Accusantium, placeat?</h2>
                                <p className="card__price">KSh105.00</p>
                                <button  className='cta-button' style={{padding: '15px 20px'}}>Add to cart</button>
                            </div>
                        </div>

                    </div>

                </div>
            </main>
        </div>
    )
}

export default Grid