import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import axios from "axios";
import { useUser } from "../userContext";
import { toast } from "react-toastify";

const AddProduct = () => {
  const { user } = useUser();

  const handleSubmit = async (values, { setSubmitting, setErrors, resetForm }) => {
    try {
      if (!user) {
        setErrors({ apiError: "You must be logged in to add a product." });
        return;
      }

      const productData = { ...values, userId: user._id };

      const response = await axios.post("http://localhost:5001/api/v2/product/add-product", productData);

      if (response.status === 201) {
        toast.success("Product added successfully");
        resetForm();
      }
    } catch (error) {
      console.error("Error adding product:", error);
      setErrors({ apiError: error.response?.data?.message || "Error adding product. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container my-5 card p-4 mx-auto" style={{ maxWidth: "600px" }}>
      <h2>Add New Product</h2>

      <Formik
        initialValues={{
          productname: "",
          quantity: "",
          description: "",
          rate: "",
        }}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors }) => (
          <Form>
            <div className="mb-3">
              <label htmlFor="productname" className="form-label">Product Name</label>
              <Field type="text" id="productname" name="productname" className="form-control" />
              <ErrorMessage name="productname" component="div" className="text-danger" />
            </div>

            <div className="mb-3">
              <label htmlFor="quantity" className="form-label">Quantity</label>
              <Field type="number" id="quantity" name="quantity" className="form-control" />
              <ErrorMessage name="quantity" component="div" className="text-danger" />
            </div>

            <div className="mb-3">
              <label htmlFor="description" className="form-label">Description</label>
              <Field as="textarea" id="description" name="description" className="form-control" />
              <ErrorMessage name="description" component="div" className="text-danger" />
            </div>

            <div className="mb-3">
              <label htmlFor="rate" className="form-label">Rate</label>
              <Field type="number" id="rate" name="rate" className="form-control" />
              <ErrorMessage name="rate" component="div" className="text-danger" />
            </div>

            {errors.apiError && <div className="text-danger mb-3">{errors.apiError}</div>}

            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              {isSubmitting ? "Adding..." : "Add Product"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddProduct;
