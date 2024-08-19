import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {Bar} from 'react-chartjs-2'
import {Chart as ChartJS,CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend} from 'chart.js'
import 'bootstrap/dist/css/bootstrap.min.css'

ChartJS.register(CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend)

const AdminDashboard = () => {

    const[orders,setOrders]=useState([])
    const[products,setProducts]=useState([])
    const[totalRevenue,setTotalRevenue]=useState(0)
    const[totalOrders,setTotalOrders]=useState(0)
    const[totalUsers,setTotalUsers]=useState(0)
    const[topCustomer,setTopCustomer]=useState(null)
    const[chartData,setChartData]=useState({
        labels:[],
        datasets:[]
    });

    const  [editProduct, setEditProduct]=useState(null)
    const [editOrder,setEditOrder]=useState(null)

    const[countrySalesData,setCountrySalesData]=useState({
        labels:[],
        datasets:[]
    })

    const[orderChartData,setOrderChartData]=useState({
        labels:[],
        datasets:[]
    })

    useEffect(() =>{
        const fetchData=async() =>{
            try{
                const[ordersRes,productsRes,revenueRes,totalOrdersRes,totalUsersRes,countrySalesRes]= await Promise.all([
                    axios.get('http://localhost:5000/api/admin/orders'),
                    axios.get('http://localhost:5000/api/admin/products'),
                    axios.get('http://localhost:5000/api/admin/revenue'),
                    axios.get('http://localhost:5000/api/admin/total-orders'),
                    axios.get('http://localhost:5000/api/admin/total-users'),
                    axios.get('http://localhost:5000/api/admin/sales-by-country')
                ]) 


                const orderDates=ordersRes.data.map(order=> new Date(order.createdAt))
                const orderCounts=ordersRes.data.map(order => order.totalPrice)

                setOrderChartData({
                    labels:orderDates,
                    datasets:[{
                        label:'Orders Over Time',
                        data:orderCounts,
                        backgroundColor:'#FF6384'
                    }]
                })
                setOrders(ordersRes.data)
                setProducts(productsRes.data)
                setTotalRevenue(revenueRes.data.totalRevenue)
                setTotalOrders(totalOrdersRes.data.totalOrders)
                setTotalUsers(totalUsersRes.data.totalUsers)
                updateCharts(totalOrdersRes.data.totalOrders,revenueRes.data.totalRevenue)
                 
                const countries=countrySalesRes.data.map(sale => sale._id);
                const sales=countrySalesRes.data.map(sale => sale.totalSales)

                setCountrySalesData({
                    labels:countries,
                    datasets:[{
                        label:'Sales by Country',
                        data:sales,
                        backgroundColor:'#36A2Eb'
                    }]
                })

                const customerSpending={};
                ordersRes.data.forEach(order =>{
                    const {email,totalPrice} =order;
                    if(customerSpending[email]){
                        customerSpending[email] += totalPrice;
                    }else{
                        customerSpending[email] =totalPrice
                    }
                })

                const topCustomerEmail= Object.keys(customerSpending).reduce((a,b) => customerSpending[a] > customerSpending[b] ? a : b)
                setTopCustomer( {email: topCustomerEmail, totalSpending:customerSpending[topCustomerEmail]});

           
           
           
            }catch(err){
          
          
          
          
                console.error('Error fetching data', err)
            }
        }
        fetchData();
    },[])
    
    const updateCharts=(totalRevenue) =>{
        setChartData({
            labels:['Total Revenue'],
            datasets:[{
                label:'Metrics',
                data:[totalRevenue],
                backgroundColor:'#36A2EB'
            }]
          
        })
    }

    const handleEditOrder = async (id, updatedStatus) => {
        try {
            const response = await axios.put(`http://localhost:5000/api/admin/orders/${id}`, { status: updatedStatus });
            setOrders(orders.map(order => (order._id === id ? { ...order, status: updatedStatus } : order)));
        } catch (err) {
            console.error('Error updating order status', err);
        }
    };
    

   const handleInputChange=(e) =>{
    const{name,value} =e.target;
    setEditProduct({...editProduct,[name]:value})
   }
   const handleEditProduct= async(id,updatesProduct) =>{
    try{
        const response= await axios.put(`http://localhost:5000/api/admin/products/${id}`, updatesProduct)
        setProdcuts(products.map(product => (product._id === id ? response.data: product)))
        setEditProduct(null)
    }catch(err){
        console.error('Error updating product:',err)
    }
   }

   const handleDeleteProduct=async(id)=>{
    try{
        await axios.delete(`http://localhost:5000/api/admin/products/${id}`);
        setProducts(products.filter(product => product._id !== id))
    }catch(err){
        console.error('Error deleting',err)
    }
   }

  return (
   <div className='container-fluid'>
    <div className='row'>
        <div className="col-md-12">
            <h2 className='my-4'>eCommerce Dashboard</h2>
        </div>
    </div>
    <div className='row mb-4'>
        <div className='col-md-4'>
            <div className='card text-white bg-primary'>
                <div className='card-body'>
                    <h5 className='card-title'>New Orders</h5>
                    <p className='card-text'>{totalOrders}</p>

                </div>
            </div>
        </div>
        <div className='col-md-4'>
            <div className='card text-white bg-success'>
                <div className='card-body'>
                    <h5 className='card-title'>Total Income</h5>
                    <p className='card-text'>{totalRevenue}</p>

                </div>
            </div>
        </div>
        <div className='col-md-4'>
            <div className='card text-white bg-warning'>
                <div className='card-body'>
                    <h5 className='card-title'>Total Users</h5>
                    <p className='card-text'>{totalUsers}</p>

                </div>
            </div>
        </div>

    </div>
    <div className="row">
        <div className='col-md-6'>
            <div className='card'>
                <div className="card-body">
                    <h5 className='card-title'>Yearly Stats</h5>
                    {chartData.labels.length > 0 ? (
                        <Bar data={chartData}/>
                    ):(
                        <p>No data available</p>
                    )}
                </div>
            </div>
        </div>
        <div className='col-md-6'>
            <div className='card'>
                <div className="card-body">
                    <h5 className='card-title'>Orders Over Time </h5>
                    {orderChartData.labels.length > 0 ? (
                        <Bar data={orderChartData}/>
                    ):(
                        <p>No data available</p>
                    )}
                </div>
            </div>
        </div>
        <div className='col-md-6'>
            <div className='card'>
                <div className="card-body">
                    <h5 className='card-title'>Products</h5>
                    <ul className='list-group'>
                    {products.length > 0 ? (   
                      products.map(product =>(
                    <li key={product._id} className='list-group-item d-flex justify-content-between align-items-center'>
                        <span>{product.productName} - ${product.price}</span>
                        
                        <div>
                            <button className='btn btn-danger btn-sm float-end ms-2'onClick={() => handleDeleteProduct(product._id)}>Delete</button>
                            <button className='btn btn-primary btn-sm float-end 'onClick={() => setEditProduct(product)}>Edit</button>
                        </div>
                    </li>
                   ))
                   ):(
                    <p>No Products available</p>
                   )}
                   </ul>
                </div>
            </div>
        </div>
    </div>
    <div className='col-md-4'>
        <div className='card'>
            <div className='card-body'>
                <h5 className="card-title">Country-wise Sales</h5>
                {countrySalesData.labels.length > 0? (
                    <Bar data={countrySalesData}></Bar>
                ):(
                    <p>No Data available</p>
                )}
            </div>
        </div>
    </div>
    <div className='row mt-4'>
        <div className='col-md-12'>
            <div className='card'>
                <div className='card-bosy'>
                    <h5 className='card-title'>Orders</h5>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Customer</th>
                                <th>Status</th>
                                <th>Total Price:</th>
                               
                            </tr>
                        </thead>
                        <tbody>
                            {orders.length > 0 ? (
                                orders.map(order =>(
                                    <tr key={order._id}>
                                        <td>{order._id}</td>
                                        <td>{order.email}</td>
                                        <td>
                                            <select
                                              value={order.status}
                                              onChange={(e) => handleEditOrder(order._id,{...order,status:e.target.value})}
                                            >
                                                <option value="pending">Pending</option>
                                                <option value="pending">Shipped</option>
                                                <option value="pending">Delivered</option>
                                                <option value="pending">Cancelled</option>
                                            </select>
                                        </td>
                                        <td>{order.totalPrice}</td>
                                    </tr>
                                ))
                            ):(
                               <tr><td colSpan="5">No orders available</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    {topCustomer && (
        <div className='row mt-4'>
            <div className='col-md-12'>
                <div className='card'>
                    <div className="card-body">
                        <div className='card-title'>Top Customer</div>
                        <p className="card-text">
                            <strong>Email:</strong>{topCustomer.email}<br/>
                            <strong>Total Spending:</strong> ${topCustomer.totalSpending.toFixed(2)}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )}
    {editProduct && (
        <div className='modal fade show' style={{display:'block'}} area-modal="true" role="dialog">
            <div className='modal-dialog'>
                <div className="modal-content">
                    <div className='modal-header'>
                        <h5 className='modal-title'>Edit Prodcut</h5>
                        <button type="button" className='btn-close' onClick={() => setEditProduct(null)}>

                        </button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={(e) =>{
                            e.preventDefault();
                            handleEditProduct(editProduct._id, editProduct)
                        }}>
                            <div className="mb-3">
                                <label htmlFor="name" className='form-label'>Name</label>
                               <input type="text" className='form-control' id="name" name="productName" value={editProduct.productName || ''} onChange={handleInputChange} required></input>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="prive" className='form-label'>Price</label>
                               <input type="text" className='form-control' id="price" name="price" value={editProduct.price || ''} onChange={handleInputChange} required></input>
                            </div>
                            <button type="submit" className="btn btn-primary">Update</button>


                        </form>
                    </div>
                </div>
            </div>
        </div>
    )}
   </div>
  )
}

export default AdminDashboard
