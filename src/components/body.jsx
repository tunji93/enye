import { useState, useEffect } from "react";

const Dashboard = ({ data, size, pages }) => {
  const [search, setSearch] = useState("");
  const [filter, setfilter] = useState({
    Female: "Female",
    Male: "Male",
    "Prefer to skip": "Prefer to skip",
    check: "check",
    money: "money",
    orderccpaypal: "orderccpaypal",
  });
  const [pageNum, setpageNum] = useState(0);
  const uniqueGender = new Set(data.map((d) => d.Gender));
  let genders = [];
  uniqueGender.forEach((g) => genders.push(g));

  const uniqueMethod = new Set(data.map((d) => d.PaymentMethod));
  let methods = [];
  uniqueMethod.forEach((g) => genders.push(g));

  const filterData = (e) => {
    const index = e.target.id;
    setfilter({
      ...filter,
      [index]: !filter[index] ? index : "",
    });
  };

  if (data.length) {
    return (
      <>
        <div className="search_filter_wrapper">
          <div className="container">
            <div className="search">
              <input
                className="search_bar"
                placeholder="Type here to search"
                type={"text"}
                onChange={(e) => setSearch(e.target.value.toLowerCase())}
              />
            </div>

            <h3 className="gen">gender</h3>
            <h3 className="paymtd">payment method</h3>
          </div>

          <div className="filter">
            <div className="genders">
              {genders.map((g) => (
                <>
                  <label htmlFor="gender">{g}</label>
                  <input
                    id={g}
                    type="checkbox"
                    checked={filter[g]}
                    onClick={(e) => filterData(e)}
                  />
                </>
              ))}
            </div>
            <div className="paymentmethod">
              {methods.map((g) => (
                <>
                  <label htmlFor="method">{g}</label>
                  <input
                    id={g}
                    type="checkbox"
                    checked={filter[g]}
                    onClick={(e) => filterData(e)}
                  />
                </>
              ))}
            </div>
          </div>
        </div>
        <div className="data">
          <table>
            <thead>
              <tr>
                {Object.keys(data[0]).map((val, key) => (
                  <th key={key} className={`head_${val}`}>
                    {val}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data
                .slice(pageNum * 20, (pageNum + 1) * 20)
                .filter(
                  (d) =>
                    Object.values(filter).includes(d.Gender) &&
                    Object.values(filter).includes(d.PaymentMethod)
                )
                .filter(
                  (d) =>
                    d.FirstName.toLowerCase().indexOf(search) >= 0 ||
                    d.LastName.toLowerCase().indexOf(search) >= 0
                )
                .map((d, key) => (
                  <tr key={key}>
                    {Object.values(d).map((values, id) => (
                      <td key={id}>{values}</td>
                    ))}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className="pagination">
          <span className="pages">pages</span>
          {pages.map((num) => (
            <span
              className="pagenum"
              id={num}
              onClick={(e) => setpageNum(e.target.id - 1)}
            >
              {num}
            </span>
          ))}
        </div>
      </>
    );
  } else {
    return <></>;
  }
};

export default Dashboard;
