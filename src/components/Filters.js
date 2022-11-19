function Filters(props) {
  return (
    <div>
      <select
        onChange={(e) => {
          props.setFilterName(e.target.value);
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
      </select>

      <select
        onChange={(e) => {
          props.setMonthFilterName(e.target.value);
        }}
      >
        <option value="">Select Month</option>
        {props.monthly.map((el) => {
          return (
            <option key={el.id} value={el.month}>
              {el.month}
            </option>
          );
        })}
      </select>

      <select
        onChange={(e) => {
          props.setYearFilterName(e.target.value);
        }}
      >
        <option value="">Select Year</option>
        {props.yearly.map((el) => {
          return (
            <option key={el.id} value={el.year}>
              {el.year}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default Filters;
