import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../userContext";
import { toast } from "react-toastify";

const ViewProducts = () => {
  const { user } = useUser(); 
  const [products, setProducts] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [editingProduct, setEditingProduct] = useState(null); 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const userId = user._id; 
        const response = await axios.get(
          `http://localhost:5001/api/v2/product/products/${userId}`
        );

        if (response.status === 200) {
          setProducts(response.data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [user]);

  // Function to delete a product
  const handleDelete = async (productId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5001/api/v2/product/delete/${productId}`
      );
      if (response.status === 200) {
        toast.success("Product deleted successfully");
        setProducts(products.filter((product) => product._id !== productId)); // Update the UI
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product. Please try again.");
    }
  };

  // Function to save edited product
  const handleSaveEdit = async (product) => {
    try {
      const response = await axios.put(
        `http://localhost:5001/api/v2/product/update/${product._id}`,
        product
      );
      if (response.status === 200) {
        toast.success("Product updated successfully");
        setProducts(
          products.map((p) => (p._id === product._id ? response.data : p))
        );
        setEditingProduct(null); 
      }
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Failed to update product. Please try again.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container my-5">
      <h2>Your Products</h2>
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="row">
          {products.map((product) => (
            <div key={product._id} className="col-md-4 mb-4">
              <div className="card">
                <div className="card-body">
                  {editingProduct && editingProduct._id === product._id ? (
                    // Edit Mode
                    <>
                      <input
                        type="text"
                        value={editingProduct.productname}
                        onChange={(e) =>
                          setEditingProduct({
                            ...editingProduct,
                            productname: e.target.value,
                          })
                        }
                        className="form-control mb-2"
                      />
                      <textarea
                        value={editingProduct.description}
                        onChange={(e) =>
                          setEditingProduct({
                            ...editingProduct,
                            description: e.target.value,
                          })
                        }
                        className="form-control mb-2"
                      />
                      <input
                        type="number"
                        value={editingProduct.quantity}
                        onChange={(e) =>
                          setEditingProduct({
                            ...editingProduct,
                            quantity: e.target.value,
                          })
                        }
                        className="form-control mb-2"
                      />
                      <input
                        type="number"
                        value={editingProduct.rate}
                        onChange={(e) =>
                          setEditingProduct({
                            ...editingProduct,
                            rate: e.target.value,
                          })
                        }
                        className="form-control mb-2"
                      />
                      <button
                        className="btn btn-success mt-2"
                        onClick={() => handleSaveEdit(editingProduct)}
                      >
                        Save
                      </button>
                      <button
                        className="btn btn-secondary mt-2 ms-2"
                        onClick={() => setEditingProduct(null)}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    // View Mode
                    <>
                      <h5 className="card-title">{product.productname}</h5>
                      <p className="card-text">Description: {product.description}</p>
                      <p className="card-text">Quantity: {product.quantity}</p>
                      <p className="card-text">Rate: ${product.rate}</p>
                      <button
                        className="btn btn-danger mt-2"
                        onClick={() => handleDelete(product._id)}
                      >
                        Delete
                      </button>
                      <button
                        className="btn btn-primary mt-2 ms-2"
                        onClick={() => setEditingProduct(product)}
                      >
                        Edit
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewProducts;
