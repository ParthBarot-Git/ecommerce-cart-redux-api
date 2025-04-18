import { useSelector, useDispatch } from "react-redux";
import { cartItemActions } from "../features/cartItemSlice";
export default function CartItem() {
  const { cartItems, totalQuantity, totalPrice } = useSelector((state) => state.cartItem);
  const dispatch = useDispatch();

  return (
    <section className="h-100 gradient-custom">
      <div className="container py-5">
        <div className="row d-flex justify-content-center my-4">
          <div className="col-md-8">
            <div className="card mb-4">
              <div className="card-header py-3">
                <h5 className="mb-0">
                  <strong>Your Cart Has - {totalQuantity} items</strong>
                </h5>
              </div>
              {cartItems.map((items) => (
                <div className="card-body" key={items.id}>
                  <div className="row">
                    <div className="col-lg-3 col-md-12 mb-4 mb-lg-0">
                      <div
                        className="bg-image hover-overlay hover-zoom ripple rounded"
                        data-mdb-ripple-color="light"
                      >
                        <img
                          src={items.image}
                          className="w-100"
                          alt="Blue Jeans Jacket"
                        />
                        <a href="#!">
                          <div
                            className="mask"
                            style={{
                              backgroundColor: "rgba(251, 251, 251, 0.2)",
                            }}
                          ></div>
                        </a>
                      </div>
                    </div>

                    <div className="col-lg-5 col-md-6 mb-4 mb-lg-0">
                      <p>
                        <strong>{items.title}</strong>
                      </p>
                      <button
                        onClick={() =>
                          dispatch(cartItemActions.removeCartItem(items.id))
                        }
                        type="button"
                        data-mdb-button-init
                        data-mdb-ripple-init
                        className="btn btn-primary btn-sm me-1 mb-2"
                        data-mdb-tooltip-init
                        title="Remove item"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                      <button
                        type="button"
                        data-mdb-button-init
                        data-mdb-ripple-init
                        className="btn btn-danger btn-sm mb-2"
                        data-mdb-tooltip-init
                        title="Move to the wish list"
                      >
                        <i className="fas fa-heart"></i>
                      </button>
                    </div>

                    <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
                      <div
                        className="d-flex mb-4"
                        style={{ maxWidth: "300px" }}
                      >
                        <button
                          onClick={() =>
                            dispatch(cartItemActions.decreaseCartItem(items.id))
                          }
                          data-mdb-button-init
                          data-mdb-ripple-init
                          className="btn btn-primary px-3 me-2"
                        >
                          <i className="fas fa-minus"></i>
                        </button>

                        <label ><strong>{items.quantity}</strong> </label>

                        <button
                          onClick={() =>
                            dispatch(cartItemActions.incrementCartItem(items.id))
                          }
                          data-mdb-button-init
                          data-mdb-ripple-init
                          className="btn btn-primary px-3 ms-2"
                        >
                          <i className="fas fa-plus"></i>
                        </button>
                      </div>

                      <p className="text-start text-md-center">
                        <strong>${items.totalPrice.toFixed(2)}</strong>
                      </p>
                    </div>
                  </div>

                  <hr className="my-4" />
                </div>
              ))}
            </div>
          </div>
          <div className="col-md-4">
            <div className="card mb-4">
              <div className="card-header py-3">
                <h5 className="mb-0">Summary</h5>
              </div>
              <div className="card-body">
                <ul className="list-group list-group-flush">
                  {cartItems.map((items) =>
                  <li key = {items.id}className="list-group-item d-flex justify-content-between align-items-center px-0">
                    {items.title} ({items.quantity} × ${items.price.toFixed(2)})
                    <span>${items.totalPrice.toFixed(2)}</span>
                  </li>
                  )}
                  <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                    Total Quantity
                    <span>{totalQuantity}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                    <div>
                      <strong>Total amount </strong>
                      <strong>
                        <p className="mb-0">(including VAT)</p>
                      </strong>
                    </div>
                    <span>
                      <strong>${totalPrice.toFixed(2)}</strong>
                    </span>
                  </li>
                 
                </ul>

                <button
                  type="button"
                  data-mdb-button-init
                  data-mdb-ripple-init
                  className="btn btn-primary btn-lg btn-block"
                >
                  Go to checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
