import {
  collection,
  getDocs, 
} from "firebase/firestore";
import { db } from "./../firebase";
import { useState, useEffect } from "react";

function CategoriesSelect(props) {
  const { userId } = props;
  const [categories, setCategories] = useState([]);

  const categoriesCollectionRef = collection(db, "users", userId, "category");

  useEffect(() => {
    const getCategories = async () => {
      const data = await getDocs(categoriesCollectionRef);
      setCategories(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getCategories();
  });

  return (
    <select className="editInput showOnEdit expNameInput">
      <option value="">Select Category</option>
      {categories.map((el) => {
        return (
          <option key={el.id} value={el.cat_name}>
            {el.cat_name}
          </option>
        );
      })}
    </select>
  );
}
export default CategoriesSelect;
