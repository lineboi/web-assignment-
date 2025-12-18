import React, { useState, useEffect, memo, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams, Outlet } from 'react-router-dom';
import './App.css';

const MemoChild = memo(({ text }) => {
  return <p>Child (Memoized): {text}</p>;
});

const StaticPart = memo(() => {
  return <div><h4>Static Header</h4><p>This part never re-renders unnecessarily.</p></div>;
});

const HeavyCalculation = memo(({ number }) => {
  const result = useMemo(() => {
    let i = 0;
    while (i < 1000000) i++;
    return number * 2;
  }, [number]);
  return <p>Calculation Result (Heavy): {result}</p>;
});

const TodoList = memo(({ items }) => {
  return <ul>{items.map((todo, i) => <li key={i}>{todo}</li>)}</ul>;
});

const Home = () => <div><h2>Home Page</h2><p>Welcome to our website!</p></div>;
const About = () => <div><h2>About Page</h2><p>Learn more about us here.</p></div>;
const Contact = () => <div><h2>Contact Page</h2><p>Get in touch with our team.</p></div>;
const NotFound = () => <div><h2>404 - Page Not Found</h2></div>;

const ProductDetails = () => {
  const { id } = useParams();
  return <div><h2>Product Details</h2><p>Showing info for Product ID: {id}</p></div>;
};

const Blog = () => (
  <div>
    <h2>Blog Main Page</h2>
    <nav>
      <Link to="post/1">Post 1</Link> | <Link to="post/2">Post 2</Link>
    </nav>
    <hr />
    <Outlet />
  </div>
);

const BlogPost = () => {
  const { postId } = useParams();
  return <h3>Viewing Blog Post #{postId}</h3>;
};

const Greet = () => <h1>Hello, welcome here!</h1>;
const CurrentDate = () => <h2>Today is: {new Date().toDateString()}</h2>;
const Button = ({ text, color }) => <button style={{ backgroundColor: color, color: 'white', border: 'none' }}>{text}</button>;
const ProfileCard = ({ name, age, email }) => (
  <div className="profile-card">
    <h3>{name}</h3>
    <p>Age: {age}</p>
    <p>Email: {email}</p>
  </div>
);

const ToggleButton = () => {
  const [isOn, setIsOn] = useState(false);
  return <button onClick={() => setIsOn(!isOn)}>{isOn ? 'ON' : 'OFF'}</button>;
};

