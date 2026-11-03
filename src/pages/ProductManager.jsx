import { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";

const ProductManager = () => {
  const [products, setProducts] = useState(() => {
    const savedProducts = localStorage.getItem("products");

    return savedProducts
      ? JSON.parse(savedProducts)
      : [
          {
            id: 1,
            title: "iPhone",
            price: 50000,
          },
          {
            id: 2,
            title: "Laptop",
            price: 70000,
          },
        ];
  });

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [editId, setEditId] = useState(null);

  const titleRef = useRef(null);

  // Auto focus using useRef
  useEffect(() => {
    titleRef.current.focus();
  }, []);

  // Save products in LocalStorage
  useEffect(() => {
    localStorage.setItem(
      "products",
      JSON.stringify(products)
    );
  }, [products]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!title.trim()) {
      toast.error("Product Name is required");
      return;
    }

    if (title.trim().length < 3) {
      toast.error(
        "Product Name must be at least 3 characters"
      );
      return;
    }

    if (!price) {
      toast.error("Price is required");
      return;
    }

    if (Number(price) <= 0) {
      toast.error(
        "Price must be greater than 0"
      );
      return;
    }

    // Update Product
    if (editId) {
      setProducts(
        products.map((item) =>
          item.id === editId
            ? {
                ...item,
                title,
                price: Number(price),
              }
            : item
        )
      );

      toast.success("Product Updated");

      setEditId(null);
    }

    // Add Product
    else {
      const newProduct = {
        id: Date.now(),
        title,
        price: Number(price),
      };

      setProducts([
        ...products,
        newProduct,
      ]);

      toast.success("Product Added");
    }

    setTitle("");
    setPrice("");
  };

  const handleDelete = (id) => {
    setProducts(
      products.filter(
        (item) => item.id !== id
      )
    );

    toast.success("Product Deleted");
  };

  const handleEdit = (product) => {
    setTitle(product.title);
    setPrice(product.price);
    setEditId(product.id);

    titleRef.current.focus();
  };

  return (
    <div className="manage-page">
      <h1>Product CRUD</h1>

      <form
        onSubmit={handleSubmit}
        className="crud-form"
      >
        <input
          ref={titleRef}
          type="text"
          placeholder="Product Name"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) =>
            setPrice(e.target.value)
          }
        />

        <button type="submit">
          {editId
            ? "Update Product"
            : "Add Product"}
        </button>
      </form>

      <div className="crud-list">
        {products.map((product) => (
          <div
            key={product.id}
            className="crud-card"
          >
            <h3>{product.title}</h3>

            <p>
              ₹
              {product.price.toLocaleString(
                "en-IN"
              )}
            </p>

            <div className="crud-buttons">
              <button
                onClick={() =>
                  handleEdit(product)
                }
              >
                Edit
              </button>

              <button
                onClick={() =>
                  handleDelete(product.id)
                }
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductManager;