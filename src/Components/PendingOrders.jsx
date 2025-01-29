import { useState } from "react";
import ExpandedPendingOrder from "./ExpandedPendingOrder";

function PendingOrders({ AllProducts }) {
    const [selectedOrder, setSelectedOrder] = useState(null);

    const handleRowClick = (data) => {
        setSelectedOrder(data);
    };

    function calculateTimeDifference(targetTime) {
        const targetDate = new Date(targetTime);
        const currentDate = new Date();
    
        const timeDifference = currentDate - targetDate;
        const secondsDifference = Math.floor(timeDifference / 1000);
        const minutesDifference = Math.floor(secondsDifference / 60);
        const hoursDifference = Math.floor(minutesDifference / 60);
        const daysDifference = Math.floor(hoursDifference / 24);
        const monthsDifference = Math.floor(daysDifference / 30);
        const yearsDifference = Math.floor(daysDifference / 365);
    
        if (secondsDifference < 60) {
            return `${secondsDifference} sec`;
        } else if (minutesDifference < 60) {
            return `${minutesDifference} min${minutesDifference == 1 ? '' : 's'}`;
        } else if (hoursDifference < 24) {
            return `${hoursDifference} hour${hoursDifference == 1 ? '' : 's'}`;
        } else if (daysDifference < 30) {
            return `${daysDifference} day${daysDifference == 1 ? '' : 's'}`;
        } else if (monthsDifference <= 12) {
            return `${monthsDifference} month${monthsDifference == 1 ? '' : 's'}`;
        } else {
            return `${yearsDifference} year${yearsDifference > 1 ? 's' : ''}`;
        }
    }
    

    return (
        <div style={{ width: '100%' }} className="available-product-div">
            <table style={{ width: '100%'}}>
                <thead>
                    <tr style={{ borderTop: '2px solid rgb(231, 230, 230)' }}>
                        <td className='text-align-center'>No</td>
                        <td className='text-align-center'>Bought by</td>
                        <td className='text-align-center quantity-th'>Amount</td>
                        <td className='text-align-center'>Quantity</td>
                        <td className='text-align-center'>Time</td>
                        <td className='text-align-center'>Status</td>
                    </tr>
                </thead>
                <tbody>
                    {AllProducts == null
                        ? "Please wait..."
                        : AllProducts.length == 0 ? "No pending orders" : AllProducts.map((data, index) => (
                            <tr key={data._id} onClick={() => handleRowClick(data)}>
                                <td className='text-align-center'>{index + 1}</td>
                                <td className='text-align-center'>{data.boughtBy}</td>
                                <td className='text-align-center quantity-th'>{data.totalAmount}</td>
                                <td className='text-align-center'>{data.products.length}</td>
                                <td className='text-align-center'>{calculateTimeDifference(data.time)}</td>
                                <td className='text-align-center'>{data.orderStatus === "pending" ? <span style={{color: 'green'}}>Pending</span> : data.orderStatus === "delivered" ? <span>Delivered</span> : <span style={{color: 'red'}}>Rejected</span>}</td>
                            </tr>
                        ))}
                </tbody>
            </table>

            {selectedOrder && (
                <ExpandedPendingOrder data={selectedOrder} onClose={() => setSelectedOrder(null)} />
            )}
        </div>
    )
}

export default PendingOrders