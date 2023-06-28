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
     <div className="">
      <form onSubmit={handleSubmit} className="">
        <div id="form-field" className="">
          <label htmlFor="age">User&apos; Age:</label>
      {ageList.map((age, index) => (
          <div key={index} id="ages" className="">
            <div id="first-division" className="">
              <input required type="number" name="age" id="age" max={90} value={age.age} onChange={(e)=> handleAgeChange(e, index)} className="" />
              {ageList.length-1 === index && ageList.length<4 && 
              <button onClick={handleAgeAdd} type='button' id="add-btn" className="">
                <span>Add Member</span>
              </button>
              }
            </div>
            <div id="second-division" className="">
              {ageList.length > 1 && 
              <button onClick={()=>handleRemoveAge(index)} type="button" id="remove-btn">
                <span>Remove</span>
              </button>
              }
            </div>
          </div>
      ))}
          <label htmlFor="insurance">Sum Insured:</label>
          <div id="suminsured" className="">
            {/* add radio buttons with three options 300000, 400000, 500000 */}
            <input type="radio" required name="insurance" id="3l" value="300000" />
            <label htmlFor="3l">$300,000</label>
            <input type="radio" required name="insurance" id="4l" value="400000" />
            <label htmlFor="4l">$400,000</label>
            <input type="radio" required name="insurance" id="5l" value="500000" />
            <label htmlFor="5l">$500,000</label>
          </div>
          <label htmlFor="city-tier">City Tier:</label>
          <div>
            {/* add radio buttons wiht two options Tier1 and Tier2  */}
            <input type="radio" required name="city-tier" id="tier1" value="1" />
            <label htmlFor="tier1">Tier1</label>
            <input type="radio" required name="city-tier" id="tier2" value="2" />
            <label htmlFor="tier2">Tier2</label>
          </div>
          <label htmlFor="tenure">Tenure:</label>
          <div id="tenure">
            {/* add radio buttons with two options 1 and 2  */}
            <input type="radio" name="tenure" required id="1" value="1" />
            <label htmlFor="1">1</label>
            <input type="radio" name="tenure"required  id="2" value="2" />
            <label htmlFor="2">2</label>
          </div>
          <div id="submit">
            <button type="submit" id="submit" className="">Calculate Premuim</button>
          </div>

        </div>
      </form>
     </div>
    </>
  )
}

export default App
