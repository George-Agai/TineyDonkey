import { useEffect, useState } from 'react'
import { MdOutlineShoppingBag } from "react-icons/md";

function ExpandedProduct() {
    const [scrolling, setScrolling] = useState(false);

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
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '150vh' }}>
            <nav className={`navbar ${scrolling ? 'scrolled' : ''}`} style={{ border: 'none' }}>
                <section className="flex-justify-content-space-between" style={{ borderBottom: scrolling? 'none' : '1px solid lightgrey' }}>
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
        </div>
    )
}

export default ExpandedProduct