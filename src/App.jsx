// import { Routes, Route } from "react-router-dom";

// import Navbar from "./components/Navbar.jsx";
// import Footer from "./components/Footer.jsx";

// import Home from "./pages/Home.jsx";
// import Products from "./pages/Products.jsx";
// import ProductDetails from "./pages/ProductDetails.jsx";
// import Cart from "./pages/Cart.jsx";
// import About from "./pages/About.jsx";
// import Contact from "./pages/Contact.jsx";
// import ProductManager from "./pages/ProductManager";
// import NotFound from "./pages/NotFound.jsx";

// import Wishlist from "./pages/Wishlist";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import "./App.css";
// import Electronics from "./pages/products/Electronics";
// import Mens from "./pages/products/Mens";
// import Jewellery from "./pages/products/Jewellery";
// import { useContext } from "react";
// import { ThemeContext } from "./context/ThemeContext";



// function App() {
//   const { theme } = useContext(ThemeContext);
//   return (
// <div className={`app ${theme}`}>
//       <Navbar />

//       <div className="container">
//         <Routes>
//           <Route path="/" element={<Home />} />

//           <Route path="/products" element={<Products />}>
//           <Route path="electronics" element={<Electronics />} />
//           <Route path="mens" element={<Mens />} />
//           <Route path="jewellery" element={<Jewellery />} />
//           </Route>

//           <Route
//             path="/product/:id"
//             element={<ProductDetails />}
//           />

//           <Route path="/cart" element={<Cart />} />
//           <Route path="/wishlist" element={<Wishlist />}/>

//           <Route path="/about" element={<About />} />

//           <Route path="/contact" element={<Contact />} />

//           <Route path="/manage" element={<ProductManager />} />

//           <Route path="*" element={<NotFound />} />
          
//         </Routes>
        
        
//       </div>

//       <Footer />
//       <ToastContainer />
      
//     </div>
//   );
// }

// export default App;


import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [editingId, setEditingId] = useState(null);

  const API = "https://jsonplaceholder.typicode.com/users";

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(API);
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email) {
      alert("Please fill all fields");
      return;
    }

    if (editingId) {
      try {
        await axios.put(`${API}/${editingId}`, {
          id: editingId,
          name,
          email,
        });

        setUsers(
          users.map((user) =>
            user.id === editingId
              ? { ...user, name, email }
              : user
          )
        );

        setEditingId(null);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const response = await axios.post(API, {
          name,
          email,
        });

        setUsers([
          ...users,
          {
            ...response.data,
            id: users.length + 1,
          },
        ]);
      } catch (error) {
        console.log(error);
      }
    }

    setName("");
    setEmail("");
  };

  const editUser = (user) => {
    setEditingId(user.id);
    setName(user.name);
    setEmail(user.email);
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);

      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">

      <h1>CRUD Operations with API</h1>

      <form onSubmit={handleSubmit} className="form">

        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button>
          {editingId ? "Update User" : "Add User"}
        </button>

      </form>

      <table>

        <thead>

          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>

        </thead>

        <tbody>

          {users.map((user) => (

            <tr key={user.id}>

              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>

              <td>

                <button
                  className="edit"
                  onClick={() => editUser(user)}
                >
                  Edit
                </button>

                <button
                  className="delete"
                  onClick={() => deleteUser(user.id)}
                >
                  Delete
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default App;