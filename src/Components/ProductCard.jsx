 import React, { useEffect } from "react";
 import {useSelector, useDispatch} from 'react-redux';
 import {fetchProductData} from "../features/productSlice";
 import {cartItemActions} from '../features/cartItemSlice'
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol
} from "mdb-react-ui-kit";

export default function ProductCard() {
  const { items, isLoading, error } = useSelector((state) => state.product);
const filteredProducts = useSelector((state) => state.cartItem.filteredProducts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProductData())
  },[dispatch])
  
  useEffect(() => {
    if (items.length > 0) {
      dispatch(cartItemActions.setProducts(items));
    }
  }, [items, dispatch]);
  return (
    
    <div className="m-2">
      
      <MDBContainer fluid>
      <h2 className="text-center my-4">Product List</h2>
        {isLoading && <p>Data Loading...</p>}
        {error && <p>Error:{error}</p>}
        
      <MDBRow className='mb-4 '>
        {filteredProducts.map((product) => (
          <MDBCol size='12' md='6' lg='4' key={product.id} className="mb-4 d-flex">
        <MDBCard className='h-100 d-flex flex-column'>
          <MDBCardImage
            src={product.image}
            position="top"
            alt={product.title}
            style={{ height: "250px", objectFit: "contain" }}
          />
          <MDBCardBody className="d-flex flex-column">
            <MDBCardTitle className="mb-2" style={{ fontSize: "1rem" }}><strong>{product.title}</strong></MDBCardTitle>
            <MDBCardText className="flex-grow-1"
                    style={{
                      fontSize: "0.85rem",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                    }} >
              {product.description}
            </MDBCardText >
            <span><strong>${product.price}</strong></span>
            <MDBBtn className="mt-auto" onClick={() => dispatch(cartItemActions.addCartItem(product))}>Add To Cart</MDBBtn>
          </MDBCardBody>
        </MDBCard>
        </MDBCol>
        ))
      
        }
        </MDBRow>
      </MDBContainer>
    </div>
  );
}

//