function App() {
  const hobbies = ['Reading', 'Traveling', 'Swimming'];
  const names = ['Iradukunda', 'Gwiza', 'Bana', 'Semplice'];
  const options = ['Option 1', 'Option 2', 'Option 3'];

  const [user, setUser] = useState(null);
  const [count, setCounter] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [realTimeText, setRealTimeText] = useState('');
  const [validForm, setValidForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [step, setStep] = useState(1);
  const [multiStepData, setMultiStepData] = useState({ name: '', address: '', payment: '' });
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [todos, setTodos] = useState(['Learn React', 'Memoization']);
  const [todoInput, setTodoInput] = useState('');

  const [lecturer, setLecturer] = useState({ email: '', phone: '' });
  const [student, setStudent] = useState({ sid: '' });
  const [driver, setDriver] = useState({ vehicle: 'car' });
  const [book, setBook] = useState({ year: '' });
  const [module, setModule] = useState({ credits: '' });

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date().toLocaleTimeString()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleProfileInput = () => {
    const name = prompt("Enter Name:");
    const age = prompt("Enter Age:");
    const email = prompt("Enter Email:");
    if (name && age && email) setUser({ name, age, email });
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const validate = () => {
    let tempErrors = {};
    if (!validForm.email.includes('@')) tempErrors.email = "Invalid email format";
    if (validForm.password.length < 6) tempErrors.password = "Password must be 6+ chars";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleCheckbox = (option) => {
    setSelectedOptions(prev => prev.includes(option) ? prev.filter(i => i !== option) : [...prev, option]);
  };

  const handleMultiStepChange = (e) => {
    setMultiStepData({ ...multiStepData, [e.target.name]: e.target.value });
  };

  return (
    <Router>
      <div className="container">
        <header className="header">
          <h1>React JS Assignment</h1>
          <h2>Names</h2>
          <h3>1.IRADUKUNDA GWIZA MOISE   224004102</h3>
          <h3>2.IKUZWE BANA SiMPLICE </h3>

          <nav className="nav-bar">
            <Link to="/">Home</Link> | <Link to="/about">About</Link> | 
            <Link to="/contact">Contact</Link> | <Link to="/product/123">Product 123</Link> | 
            <Link to="/blog">Blog</Link>
          </nav>
        </header>

        <section className="task-section">
          <h3>16-20. Routing Display Area</h3>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/blog" element={<Blog />}>
              <Route path="post/:postId" element={<BlogPost />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </section>

        <section className="task-section">
          <h3>21-25. Performance Optimization (React.memo)</h3>
          <p>Live Time: {time}</p>
          <StaticPart />
          <button onClick={() => setCounter(count + 1)}>Increment Counter: {count}</button>
          <MemoChild text="Static property passed to memoized child" />
          <HeavyCalculation number={count} />
          <input value={todoInput} onChange={(e) => setTodoInput(e.target.value)} placeholder="New todo..." />
          <button onClick={() => {setTodos([...todos, todoInput]); setTodoInput('');}}>Add Todo</button>
          <TodoList items={todos} />
        </section>

        <section className="task-section">
          <h3>1. Welcome & Date</h3>
          <Greet />
          <CurrentDate />
        </section>

        <section className="task-section">
          <h3>2 & 5. Map Lists</h3>
          <ul>{hobbies.map((h, i) => <li key={i}>{h}</li>)}</ul>
          <ul>{names.map((n, i) => <li key={i}>{n}</li>)}</ul>
        </section>

        <section className="task-section">
          <h3>3. Button Props</h3>
          <Button text="Submit" color="blue" />
          <Button text="Cancel" color="gray" />
        </section>

        <section className="task-section">
          <h3>4. Profile Card</h3>
          <button onClick={handleProfileInput}>Input Data</button>
          {user && <ProfileCard {...user} />}
        </section>

        <section className="task-section">
          <h3>6. Toggle</h3>
          <ToggleButton />
        </section>

        <section className="task-section">
          <h3>7. Counter</h3>
          <p>Count: {count}</p>
          <button onClick={() => setCounter(count + 1)}>+</button>
          <button onClick={() => setCounter(count - 1)}>-</button>
        </section>

        <section className="task-section">
          <h3>8. Hover Area</h3>
          <div 
            className="large-hover-box"
            style={{ backgroundColor: isHovered ? '#e3f2fd' : '#f5f5f5' }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {isHovered ? 'Hovering' : 'Hover Here'}
          </div>
        </section>

        <section className="task-section">
          <h3>9. Console Log Form</h3>
          <form onSubmit={(e) => { e.preventDefault(); console.log(inputValue); }}>
            <input value={inputValue} onChange={(e)=>setInputValue(e.target.value)} />
            <button type="submit">Log</button>
          </form>
        </section>

        <section className="task-section">
          <h3>10. Dropdown</h3>
          <button onClick={() => setIsOpen(!isOpen)}>Toggle Menu</button>
          {isOpen && <ul>{options.map((opt, i) => <li key={i}>{opt}</li>)}</ul>}
        </section>

        <section className="task-section">
          <h3>11. Login Form</h3>
          <input name="username" placeholder="User" onChange={handleLoginChange} />
          <input name="password" type="password" placeholder="Pass" onChange={handleLoginChange} />
          <button onClick={() => alert(credentials.username)}>Login</button>
        </section>

        <section className="task-section">
          <h3>12. Controlled Input</h3>
          <input value={realTimeText} onChange={(e) => setRealTimeText(e.target.value)} />
          <p>{realTimeText}</p>
        </section>

        <section className="task-section">
          <h3>13. Validation Form</h3>
          <input placeholder="Email" onChange={(e) => setValidForm({...validForm, email: e.target.value})} />
          {errors.email && <p style={{color:'red'}}>{errors.email}</p>}
          <input type="password" placeholder="Pass" onChange={(e) => setValidForm({...validForm, password: e.target.value})} />
          {errors.password && <p style={{color:'red'}}>{errors.password}</p>}
          <button onClick={validate}>Validate</button>
        </section>

        <section className="task-section">
          <h3>14. Multi-step Form</h3>
          {step === 1 && (
            <div>
              <p>Step 1: Name</p>
              <input name="name" placeholder="Name" value={multiStepData.name} onChange={handleMultiStepChange} />
              <button onClick={() => setStep(2)}>Next</button>
            </div>
          )}
          {step === 2 && (
            <div>
              <p>Step 2: Address</p>
              <input name="address" placeholder="Address" value={multiStepData.address} onChange={handleMultiStepChange} />
              <button onClick={() => setStep(1)}>Back</button>
              <button onClick={() => setStep(3)}>Next</button>
            </div>
          )}
          {step === 3 && (
            <div>
              <p>Step 3: Payment</p>
              <input name="payment" placeholder="Payment" value={multiStepData.payment} onChange={handleMultiStepChange} />
              <button onClick={() => setStep(2)}>Back</button>
              <button onClick={() => { alert("Data Collected: " + JSON.stringify(multiStepData)); setStep(1); }}>Finish</button>
            </div>
          )}
        </section>

        <section className="task-section">
          <h3>15. Checkboxes</h3>
          {['A', 'B', 'C'].map(opt => (
            <label key={opt}>
              <input type="checkbox" onChange={() => handleCheckbox(opt)} /> {opt}
            </label>
          ))}
          <p>Selected: {selectedOptions.join(', ')}</p>
        </section>

        <section className="task-section">
          <h3>26. Lecturer Registration</h3>
          <input placeholder="Email" onChange={(e) => setLecturer({...lecturer, email: e.target.value})} />
          <input placeholder="Phone (Numeric)" onChange={(e) => setLecturer({...lecturer, phone: e.target.value})} />
          <button onClick={() => {
            if (lecturer.email.includes('@') && !isNaN(lecturer.phone)) alert("Valid Lecturer");
            else alert("Invalid Format");
          }}>Register</button>
        </section>

        <section className="task-section">
          <h3>27. Student Registration</h3>
          <input placeholder="ID (Alphanumeric)" onChange={(e) => setStudent({...student, sid: e.target.value})} />
          <button onClick={() => {
            if (/^[a-z0-9]+$/i.test(student.sid)) alert("Valid Student ID");
            else alert("Alphanumeric only");
          }}>Register</button>
        </section>

        <section className="task-section">
          <h3>28. Driver Registration</h3>
          <select onChange={(e) => setDriver({...driver, vehicle: e.target.value})}>
            <option value="car">Car</option>
            <option value="truck">Truck</option>
            <option value="motorcycle">Motorcycle</option>
          </select>
          <button onClick={() => alert("Vehicle: " + driver.vehicle)}>Register</button>
        </section>

        <section className="task-section">
          <h3>29. Book Registration</h3>
          <input placeholder="Year (4 digits)" onChange={(e) => setBook({...book, year: e.target.value})} />
          <button onClick={() => {
            if (book.year.length === 4 && !isNaN(book.year)) alert("Valid Year");
            else alert("Invalid Year");
          }}>Register</button>
        </section>

        <section className="task-section">
          <h3>30. Module Registration</h3>
          <input placeholder="Credits (Numeric)" type="number" required onChange={(e) => setModule({...module, credits: e.target.value})} />
          <button onClick={() => {
            if (module.credits !== "") alert("Module Credits: " + module.credits);
            else alert("Required");
          }}>Register</button>
        </section>
      </div>
    </Router>
  );
}

export default App;