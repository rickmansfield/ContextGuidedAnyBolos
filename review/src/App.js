import React, { useState, useReducer, createContext, useContext } from "react";
import data from "./data";
import { reducer, initialState } from "./reducer";
import { setName, setLocation } from "./reducer";

const PersonContext = createContext()//create context which gives us Provider pattern
const AvengerContext = createContext()

const App = () => {
//   const [person, setPerson] = useState(data);
    const [person, dispatch] = useReducer(reducer, initialState)
  console.log(person);
  return (
    <div className="App component">
      <h1>Main App</h1>
      <PersonContext.Provider value={[person, dispatch]}>
        {/* the "value is where data is bridged from what you want to pass between files" */}
          <AvengerContext.Provider value={{alias: 'Ironman'}}>
            <SubComp1 />
        </AvengerContext.Provider>
      </PersonContext.Provider>
    </div>
  );
};

const SubComp1 = () => {
    const [person] = useContext(PersonContext)
  return (
    <div className="component">
      <h1>Sub Comp 1</h1>
      <h2>
        {person.name.first} {person.name.last}
      </h2>
      <SubComp2 />
    </div>
  );
};

const SubComp2 = () => {
    const [person] = useContext(PersonContext)
  return (
    <div className="component">
      <h1>Sub Comp 2</h1>
      <h2>{person.location.street}</h2>
      <h2>
        {person.location.city}, {person.location.state}{" "}
        {person.location.postcode}
      </h2>
      <SubComp3 />
    </div>
  );
};

const SubComp3 = () => {
    const [person, dispatch] = useContext(PersonContext)
    const {alias} = useContext(AvengerContext)
  const changeName = () => {
       dispatch(setName("Mr", "Tony", "Stark"))
  };

  const changeLocation = () => {
      dispatch(setLocation('10880 Malibu Point', 'Malibu', 'CA', '90265'))
    //   setPerson({
    //       ...person,
    //       location: {
    //           city: 'Malibu',
    //           street: '10880 Malibu Point',
    //           state: 'CA',
    //           postcode: '90265'
    //       }
    //   })
  }

  return (
    <div className="component">
      <h1>Sub Comp 3</h1>
      <h1>{alias}</h1>
      <button onClick={changeName}>Change Name</button>
      <button onClick={changeLocation}>Change Location</button>
    </div>
  );
};

export default App;
