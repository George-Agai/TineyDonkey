import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdOutlineShoppingBag } from "react-icons/md";
import AvailableProduct from '../Components/AvailableProduct';
//import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { FaDisplay } from 'react-icons/fa6';

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

    const handleUpload = (e) => {
        e.preventDefault()
        const formdata = new FormData()
        formdata.append('image', file)
        axios.post('http://localhost:3000/upload-image', formdata)
            .then((res) => {
                if (res.data.message === "Upload successful") {
                    console.log("Upload successful")
                    setAllProducts(res.data.data)
                }
                else {
                    console.log("Upload failed")
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
        <div className='dashboard-container' style={{paddingBottom: '40px'}}>
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
                        <MdOutlineShoppingBag style={{ color: 'grey', fontSize: '20px', float: 'right', cursor: 'pointer', marginLeft: '30px' }} />
                    </div>
                </section>
            </nav>
            <div className='width100 flex-justify-content-space-between' style={{display: 'flex'}}>
                <div style={{ width: '40%', border: '2px solid rgb(231, 230, 230)', marginRight: '20px', height: '70vh' }} className='flex-align-center-justify-center'>
                    <form onSubmit={handleUpload} className=' add-product-form'>
                        <h3>Add a figurine</h3>
                        <label htmlFor='image'>Image*</label>
                        <input type="file" id='image' required='true' onChange={e => setFile(e.target.files[0])} />

                        <label htmlFor='name'>Name*</label>
                        <input placeholder='Name' required='true' id='name' />

                        <label htmlFor='price'>Price*</label>
                        <input placeholder='Amount' type='number' required='true' id='price' />

                        <button type='submit' className='cta-button width100'>Upload</button>
                    </form>
                </div>

                <div style={{ width: '55%', border: '1px solid black', overflowY: 'auto', height: '70vh' }} className=' products-scrollbar'>
                    <h3>All figurines</h3>
                    <AvailableProduct AllProducts={AllProducts}/>
                </div>
            </div>
        </div>
    );
};


export default AddProductDashboard;
