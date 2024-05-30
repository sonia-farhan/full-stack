import React from 'react'
import { useState, useEffect ,useCallback} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import {toast} from 'react-toastify'
import { useCart } from '../context/CartContext'
import SEO from '../component/SEO'
import { Link } from 'react-router-dom'
import LoadSpinner from '../component/LoadSpinner'

const CategoryProduct = () => {
    const params=useParams()
    const [category, setCategory]=useState("")
    const [products, setProducts]=useState([])
    const [loading, setLoading]=useState(false)
    const {slug}= params;
    const [cart, setCart]=useCart()
  
   
    const categoryProduct = useCallback(async () => {
      try {
        setLoading(true)
        const { data } = await axios.get(`/api/v1/product/category-product/${slug}`);
        setLoading(false)
        if (data) {
          setProducts(data?.product);
          setCategory(data?.category);
        } else {
          toast.error('Products Not found');
        }
      } catch (error) {
        setLoading(false)
        console.log(error);
      }
    }, [slug]);

    
      useEffect(()=>{
      if(slug) categoryProduct()
      },[slug, categoryProduct])

  return (
    <>
    <SEO
    title={`${category.name}-Anmol Sweets Bakers  `}
    description={`Buy ${category.mame} for just $${products.price}. Available now at Anmol.`}
    keywords="shopping, ecommerce, buy online, Anmol, Sweets, Grocery, fast food, cake, methaie"
    />
     
     {loading ? (
     <div className='d-flex align-items-center justify-content-center' style={{minHeight:"90vh"}}>
      <LoadSpinner />
     </div>
     ): (
      <div className=" custom-margin" >
      <div className='d-flex align-items-center justify-content-center'>
      <button className='bg-orange-color rounded-4 w-auto border-0  fs-2 text-white fw-bold px-5 py-2 mb-4'> {category?.name}</button></div>
    <div className='px-2 d-flex flex-wrap align-items-center justify-content-center gap-3'>

 {products.map((p, index) => (
            <div className="m-1" key={index}>
              <div
                className="border-0 shadow-lg responsive-card rounded-4"
                style={{ width: "17rem" }}
              >
                <div className="rounded-4" style={{ height: "200px" }}>
                  <img
                    src={p.productImage}
                    className="card-img-top w-100 h-100 img-object-fit "
                    alt={p.name}
                    style={{
                      borderTopLeftRadius: "20px",
                      borderTopRightRadius: "20px",
                    }}
                  />
                </div>

                <div className="bg-white pt-3 pb-2  px-3">
                  <div className="d-flex align-items-center justify-content-between">
                    <h5 className="fw-bold fs-5 mb-0">{p.name}</h5>
                    <p className="fs-6 fw-bold mb-0">
                      RS. <span className="">{p.price}</span>{" "}
                    </p>
                  </div>
                  <div className="d-flex align-itesm-center justify-content-between my-2">
                    <h5 className="fw-bold fs-6 ">
                      <span className="text-warning">Qty:</span> {p.stock}
                    </h5>
                    <button className="px-1 fw-bold  rounded-2 small-font mb-0 bg-success text-white border-0">
                      {" "}
                      {p.status}
                    </button>
                  </div>

                  <p className="mb-0">{p.description.substring(0, 50)}...</p>

                  <div className="d-flex align-items-center justify-content-between pt-2">
                    <Link to={`/product/detail/${p._id}`}>
                      <button className="small-font bg-primary border-0 text-white px-3 py-1 rounded-2 fw-bold text-uppercase">
                        More Details
                      </button>
                    </Link>
                    <button
                      className="small-font bg-danger border-0 text-white px-3 py-1 rounded-2 fw-bold text-uppercase"
                      onClick={() => {
                        setCart([...cart, p]);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, p])
                        );
                        toast.success("Item add Successfully");
                      }}
                    >
                      Add to Cart
                    </button>
                  </div>
                  <p></p>
                </div>
              </div>
            </div>
          ))}
</div>
    </div>
     )}
     
    </>
  )
}

export default CategoryProduct