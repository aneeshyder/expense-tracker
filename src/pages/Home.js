import React from 'react';
import './../App.css';
import { useState, useEffect } from 'react'; 
import {db} from './../firebase';
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc, query, where } from 'firebase/firestore';
import ExpForm  from '../components/ExpForm';
import Filters from '../components/Filters';
import NewCat from '../components/NewCat';

function Home() {
  // Create references for firebase DB.
  const expenseCollectionRef = collection(db, 'expenses');
  const categoriesCollectionRef = collection(db, 'category');

  const [ initialData, setInitialData ] = useState([]);
  const [ totalAmount, setTotalAmount ] = useState(0);
  const [ newExp, setNewExp ] = useState('');
  const [ newAmount, setNewAmount ] = useState(0);
  const [ newAmountDate, setNewAmountDate ] = useState(0);
  const [ expenses, setExpenses ] = useState([]);
  const [ categories, setCategories ] = useState([]);
  const [ uexp, setUexp ] = useState(0);
  const [filterName, setFilterName] = useState('');
  const [filterMonthName, setMonthFilterName] = useState('');
  const [filterData, setFilterData] = useState([]);
  const [newMonth, setNewMonth] = useState('');
  const [newYear, setNewYear] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newdesc, setNewdesc] = useState('');
  const [newCat, setNewCat] = useState('');
  const [newCatState, setNewCatState] = useState(false);

  // Create new exp with details added.
  const createExp = async () => {
    await addDoc(expenseCollectionRef, {name: newExp, description: newdesc, amount: Number(newAmount), date: newDate, month: newMonth, year: newYear });
    alert(`Expense ${newExp} - ${Number(newAmount)} added`);
  }

  // Create new exp with details added.
  const createNewCat = async () => {
    await addDoc(categoriesCollectionRef, {cat_name: newCat});
    alert(`category - ${newCat} added`);
    setNewCatState(false);
  }

  // update a exp after update button is clicked for a exp.
  const updateExpense = async (id, event) => {
    const  expDoc = doc(db, 'expenses', id);
    const newFields = {amount: uexp}
    await updateDoc(expDoc, newFields);
    handleEdit(event);
  };

  // Func to handle edit state for exp.
  const handleEdit = (event) => {
    var ele = event.target.closest(".item");
    ele.classList.toggle("edit-on");
  }

    // Func to handle edit state for exp.
    const closeNewCat = () => {
      setNewCatState(false)
    }

  // Delete a exp.
  const deleteExp = async (id) => {
    const  expDoc = doc(db, 'expenses', id);
    await deleteDoc(expDoc);
    alert('Expense deleted');
  };

  useEffect(() => {
      const getAllData = async () => {
          const data = await getDocs(expenseCollectionRef);            
          setInitialData(data.docs.map((doc) => ({...doc.data(), id: doc.id  })));
      }     
      getAllData();
  }, []);
  

  // Get total expense entries in db and set them to - expenses.
  useEffect(() => {
    const getExpenses = async () => {
     
     let dataFinal = initialData;
      if(filterName) {
        dataFinal =  dataFinal.filter(data => data.name == filterName);
        setExpenses(dataFinal);
      }
      if(filterMonthName) {
        dataFinal =  dataFinal.filter(data => data.month == filterMonthName);
        setExpenses(dataFinal);
      }
    };
    getExpenses();   
  }, [filterMonthName, filterName]);

   // Get total expense entries in db and set them to - expenses.
   useEffect(() => {
    const getCategories = async () => {
      const data = await getDocs(categoriesCollectionRef);
      setCategories(data.docs.map((doc) => ({...doc.data(), id: doc.id  })));      
    };
    getCategories();
  }, [filterName]);

  // Get collections from db with unique name.
  // For adding a select option with unique exp names.
  const monthly = [...new Map(initialData.map(item =>
    [item['month'], item])).values()];

  // Get total of expenses added so far.
  let totalExpenses;

    totalExpenses = expenses.reduce((total, item) => {
      return Number(total += item.amount);
    }, 0);


  // Query to get filtered data by name.
  // Uses filterName state selected from select ele.
