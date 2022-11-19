import CategoriesSelect from "./CategoriesSelect";
function ExpenseItem(props) {
  const { exp, updateExpense, handleEdit, deleteExp, userId } =
    props;
  return (
    <div className="item">
      <div className="inner-col">
        <div>
          <p className="exp-name hideOnEdit">{exp.name}</p>
          <CategoriesSelect userId={userId} />
        </div>
        <div>
          <p className="date">
            {exp.date} {exp.month} {exp.year}
          </p>
        </div>
      </div>
      <div className="inner-col">
        <div>
          <p className="desc hideOnEdit">{exp.description}</p>
          <input className="editInput showOnEdit expDesc" type="text" />
        </div>
        <div>
          <p className="amount hideOnEdit">{exp.amount}</p>
          <input className="editInput showOnEdit expAmount" type="number" />
        </div>
      </div>
      <div className="buttons">
        <div>
          <div className="showOnEdit">
            <button
              className="updateBtn"
              onClick={(event) => {
                updateExpense(exp.id, event);
              }}
            >
              Update Expense
            </button>
          </div>
          <div className="">
            <button
              className="editBtn"
              onClick={(event) => {
                handleEdit(event);
              }}
            >
              Edit
            </button>
          </div>
        </div>
        <div>
          <button
            className="deletetBtn"
            onClick={(event) => {
              deleteExp(exp.id, event);
            }}
          >
            Delete Exp
          </button>
        </div>
      </div>
    </div>
  );
}

export default ExpenseItem;
