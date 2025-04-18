import React from "react";
import { Link } from "react-router-dom";
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBInputGroup,
  MDBBtn,
} from "mdb-react-ui-kit";
import { useSelector, useDispatch } from "react-redux";
import { cartItemActions } from "../features/cartItemSlice";
import ProductCard from "./ProductCard";

export default function Navbar() {
  const { totalQuantity, searchProduct, sortProduct } = useSelector(
    (state) => state.cartItem
  );
  const dispatch = useDispatch();

  return (
    <MDBNavbar light bgColor="light">
      <MDBContainer fluid>
        <MDBNavbarBrand>
          <strong>WELCOME, NEW ITEMS!</strong>
        </MDBNavbarBrand>
        <span className='me-3'>
          <Link to="/">
            <strong>All Products</strong>
          </Link>
        </span>

        <form className="d-flex input-group w-auto">
          <input
            type="search"
            className="form-control rounded"
            placeholder="Search"
            aria-label="Search"
            aria-describedby="search-addon"
            value={searchProduct}
            onChange={(e) =>
              dispatch(cartItemActions.searchProductsItem(e.target.value))
            }
          />
         
            <MDBBtn className='ms-2'>Search</MDBBtn>
          
          <span>
            <div className="ms-3">
              <select
                className="form-select"
                value={sortProduct}
                onChange={(e) =>
                  dispatch(cartItemActions.sortingProducts(e.target.value))
                }
              >
                <option value="asc">Price Low to High</option>
                <option value="dsc">Price High to Low</option>
              </select>
            </div>
          </span>
        </form>

        <Link to="/cart">
          <MDBBtn color="dark">Cart({totalQuantity})</MDBBtn>
        </Link>
      </MDBContainer>
    </MDBNavbar>
  );
}
