import { collection, deleteDoc, doc } from "firebase/firestore";
import { db } from "./../firebase";

function NewCat(props) {
  const listStyle = {
    listStyleType: "none",
    padding: 0,
    margin: 0,
  };

  const spanStyle = {
    textTransform: "uppercase",
    margin: "10px 0",
    display: "inline-block",
  };

  const deleteCat = async (id, event) => {
    props.loader(true);
    const catRef = doc(db, "users", props.userId, "category", id);
    await deleteDoc(catRef);
    var ele = event.target.closest("li");
    ele.remove();
    props.loader(false);
    props.update();
  };
  return (
    <div className="add-new-cat-wrapper">
      <div className="container">
        <h2>Add/Remove Expense Category</h2>
        <div className="wrapper">
          <button className="close-btn" onClick={props.closeNewCat}>
            X
          </button>
          <span style={spanStyle}>Add New Category</span>
          <div>
            <input
              type="text"
              placeholder="Add new category"
              onChange={(event) => {
                props.newCat(event.target.value);
              }}
            />
            <button className="updateBtn" onClick={props.createNewCat}>
              Add New Category
            </button>
          </div>
          <span style={spanStyle}>Remove Category</span>
          <ul style={listStyle} className="cta-list">
            {props.categories.map((el) => {
              console.log(el);
              return (
                <li value={el.cat_name}>
                  {el.cat_name}{" "}
                  <button
                    className="deletetBtn"
                    onClick={(event) => {
                      deleteCat(el.id, event);
                    }}
                  >
                    Delete Exp
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default NewCat;
