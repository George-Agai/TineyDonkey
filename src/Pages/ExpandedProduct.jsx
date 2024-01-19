import { useEffect, useState } from 'react'
import { MdOutlineShoppingBag } from "react-icons/md";
import Attum from '../TineyDonkeyAssets/20231220_114516.jpg'
import Footer from '../Components/Footer';

function ExpandedProduct() {
    const [scrolling, setScrolling] = useState(false);

    const product = [
        {
            image: ["170565244777920231220_111804.jpg", "170565260209220231220_113800.jpg", "170565465898520231207_123915 (2).jpg"],
            price: 300,
            productName: "Iron man"
        }
    ];

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setScrolling(true);
            } else {
                setScrolling(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);









    // const mainImage = document.getElementById("mainImage");
    // const thumbnailContainer = document.getElementById("thumbnailContainer");

    // // Display the first image initially
    // mainImage.src = `http://localhost:3000/Images/${products[0].image[0]}`;

    // // Create thumbnails
    // products[0].image.forEach((img, index) => {
    //     const thumbnail = document.createElement("div");
    //     thumbnail.className = "thumbnail";
    //     thumbnail.style.backgroundImage = `url(http://localhost:3000/Images/${img})`;
    //     thumbnail.addEventListener("click", () => displayImage(index));
    //     thumbnailContainer.appendChild(thumbnail);
    // });

    // // Function to switch the main image
    // function displayImage(index) {
    //     mainImage.src = `http://localhost:3000/Images/${products[0].image[index]}`;
    // }


    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    const handleImageClick = (index) => {
      setSelectedImageIndex(index);
    };
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '150vh', width: '100%' }}>
            <nav className={`navbar ${scrolling ? 'scrolled' : ''}`} style={{ border: 'none' }}>
                <section className="flex-justify-content-space-between" style={{ borderBottom: scrolling ? 'none' : '1px solid lightgrey' }}>
                    <p>TineyDonkey</p>
                    <ul>
                        <li style={{ color: 'grey' }}>Home</li>
                        <li style={{ color: 'grey' }}>Products</li>
                        <li style={{ color: 'grey' }}>Contact</li>
                        <li style={{ color: 'grey' }}>About</li>
                    </ul>
                    <div className='flex-justify-flex-end navbar-icon-div' style={{ width: '15%', paddingRight: '30px' }}>
                        <MdOutlineShoppingBag style={{ color: 'grey', fontSize: '20px', float: 'right', cursor: 'pointer', marginLeft: '30px' }} />
                    </div>
                </section>
            </nav>

            <main>
                {/* <div>
                    <p><span>HOME / FIGURINES / </span>ATTUMA</p>
                    <img src={Attum} alt='Attuma' style={{ maxWidth: '100px' }} />
                </div>
                <div>

                </div> */}
                <div className="product-gallery">
      <div className="main-image-container">
        <img
          src={`http://localhost:3000/Images/${product.image[selectedImageIndex]}`}
          alt="Main Product"
          className="main-image"
        />
      </div>

      <div className="thumbnail-container">
        {product.image.map((image, index) => (
          <img
            key={index}
            src={`http://localhost:3000/Images/${image}`}
            alt={`Thumbnail ${index}`}
            className={`thumbnail ${index === selectedImageIndex ? 'selected' : ''}`}
            onClick={() => handleImageClick(index)}
          />
        ))}
      </div>
    </div>
            </main>
            <Footer />
        </div>
    )
}

export default ExpandedProduct