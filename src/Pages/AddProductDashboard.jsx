import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaRegUserCircle } from "react-icons/fa";
import AvailableProduct from '../Components/AvailableProduct';
import axios from 'axios';

const AddProductDashboard = () => {

    const navigate = useNavigate()

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setScrolling(true);
            } else {
                setScrolling(false);
            }
        };
        window.scrollTo(0, 0)

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const [file, setFile] = useState();
    const [AllProducts, setAllProducts] = useState(null);
    const [scrolling, setScrolling] = useState(false);
    const [Name, setName] = useState();
    const [Price, setPrice] = useState();

    const handleUpload = (e) => {
        e.preventDefault()
        const priceInteger = parseInt(Price, 10);
        const formData = new FormData();
        formData.append('image', file);
        formData.append('productName', Name);
        formData.append('price', priceInteger);
        axios.post('http://localhost:3000/upload-image', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then((res) => {
                if (res.data.message === "Upload successful") {
                    console.log("Upload successful")
                    setAllProducts(res.data.data)
                    setName("")
                    setPrice("")
                    setFile("")
                }
                else {
                    console.log("Upload failed")
                    alert("Upload failed")
                }
            })
            .catch(error => console.log(error))
    }
    useEffect(() => {
        axios.get('http://localhost:3000/get-image')
            .then((res) => {
                setAllProducts(res.data);
            })
            .catch(error => console.log(error))
    }, [])


    return (
        <div className='dashboard-container' style={{ paddingBottom: '40px' }}>
            <nav className={`navbar ${scrolling ? 'scrolled' : 'scrolled'}`} style={{ border: 'none' }}>
                <section className="flex-justify-content-space-between" style={{ borderBottom: 'none' }}>
                    <p>TineyDonkey</p>
                    <ul>
                        <li style={{ color: 'grey' }} onClick={() => navigate('/')}>Home</li>
                        <li style={{ color: 'grey' }} onClick={() => navigate('/Products')}>Products</li>
                        <li style={{ color: 'grey' }} onClick={() => navigate('/Contact')}>Contact</li>
                        <li style={{ color: 'grey' }} onClick={() => navigate('/About')}>About</li>
                    </ul>
                    <div className='flex-justify-flex-end navbar-icon-div' style={{ widthead: '15%', paddingRight: '30px' }}>
                        <FaRegUserCircle style={{ color: 'grey', fontSize: '20px', float: 'right', cursor: 'pointer', marginLeft: '30px' }} />
                    </div>
                </section>
            </nav>
            <div className='width100 flex-justify-content-space-between' style={{ display: 'flex' }}>
                <div style={{ width: '40%', border: '2px solid rgb(231, 230, 230)', marginRight: '20px', height: '70vh' }} className='flex-align-center-justify-center'>
                    <form onSubmit={handleUpload} className=' add-product-form'>
                        <h3>Add a figurine</h3>
                        <label htmlFor='image'>Image *</label>
                        <input type="file" id='image' required='true' onChange={e => setFile(e.target.files[0])} />

                        <label htmlFor='name'>Name *</label>
                        <input placeholder='Name' type='text' required='true' id='name' value={Name} onChange={e => setName(e.target.value)} />

                        <label htmlFor='price'>Price *</label>
                        <input placeholder='Amount' type='number' required='true' id='price' value={Price} onChange={e => setPrice(e.target.value)} />

                        <button type='submit' className='cta-button width100'>Upload</button>
                    </form>
                </div>

                <div style={{ width: '55%', overflowY: 'auto', height: '70vh' }} className='flex-column-align-center products-scrollbar'>
                    <h3>All figurines</h3>
                    <AvailableProduct AllProducts={AllProducts} />
                </div>
            </div>
        </div>
    );
};


export default AddProductDashboard;
