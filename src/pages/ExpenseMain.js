import React from "react";
import "./../App.css";
import { useState, useEffect } from "react";
import { db } from "./../firebase";
import {
  collection,
  getDocs,  
  addDoc,
  updateDoc,
  doc,
  deleteDoc, 
} from "firebase/firestore";
import ExpForm from "../components/ExpForm";
import Filters from "../components/Filters";
import NewCat from "../components/NewCat";
import Loader from "../components/loader";
import ExpenseItem from "../components/ExpneseItem";

function ExpenseMain(props) {
  // Create references for firebase DB.
  const expenseCollectionRef = collection(
    db,
    "users",
    props.userId,
    "expenses"
  );
  const categoriesCollectionRef = collection(
    db,
    "users",
    props.userId,
    "category"
  );

  const [initialData, setInitialData] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [newExp, setNewExp] = useState("");
  const [newAmount, setNewAmount] = useState(0);
  const [newAmountDate, setNewAmountDate] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [uexp, setUexp] = useState(0);
  const [filterName, setFilterName] = useState("");
  const [filterMonthName, setMonthFilterName] = useState("");
  const [yearFilterName, setYearFilterName] = useState("");
  const [filterData, setFilterData] = useState([]);
  const [newMonth, setNewMonth] = useState("");
  const [newYear, setNewYear] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newdesc, setNewdesc] = useState("");
  const [newCat, setNewCat] = useState("");
  const [newCatState, setNewCatState] = useState(false);
  const [loader, setLoader] = useState(false);
  const [update, setUpdate] = useState(false);

  const updateMainState = () => {
    setUpdate((current) => !current);
  };

  // Create new exp with details added.
  const createExp = async () => {
    setLoader(true);
    await addDoc(expenseCollectionRef, {
      name: newExp,
      description: newdesc,
      amount: Number(newAmount),
      date: newDate,
      month: newMonth,
      year: newYear,
    });
    setLoader(false);
    alert(`Expense ${newExp} - ${Number(newAmount)} added`);
    updateMainState();
  };

  // Create new exp with details added.
  const createNewCat = async () => {
    await addDoc(categoriesCollectionRef, { cat_name: newCat });
    alert(`category - ${newCat} added`);
    setNewCatState(false);
    updateMainState();
  };

  // update a exp after update button is clicked for a exp.
  const updateExpense = async (id, event) => {
    setLoader(true);

    var ele = event.target.closest(".item");

    const expName = ele.querySelector(".expNameInput").value;
    const expDesc = ele.querySelector(".expDesc").value;
    const expAmount = ele.querySelector(".expAmount").value;

    const expDoc = doc(db, "users", props.userId, "expenses", id);

    const newFields = {
      amount: Number(expAmount),
      name: expName,
      description: expDesc,
    };
    await updateDoc(expDoc, newFields);

    var inputs = ele.querySelectorAll(".editInput ");
    for (var i = 0, len = inputs.length; i < len; i++) {
      let value = inputs[i].value;
      let nextSibling = inputs[i].previousSibling;
      nextSibling.innerHTML = value;
    }
    ele.classList.remove("edit-on");
    setLoader(false);
    updateMainState();
    alert(
      `Updated: \n Expense Name: ${expName} \n Amount: ${Number(
        expAmount
      )} \n Description: ${expDesc}`
    );
  };

  // Func to handle edit state for exp.
  const handleEdit = (event) => {
    var ele = event.target.closest(".item");
    if (ele.classList.contains("edit-on")) {
      ele.classList.remove("edit-on");
    } else {
      var fields = ele.querySelectorAll(".hideOnEdit");
      for (var i = 0, len = fields.length; i < len; i++) {
        let value = fields[i].innerHTML;
        let nextSibling = fields[i].nextElementSibling;
        nextSibling.value = value;
      }
      ele.classList.add("edit-on");
    }
  };

  // Func to handle edit state for exp.
  const closeNewCat = () => {
    setNewCatState(false);
  };

  // Delete a exp.
  const deleteExp = async (id, event) => {
    const expDoc = doc(db, "users", props.userId, "expenses", id);
    var ele = event.target.closest(".item");
    const expAmount = ele.querySelector(".amount").innerHTML;

    setLoader(true);
    await deleteDoc(expDoc);
    setLoader(false);
    totalExpenses -= Number(expAmount);
    updatetotalExpensesAmount(totalExpenses);
    alert("Expense deleted");
    updateMainState();
  };

  useEffect(() => {
    const getAllData = async () => {
      setLoader(true);
      const dataRef = await getDocs(expenseCollectionRef);
      let data = dataRef.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      data = data.filter((data) => data.first !== "something");

      setInitialData(data);
      setLoader(false);
    };
    getAllData();
  }, [update]);

  // Get total expense entries in db and set them to - expenses.
  useEffect(() => {
    const getExpenses = async () => {
      let dataFinal = initialData;
      if (filterName) {
        dataFinal = dataFinal.filter((data) => data.name == filterName);
        setExpenses(dataFinal);
      }
      if (filterMonthName) {
        dataFinal = dataFinal.filter((data) => data.month == filterMonthName);
        setExpenses(dataFinal);
      }
      if (yearFilterName) {
        dataFinal = dataFinal.filter((data) => data.year == yearFilterName);
        setExpenses(dataFinal);
      }
    };
    getExpenses();
  }, [filterMonthName, filterName, yearFilterName]);

  // Get total expense entries in db and set them to - expenses.
  useEffect(() => {
    const getCategories = async () => {
      const data = await getDocs(categoriesCollectionRef);
      setCategories(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getCategories();
  }, [filterName, update]);

  // Get collections from db with unique name.
  // For adding a select option with unique exp names.
  const monthly = [
    ...new Map(initialData.map((item) => [item["month"], item])).values(),
  ];

  const yearly = [
    ...new Map(initialData.map((item) => [item["year"], item])).values(),
  ];

  // Get total of expenses added so far.
  let totalExpenses;
  if (filterMonthName || filterName || yearFilterName) {
    totalExpenses = expenses.reduce((total, item) => {
      return Number((total += item.amount));
    }, 0);
  } else {
    totalExpenses = initialData.reduce((total, item) => {
      return Number((total += item.amount));
    }, 0);
  }

  const updatetotalExpensesAmount = (val) => {
    const ele = document.getElementsByClassName("total-expenses-amount");
    ele[0].innerHTML = Math.abs(val);
  };

  return (
    <div className="App">
      {loader && <Loader />}
      {newCatState && (
        <NewCat
          newCat={setNewCat}
          update={updateMainState}
          userId={props.userId}
          loader={setLoader}
          categories={categories}
          createNewCat={createNewCat}
          closeNewCat={closeNewCat}
        />
      )}

      <ExpForm
        newCategoryState={setNewCatState}
        categories={categories}
        newExp={setNewExp}
        newDesc={setNewdesc}
        newAmount={setNewAmount}
        newdatee={setNewDate}
        createExp={createExp}
        newmonth={setNewMonth}
        newyear={setNewYear}
      />

      <h2 className="total-expenses-amount">{totalExpenses}</h2>

      {/* Select element to filter data with exp name. */}
      <Filters
        categories={categories}
        setFilterName={setFilterName}
        setMonthFilterName={setMonthFilterName}
        setYearFilterName={setYearFilterName}
        monthly={monthly}
        yearly={yearly}
      />
      {/* If exp name is selected show filtered data else show all data available */}

      {filterMonthName || filterName || yearFilterName ? (
        <div className="outer-main">
          {expenses.map((exp) => {
            return (
              <ExpenseItem
                key={exp.id}
                userId={props.userId}
                categories
                updateExpense={updateExpense}
                exp={exp}
                handleEdit={handleEdit}
                deleteExp={deleteExp}
              />
            );
          })}
        </div>
      ) : (
        <div className="outer-main">
          {initialData.map((exp) => {
            return (
              <ExpenseItem
                key={exp.id}
                userId={props.userId}
                updateExpense={updateExpense}
                exp={exp}
                handleEdit={handleEdit}
                deleteExp={deleteExp}
              />
            );
          })}
        </div>
      )}
    </div> //  <div className="App">
  );
}

export default ExpenseMain;
