import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaRegUserCircle } from "react-icons/fa";
import AvailableProduct from '../Components/AvailableProduct';
import imageCompression from 'browser-image-compression';
import { url, testUrl } from "../Constants/url"
import axios from 'axios';


const AddProductDashboard = () => {

    const navigate = useNavigate()
    const countRef = useRef(0);
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

    const readFromLocalStorage = (key) => {
        const value = localStorage.getItem(key);
        return JSON.parse(value);
    };

    const [file, setFile] = useState();
    const [AllProducts, setAllProducts] = useState(null);
    const [scrolling, setScrolling] = useState(false);
    const [Name, setName] = useState();
    const [Price, setPrice] = useState();
    const [token, setToken] = useState(readFromLocalStorage('token'))
    const [imageUploaded, setImageUploaded] = useState(false)
    const [uploading, setUploading] = useState(false)

    const handleUpload = async (e) => {
        e.preventDefault();

        const priceInteger = parseInt(Price, 10);
        const formData = new FormData();

        try {
            setUploading(true)
            // Compress each selected file
            const compressedFiles = await Promise.all(
                Array.from(file).map(async (file) => {
                    const options = {
                        maxSizeMB: 0.1,
                        // maxWidthOrHeight: 800,
                        useWebWorker: true,
                        fileType: 'image/webp',
                    };
                    return await imageCompression(file, options);
                })
            );

            // Append each compressed file to FormData
            compressedFiles.forEach((compressedFile) => {
                formData.append('image', compressedFile);
            });

            formData.append('productName', Name);
            formData.append('price', priceInteger);

            // Log FormData contents
            // for (const [key, value] of formData.entries()) {
            //     if (key === 'image' && value instanceof File) {
            //         console.log(`Key: ${key}`);
            //         console.log(`File Name: ${value.name}`);
            //         console.log(`File Type: ${value.type}`);
            //         console.log(`File Size: ${value.size / 1024} KB`); // Convert size to KB
            //     } else {
            //         console.log(`Key: ${key}, Value: ${value}`);
            //     }
            // }

            // Check the image format and sizes
            // for (let i = 0; i < file.length; i++) {
            //     const image = file[i];
            //     const validFormats = ['image/jpeg', 'image/png', 'image/gif']; // Allowed formats
            //     const maxSize = 7 * 1024 * 1024; // 2 MB in bytes

            //     if (!validFormats.includes(image.type)) {
            //         console.error(`Invalid file format: ${image.name}`);
            //     }

            //     if (image.size > maxSize) {
            //         console.error(`File too large: ${image.name}, Size: ${image.size / 1024} KB`);
            //     }
            // }

            const res = await axios.post(`${url}/uploadProduct`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            console.log(res);
            if (res.data.message === "Upload successful") {
                setAllProducts(res.data.data);
                setName("");
                setPrice("");
                setFile("");
                setUploading(false)
                setImageUploaded(true);
                alert("Product uploaded successfully🎉🎊")
                setTimeout(() => setImageUploaded(false), 3000);
            } else {
                alert("Upload failed");
            }
        } catch (error) {
            console.error("Error during upload:", error);
        }
    };


    useEffect(() => {
        if (countRef.current > 0) return;
        countRef.current += 1;

        const fetchData = async () => {
            try {
                await axios.get(`${url}/authentication`, {
                    headers: {
                        'Authorization': `${token}`,
                    },
                })
                    .then((tokenAuthenticationPayload) => {
                        if (tokenAuthenticationPayload.data.message === 'Access denied. No token provided' || tokenAuthenticationPayload.data.message === 'Invalid token') {
                            navigate('/admin')
                        }
                        else if (tokenAuthenticationPayload.data.message === 'Access granted') {
                            axios.get(`${url}/getProduct`)
                                .then((res) => {
                                    setAllProducts(res.data);
                                })
                                .catch(error => console.log(error))
                        }
                    })
                    .catch(error => console.log(error))
            }
            catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [])

    const handleLogout = () => {
        localStorage.removeItem('token')
        setTimeout(() => {
            navigate('/admin')
        }, 1000)
    }


    return (
        <div className='dashboard-container transition-div' style={{ paddingBottom: '40px' }}>
            <nav className={`navbar ${scrolling ? 'scrolled' : 'scrolled'}`} style={{ border: 'none' }}>
                <section className="flex-justify-content-space-between" style={{ borderBottom: 'none' }}>
                    <p onClick={() => navigate('/')}>TineyDonkey</p>
                    <div className='flex-justify-flex-end navbar-icon-div' style={{ widthead: '15%', paddingRight: '30px' }}>
                        <FaRegUserCircle style={{ color: 'grey', fontSize: '25px', float: 'right', cursor: 'pointer', marginLeft: '30px' }} onClick={handleLogout} />
                    </div>
                </section>
            </nav>
            <div className='width100 flex-justify-content-space-between add-product-main-container' style={{ display: 'flex' }}>
                <div style={{ border: '2px solid rgb(231, 230, 230)' }} className='flex-align-center-justify-center add-figurine-fom-div'>
                    <form onSubmit={handleUpload} className=' add-product-form'>
                        <h3>Add a figurine</h3>
                        <label htmlFor='image'>Image *</label>
                        <input type="file" id='image' required='true' onChange={e => setFile(e.target.files)} multiple />

                        <label htmlFor='name'>Name *</label>
                        <input placeholder='Name' type='text' required='true' id='name' value={Name} onChange={e => setName(e.target.value)} />

                        <label htmlFor='price'>Price *</label>
                        <input placeholder='Amount' type='number' required='true' id='price' value={Price} onChange={e => setPrice(e.target.value)} />

                        <button type='submit' className='cta-button width100'>{uploading ? "Uploading..." : imageUploaded ? "Uploaded" : "Upload"}</button>
                    </form>
                </div>

                <div id="image-preview"></div>

                <div style={{ overflowY: 'auto' }} className='flex-column-align-center products-scrollbar'>
                    <AvailableProduct AllProducts={AllProducts} />
                </div>
            </div>
        </div>
    );
};


export default AddProductDashboard;
