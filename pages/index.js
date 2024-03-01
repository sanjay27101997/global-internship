import React from "react";
import "react-phone-number-input/style.css";

import PhoneInput from "react-phone-number-input";
import { useState, useEffect } from "react";
const axios = require("axios");
import { API_URL } from "../config/constants";
import { route } from "next/dist/next-server/server/router";
import { useRouter } from "next/router";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const index = () => {
  const router = useRouter();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");//

  const [email, setEmail] = useState("");

  const [dob, setDob] = useState("");

  const [phoneNumber, setPhoneNumber] = useState("");
  const [stphoneNumber, setStPhoneNumber] = useState("");//
  const [parentemail, setParentemail] = useState("");

  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [address, setAddress] = useState("");//

  const [schoolname, setSchoolname] = useState("");
  const [gpa, setGpa] = useState("");

  const [indentedmajor, setIndentedmajor] = useState("");

  const [yourself, setYourself] = useState("");
  // const [ideas, setIdeas] = useState("");

  const [referance, setReferance] = useState("");
  const [referancename, setReferancename] = useState("");
  const [referanceemail, setReferanceemail] = useState("");//

  const [awards, setAwards] = useState("");
  const [achievements, setAchievements] = useState("");

  const [display, setDisplay] = useState(false);
  const [errormessage, setErrormessage] = useState(false);
  const [erroremail, setErroremail] = useState(false);
  const [errorparentemail, setErrorparentemail] = useState(false);
  const [errorreferanceemail, setErrorreferanceemail] = useState(false);

  const handlePhoneNumberChange = (value) => {
    setPhoneNumber(value); // Update the phoneNumber state when the input value changes
  };

  const handlePhoneNumberChangest = (value) => {
    setStPhoneNumber(value); // Update the phoneNumber state when the input value changes
  };

  function isValidEmail(email) {
    // Regular expression to match email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function submitForm(e) {
    e.preventDefault();
    let register_error = false;
    if (
      firstname.trim() === "" ||
      lastname.trim() === "" ||
      email.trim() === "" ||
      // dob.trim() === "" ||
      stphoneNumber.trim() === "" ||
      phoneNumber.trim() === "" ||
      parentemail.trim() === "" ||
      city.trim() === "" ||
      state.trim() === "" ||
      address.trim() === "" ||
      schoolname.trim() === "" ||
      gpa.trim() === "" ||
      indentedmajor.trim() === "" ||
      yourself.trim() === "" ||
      referanceemail.trim() === "" ||
      referance.trim() === "" ||
      referancename.trim() === ""
    ) {
      setErrormessage(true);
      register_error = true;
    } else {
      register_error = false;
    }

    if (register_error === false) {
      axios
        .post(API_URL + "registrationform/add_student.php", {
          first_name: firstname,
          last_name: lastname,
          email: email,
          dob: dob,
          st_phoneNumber:stphoneNumber,
          parents_no: phoneNumber,
          

          parents_email: parentemail,
          city: city,
          state: state,
          address:address,

          school_name: schoolname,
          gpa: gpa,
          indented_major: indentedmajor,

          yourself: yourself,
          // ideas: ideas,

          reference: referance,
          reference_name: referancename,
          referance_email:referanceemail,

          awards: awards,
          achievement: achievements,
        })
        .then(function (response) {
          if (response.data.meta.error === true) {
            // setAddUserMessage({
            //   type: "error",
            //   message: response.data?.meta?.message,
            //   icon: "error",
            // });
          }
          if (response.data.meta.error === false) {
            router.push("/successpage");

            // setAddUserMessage({
            //   type: "success",
            //   message: response.data?.meta?.message,
            //   icon: "loading",
            // });
            // props.userAdded(response.data?.id);
            // closedSuccess(response.data?.meta?.message);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  return (
    <div className="md:px-7">
      <section class="bg-coolGray-50 py-4">
        <div class="container px-4 mx-auto">
          <div class="p-6 h-full border border-coolGray-100 overflow-hidden bg-white rounded-md shadow-dashboard">
            <div class="md:hidden">
              <div class="flex justify-center items-center">
                <img
                  src="/nirmaan_logo.png"
                  alt="Logo"
                  class="w-40 h-30 mr-2"
                />
              </div>

              <div class="flex justify-center items-center pt-3">
                <div class="text-coolGray-900 text-2xl md:text-3xl font-semibold text-center">
                  Global Internships Registration
                </div>
              </div>
            </div>

            <div class="hidden md:block w-full">
              <div className="flex items-center justify-between px-40">
                <div class="flex justify-center items-center pt-3">
                  <div class="text-coolGray-900 text-2xl md:text-3xl font-semibold text-center">
                    Global Internships Registration
                  </div>
                </div>

                <div class="flex justify-center items-center">
                  <img
                    src="/nirmaan_logo.png"
                    alt="Logo"
                    class="w-40 h-30 mr-2"
                  />
                </div>
              </div>
            </div>

            {/* <div class="md:block md:pb-6 border-b border-coolGray-100 md:flex md:justify-between md:items-center  grid md:px-40">
  <div class="flex items-center md:order-1 order-2">

  <span class="text-coolGray-900 text-2xl md:text-3xl font-semibold">Global Internships Registration</span>
  </div>

  <div class="flex-1 items-center md:order-2 order-1">

  <img src="/nirmaan_logo.png" alt="Logo" class="w-40 h-30 mr-2"/> 
  </div>
</div> */}

            <div class="py-6 border-b border-coolGray-100 flex justify-center">
              <div class="w-full md:w-9/12">
                <div class="flex flex-wrap -m-3">
                  {/* <div class="w-full md:w-1/3 p-3">
              <p class="text-sm text-coolGray-800 font-semibold">Name</p>
            </div> */}
                  <div class="w-full md:w-1/2 p-3">
                    <span className="text-sm text-coolGray-800 font-semibold text-gray-500">
                      First Name <span className="text-red-500">*</span>{" "}
                    </span>
                    <input
                      onChange={(e) => {
                        setFirstname(e.target.value);
                      }}
                      class="w-full px-4 py-2.5 text-base text-coolGray-900 font-normal outline-none focus:border-green-500 border border-coolGray-200 rounded-lg shadow-input"
                      type="text"
                      placeholder=""
                      required
                    />
                  </div>
                  <div class="w-full md:w-1/2 p-3">
                    <span className="text-sm text-coolGray-800 font-semibold text-gray-500">
                      Last Name <span className="text-red-500">*</span>{" "}
                    </span>
                    <input
                    onChange={(e) => {
                        setLastname(e.target.value);
                      }}
                      class="w-full px-4 py-2.5 text-base text-coolGray-900 font-normal outline-none focus:border-green-500 border border-coolGray-200 rounded-lg shadow-input"
                      type="text"
                      placeholder=""
                    />
                  </div>
                </div>
              </div>
            </div>

            <div class="py-6 border-b border-coolGray-100 flex justify-center">
              <div class="w-full md:w-9/12">
                <div class="flex flex-wrap -m-3">
                  <div class="w-full md:w-full p-3">
                    <span className="text-sm text-coolGray-800 font-semibold text-gray-500">
                      Email address <span className="text-red-500">*</span>{" "}
                    </span>
                    <input
                      onChange={(e) => {
                        const inputEmail = e.target.value;
                        const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                        if (!emailFormat.test(inputEmail)) {
                          // Invalid email format
                          setErroremail(true);
                          setEmail("");
                        } else {
                          // Valid email format
                          setErroremail(false);
                          setEmail(inputEmail);
                        }

                        if (inputEmail === "") {
                          setErroremail(false);
                        }
                      }}
                      class="w-full px-4 py-2.5 text-base text-coolGray-900 font-normal outline-none focus:border-green-500 border border-coolGray-200 rounded-lg shadow-input"
                      type="email"
                      placeholder=""
                      required
                    />
                    {erroremail === true ? (
                      <>
                        <span className="text-red-500">
                          Please enter a valid email address.
                        </span>
                      </>
                    ) : (
                      ""
                    )}
                  </div>

                  {/* <div class="w-full md:w-1/2 p-3">
                    <div className="relative">
                      <span className="text-sm text-coolGray-800 font-semibold text-gray-500">
                        Date of Birth <span className="text-red-500">*</span>{" "}
                      </span>

                      <div>
                        <DatePicker
                          selected={dob}
                          onChange={(date) => setDob(date)}
                          dateFormat="MM/dd/yyyy"
                          className="w-full px-4 py-2.5 text-base text-coolGray-900 font-normal outline-none focus:border-green-500 border border-coolGray-200 rounded-lg shadow-input"
                          // Specify your desired date format here
                        />
                      </div>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>


















            <div class="py-6 border-b border-coolGray-100 flex justify-center">
              <div class="w-full md:w-9/12">
                <div class="flex flex-wrap -m-3">

                <div class="w-full md:w-1/2 p-3">
                    <div className="relative">
                      <span className="text-sm text-coolGray-800 font-semibold text-gray-500">
                        Date of Birth <span className="text-red-500">*</span>{" "}
                      </span>

                      <div>
                        <DatePicker
                          selected={dob}
                          onChange={(date) => setDob(date)}
                          dateFormat="MM/dd/yyyy"
                          className="w-full px-4 py-2.5 text-base text-coolGray-900 font-normal outline-none focus:border-green-500 border border-coolGray-200 rounded-lg shadow-input"
                          // Specify your desired date format here
                        />
                      </div>
                    </div>
                  </div>


                  <div className="w-full md:w-1/2 p-3">
                    <div className="relative">
                      <span className="text-sm text-coolGray-800 font-semibold text-gray-500">
                      Student's Phone no <span className="text-red-500">*</span>{" "}
                      </span>
                      <PhoneInput
                        international
                        countryCallingCodeEditable={true}
                        defaultCountry="US"
                        value={stphoneNumber}
                        onChange={handlePhoneNumberChangest}
                        inputClassName="w-full px-4 py-2.5 text-base text-coolGray-900 font-normal outline-none focus:border-green-500 border border-coolGray-200 rounded-lg shadow-input"
                        // Pass custom class to style the input field
                      />
                    </div>
                  </div>

                  
                </div>
              </div>
            </div>

















            <div className="py-6 border-b border-coolGray-100 flex justify-center">
              <div className="w-full md:w-9/12">
                <div className="flex flex-wrap -m-3">
                  {/* <div className="w-full md:w-1/3 p-3">
            <p className="text-sm text-coolGray-800 font-semibold">Parent’s Phone</p>
          </div> */}
                  <div className="w-full md:w-1/2 p-3">
                    <div className="relative">
                      <span className="text-sm text-coolGray-800 font-semibold text-gray-500">
                        Parent’s Phone no <span className="text-red-500">*</span>{" "}
                      </span>
                      <PhoneInput
                        international
                        countryCallingCodeEditable={true}
                        defaultCountry="US"
                        value={phoneNumber}
                        onChange={handlePhoneNumberChange}
                        inputClassName="w-full px-4 py-2.5 text-base text-coolGray-900 font-normal outline-none focus:border-green-500 border border-coolGray-200 rounded-lg shadow-input"
                        // Pass custom class to style the input field
                      />
                    </div>
                  </div>
                  <div className="w-full md:w-1/2 p-3">
                    <span className="text-sm text-coolGray-800 font-semibold text-gray-500">
                      Parent's Email <span className="text-red-500">*</span>{" "}
                    </span>
                    <input
                      onChange={(e) => {
                        const inputEmail = e.target.value;
                        const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                        if (!emailFormat.test(inputEmail)) {
                          // Invalid email format
                          setErrorparentemail(true);
                          setParentemail("");
                        } else {
                          // Valid email format
                          setErrorparentemail(false);
                          setParentemail(inputEmail);
                        }

                        if (inputEmail === "") {
                          setErrorparentemail(false);
                        }
                      }}
                      class="w-full px-4 py-2.5 text-base text-coolGray-900 font-normal outline-none focus:border-green-500 border border-coolGray-200 rounded-lg shadow-input"
                      type="email"
                      placeholder=""
                      required
                    />
                    {errorparentemail === true ? (
                      <>
                        <span className="text-red-500">
                          Please enter a valid email address.
                        </span>
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* <div class="py-6 border-b border-coolGray-100">
        <div class="w-full md:w-9/12">
          <div class="flex flex-wrap -m-3">
            <div class="w-full md:w-1/3 p-3">
              <p class="text-sm text-coolGray-800 font-semibold">Parent's Phone Number</p>
            </div>
            <div class="w-full md:w-1/3 p-3">
              <input class="w-full px-4 py-2.5 text-base text-coolGray-900 font-normal outline-none focus:border-green-500 border border-coolGray-200 rounded-lg shadow-input" type="tel" placeholder="Country Code"/>
            </div>
            <div class="w-full md:w-1/3 p-3">
              <input class="w-full px-4 py-2.5 text-base text-coolGray-900 font-normal outline-none focus:border-green-500 border border-coolGray-200 rounded-lg shadow-input" type="tel" placeholder="Phone Number"/>
            </div>
          </div>
        </div>
      </div> */}

            <div class="py-6 border-b border-coolGray-100 flex justify-center">
              <div class="w-full md:w-9/12">
                <div class="flex flex-wrap -m-3">
                  <div class="w-full md:w-1/2 p-3">
                    <span className="text-sm text-coolGray-800 font-semibold text-gray-500">
                      City <span className="text-red-500">*</span>{" "}
                    </span>
                    <input
                      onChange={(e) => {
                        setCity(e.target.value);
                      }}
                      class="w-full px-4 py-2.5 text-base text-coolGray-900 font-normal outline-none focus:border-green-500 border border-coolGray-200 rounded-lg shadow-input"
                      type="text"
                      placeholder=""
                      required
                    />
                  </div>
                  <div class="w-full md:flex-1 p-3">
                    <span className="text-sm text-coolGray-800 font-semibold text-gray-500">
                      State <span className="text-red-500">*</span>{" "}
                    </span>
                    <input
                      onChange={(e) => {
                        setState(e.target.value);
                      }}
                      class="w-full px-4 py-2.5 text-base text-coolGray-900 font-normal outline-none focus:border-green-500 border border-coolGray-200 rounded-lg shadow-input"
                      type="text"
                      placeholder=""
                      required
                    />
                  </div>
                </div>
              </div>
            </div>


            <div class="pt-6  flex justify-center">
              <div class="w-full md:w-9/12">
                <div class="flex flex-wrap -m-3">
                  <div class="w-full p-3">
                    <p class="text-sm text-coolGray-800 font-semibold text-gray-500">
                      Address <span className="text-red-500">*</span>
                    </p>
                  </div>
                  <div class="w-full p-3">
                    <textarea
                      onChange={(e) => {
                        setAddress(e.target.value);
                      }}
                      class="block w-full h-40 p-6 text-base text-coolGray-900 font-normal outline-none focus:border-green-500 border border-coolGray-200 rounded-lg shadow-input resize-none"
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>

            {/* <div class="py-6 border-b border-coolGray-100">
        <div class="w-full md:w-9/12">
          <div class="flex flex-wrap -m-3">
            <div class="w-full md:w-1/3 p-3">
              <p class="text-sm text-coolGray-800 font-semibold">State</p>
            </div>
            <div class="w-full md:flex-1 p-3">
            <span className='text-sm text-coolGray-800 font-semibold text-gray-500'>Last Name</span>
              <input class="w-full px-4 py-2.5 text-base text-coolGray-900 font-normal outline-none focus:border-green-500 border border-coolGray-200 rounded-lg shadow-input" type="text" placeholder="State"/>
            </div>
          </div>
        </div>
      </div> */}

            <div class="py-6 border-b border-coolGray-100 flex justify-center">
              <div class="w-full md:w-9/12">
                <div class="flex flex-wrap -m-3">
                  <div class="w-full md:w-1/2 p-3">
                    <span className="text-sm text-coolGray-800 font-semibold text-gray-500">
                      School Name <span className="text-red-500">*</span>{" "}
                    </span>
                    <input
                      onChange={(e) => {
                        setSchoolname(e.target.value);
                      }}
                      class="w-full px-4 py-2.5 text-base text-coolGray-900 font-normal outline-none focus:border-green-500 border border-coolGray-200 rounded-lg shadow-input"
                      type="text"
                      placeholder=""
                      required
                    />
                  </div>
                  <div class="w-full md:flex-1 p-3">
                    <span className="text-sm text-coolGray-800 font-semibold text-gray-500">
                      GPA (on a scale of 4 - unweighted GPA){" "}
                      <span className="text-red-500">*</span>{" "}
                    </span>
                    <input
                      onChange={(e) => {
                        setGpa(e.target.value);
                      }}
                      class="w-full px-4 py-2.5 text-base text-coolGray-900 font-normal outline-none focus:border-green-500 border border-coolGray-200 rounded-lg shadow-input"
                      type="number"
                      // step="0.01"
                      min="0"
                      placeholder=""
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* <div class="py-6 border-b border-coolGray-100">
        <div class="w-full md:w-9/12">
          <div class="flex flex-wrap -m-3">
            <div class="w-full md:w-1/3 p-3">
              <p class="text-sm text-coolGray-800 font-semibold">GPA</p>
            </div>
            <div class="w-full md:flex-1 p-3">
            <span className='text-sm text-coolGray-800 font-semibold text-gray-500'>Last Name</span>
              <input class="w-full px-4 py-2.5 text-base text-coolGray-900 font-normal outline-none focus:border-green-500 border border-coolGray-200 rounded-lg shadow-input" type="number" step="0.01" placeholder="GPA"/>
            </div>
          </div>
        </div>
      </div> */}

            <div class="py-6 border-b border-coolGray-100  flex justify-center">
              <div class="w-full md:w-9/12">
                <div class="flex flex-wrap -m-3">
                  {/* <div class="w-full md:w-1/3 p-3">
              <p class="text-sm text-coolGray-800 font-semibold">Indented Major</p>
            </div> */}
                  <div class="w-full md:flex-1 p-3">
                    <div class="relative">
                      <span className="text-sm text-coolGray-800 font-semibold text-gray-500">
                        Indented Major <span className="text-red-500">*</span>{" "}
                      </span>
                      <select
                        onChange={(e) => {
                          setIndentedmajor(e.target.value);
                        }}
                        class="appearance-none w-full py-2.5 px-4 text-coolGray-900 text-base font-normal bg-white border outline-none border-coolGray-200 focus:border-green-500 rounded-lg shadow-input"
                      >
                        <option>Select</option>
                        <option value="Engineering">Engineering</option>
                        <option value="Medicine">Medicine</option>
                        <option value="Business">Business</option>
                        <option value="Others">Others</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 
      <div class="pt-6">
        <div class="w-full md:w-9/12">
          <div class="flex flex-wrap -m-3">
            <div class="w-full md:w-1/3 p-3">
              <p class="text-sm text-coolGray-800 font-semibold">Bio</p>
              <p class="text-xs text-coolGray-500 font-medium">Lorem ipsum dolor sit amet</p>
            </div>
            <div class="w-full md:flex-1 p-3">
              <textarea class="block w-full h-64 p-6 text-base text-coolGray-900 font-normal outline-none focus:border-green-500 border border-coolGray-200 rounded-lg shadow-input resize-none"></textarea>
            </div>
          </div>
        </div>
      </div> */}

            <div class="pt-6  flex justify-center">
              <div class="w-full md:w-9/12">
                <div class="flex flex-wrap -m-3">
                  <div class="w-full p-3">
                    <p class="text-sm text-coolGray-800 font-semibold text-gray-500">
                      Tell us about yourself (250 to 300 words){" "}
                      <span className="text-red-500">*</span>
                    </p>
                  </div>
                  <div class="w-full p-3">
                    <textarea
                      onChange={(e) => {
                        setYourself(e.target.value);
                      }}
                      class="block w-full h-40 p-6 text-base text-coolGray-900 font-normal outline-none focus:border-green-500 border border-coolGray-200 rounded-lg shadow-input resize-none"
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>

            {/* <div class="pt-6  flex justify-center">
              <div class="w-full md:w-9/12">
                <div class="flex flex-wrap -m-3">
                  <div class="w-full p-3">
                    <p class="text-sm text-coolGray-800 font-semibold text-gray-500">
                      Tell us about your ideas (250 to 300 words){" "}
                      <span className="text-red-500">*</span>
                    </p>
                  </div>
                  <div class="w-full p-3">
                    <textarea
                      onChange={(e) => {
                        setIdeas(e.target.value);
                      }}
                      class="block w-full h-40 p-6 text-base text-coolGray-900 font-normal outline-none focus:border-green-500 border border-coolGray-200 rounded-lg shadow-input resize-none"
                    ></textarea>
                  </div>
                </div>
              </div>
            </div> */}

            <div class="pt-6  flex justify-center">
              <div class="w-full md:w-9/12">
                <div class="flex flex-wrap -m-3">
                  {/* <div class="w-full md:w-1/3 p-3">
        <p class="text-sm text-coolGray-800 font-semibold">Reference Name</p>
      </div> */}
                  <div class="w-full md:w-1/2 p-3">
                    <span className="text-sm text-coolGray-800 font-semibold text-gray-500">
                      Reference <span className="text-red-500">*</span>{" "}
                    </span>
                    <select
                      onChange={(e) => {
                        setReferance(e.target.value);
                      }}
                      class="appearance-none w-full py-2.5 px-4 text-coolGray-900 text-base font-normal bg-white border outline-none border-coolGray-200 focus:border-green-500 rounded-lg shadow-input"
                    >
                      <option>Select</option>
                      <option value="School teacher">School teacher</option>
                      <option value="Community leader">Community leader</option>
                      <option value="Others">Others</option>
                    </select>
                  </div>
                  <div class="w-full md:w-1/2 p-3">
                    <span className="text-sm text-coolGray-800 font-semibold text-gray-500">
                      Reference Name <span className="text-red-500">*</span>{" "}
                    </span>
                    <input
                      onChange={(e) => {
                        setReferancename(e.target.value);
                      }}
                      class="w-full px-4 py-2.5 text-base text-coolGray-900 font-normal outline-none focus:border-green-500 border border-coolGray-200 rounded-lg shadow-input"
                      type="text"
                      placeholder=""
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            <div class="py-6 border-b border-coolGray-100 flex justify-center">
              <div class="w-full md:w-9/12">
                <div class="flex flex-wrap -m-3">
                  <div class="w-full md:w-full p-3">
                    <span className="text-sm text-coolGray-800 font-semibold text-gray-500">
                      Reference Email <span className="text-red-500">*</span>{" "}
                    </span>
                    <input
                      onChange={(e) => {
                        const inputEmail = e.target.value;
                        const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                        if (!emailFormat.test(inputEmail)) {
                          // Invalid email format
                          setErrorreferanceemail(true);
                          setReferanceemail("");
                        } else {
                          // Valid email format
                          setErrorreferanceemail(false);
                          setReferanceemail(inputEmail);
                        }

                        if (inputEmail === "") {
                          setErrorreferanceemail(false);
                        }
                      }}
                      class="w-full px-4 py-2.5 text-base text-coolGray-900 font-normal outline-none focus:border-green-500 border border-coolGray-200 rounded-lg shadow-input"
                      type="email"
                      placeholder=""
                      required
                    />
                    {errorreferanceemail === true ? (
                      <>
                        <span className="text-red-500">
                          Please enter a valid email address.
                        </span>
                      </>
                    ) : (
                      ""
                    )}
                  </div>

                  {/* <div class="w-full md:w-1/2 p-3">
                    <div className="relative">
                      <span className="text-sm text-coolGray-800 font-semibold text-gray-500">
                        Date of Birth <span className="text-red-500">*</span>{" "}
                      </span>

                      <div>
                        <DatePicker
                          selected={dob}
                          onChange={(date) => setDob(date)}
                          dateFormat="MM/dd/yyyy"
                          className="w-full px-4 py-2.5 text-base text-coolGray-900 font-normal outline-none focus:border-green-500 border border-coolGray-200 rounded-lg shadow-input"
                          // Specify your desired date format here
                        />
                      </div>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>

            <div class="pt-6  flex justify-center">
              <div class="w-full md:w-9/12">
                <div class="flex flex-wrap -m-3">
                  <div
                    class="w-full p-3 border-2 rounded-lg cursor-pointer flex justify-between items-center "
                  >
                    <button class="w-30 bg-coolGray-200 text-coolGray-800 font-semibold py-2 px-4 rounded-lg focus:outline-none focus:bg-coolGray-300 text-gray-500">
                      Additional Details (optional)
                    </button>

                    
                  </div>
                </div>

                <div class="pt-6">
                  <div class="flex flex-wrap -m-3">
                    <div class="w-full p-3">
                      <p class="text-sm text-coolGray-800 font-semibold text-gray-500">
                        Community Support Awards, If Any
                      </p>
                    </div>
                    <div class="w-full p-3">
                      <textarea
                        onChange={(e) => {
                          setAwards(e.target.value);
                        }}
                        class="block w-full h-40 p-6 text-base text-coolGray-900 font-normal outline-none focus:border-green-500 border border-coolGray-200 rounded-lg shadow-input resize-none"
                      ></textarea>
                    </div>
                  </div>

                  <div class="flex flex-wrap -m-3 pt-3">
                    <div class="w-full p-3">
                      <p class="text-sm text-coolGray-800 font-semibold text-gray-500">
                        Educational Achievement, If Any
                      </p>
                    </div>
                    <div class="w-full p-3">
                      <textarea
                        onChange={(e) => {
                          setAchievements(e.target.value);
                        }}
                        class="block w-full h-40 p-6 text-base text-coolGray-900 font-normal outline-none focus:border-green-500 border border-coolGray-200 rounded-lg shadow-input resize-none"
                      ></textarea>
                    </div>
                  </div>
                </div>

                {errormessage === true ? (
                  <>
                    <div className="text-red-600 mt-10 p-3 bg-gray-100 border">
                      Please Fill All the Fields
                    </div>
                  </>
                ) : (
                  ""
                )}

                <div class="pb-6  flex justify-center items-center pt-9">
                  <div class="flex items-center justify-center -m-2">
                    {/* <div class="w-full md:w-auto p-2">
            <h2 class="text-coolGray-900 text-3xl font-semibold">Registration Form</h2>
          </div> */}
                    <div class="w-full md:w-full p-2">
                      <div class="flex flex-wrap justify-between -m-1.5">
                        {/* <div class="w-full md:w-full p-1.5">
                          <button class="flex flex-wrap justify-center w-full px-4 py-2 font-medium text-sm text-coolGray-500 hover:text-coolGray-600 border border-coolGray-200 hover:border-coolGray-300 bg-white rounded-md shadow-button">
                            <p>Cancel</p>
                          </button>
                        </div> */}
                        <div class="w-full p-1.5">
                          <button
                            onClick={(e) => submitForm(e)}
                            class="flex justify-center w-72 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 font-medium text-sm text-white border border-green-500 rounded-md shadow-button"
                          >
                            <p>Submit</p>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default index;
