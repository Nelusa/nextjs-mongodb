import Button from "@/components/ui/Button/Button";
import { useRef } from "react";

import styles from "./EventsSearch.module.css";

const EventsSearch = ({ onSearch }) => {
  //zase nás zajímají data jen ve chvíli, kdy submitujeme formulář --> použijeme tedy useRef() a ne onChange a value
  const yearInputRef = useRef();
  const monthInputRef = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();

    const selectedYear = yearInputRef.current.value;
    const selectedMonth = monthInputRef.current.value;

    const data = {
      selectedYear,
      selectedMonth,
    };

    console.log(data);

    onSearch(selectedYear, selectedMonth);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.controls}>
        <div className={styles.control}>
          <label htmlFor="year">Year</label>
          <select name="year" id="year" ref={yearInputRef}>
            <option value="2021">2021</option>
            <option value="2022">2022</option>
          </select>
        </div>
        <div className={styles.control}>
          <label htmlFor="month">Month</label>
          <select name="month" id="month" ref={monthInputRef}>
            <option value="1">January</option>
            <option value="2">February</option>
            <option value="3">March</option>
            <option value="4">April</option>
            <option value="5">May</option>
            <option value="6">June</option>
            <option value="7">July</option>
            <option value="8">August</option>
            <option value="9">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>
        </div>{" "}
      </div>
      <Button>Find Events</Button>{" "}
    </form>
  );
};

export default EventsSearch;
