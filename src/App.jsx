import { useState } from "react"

function App() {
  const [ageList, setAgeList] = useState([{'age':''}])
  const handleAgeAdd = () => {
    setAgeList([...ageList, {'age':''}])
  }
  const handleRemoveAge = (index)=>{
    const newList = [...ageList]
    newList.splice(index, 1)
    setAgeList(newList)
  }
  const handleAgeChange = (e,index)=>{
    const {name, value} = e.target
    const newList = [...ageList]
    newList[index][name] = value
    setAgeList(newList)
  }
  const handleSubmit =async (e)=>{
    e.preventDefault()
    console.log('submitted')
    let ages = []
    // get values of ages from ageList
    for(let i = 0; i < ageList.length; i++){
      ages.push(ageList[i].age)
    }
    // get sumInsurance, city tier and tenure
    const sumInsurance = document.querySelector('input[name="insurance"]:checked').value
    const cityTier = document.querySelector('input[name="city-tier"]:checked').value
    const tenure = document.querySelector('input[name="tenure"]:checked').value

    const body = {
      "age_list" : ages,
      "sum_insured" : sumInsurance,
      "city_tier" : cityTier,
      "tenure" : tenure
    }
    console.log(body)
    // send it to the server as a post request with content type as application/json
    const response = await fetch('https://srinivasmekala.me/calc-premium', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
    if(response.status === 200){
      const data = await response.json()
      console.log(data)
      alert(`Your Premium is ${data.expectedPremium}`)
    }
  }
  return (
    <>
     <div className="bg-gradient-to-br from-blue-500 via-blue-400 to-blue-600 w-full h-screen flex justify-around items-center">
      <form onSubmit={handleSubmit} className="bg-slate-800 bg-opacity-80 p-10 rounded-lg">
        <div id="form-field" className="text-white">
          <label htmlFor="age" className="text-xl font-semibold">Add age(s) of members:</label>
      {ageList.map((age, index) => (
          <div key={index} id="ages" className="py-2 flex flex-col gap-2">
            <div id="first-division" className="flex gap-5">
              <input required type="number" name="age" id="age" max={90} value={age.age} onChange={(e)=> handleAgeChange(e, index)} className="rounded-lg text-black focus:outline-none focus:border-none p-1 w-1/2" />
              {ageList.length-1 === index && ageList.length<4 && 
              <button onClick={handleAgeAdd} type='button' id="add-btn" className="w-1/3 text-white bg-blue-600  hover:bg-blue-800 hover:to-blue-400 font-medium rounded-lg text-sm px-2 py-1 text-center">
                <span>Add Member</span>
              </button>
              }
            </div>
            <div id="second-division" className="">
              {ageList.length > 1 && 
              <button onClick={()=>handleRemoveAge(index)} className="bg-red-600 text-sm font-semibold px-2 py-1 rounded-lg" type="button" id="remove-btn">
                <span>Remove</span>
              </button>
              }
            </div>
          </div>
      ))}
          <label htmlFor="insurance" className="text-xl font-semibold">Sum Insured:</label>
          <div id="suminsured" className="flex justify-around">
            {/* add radio buttons with three options 300000, 400000, 500000 */}
            <div className="p-1">
              <input type="radio" required name="insurance" id="3l" value="300000" />
              <label htmlFor="3l"> $300,000</label>
            </div>
            <div className="p-1">
              <input type="radio" required name="insurance" id="4l" value="400000" />
              <label htmlFor="4l"> $400,000</label>
            </div>
            <div className="p-1">
              <input type="radio" required name="insurance" id="5l" value="500000" />
              <label htmlFor="5l"> $500,000</label>
            </div>
          </div>
          <label htmlFor="city-tier" className="text-xl font-semibold">City Tier:</label>
          <div id="city-tier" className="flex justify-around">
            {/* add radio buttons wiht two options Tier1 and Tier2  */}
            <div className="p-1">
              <input type="radio" required name="city-tier" id="tier1" value="1" />
              <label htmlFor="tier1"> Tier-1</label>
            </div>
            <div className="p-1">
              <input type="radio" required name="city-tier" id="tier2" value="2" />
              <label htmlFor="tier2"> Tier-2</label>
            </div>
          </div>
          <label htmlFor="tenure" className="text-xl font-semibold">Tenure:</label>
          <div id="tenure" className="flex  justify-around">
            {/* add radio buttons with two options 1 and 2  */}
            <div className="p-1">
              <input type="radio" name="tenure" required id="1" value="1" />
              <label htmlFor="1"> 1 Year</label>
            </div>
            <div className="p-1">
              <input type="radio" name="tenure"required  id="2" value="2" />
              <label htmlFor="2"> 2 Years</label>
            </div>
          </div>
          <div id="submit" className="p-5 text-center">
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Calculate Premuim
                <svg aria-hidden="true" className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
            </button>          
          </div>

        </div>
      </form>
      <div id="premium-output" className="w-20 h-20 bg-yellow-200 hidden"></div>
     </div>
    </>
  )
}

export default App
