import styles from "../styles/pages/Home.module.css";
import { useEffect, useRef, useState } from "react";

import Todo from "../components/Todo";

import { TiPlus } from "react-icons/ti";

import axios from "axios";

// date's for header
function getDay(date) {
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  return days[date.getDay()];
}
const today = new Date();

let date = new Date(today.getFullYear(), today.getMonth(), today.getDate());
const day = getDay(date);

function getDate() {
  const today = new Date();
  const date = today.getDate();
  return date;
}
function getYear() {
  const today = new Date();
  const year = today.getFullYear();
  return year;
}
function getMonth() {
  const today = new Date();
  const month = today.getMonth() + 1;
  return month;
}
//

const BaseUrl = "http://localhost:3000/api";

export default function Home() {
  const [currentDate, setCurrentDate] = useState(getDate());
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const [currentYear, setCurrentYear] = useState(getYear());

  const [todos, setTodos] = useState([]);

  const titleref = useRef();

  //gets the month first 3 letters
  const getMonthName = () => {
    if (currentMonth === 1) {
      return "Jan";
    }
    if (currentMonth === 2) {
      return "Feb";
    }
    if (currentMonth === 3) {
      return "Mar";
    }
    if (currentMonth === 4) {
      return "Apr";
    }
    if (currentMonth === 5) {
      return "May";
    }
    if (currentMonth === 6) {
      return "June";
    }
    if (currentMonth === 7) {
      return "July";
    }
    if (currentMonth === 8) {
      return "Aug";
    }
    if (currentMonth === 9) {
      return "Sept";
    }
    if (currentMonth === 10) {
      return "Oct";
    }
    if (currentMonth === 11) {
      return "Nov";
    }
    if (currentMonth === 12) {
      return "Dec";
    }
  };

  // so it gets rendered once
  useEffect(() => {
    getTodos();
  }, []);

  // function that gets todos form Be
  function getTodos() {
    axios
      .get(BaseUrl + "/todos")
      .then((res) => {
        setTodos(res.data.documents);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // function that posts todos to Be
  const PostTodo = () => {
    if (titleref.current.value) {
      axios
        .post(BaseUrl + "/todos", {
          title: titleref.current.value,
        })
        .then(() => {
          getTodos();
          titleref.current.value = "";
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className={styles.outer}>
      {/* Main Container */}
      <div className={styles.mainCont}>
        {/* Top Date */}
        <div className={styles.header}>
          <div style={{ display: "flex", gap: "5px" }}>
            <div style={{ fontSize: "41px", fontWeight: "600", color: "#56575e" }}>{currentDate}</div>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", lineHeight: "1.2" }}>
              <div style={{ fontWeight: "500", color: "#56575e" }}>{getMonthName()}</div>
              <div style={{ fontWeight: "500", color: "#56575e" }}>{currentYear}</div>
            </div>
          </div>
          <div style={{ fontSize: "20px", fontWeight: "600", color: "#56575e" }}>{day}</div>
        </div>

        {/* Todo's */}
        {todos.map((el, i) => {
          return <Todo key={i} id={el._id} title={el.title} onUpdate={() => getTodos()} />;
        })}

        {/* Add Button */}
        <div className={styles.addbtn}>
          <button className="btn btn-lg btn-accent btn-circle w-24 h-24" onClick={() => document.getElementById("my_modal_1").showModal()}>
            <TiPlus size={30} color="white" />
          </button>
        </div>
      </div>

      {/* AddTodoPopup */}
      <dialog id="my_modal_1" className="modal">
        <div
          className="modal-box"
          style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", width: "375px" }}
        >
          <h3 className="font-bold text-lg" style={{ marginBottom: "15px" }}>
            Add Todo
          </h3>

          <div style={{ display: "flex", gap: "20px" }}>
            <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" ref={titleref} />
            <form method="dialog">
              <button className="btn" onClick={PostTodo}>
                Add
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}