//   const q = query(collection(db, "expenses"), where("name", "==", filterName ? filterName : '' ));

//   useEffect(() => {
//     const getAllData = async () => {
//     const querySnapshot = await getDocs(q);
//         setInitialData(querySnapshot.docs.map((doc) => ({...doc.data(), id: doc.id  })));
//     }     
//     getAllData();
//     }, []);



//   useEffect(() => {
//     const getfilterData = async () => {
//       const querySnapshot = await getDocs(q);
//       let dataFinal = querySnapshot.docs.map((doc) => ({...doc.data(), id: doc.id  }));
//       setFilterData(dataFinal);
//       console.log(filterMonthName);

//       if(filterName) {
//         dataFinal =  dataFinal.filter(data => data.name == filterName);

//         setFilterData(dataFinal);
//       }
//       if(filterMonthName) {
//         dataFinal =  dataFinal.filter(data => data.month == filterMonthName);

//         setFilterData(dataFinal);
//       }
//     }
//   getfilterData();
//   console.log('filter data');
//   console.log(filterData);
//   console.log(categories);
//   }, []);

  return (
    <div className="App">
      { newCatState && (
         <NewCat newCat={setNewCat} createNewCat={createNewCat} closeNewCat={closeNewCat} />
      )
    }
     

      <ExpForm
        newCategoryState={setNewCatState}
        categories={categories}
        newExp={setNewExp} newDesc={setNewdesc}
        newAmount={setNewAmount} newdatee={setNewDate}
        createExp={createExp} newmonth={setNewMonth}
        newyear={setNewYear}
      />
     
       <h2>Total: ₹{totalExpenses}</h2>

      {/* Select element to filter data with exp name. */}
      <Filters
        categories={categories}
        setFilterName={setFilterName}
        setMonthFilterName={setMonthFilterName} monthly={monthly} />
      {/* If exp name is selected show filtered data else show all data available */}
       
        {
            filterMonthName || filterName ? (
              <div className='outer-main'>
              
                {expenses.map((exp) => {
                return(
                  <div className='item'>
                    <div className='inner-col'>
                      <p className='exp-name'>{exp.name}</p>
                      <p className='date'>{exp.date} {exp.month} {exp.year}</p>
                    </div>
                    <div className='inner-col'>
                      <p className='desc'>{exp.description}</p>
                      <p className='amount'>₹{exp.amount}</p>
                    </div>
                    <div className='buttons'>
                      <div>
                        <div className="showOnEdit">
                          <input type='number' onChange={(e) => {setUexp(e.target.value)}} />
                          <button onClick={(event) => {
                            updateExpense(exp.id, event);
                          }}>Update Expense</button>
                        </div>
                        <div className="hideOnEdit">
                          <button onClick={(event) => {handleEdit(event);}}>Edit</button>      
                        </div>
                      </div>
                      <div>
                        <button onClick={() => {deleteExp(exp.id)}}>Delete Exp</button>
                      </div>
                    </div>
                  </div>
                )        
                })}
                </div>
            ) : (
              <div className='outer-main'>
    
                { initialData.map((exp) => {
                return(
                  <div className='item'>
                    <div className='inner-col'>
                      <p className='exp-name'>{exp.name}</p>
                      <p className='date'>{exp.date} {exp.month} {exp.year}</p>
                    </div>
                    <div className='inner-col'>
                      <p className='desc'>{exp.description}</p>
                      <p className='amount'>₹{exp.amount}</p>
                    </div>
                    <div className='buttons'>
                      <div>
                        <div className="showOnEdit">
                          <input type='number' onChange={(e) => {setUexp(e.target.value)}} />
                          <button onClick={(event) => {
                            updateExpense(exp.id, event);
                          }}>Update Expense</button>
                        </div>
                        <div className="hideOnEdit">
                          <button onClick={(event) => {handleEdit(event);}}>Edit</button>      
                        </div>
                      </div>
                      <div>
                        <button onClick={() => {deleteExp(exp.id)}}>Delete Exp</button>
                      </div>
                    </div>
                </div>
              )        
              })}
              </div>               
            )
        }

         
    </div> //  <div className="App">
  );
}

export default Home;
