function ExpForm(props) {
  const monthArr = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const handleSelect = (option) => {
    console.log(option);
    if ("add-new-cat" === option) {
      props.newCategoryState(true);
      document.getElementById("cat-options").selectedIndex = 0;
    }
    props.newExp(option);
  };

  const handleNewDate = (date) => {
    console.log(date);
    let newDate = new Date(date);
    const newmon = newDate.getMonth();
    props.newmonth(monthArr[newmon]);
    props.newyear(newDate.getFullYear());
    props.newdatee(newDate.getDate());
  };

  return (
    <div className="add-expense-form">
      <select
        id="cat-options"
        onChange={(event) => {
          handleSelect(event.target.value);
        }}
      >
        <option value="">Select Category</option>
        {props.categories.map((el) => {
          return (
            <option key={el.id} value={el.cat_name}>
              {el.cat_name}
            </option>
          );
        })}
        <option value="add-new-cat">Add/Remove Category</option>
      </select>
      <input
        type="text"
        placeholder="expense description"
        onChange={(event) => {
          props.newDesc(event.target.value);
        }}
      />
      <input
        type="number"
        placeholder="expense amount"
        onChange={(event) => {
          props.newAmount(event.target.value);
        }}
      />

      <input
        type="date"
        placeholder="date"
        onChange={(event) => {
          handleNewDate(event.target.value);
        }}
      />
      <button onClick={props.createExp}>Add Expense</button>
    </div>
  );
}

export default ExpForm;
