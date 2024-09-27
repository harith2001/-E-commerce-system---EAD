import React, { useState, useEffect } from 'react';
import { Table, Button, Badge, Container, Tab, Tabs } from 'react-bootstrap';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [csrs, setCsrs] = useState([]);
  const [key, setKey] = useState('vendors'); // To manage active tab

  // Fetch all users and separate Vendors and CSRs
  useEffect(() => {
    const fetchUsers = async () => {
      // Replace with your API call
      const fetchedUsers = [
        { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Vendor', status: 'Active' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'CSR', status: 'Inactive' },
        { id: 3, name: 'Michael Johnson', email: 'michael@example.com', role: 'Vendor', status: 'Active' },
      ];
      setUsers(fetchedUsers);
      
      // Separate vendors and CSRs
      const vendorList = fetchedUsers.filter(user => user.role === 'Vendor');
      const csrList = fetchedUsers.filter(user => user.role === 'CSR');
      setVendors(vendorList);
      setCsrs(csrList);
    };

    fetchUsers();
  }, []);

  const handleDeactivate = (userId) => {
    const updatedUsers = users.map(user =>
      user.id === userId ? { ...user, status: 'Inactive' } : user
    );
    setUsers(updatedUsers);
  };

  const handleActivate = (userId) => {
    const updatedUsers = users.map(user =>
      user.id === userId ? { ...user, status: 'Active' } : user
    );
    setUsers(updatedUsers);
  };

  const handleRemove = (userId) => {
    const updatedUsers = users.filter(user => user.id !== userId);
    setUsers(updatedUsers);
  };

  return (
    <Container className="mt-4">
      <h2>Users</h2>
      <Tabs
        id="user-management-tabs"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
      >
        <Tab eventKey="vendors" title={`Vendors (${vendors.length})`}>
          {vendors.length === 0 ? (
            <p>No vendors found.</p>
          ) : (
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>User ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {vendors.map(user => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      {user.status === 'Active' ? (
                        <Badge bg="success">Active</Badge>
                      ) : (
                        <Badge bg="secondary">Inactive</Badge>
                      )}
                    </td>
                    <td>
                      {user.status === 'Active' ? (
                        <Button
                          variant="warning"
                          className="me-2"
                          onClick={() => handleDeactivate(user.id)}
                        >
                          Deactivate
                        </Button>
                      ) : (
                        <Button
                          variant="success"
                          className="me-2"
                          onClick={() => handleActivate(user.id)}
                        >
                          Activate
                        </Button>
                      )}
                      <Button variant="danger" onClick={() => handleRemove(user.id)}>
                        Remove
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Tab>

        <Tab eventKey="csrs" title={`CSRs (${csrs.length})`}>
          {csrs.length === 0 ? (
            <p>No CSRs found.</p>
          ) : (
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>User ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {csrs.map(user => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      {user.status === 'Active' ? (
                        <Badge bg="success">Active</Badge>
                      ) : (
                        <Badge bg="secondary">Inactive</Badge>
                      )}
                    </td>
                    <td>
                      {user.status === 'Active' ? (
                        <Button
                          variant="warning"
                          className="me-2"
                          onClick={() => handleDeactivate(user.id)}
                        >
                          Deactivate
                        </Button>
                      ) : (
                        <Button
                          variant="success"
                          className="me-2"
                          onClick={() => handleActivate(user.id)}
                        >
                          Activate
                        </Button>
                      )}
                      <Button variant="danger" onClick={() => handleRemove(user.id)}>
                        Remove
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Tab>
      </Tabs>
    </Container>
  );
};

export default ManageUsers;
