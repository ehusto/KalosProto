// File: src/components/CustomerDetailPage.js
import React from "react";
// useParams is a "hook" from react-router-dom that lets us read the URL parameters.
import { useParams, Link } from "react-router-dom";

function CustomerDetailPage() {
  // This hook gives us an object with all URL params. We are getting the "id".
  // The name "id" matches the ":id" we will set in our router.
  const { id } = useParams();

  // IMPORTANT: For now, we have to redefine the data here.
  // Later, we will fetch this data from a single source (an API).
  const customers = [
    {
      id: 1,
      name: "John Doe",
      company: "Doe Enterprises",
      email: "john.doe@example.com",
      phone: "555-1111",
      address: "123 Main St",
    },
    {
      id: 2,
      name: "Jane Smith",
      company: "Smith Solutions",
      email: "jane.smith@example.com",
      phone: "555-2222",
      address: "456 Oak Ave",
    },
    {
      id: 3,
      name: "Peter Jones",
      company: "Jones & Co.",
      email: "peter.jones@example.com",
      phone: "555-3333",
      address: "789 Pine Ln",
    },
  ];

  // Find the specific customer from the array whose ID matches the one from the URL.
  // We use parseInt() because the 'id' from useParams is a string, but our data ID is a number.
  const customer = customers.find((c) => c.id === parseInt(id));

  // What if the user types a URL with an ID that doesn't exist? Show a "not found" message.
  if (!customer) {
    return <h2>Customer not found!</h2>;
  }

  const detailStyles = {
    padding: "20px",
    textAlign: "left",
    maxWidth: "600px",
    margin: "0 auto",
  };

  return (
    <div style={detailStyles}>
      <h1>{customer.name}</h1>
      <p>
        <strong>Company:</strong> {customer.company}
      </p>
      <p>
        <strong>Email:</strong> {customer.email}
      </p>
      <p>
        <strong>Phone:</strong> {customer.phone}
      </p>
      <p>
        <strong>Address:</strong> {customer.address}
      </p>
      <hr />
      <Link to="/customers">← Back to Customer List</Link>
    </div>
  );
}

export default CustomerDetailPage;
