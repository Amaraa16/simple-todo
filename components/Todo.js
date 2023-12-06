import styles from "../styles/pages/Todo.module.css";

import axios from "axios";

const BaseUrl = "http://localhost:3000/api";

export default function Todo({ id, title, onUpdate }) {
  const Delete = (id) => {
    axios.delete(BaseUrl + "/todos/" + id).then((res) => {
      onUpdate();
    });
  };

  return (
    <div className={styles.todo}>
      <div style={{ fontSize: "18px", fontWeight: "500" }}>{title}</div>
      <button className="btn btn-xs btn-circle btn-outline" onClick={() => Delete(id)}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
