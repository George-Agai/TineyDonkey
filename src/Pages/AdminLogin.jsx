import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { FaRegUserCircle } from "react-icons/fa";
import Notification from '../Components/Notification';
import { url, testUrl } from "../Constants/url"
import axios from 'axios';

function AdminLogin() {
    const [scrolling, setScrolling] = useState(false);
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [wrongPassword, setWrongPassword] = useState(false)
    const [notificationText, setNotificationText] = useState()
    const navigate = useNavigate()

    const saveToLocalStorage = (key, value) => {
        localStorage.setItem(key, JSON.stringify(value));
    };

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

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const userLoginObject = {
                username: username,
                password: password
            }

            const response = await axios.post(`${url}/login`, userLoginObject);

            if (response) {
                const loginResponseMessage = response.data.message
                const user = response.data.userSpecifics
                const token = response.data.token

                if (token) {
                    saveToLocalStorage('token', token)
                }

                if (loginResponseMessage === "Auth successful") {
                    setTimeout(() => {
                        navigate('/dashboard', { state: { user } })
                    }, 1000);
                }
                else if (loginResponseMessage === "Auth Failed") {
                    setNotificationText("Wrong password")
                    setTimeout(() => {
                        setWrongPassword(true)
                    }, 1000);
                }
                else {
                    console.log('Nothing')
                }
            }
            else if (!response) {
                // setLoadingFlag(false)
                console.log('No response')
            }
        } catch (error) {
            console.error('Error sending data:', error);
        }
    }


    const handleUsernameChange = (e) => {
        setUsername(e.target.value)
        setWrongPassword(false)
    }
    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
        setWrongPassword(false)
    }
    return (
        <div className='flex-align-center-justify-center width100' style={{ height: '90vh', width: '100vw' }}>
            <nav className={`navbar ${scrolling ? 'scrolled' : 'scrolled'}`} style={{ border: 'none' }}>
                <section className="flex-justify-content-space-between" style={{ borderBottom: 'none' }}>
                    <p onClick={() => navigate('/')}>TineyDonkey</p>
                    <ul>
                        <li style={{ color: 'grey' }} onClick={() => navigate('/')}>Home</li>
                        <li style={{ color: 'grey' }} onClick={() => navigate('/products')}>Products</li>
                        <li style={{ color: 'grey' }} onClick={() => navigate('/contact')}>Contact</li>
                        <li style={{ color: 'grey' }} onClick={() => navigate('/about')}>About</li>
                    </ul>
                    <div className='flex-justify-flex-end navbar-icon-div' style={{ widthead: '15%', paddingRight: '30px' }}>
                        <FaRegUserCircle style={{ color: 'grey', fontSize: '20px', float: 'right', cursor: 'pointer', marginLeft: '30px' }} />
                    </div>
                </section>
            </nav>
            <div className='flex-column-align-center login-form-div box-shadow'>
                <form onSubmit={(e) => handleLogin(e)} className='flex-column-align-center'>
                    <label htmlFor='username'>Username</label>
                    <input type="text" required={true} id='username' placeholder='Your username' value={username} onChange={(e) => handleUsernameChange(e)} />
                    {wrongPassword ? <Notification text={notificationText} /> : null}
                    <label htmlFor='password'>Password</label>
                    <input type="password" required={true} id='passsword' placeholder='Password' value={password} onChange={(e) => handlePasswordChange(e)} />
                    <button className='cta-button width100' type='submit'>Login</button>
                </form>
            </div>
        </div>
    )
}

export default AdminLogin