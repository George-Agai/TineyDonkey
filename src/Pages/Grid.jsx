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
                    <h1 className="main-title">Our Products</h1>
                    <p className="min-content">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores corporis ipsa tempora,
                        blanditiis</p>
                    <div className="product-grid">
                        <div className="card stacked ">
                            <img src={Attum} alt="Attum" className="card__img" />
                            <div className="card__content">
                                <h2 className="card__title">Lorem, ipsum dolor.</h2>
                                <p className="card__price">$325</p>
                                <p className="card__description">Lorem, ipsum dolor.</p>
                            </div>
                        </div>

                        <div className="card stacked">
                            <img src={Teeny} alt="Teeny" className="card__img" />
                            <div className="card__content">
                                <h2 className="card__title">Ullam, cum ut.</h2>
                                <p className="card__price">$315</p>
                                <p className="card__description">Iure, voluptate corrupti.</p>
                            </div>
                        </div>
                        <div className="card stacked">
                            <img src={WinterSoldier} alt="WinterSoldier" className="card__img" />
                            <div className="card__content">
                                <h2 className="card__title">Libero, ab dolorem?</h2>
                                <p className="card__price">$225</p>
                                <p className="card__description">Eveniet, necessitatibus id.</p>
                            </div>
                        </div>
                        <div className="card stacked">
                            <img src={Velma} alt="Velma" className="card__img" />
                            <div className="card__content">
                                <h2 className="card__title">Minima, earum ipsam.</h2>
                                <p className="card__price">$500</p>
                                <p className="card__description">Illo, dolorem magnam?</p>
                            </div>
                        </div>
                        <div className="card stacked">
                            <img src={Biggie} alt="Biggie" className="card__img" />
                            <div className="card__content">
                                <h2 className="card__title">Odio, nam consequatur.</h2>
                                <p className="card__price">$255</p>
                                <p className="card__description">Quos, facere alias.</p>
                            </div>
                        </div>
                        <div className="card stacked">
                            <img src={StarLord} alt="StarLord" className="card__img" />
                            <div className="card__content">
                                <h2 className="card__title">Quidem, aut numquam!</h2>
                                <p className="card__price">$345</p>
                                <p className="card__description">Aliquid, enim ea.</p>
                            </div>
                        </div>
                        <div className="card stacked">
                            <img src={Groot} alt="Groot" className="card__img" />
                            <div className="card__content">
                                <h2 className="card__title">Accusantium, placeat dolores?</h2>
                                <p className="card__price">$105</p>
                                <p className="card__description">Corporis, commodi facilis!</p>
                            </div>
                        </div>

                    </div>

                </div>
            </main>
        </div>
    )
}

export default Grid