import './App.css';
import { useState, useEffect } from 'react'; 
import {db} from './firebase';
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc, query, where } from 'firebase/firestore';

function App() {
  const [ totalAmount, setTotalAmount ] = useState(0);
  const [ newExp, setNewExp ] = useState('');
  const [ newAmount, setNewAmount ] = useState(0);
  const [ newAmountDate, setNewAmountDate ] = useState(0);
  const [ expenses, setExpenses ] = useState([]);
  const expenseCollectionRef = collection(db, 'expenses');
  const [ uexp, setUexp ] = useState(0);
  const [filterName, setFilterName] = useState('');
  const [filterData, setFilterData] = useState([]);

  // Create new exp with details added.
  const createExp = async () => {
    await addDoc(expenseCollectionRef, {name: newExp, amount: Number(newAmount), date: newAmountDate});
    alert(`Expense ${newExp} - ${Number(newAmount)} added`);
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

  // Delete a exp.
  const deleteExp = async (id) => {
    const  expDoc = doc(db, 'expenses', id);
    await deleteDoc(expDoc);
    alert('Expense deleted');
  };

  // Get total expense entries in db and set them to - expenses.
  useEffect(() => {
    const getExpenses = async () => {
      const data = await getDocs(expenseCollectionRef);
      setExpenses(data.docs.map((doc) => ({...doc.data(), id: doc.id  })));      
    };
    getExpenses();   
  }, []);

  // Get collections from db with unique name.
  // For adding a select option with unique exp names.
  const categorized = [...new Map(expenses.map(item =>
    [item['name'], item])).values()];

  // Get total of expenses added so far.
  let totalExpenses;
  if (filterName !== '') {
    totalExpenses = filterData.reduce((total, item) => {
      return Number(total += item.amount);
    }, 0);
  } else {
    totalExpenses = expenses.reduce((total, item) => {
      return Number(total += item.amount);
    }, 0);
  }

  // Query to get filtered data by name.
  // Uses filterName state selected from select ele.
  const q = query(collection(db, "expenses"), where("name", "==", filterName ));
  useEffect(() => {
    const getfilterData = async () => {
      const querySnapshot = await getDocs(q);
      setFilterData(querySnapshot.docs.map((doc) => ({...doc.data(), id: doc.id  })));
    }
  getfilterData();
  }, [filterName]);

  return (
    <div className="App">
      <input type="text" placeholder='expense name' onChange={(event) => {
        setNewExp(event.target.value)
      }} />
      <input type="number" placeholder='expense amount'onChange={(event) => {
        setNewAmount(event.target.value)
       }} />

      <input type="date" placeholder='date'onChange={(event) => {
        setNewAmountDate(event.target.value)
       }} />
      <button onClick={createExp}>Add Expense</button>
       <h2>Total: ₹{totalExpenses}</h2>

      {/* Select element to filter data with exp name. */}
      <select onChange={(e) => {setFilterName(e.target.value)}}>      
        <option value=''>Select expense</option>
        {categorized.map((el) => {
        return(
          <option value={el.name}>{el.name}</option>
        )
        })}
      </select>
      {/* If exp name is selected show filtered data else show all data available */}
        {filterName ? (
            <table>
            <tr>
              <th>Date</th>
              <th>Name</th>
              <th>Amount</th>          
            </tr>
            {filterData.map((exp) => {
            return(
              <tr className='item'>
                <td>{exp.date}</td>
                <td>{exp.name}</td>
                <td>₹{exp.amount}</td>
                <td>
                  <div className="showOnEdit">
                    <input type='number' onChange={(e) => {setUexp(e.target.value)}} />
                    <button onClick={(event) => {
                      updateExpense(exp.id, event);
                    }}>Update Expense</button>
                  </div>
                  <div className="hideOnEdit">
                    <button onClick={(event) => {handleEdit(event);}}>Edit</button>      
                  </div>
                </td>
                <td>
                  <button onClick={() => {deleteExp(exp.id)}}>Delete Exp</button>
                </td>
              </tr>
            )        
          })}
          </table>
        ) : (
          <table>
          <tr>
            <th>Date</th>
            <th>Name</th>
            <th>Amount</th>          
          </tr>
          {expenses.map((exp) => {
          return(
            <tr className='item'>
              <td>{exp.date}</td>
              <td>{exp.name}</td>
              <td>₹{exp.amount}</td>
              <td>
                <div className="showOnEdit">
                  <input type='number' onChange={(e) => {setUexp(e.target.value)}} />
                  <button onClick={(event) => {
                    updateExpense(exp.id, event);
                  }}>Update Expense</button>
                </div>
                <div className="hideOnEdit">
                  <button onClick={(event) => {handleEdit(event);}}>Edit</button>      
                </div>
              </td>
              <td>
                <button onClick={() => {deleteExp(exp.id)}}>Delete Exp</button>
              </td>
            </tr>
          )        
          })}
          </table>
        )
        }
    </div> //  <div className="App">
  );
}

export default App;
