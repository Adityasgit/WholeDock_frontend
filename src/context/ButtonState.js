import ButtonContext from "./ButtonContext";
import { useState } from "react";

const ButtonState = (props) => {
  const [burger, setburger] = useState(true);
  const setBurger = () => {
    setburger(!burger);
  };
  const [search, setsearch] = useState(false);
  const setSearch = () => {
    setsearch(!search);
  };
  const sortinit = {
    sort: {
      val: "priority,_id",
    },
  };
  const [sort, setsort] = useState(sortinit);
  const setSort = (sort) => {
    setsort({ sort });
  };
  const [Allproducts, setallproducts] = useState([]);
  const setAllproducts = (newval) => {
    setallproducts(newval);
  };
  const [value, setvalue] = useState([0, 1000]);
  const setValue = (val) => {
    setvalue(val);
  };
  const [category, setcategory] = useState("");
  const setCategory = (val) => {
    setcategory(val);
  };
  const [account, setaccount] = useState(false);
  const setAccount = () => {
    setaccount(!account);
  };
  return (
    <ButtonContext.Provider
      value={{
        account,
        setAccount,
        category,
        setCategory,
        value,
        setValue,
        Allproducts,
        setAllproducts,
        burger,
        setBurger,
        search,
        setSearch,
        sort,
        setSort,
      }}
    >
      {props.children}
    </ButtonContext.Provider>
  );
};
export default ButtonState;
