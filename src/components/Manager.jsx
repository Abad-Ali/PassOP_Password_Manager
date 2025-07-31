import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
  const ref = useRef()
  const passwordRef = useRef()
  const [form, setform] = useState({site: "", username: "", password: ""})
  const [passwordArray, setpasswordArray] = useState([])

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    let passwordArray;
    if(passwords){
      setpasswordArray(JSON.parse(passwords))
    }
  }, [])

  const copyText = (text)=>{
    // alert("Copied to the clipboard " + text)
    toast('Copied to clipboard!', {
      position: "bottom-right",
      autoClose: 500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: "Bounce",
      });
    navigator.clipboard.writeText(text)
  }
  

  const showPassword = ()=>{
    // alert("Show the password")
    // console.log(ref.current.src)
    passwordRef.current.type="text"
    if(ref.current.src.includes("icons/eyecross.png")){
      ref.current.src="icons/eye.png"
      passwordRef.current.type="password"
    }else{
      ref.current.src="icons/eyecross.png"
      passwordRef.current.type="text"
    }
  }

  const savePassword = ()=>{
    if(form.site.length > 3 && form.username.length > 3 && form.password.length > 3){
      // console.log(form)
    setpasswordArray([...passwordArray, {...form, id: uuidv4()}])
    localStorage.setItem("passwords",JSON.stringify([...passwordArray, {...form, id: uuidv4()}]))
    // console.log([...passwordArray, form])
    setform({site: "", username: "", password: ""})
    toast('Password saved sucessfully!', {
      position: "bottom-right",
      autoClose: 500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: "Bounce",
      });
    }else{
      toast('Error: Password not saved!', {
        position: "bottom-right",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: "Bounce",
        });
    }
  }

  const deletePassword = (id)=>{
    // console.log("Deleting the password with id: ", id)
    let c = confirm("Do you want to delete this password")
    if(c){
      setpasswordArray(passwordArray.filter(item=>item.id!==id))
      localStorage.setItem("passwords",JSON.stringify(passwordArray.filter(item=>item.id!==id)))
      toast('Deleted sucessfuly!', {
        position: "bottom-right",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: "Bounce",
        });
    }
  }

  const editPassword = (id)=>{
    // console.log("Editing password with id: ", id)
    setform(passwordArray.filter(i=>i.id===id)[0])
    setpasswordArray(passwordArray.filter(item=>item.id!==id))
    localStorage.setItem("passwords",JSON.stringify(passwordArray.filter(item=>item.id!==id)))
  }


  const handleChange = (e)=> {
  setform({...form,[e.target.name]: e.target.value})
  }

  return (
    <>
    
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
      transition="Bounce"
      />

      <div className='mx-auto max-w-4xl p-4'>

          <h1 className='text-5xl text-white font-bold text-center mt-10'>
          <span className='text-blue-700'>&lt;</span>
            Pass
            <span className='text-blue-700'>Op/&gt;</span>
          </h1>
          <p className='text-blue-700 text-xl m-3 text-center'>Your Own Password Manager</p>

          <div className='text-black flex flex-col p-3'>
             <input value={form.site} onChange={handleChange} placeholder='Enter the website URL' className='rounded-xl border border-blue-700 p-1 w-full bg-white px-3 md:text-xl' type='text' name='site' id='site' ></input>
             <div className='flex flex-col md:flex-row gap-5 w-full justify-between my-5'>
               <input value={form.username} onChange={handleChange} className='rounded-xl border border-blue-700 p-1 w-full bg-white px-3 md:text-xl' type='text' name='username' id='username' placeholder='Enter the Username'></input>
               <div className='relative w-full'>
                  <input ref={passwordRef} value={form.password} onChange={handleChange} className='rounded-xl border border-blue-700 p-1 w-full bg-white px-3 md:text-xl pr-10' type='password' name='password' id='password' placeholder='Enter Password'></input>
                  <span className='absolute right-[4px] top-[4px] cursor-pointer' onClick={showPassword}>
                   <img ref={ref} className='p-2 ' width={31} md:width={34} src='icons/eye.png' alt='eye'></img>
                  </span>
               </div>
             </div>
             
            <button onClick={savePassword} className='flex justify-center items-center gap-1 md:gap-3 bg-blue-700 border hover:border-white  hover:cursor-pointer md:text-xl p-1 font-bold rounded-full'>
              <lord-icon src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover">
              </lord-icon>
              <span className='hidden md:block'>Add Password</span>
              <span className='block md:hidden text-xl'>Save Password</span>
            </button>
             
          </div>

          <div className='passwords'>
            <h2 className='font-bold md:text-xl pt-5 md:py-5 text-white flex justify-center ml-3 mt-4'>Your Passwords</h2>
            {passwordArray.length === 0 && <div className='text-gray-500 text-xl flex justify-center mt-25 md:mt-10 font-bold ml-3 mb-30 md:mb-16'>No Passwords to show</div>}
            
            {passwordArray.length != 0 && 
            <div className=" border border-blue-700 mt-4  overflow-auto  mb-15">
              {/* md:overflow-visible */}
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className=" text-gray-700 uppercase bg-gray-50 dark:bg-black dark:text-white">
                        <tr>
                            <th scope="col" className="pl-3 md:px-6 md:py-3 hidden md:block">
                                S.no
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Website URL
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Username
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Passwords
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                      {passwordArray.map((item, index)=>{
                        return<tr key={index} className="bg-white border-b dark:bg-black dark:border-gray-700 border-gray-200 dark:text-white">
                          
                            <th scope="row" className="hidden md:block pl-6 md:px-6 md:py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white ">
                                {index+1}
                            </th>
                            <td className="px-6 py-4">
                              <div className="flex items-center justify-between space-x-2">
                                  <a href={item.site} target='_blank'>{item.site}</a>
                                  <div className='lordiconcopy size-7 cursor-pointer bg-blue-700 rounded-r-lg rounded-l-lg ml-25' onClick={() => {   copyText(item.site) }}>
                                      <lord-icon
                                          style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                          src="https://cdn.lordicon.com/iykgtsbt.json"
                                          trigger="hover" >
                                      </lord-icon>
                                  </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex items-center justify-between space-x-2">  {/* Flexbox container */}
                                    <span>{item.username}</span>  {/* Use span for text */}
                                    <div className='lordiconcopy size-7 cursor-pointer bg-blue-700 rounded-r-lg rounded-l-lg ' onClick={() => { copyText(item.username) }}>
                                        <lord-icon
                                            style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                            src="https://cdn.lordicon.com/iykgtsbt.json"
                                            trigger="hover">
                                        </lord-icon>
                                    </div>
                                </div>
                            </td>

                            <td className="px-6 py-4">
                            <div className="flex items-center justify-between space-x-2">
                                <span>{"*".repeat(item.password.length)}</span>
                                <div className='lordiconcopy size-7 cursor-pointer bg-blue-700 rounded-r-lg rounded-l-lg ' onClick={() => { copyText(item.password) }}>
                                    <lord-icon
                                        style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                        src="https://cdn.lordicon.com/iykgtsbt.json"
                                        trigger="hover" >
                                    </lord-icon>
                                </div>
                              </div>  
                            </td>
                            
                            <td className='justify-center text-center'>
                                <span className='cursor-pointer mx-2 bg-blue-700 pt-4 px-1 rounded-r-lg rounded-l-lg' onClick={()=>{editPassword(item.id)}}>
                                    <lord-icon
                                        src="https://cdn.lordicon.com/gwlusjdu.json"
                                        trigger="hover"
                                        style={{"width":"25px", "height":"25px"}}>
                                    </lord-icon>
                                </span>
                                <span className='cursor-pointer mx-2 bg-blue-700 pt-4 px-1 rounded-r-lg rounded-l-lg'onClick={()=>{deletePassword(item.id)}}>
                                    <lord-icon
                                        src="https://cdn.lordicon.com/skkahier.json"
                                        trigger="hover"
                                        style={{"width":"25px", "height":"25px"}}>
                                    </lord-icon>
                                </span>
                            </td>
                            
                        </tr>
                        })}
                    </tbody>
                </table>
            </div>}

          </div>

      </div>
    </>
  )
}

export default Manager
