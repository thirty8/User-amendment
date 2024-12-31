import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import Swal from "sweetalert2";
import ListOfValue from "../../components/ListOfValue";
import CustomTable from "../../../../../../components/others/customtable";

import qs from "qs";
import InputField from "../../components/InputField";

const Hobby = () => {
  const [hobbies, setHobbies] = useState([]);
  const [selectedHobbies, setSelectedHobbies] = useState([]);
  const [selectedHobbies1, setSelectedHobbies1] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [displayHobbies, setDisplayHobbies] = useState([]);
  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    const fetchHobbies = async () => {
      const data = qs.stringify({
        fname: "nadine",
        lname: "s,jhdkjf",
      });
  
      const config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "http://10.203.14.15:3321/api/getHobbyLov",
        headers: {
          "x-api-key":
            "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: data,
      };
  
      try {
        const response = await axios.request(config);
        console.log(response.data,'ggg')
        
        // if (Array.isArray(response.data)) {
        if (response.data.length > 0) {

          
          setHobbies(response.data);
          // console.log("New Hobbies:", NewData);
        } else {
          console.error("API did not return an array:", response.data);
        }
      } catch (error) {
        console.error("Error fetching hobbies:", error);
      }
    };
  
    fetchHobbies();
  }, []);
  



  
  function TickCheckBox(val){

    console.log(selectedItems,val,selectedItems.includes(val),'check')
    return selectedItems.includes(val)
  }


  useEffect(()=>{

  } , [])

  const toggleSelection = (value) => {
    // console.log(selectedItemsarray)
    setSelectedItems((prev) =>
      prev.includes(value)
      ? prev.filter((item) => item !== value)
      : [...prev, value]
    );
  //  setIsChanged(!isChanged)
  };

  const [isValue, setIsValue] = useState("");
  

  const handleHobbySelection = (value) => {
    setIsValue(value)
    // const selectedHobby = hobbies.find((hobby) => hobby.value === value);
    const selectedHobby = value?.trim();
    console.log("get Value", {value , selectedHobby , selectedHobbies , selectedHobbies1})
    //  alert("ghanananan")
    
  if (selectedHobbies.length > 0 && selectedHobbies.some((hobby) => hobby[1]?.trim() === selectedHobby)) {

    Swal.fire({
              title: "Warning",
              text: "This hobby is already selected.",
              icon: "info",
              confirmButtonText: "OK",
            });
      } else {
        const ttt =  hobbies.find((hobby)=>hobby.value === selectedHobby)
        let arr = ttt.label.split(' - ')
        
        
        setSelectedHobbies1((prev)=>([...prev , [...arr]]))
        
      }
      setIsChanged(!isChanged)
  };


  useEffect(()=>{
    // alert("ghanananan")

    const res = selectedHobbies1?.map((i)=>
      [<input
        type="checkbox"
        className="h-4 w-4 cursor-pointer"
       
        checked={selectedItems.includes(i[0]?.trim())}
        // checked={true}
      
        onChange={() => {
         
          setIsChanged(!isChanged)
          if(selectedItems.includes(i[0]?.trim())){
            const gh = selectedItems.filter((a)=>a !== i[0]?.trim())
            setSelectedItems(gh)
            return
          }
          setSelectedItems((prev)=>[...prev , i[0]?.trim() ])
          // toggleSelection()
        }
        }
      />,
 ...i
    ]) 
    setSelectedHobbies(res)

  } , [isChanged])
  const handleDelete = () => {
    setIsChanged(!isChanged);
    setSelectedHobbies1((prev) => 
      prev.filter((i) => !selectedItems.includes(i[0]?.trim()))
    );
    setSelectedItems([]);
  };
  console.log("selcted hoobies", selectedHobbies1, isChanged)

  return (
    <div className="p-4">
      <div className="flex items-center gap-4 mb-4">
        <ListOfValue
          className="text-gray-700 text-xl font-semibold"
          label="Select Preferred Hobby"
          inputWidth="400px"
          data={hobbies}
          onChange={handleHobbySelection}
        />
        <div className={`${isValue === '001' ? '' : 'hidden'}` }>
        <InputField
          label='Others'
          inputWidth='500px'
          
        />
        </div>
        {selectedItems.length > 0 && (
          <button
            onClick={handleDelete}
            className="p-2 bg-red-600 w-[100px] text-white rounded flex items-center gap-2"
          >
            <MdDelete />
            Delete
          </button>
        )}
      </div>

      <div className="mt-2 text-center">
        <CustomTable
          headers={["Select", "Code", "Description"]}
          data={selectedHobbies}
        />
      </div>
    
      <div className="flex justify-end mt-4">
        <button className="border text-white w-[100px] p-2 bg-blue-700 ">Save</button>
      </div>
    </div>
  );
};

export default Hobby;