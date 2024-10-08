import React, { useState, useEffect } from "react";
import {
  Table,
  Dropdown,
  Modal,
  Button,
  Badge,
  Offcanvas,
  Form,
  Col,
  Row,
  Card,
  ListGroup,
} from "react-bootstrap";
import Header from "../Header";
import { getAllOrders } from "../../api/order";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [showProducts, setShowProducts] = useState(null); 
  const [showModal, setShowModal] = useState(false); 
  const [cancelledOrder, setCancelledOrder] = useState(null); 
  const [note, setNote] = useState(""); 

  // Fetch all orders from API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const fetchedOrders = await getAllOrders(); // Use the actual API call
        console.log("all orders", fetchedOrders)
        setOrders(fetchedOrders); // Set the fetched data
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  // Sidebar Overview Data
  const overview = {
    todayOrders: orders.length,
    pendingOrders: orders.filter((order) => order.status === "Pending").length,
    deliveredOrders: orders.filter((order) => order.status === "Completed").length,
    cancelledOrders: orders.filter((order) => order.status === "Cancelled").length,
  };

  // Handle status change
  const handleStatusChange = (order, newStatus) => {
    if (newStatus === "Cancelled") {
      setCancelledOrder(order);
      setShowModal(true);
    } else {
      setOrders(
        orders.map((o) => (o.orderId === order.orderId ? { ...o, status: newStatus } : o))
      );
    }
  };

  // Confirm cancellation
  const handleConfirmCancel = () => {
    setOrders(
      orders.map((o) =>
        o.orderId === cancelledOrder.orderId ? { ...o, status: "Cancelled", note } : o
      )
    );
    setShowModal(false);
    setCancelledOrder(null);
    setNote("");
  };

  // Handle showing products
  const handleShowProducts = (orderId) => {
    setShowProducts(showProducts === orderId ? null : orderId);
  };

  // Change button color based on the status
  const getStatusButtonStyle = (status) => {
    switch (status) {
      case "Delivered":
        return {
          backgroundColor: "#d4edda",
          color: "#155724",
          border: "none",
          borderRadius: "20px",
          width: "120px",
        };
      case "Cancelled":
        return {
          backgroundColor: "#f8d7da",
          color: "#721c24",
          border: "none",
          borderRadius: "20px",
          width: "120px",
        };
      case "Pending":
        return {
          backgroundColor: "#fff3cd",
          color: "#856404",
          border: "none",
          borderRadius: "20px",
          width: "120px",
        };
      case "Confirmed":
        return {
          backgroundColor: "#d1ecf1",
          color: "#0c5460",
          border: "none",
          borderRadius: "20px",
          width: "120px",
        };
      default:
        return {
          backgroundColor: "#f8f9fa",
          color: "#6c757d",
          border: "none",
          borderRadius: "20px",
          width: "120px",
        };
    }
  };

  return (
    <Row className="d-flex" style={{ marginLeft: "200px", padding: "20px" }}>
      {/* Main Content */}
      <Col md={10} className="p-4">
        <Header title="Orders"></Header>
        <Table striped hover responsive>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Created Time</th>
              <th>Customer</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <React.Fragment key={order.orderID}>
                <tr>
                  <td>{order.orderID}</td>
                  <td>{order.createdTime}</td>
                  <td>{order.customerId}</td>
                  <td>
                    <Dropdown>
                      <Dropdown.Toggle
                        style={getStatusButtonStyle(order.status)}
                      >
                        {order.status}
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item
                          onClick={() => handleStatusChange(order, "Pending")}
                        >
                          Pending
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => handleStatusChange(order, "Confirmed")}
                        >
                          Confirmed
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => handleStatusChange(order, "Delivered")}
                        >
                          Delivered
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => handleStatusChange(order, "Cancelled")}
                        >
                          Cancelled
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                  <td>
                    <Button
                      style={{ background: 'none', border: 'none', padding: 0 }}
                      onClick={() => handleShowProducts(order.orderID)}
                    >
                      {showProducts === order.orderID ? (
                        <i style={{color: '#a8a9aa'}} className="bi bi-caret-up-square-fill"></i>
                      ) : (
                        <i style={{color: '#a8a9aa'}} className="bi bi-caret-down-square-fill"></i>
                      )}
                    </Button>
                  </td>
                </tr>
                {showProducts === order.orderID && (
                  <tr>
                    <td colSpan="5">
                      <Table className="table-borderless">
                        <thead className="text-body-secondary">
                          <tr>
                            <th>Image</th>
                            <th>Product ID</th>
                            <th>Product Name</th>
                            <th>Quantity</th>
                            <th>Discount</th>
                            <th>Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          {order.items.map((product) => (
                            <tr key={product.productId}>
                              <td>
                                <img
                                  src={product.image}
                                  alt={product.name}
                                  style={{ width: "50px" }}
                                />
                              </td>
                              <td>{product.productId}</td>
                              <td>{product.productName}</td>
                              <td>{product.quantity}</td>
                              <td>{product.discount}%</td>
                              <td>${product.total}</td>
                            </tr>
                          ))}
                          {/* Order Summary */}
                          <tr className="fw-bold">
                            <td colSpan="4"></td>
                            <td>Subtotal</td>
                            <td>${order.subtotal}</td>
                          </tr>
                          <tr className="fw-bold">
                            <td colSpan="4"></td>
                            <td>Shipping</td>
                            <td>${order.shipping}</td>
                          </tr>
                          <tr className="fw-bold">
                            <td colSpan="4"></td>
                            <td>Discount</td>
                            <td>${order.discount}</td>
                          </tr>
                          <tr className="fw-bold">
                            <td colSpan="4"></td>
                            <td>Total</td>
                            <td>${order.totalPrice}</td>
                          </tr>
                          {order.note && (
                            <tr>
                              <td colSpan="6">
                                <strong>Customer Note:</strong> {order.note}
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </Table>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </Table>
        {/* Cancel Confirmation Modal */}
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Cancel Order</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Are you sure you want to cancel this order?</p>
            <Form.Group controlId="cancelNote">
              <Form.Label>Note:</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button>
            <Button variant="danger" onClick={handleConfirmCancel}>
              Confirm Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      </Col>

      {/* Sidebar Overview */}
      <Offcanvas
        show={true}
        placement="end"
        backdrop={false}
        style={{ width: "200px", backgroundColor: "#cbe2ff" }}
      >
        <Offcanvas.Header>
          <Offcanvas.Title>Overview</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ListGroup variant="flush">
            <ListGroup.Item style={{ backgroundColor: "#cbe2ff" }}>
              Orders Today <br /> <h2>{overview.todayOrders}</h2>
            </ListGroup.Item>
            <ListGroup.Item style={{ backgroundColor: "#cbe2ff" }}>
              Pending <br /> <h2>{overview.pendingOrders}</h2>
            </ListGroup.Item>
            <ListGroup.Item style={{ backgroundColor: "#cbe2ff" }}>
              Delivered <br /> <h2>{overview.deliveredOrders}</h2>
            </ListGroup.Item>
            <ListGroup.Item style={{ backgroundColor: "#cbe2ff" }}>
              Cancelled <br /> <h2>{overview.cancelledOrders}</h2>
            </ListGroup.Item>
          </ListGroup>
        </Offcanvas.Body>
      </Offcanvas>
    </Row>
  );
};

export default Orders;
