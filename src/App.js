import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";
import Dashboard from "./components/body";

function App() {
  const [data, setData] = useState([]);
  const [size, setSize] = useState(0);
  const [pages, setPages] = useState([]);
  const fetchData = async () => {
    const result = await fetch("https://api.enye.tech/v1/challenge/records");
    const res = await result.json();
    let pages = [];
    for (let i = 1; i < Math.ceil(res.size / 20) + 1; i++) {
      pages.push(i);
    }
    setData(res.records.profiles);
    setSize(res.size);
    setPages(pages);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Dashboard data={data} size={size} pages={pages} />
    </>
  );
}

export default App;
