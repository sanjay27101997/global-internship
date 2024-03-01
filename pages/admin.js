import { Fragment, useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
const axios = require("axios");
import { API_URL } from "../config/constants";
import Template from "../components/layouts/admin";
import { managementStatusData, statesData, districtsData } from "../utils/Data";
import SimpleSelect from "../components/ui/select";
import { isUserLoggedIn, UserData} from "../utils/User";
import { useRouter } from "next/router";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

import { Bar } from "react-chartjs-2";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Assets({ locations, initialData }) {
  const [filterLocations, setFilterLocations] = useState();
  const [filterLocation, setFilterLocation] = useState();
  const [filtersLoaded, setFiltersLoaded] = useState(false);
  const [statusLabels, setStatusLabels] = useState();
  const [data, setData] = useState();
  const router = useRouter();

  const module_colors = {
    1: {
      text: "text-red-400",
      background: "bg-red-100",
      border: "border-red-500",
    },
    2: {
      text: "text-blue-500",
      background: "bg-blue-100",
      border: "border-blue-600",
    },
    3: {
      text: "text-yellow-500",
      background: "bg-yellow-100",
      border: "border-yellow-600",
    },
    4: {
      text: "text-green-500",
      background: "bg-green-100",
      border: "border-green-600",
    },
    5: {
      text: "text-purple-500",
      background: "bg-purple-100",
      border: "border-purple-600",
    },
  };

  const module_colors2 = {
    6: {
      text: "text-red-400",
      background: "bg-red-100",
      border: "border-red-500",
    },
    7: {
      text: "text-blue-500",
      background: "bg-blue-100",
      border: "border-blue-600",
    },
    8: {
      text: "text-yellow-500",
      background: "bg-yellow-100",
      border: "border-yellow-600",
    },
    9: {
      text: "text-green-500",
      background: "bg-green-100",
      border: "border-green-600",
    },
    10: {
      text: "text-purple-500",
      background: "bg-purple-100",
      border: "border-purple-600",
    },
  };

  const [students, setStudents] = useState();
  const [astudents, setAStudents] = useState();
  const [dstudents, setDStudents] = useState();
  const [courses, setCourses] = useState();
  const [quizz, setQuizz] = useState();
  const [male, setMale] = useState();
  const [female, setFemale] = useState();

  const [certificate, setCertificate] = useState();
  const [oneModules, setOneModules] = useState();
  const [oneModules2, setOneModules2] = useState();

  const [telangana, setTelangana] = useState();
  const [karnataka, setKarnataka] = useState();
  const [tamilnadu, setTamilnadu] = useState();
  const [others, setOthers] = useState();

  const [telanganam, setTelanganam] = useState();
  const [telanganaf, setTelanganaf] = useState();
  const [karnatakam, setKarnatakam] = useState();
  const [karnatakaf, setKarnatakaf] = useState();
  const [tamilnadum, setTamilnadum] = useState();
  const [tamilnaduf, setTamilnaduf] = useState();

  const [show1, setShow1] = useState(true);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);





  const [mystate, setMystate] = useState("Telangana");

  const [statedata, setStatedata] = useState(false);
  const [statem, setStatem] = useState(false);
  const [statef, setStatef] = useState(false);



const [basic, setBasic] = useState(false);
const [inter, setInter] = useState(false);
const [advanced, setAdvanced] = useState(false);


// const [displaybasic, setDisplaybasic] = useState(true);
// const [displayinter, setDisplayinter] = useState(false);
// const [displayadvance, setDisplayadvance] = useState(false);

const [selectcourse, setSelectcourse] = useState("basic");




  function submit1() {
    setShow1(true);
    setShow2(false);
    setShow3(false);
  }
  function submit2() {
    setShow1(false);
    setShow2(true);
    setShow3(false);
  }
  function submit3() {
    setShow1(false);
    setShow2(false);
    setShow3(true);
  }




  // function displaybasic() {
  //   setDisplaybasic(true);
  //   setDisplayinter(false);
  //   setDisplayadvance(true);
  // }
  // function displayinter() {
  //   setDisplaybasic(false);
  //   setDisplayinter(true);
  //   setDisplayadvance(false);
  // }
  // function displayadvance() {
  //   setDisplaybasic(false);
  //   setDisplayinter(false);
  //   setDisplayadvance(true);
  // }







  const data1 = {
    labels: [
      "Total No Of Students",
      "No Of Male Students",
      "No Of Female Students",
    ],
    datasets: [
      {
        label: "# of Votes",
        data: [students, male, female],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const state2 = {
    labels: ["telangana", "Karnataka", "Tamilnadu", "Others"],
    datasets: [
      {
        label: "Students",
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 2,
        data: [telangana, karnataka, tamilnadu, others],
      },
    ],
  };

  const state = {
    labels: [
      "No of students",
      "Male Students",
      "Female Students",
      // "Karnataka Female",
      // "Tamilnadu Male",
      // "tamilnadu Female",
    ],
    datasets: [
      {
        label: "Data",
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 99, 132, 0.2)",
          // "rgba(54, 162, 235, 0.2)",
          // "rgba(255, 99, 132, 0.2)",
          // "rgba(54, 162, 235, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 99, 132, 1)",
          // "rgba(54, 162, 235, 1)",
          // "rgba(255, 99, 132, 1)",
          // "rgba(54, 162, 235, 1)",
        ],
        borderWidth: 2,
        data: [
          statedata,
          statem,
          statef,
          // karnatakaf,
          // tamilnadum,
          // tamilnaduf,
        ],
      },
    ],
  };

  useEffect(() => {
    if (isUserLoggedIn() === false || UserData.RoleId === 1) {
      router.push("/");
    }
    // if (!filtersLoaded) {
    //    getInit();
    //    locationChanged("");
    // }
    // if (filterLocations) {
    //   setFiltersLoaded(true);
    // }

    axios.post(API_URL + "dashboard/dashboard.php",{statedata:mystate}).then(function (response) {
      console.log(response);
      setStudents(response.data?.total_students);
      setAStudents(response.data?.total_astudents);
      setDStudents(response.data?.total_dstudents);
      setCourses(response.data?.total_courses);
      setQuizz(response.data?.total_quizzes);

      setMale(response.data?.total_male);
      setFemale(response.data?.total_female);

      setCertificate(response.data?.total_certificate);
      setOneModules(response.data?.one_modules);

      setStatedata(response.data?.mystate);
      // setKarnataka(response.data?.karnataka);
      // setTamilnadu(response.data?.tamilnadu);
      // setOthers(response.data?.others);

      setStatem(response.data?.statem);
      setStatef(response.data?.statef);
      // setKarnatakam(response.data?.karnatakam);
      // setKarnatakaf(response.data?.karnatakaf);
      // setTamilnadum(response.data?.tamilnadum);
      // setTamilnaduf(response.data?.tamilnaduf);

      setOneModules2(response.data?.one_modules2);

setBasic(response.data?.basic);
setInter(response.data?.inter);
setAdvanced(response.data?.advanced);

      console.log(response.data?.one_modules);
      console.log(response.data?.one_modules2);

      // return;
    });
  }, [mystate]);

  // async function getInit() {
  //   const filters = await axios.post(API_URL + "assets/assigned_filters.php");
  //   let locations = [];
  //   if (filters) {
  //     locations.push({ id: 0, name: "Location - All" });
  //     filters.data.locations.forEach((option) => {
  //       locations.push({ id: option.LocationId, name: option.LocationName });
  //     });
  //   }
  //   setFilterLocations(locations);
  // }

  // const locationChanged = async (option) => {
  //   // setFilterLocation(option);
  //   const counts = await axios.post(API_URL + "represent_dashboard.php", {
  //     limit: 1000,
  //     from: 0,
  //     to: 1000,
  //     location: option,
  //     user_id: 1,
  //   });
  //   const values_array = [];
  //   for (var key in counts.data.data[0]) {
  //     if (key < 7) {
  //       values_array.push(counts.data.data[0][key]);
  //     }
  //   }
  //   const statuses = [];
  //   for (var status in managementStatusData) {
  //     statuses.push(managementStatusData[status]);
  //   }
  //   const initData = {
  //     labels: statuses,
  //     datasets: [
  //       {
  //         label: "# of Votes",
  //         data: values_array,
  //         backgroundColor: [
  //           "rgba(255, 99, 132)",
  //           "rgba(54, 162, 235)",
  //           "rgba(255, 206, 86)",
  //           "rgba(75, 192, 192)",
  //           "rgba(153, 102, 255)",
  //           "rgba(255, 159, 64)",
  //         ],
  //       },
  //     ],
  //   };
  //   setData(initData);
  // };
  return (
    <Template page="Home">
      <div className="overflow-auto h-screen bg-white md:p-5 p-1 md:px-40">
        <Head>
          <title>Learning Portal Dashboard</title>
          <link rel="icon" href="/favicon.ico" />
          <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
          <link
            href="https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@500&display=swap"
            rel="stylesheet"
          />
        </Head>
        <main>
          {/* <div class="flex justify-center pt-2">
      <button onClick={() => {submit1()}} type="button" class="inline-flex justify-center items-center space-x-2 border font-semibold focus:outline-none px-3 py-2 leading-6 rounded-l active:z-1 focus:z-1 -mr-px border-gray-300 bg-white text-gray-800 shadow-sm hover:text-gray-800 hover:bg-gray-300 hover:border-gray-300 hover:shadow focus:ring focus:ring-gray-500 focus:ring-opacity-25 active:bg-white active:border-white active:shadow-none">
        Students Data
      </button>
      <button onClick={() => {submit2()}} type="button" class="inline-flex justify-center items-center space-x-2 border font-semibold focus:outline-none px-3 py-2 leading-6 active:z-1 focus:z-1 -mr-px border-gray-300 bg-white text-gray-800 shadow-sm hover:text-gray-800 hover:bg-gray-300 hover:border-gray-300 hover:shadow focus:ring focus:ring-gray-500 focus:ring-opacity-25 active:bg-white active:border-white active:shadow-none">
        Lessons Data
      </button>
      <button onClick={() => {submit3()}} type="button" class="inline-flex justify-center items-center space-x-2 border font-semibold focus:outline-none px-3 py-2 leading-6 rounded-r active:z-1 focus:z-1 border-gray-300 bg-white text-gray-800 shadow-sm hover:text-gray-800 hover:bg-gray-300 hover:border-gray-300 hover:shadow focus:ring focus:ring-gray-500 focus:ring-opacity-25 active:bg-white active:border-white active:shadow-none">
        Pass Percentage(Lessons)
      </button>
    </div> */}

          <div className="text-center text-3xl uppercase mb-4 text-gray-500 font1">
            Admin Dashboard
          </div>

          <div className="grid md:grid-cols-2  border-2 mb-10 rounded-lg border-gray-200 shadow-md pb-7 md:mt-16 bg-gray-50">
            <div className="md:col-span-2 text-2xl p-3 text-gray-500 border-b-2 md:px-11 font1 mt-2">
              STUDENTS DATA
            </div>

            <div className="flex justify-center pt-9 w-full md:border-r-2">
              <div className="">
                <div className="text-center text-2xl text-gray-500 font1">
                  Overall Students Data
                </div>
                <div className="w-96 h-96">
                  <Pie data={data1} />
                </div>
              </div>
            </div>

            <div
              data-aos="fade-up"
              class="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-8 pt-20 px-5 md:px-0 md:ml-10 md:mr-10"
            >
              <div class="flex flex-col rounded shadow-sm bg-red-100 overflow-hidden border border-red-500 h-40">
                <div class="p-5 lg:p-6 flex-grow w-full">
                  <dl>
                    <dt class="text-2xl font-semibold">{students}</dt>
                    <dd class="uppercase font-medium text-sm text-gray-500 tracking-wider">
                      <span className="text-red-400 font1">
                        {" "}
                        Total Number of Students
                      </span>
                    </dd>
                  </dl>
                </div>
              </div>

              <div class="flex flex-col rounded shadow-sm bg-blue-100 overflow-hidden border border-blue-500 h-40">
                <div class="p-5 lg:p-6 flex-grow w-full">
                  <dl>
                    <dt class="text-2xl font-semibold">{male}</dt>
                    <dd class="uppercase font-medium text-sm text-gray-500 tracking-wider">
                      <span className="text-blue-400 font1">
                        Number Of Male Students
                      </span>
                    </dd>
                  </dl>
                </div>
              </div>

              <div class="flex flex-col rounded shadow-sm bg-yellow-100 overflow-hidden border border-yellow-500 h-40">
                <div class="p-5 lg:p-6 flex-grow w-full">
                  <dl>
                    <dt class="text-2xl font-semibold">{female}</dt>
                    <dd class="uppercase font-medium text-sm text-gray-500 tracking-wider">
                      <span className="text-yellow-400 font1">
                        Number Of Female Students
                      </span>
                    </dd>
                  </dl>
                </div>
              </div>

              {/* <div class="flex flex-col rounded shadow-sm bg-green-100 overflow-hidden border border-green-500 h-40">
                <div class="p-5 lg:p-6 flex-grow w-full">
                  <dl>
                    <dt class="text-2xl font-semibold">{courses}</dt>
                    <dd class="uppercase font-medium text-sm text-gray-500 tracking-wider">
                      <span className="text-green-400 font1">Number Of Courses</span>
                    </dd>
                  </dl>
                </div>
              </div>

              <div class="flex flex-col rounded shadow-sm bg-purple-100 overflow-hidden border border-purple-500 h-40">
                <div class="p-5 lg:p-6 flex-grow w-full">
                  <dl>
                    <dt class="text-2xl font-semibold">{quizz}</dt>
                    <dd class="uppercase font-medium text-sm text-gray-500 tracking-wider">
                      <span className="text-purple-400 font1">Number Of Quizz</span>
                    </dd>
                  </dl>
                </div>
              </div> */}
            </div>
          </div>
{/* 
          <div className="grid md:grid-cols-2  border-2 mb-10 rounded-lg border-gray-200 shadow-md pb-7 bg-gray-50">
            <div className="md:col-span-2 text-2xl p-3 text-gray-500 border-b-2 md:px-11 font1  mt-2">
              STATE WISE DATA
            </div>

            <div className="flex justify-center pt-9 w-full md:border-r-2">
              <div className="bg-gray-50">
                <div className="text-center text-2xl pb-4 text-gray-500 font1">
                  Overall State Wise Data
                </div>
                <div className="w-96 md:h-96 h-56">
                  <Doughnut
                    data={state2}
                    options={{
                      title: {
                        display: true,
                        text: "Average Rainfall per month",
                        fontSize: 20,
                      },
                      legend: {
                        display: true,
                        position: "right",
                      },
                    }}
                  />
                </div>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-8 md:pt-20 pt-52 px-5 md:px-0 md:ml-10 md:mr-10">
              <div class="flex flex-col rounded shadow-sm bg-red-100 overflow-hidden border border-red-500 h-40">
                <div class="p-5 lg:p-6 flex-grow w-full">
                  <dl>
                    <dt class="text-2xl font-semibold">{telangana}</dt>
                    <dd class="uppercase font-medium text-sm text-gray-500 tracking-wider">
                      <span className="text-red-400 font1">telangana</span>
                    </dd>
                  </dl>
                </div>
              </div>

              <div class="flex flex-col rounded shadow-sm bg-blue-100 overflow-hidden border border-blue-500 h-40">
                <div class="p-5 lg:p-6 flex-grow w-full">
                  <dl>
                    <dt class="text-2xl font-semibold">{karnataka}</dt>
                    <dd class="uppercase font-medium text-sm text-gray-500 tracking-wider">
                      <span className="text-blue-400 font1">karnataka</span>
                    </dd>
                  </dl>
                </div>
              </div>

              <div class="flex flex-col rounded shadow-sm bg-yellow-100 overflow-hidden border border-yellow-500 h-40">
                <div class="p-5 lg:p-6 flex-grow w-full">
                  <dl>
                    <dt class="text-2xl font-semibold">{tamilnadu}</dt>
                    <dd class="uppercase font-medium text-sm text-gray-500 tracking-wider">
                      <span className="text-yellow-400 font1">tamilnadu</span>
                    </dd>
                  </dl>
                </div>
              </div>

              <div class="flex flex-col rounded shadow-sm bg-green-100 overflow-hidden border border-green-500 h-40">
                <div class="p-5 lg:p-6 flex-grow w-full">
                  <dl>
                    <dt class="text-2xl font-semibold">{others}</dt>
                    <dd class="uppercase font-medium text-sm text-gray-500 tracking-wider">
                      <span className="text-green-400 font1">others</span>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div> */}

          {/* <div className="grid md:grid-cols-2  border-2 mb-10 rounded-lg pb-7 border-gray-200 shadow-md bg-gray-50">
            <div className="md:col-span-2 text-2xl p-3 text-gray-500 border-b-2 md:px-11 font1  mt-2">
              STATE WISE GENDER DATA
            </div>

            <div className="flex justify-center pt-12 w-full md:border-r-2">
              <div className="bg-gray-50">
                <div className="text-center text-2xl pb-4 text-gray-500 font1">
                  Overall State Wise Gender Data
                </div>
                <div className="w-96 md:h-96 h-56">
                  <Bar
                    data={state}
                    options={{
                      title: {
                        display: true,
                        text: "Average Rainfall per month",
                        fontSize: 20,
                      },
                      legend: {
                        display: true,
                        position: "right",
                      },
                    }}
                  />
                </div>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-8 pt-20 px-5 md:px-0 md:ml-10 md:mr-10">
              <div class="flex flex-col rounded shadow-sm bg-red-100 overflow-hidden border border-red-500 h-40">
                <div class="p-5 lg:p-6 flex-grow w-full">
                  <dl>
                    <dt class="text-2xl font-semibold">{telanganam}</dt>
                    <dd class="uppercase font-medium text-sm text-gray-500 tracking-wider">
                      <span className="text-red-400 font1">
                        telangana male students
                      </span>
                    </dd>
                  </dl>
                </div>
              </div>

              <div class="flex flex-col rounded shadow-sm bg-blue-100 overflow-hidden border border-blue-500 h-40">
                <div class="p-5 lg:p-6 flex-grow w-full">
                  <dl>
                    <dt class="text-2xl font-semibold">{telanganaf}</dt>
                    <dd class="uppercase font-medium text-sm text-gray-500 tracking-wider">
                      <span className="text-blue-400 font1">
                        telangana female students
                      </span>
                    </dd>
                  </dl>
                </div>
              </div>

              <div class="flex flex-col rounded shadow-sm bg-yellow-100 overflow-hidden border border-yellow-500 h-40">
                <div class="p-5 lg:p-6 flex-grow w-full">
                  <dl>
                    <dt class="text-2xl font-semibold">{karnatakam}</dt>
                    <dd class="uppercase font-medium text-sm text-gray-500 tracking-wider">
                      <span className="text-yellow-400 font1">
                        karnataka male students
                      </span>
                    </dd>
                  </dl>
                </div>
              </div>

              <div class="flex flex-col rounded shadow-sm bg-green-100 overflow-hidden border border-green-500 h-40">
                <div class="p-5 lg:p-6 flex-grow w-full">
                  <dl>
                    <dt class="text-2xl font-semibold">{karnatakaf}</dt>
                    <dd class="uppercase font-medium text-sm text-gray-500 tracking-wider">
                      <span className="text-green-400 font1">
                        karnataka female students
                      </span>
                    </dd>
                  </dl>
                </div>
              </div>

              <div class="flex flex-col rounded shadow-sm bg-purple-100 overflow-hidden border border-purple-500 h-40">
                <div class="p-5 lg:p-6 flex-grow w-full">
                  <dl>
                    <dt class="text-2xl font-semibold">{tamilnadum}</dt>
                    <dd class="uppercase font-medium text-sm text-gray-500 tracking-wider">
                      <span className="text-purple-400 font1">
                        tamilnadu male students
                      </span>
                    </dd>
                  </dl>
                </div>
              </div>

              <div class="flex flex-col rounded shadow-sm bg-purple-100 overflow-hidden border border-purple-500 h-40">
                <div class="p-5 lg:p-6 flex-grow w-full">
                  <dl>
                    <dt class="text-2xl font-semibold">{tamilnaduf}</dt>
                    <dd class="uppercase font-medium text-sm text-gray-500 tracking-wider">
                      <span className="text-purple-400 font1">
                        tamilnadu female students
                      </span>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div> */}

          {/* <div className="flex justify-center pt-9 w-full bg-gray-200">



























<div className="bg-gray-100">
<div className="text-center text-2xl">Overall Lesson Completion data</div>
<div className="w-96 h-96">
<Bar
          data={state}
          options={{
            title:{
              display:true,
              text:'Average Rainfall per month',
              fontSize:20
            },
            legend:{
              display:true,
              position:'right'
            }
          }}
        />
</div>


</div>

</div>
 */}













 <div className="grid md:grid-cols-2  border-2 mb-10 rounded-lg pb-7 border-gray-200 shadow-md bg-gray-50">
            <div className="md:col-span-2 text-2xl p-3 text-gray-500 border-b-2 md:px-11 font1  mt-2">
              STATE WISE STUDENTS DATA
            </div>

            <div  className="md:col-span-2 text-2xl p-3 text-gray-500 border-b-2 md:px-11 font1  mt-2">
        
            <select
            value={mystate}
                            name="state"
                            onChange={(e) =>{setMystate(e.target.value)}}
                            className=" min-w-full w-full rounded-md text-gray-600 h-12 pl-5 pr-10 bg-white hover:border-gray-400 focus:ring-nirmaan focus:border-nirmaan appearance-none">
                            <option>Select State</option>
                            {districtsData
                              ? districtsData.map((state) => {
                                  return <option value={state.state}>{state.state}</option>;
                                })
                              : ""}
                          </select>
            </div>
          

            <div className="flex justify-center pt-12 w-full md:border-r-2">
              <div className="bg-gray-50">
                <div className="text-center text-2xl pb-4 text-gray-500 font1">
                  Overall State Wise Data
                </div>
                <div className="w-96 md:h-96 h-56">
                  <Bar
                    data={state}
                    options={{
                      title: {
                        display: true,
                        text: "Average Rainfall per month",
                        fontSize: 20,
                      },
                      legend: {
                        display: true,
                        position: "right",
                      },
                    }}
                  />
                </div>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-8 pt-20 px-5 md:px-0 md:ml-10 md:mr-10">
              <div class="flex flex-col rounded shadow-sm bg-red-100 overflow-hidden border border-red-500 h-40">
                <div class="p-5 lg:p-6 flex-grow w-full">
                  <dl>
                    <dt class="text-2xl font-semibold">{statedata}</dt>
                    <dd class="uppercase font-medium text-sm text-gray-500 tracking-wider">
                      <span className="text-red-400 font1">
                        No of Students
                      </span>
                    </dd>
                  </dl>
                </div>
              </div>

              <div class="flex flex-col rounded shadow-sm bg-blue-100 overflow-hidden border border-blue-500 h-40">
                <div class="p-5 lg:p-6 flex-grow w-full">
                  <dl>
                    <dt class="text-2xl font-semibold">{statem}</dt>
                    <dd class="uppercase font-medium text-sm text-gray-500 tracking-wider">
                      <span className="text-blue-400 font1">
                        Male students
                      </span>
                    </dd>
                  </dl>
                </div>
              </div>

              <div class="flex flex-col rounded shadow-sm bg-yellow-100 overflow-hidden border border-yellow-500 h-40">
                <div class="p-5 lg:p-6 flex-grow w-full">
                  <dl>
                    <dt class="text-2xl font-semibold">{statef}</dt>
                    <dd class="uppercase font-medium text-sm text-gray-500 tracking-wider">
                      <span className="text-yellow-400 font1">
                        Female students
                      </span>
                    </dd>
                  </dl>
                </div>
              </div>

              {/* <div class="flex flex-col rounded shadow-sm bg-green-100 overflow-hidden border border-green-500 h-40">
                <div class="p-5 lg:p-6 flex-grow w-full">
                  <dl>
                    <dt class="text-2xl font-semibold">{karnatakaf}</dt>
                    <dd class="uppercase font-medium text-sm text-gray-500 tracking-wider">
                      <span className="text-green-400 font1">
                        karnataka female students
                      </span>
                    </dd>
                  </dl>
                </div>
              </div> */}

              {/* <div class="flex flex-col rounded shadow-sm bg-purple-100 overflow-hidden border border-purple-500 h-40">
                <div class="p-5 lg:p-6 flex-grow w-full">
                  <dl>
                    <dt class="text-2xl font-semibold">{tamilnadum}</dt>
                    <dd class="uppercase font-medium text-sm text-gray-500 tracking-wider">
                      <span className="text-purple-400 font1">
                        tamilnadu male students
                      </span>
                    </dd>
                  </dl>
                </div>
              </div> */}

              {/* <div class="flex flex-col rounded shadow-sm bg-purple-100 overflow-hidden border border-purple-500 h-40">
                <div class="p-5 lg:p-6 flex-grow w-full">
                  <dl>
                    <dt class="text-2xl font-semibold">{tamilnaduf}</dt>
                    <dd class="uppercase font-medium text-sm text-gray-500 tracking-wider">
                      <span className="text-purple-400 font1">
                        tamilnadu female students
                      </span>
                    </dd>
                  </dl>
                </div>
              </div> */}
            </div>
          </div>












          {/* <section class="py-5 bg-white h-screen">
            <div class="container max-w-6xl mx-auto">
              <h2 class="text-2xl font-bold tracking-tight mt-5">Dashboard:</h2>
            
              <div class="grid grid-cols-4 gap-8 mt-5 sm:grid-cols-8 lg:grid-cols-12 sm:px-8 xl:px-0">
                <div class="relative flex flex-col items-center justify-between col-span-4 px-2 py-8 space-y-4 overflow-hidden bg-gray-100 sm:rounded-xl">
                
                  <h4 class="text-xl font-medium text-gray-700">Number of Students</h4>
                  <p class="font-bold text-3xl text-center text-gray-900">{students}</p>
                  
                </div>

                <div class="flex flex-col items-center justify-between col-span-4 px-2 py-8 space-y-4 bg-gray-100 sm:rounded-xl">
                 
                  <h4 class="text-xl font-medium text-gray-700">Number of Male Students</h4>
                  <p class="font-bold text-3xl text-center text-gray-900">{male}</p>
                
                </div>

                <div class="flex flex-col items-center justify-between col-span-4 px-2 py-8 space-y-4 bg-gray-100 sm:rounded-xl">
                
                  <h4 class="text-xl font-medium text-gray-700">Number of Female Students</h4>
                  <p class="font-bold text-3xl text-center text-gray-900">{female}</p>
                  
                </div>

                <div class="flex flex-col items-center justify-between col-span-4 px-2 py-8 space-y-4 bg-gray-100 sm:rounded-xl">
                
                  <h4 class="text-xl font-medium text-gray-700">Number of N5 Certifications</h4>
                  <p class="font-bold text-3xl text-center text-gray-900">0</p>
                
                </div>

                <div class="flex flex-col items-center justify-between col-span-4 px-2 py-8 space-y-4 bg-gray-100 sm:rounded-xl">
               
                  <h4 class="text-xl font-medium text-gray-700">
                    Number of N4 Certifications
                    <br />
                  </h4>
                  <p class="font-bold text-3xl text-center text-gray-900">0</p>
                  
                </div>
              </div>
            </div>
          </section> */}
{/* 
          <div class="accordion" id="accordionExample">
            <div class="accordion-item bg-white border border-gray-200">
              <h2 class="accordion-header mb-0" id="headingOne">
                <button
                  class="
        accordion-button
        relative
        flex
        items-center
        w-full
        py-4
        px-5
        text-base text-gray-800 text-left
        bg-white
        border-0
        rounded-none
        transition
        focus:outline-none
      "
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                >
                  Accordion Item #1
                </button>
              </h2>
              <div
                id="collapseOne"
                class="accordion-collapse collapse show"
                aria-labelledby="headingOne"
                data-bs-parent="#accordionExample"
              >
                <div class="accordion-body py-4 px-5">
                  <strong>This is the first item's accordion body.</strong> It
                  is shown by default, until the collapse plugin adds the
                  appropriate classes that we use to style each element. These
                  classes control the overall appearance, as well as the showing
                  and hiding via CSS transitions. You can modify any of this
                  with custom CSS or overriding our default variables. It's also
                  worth noting that just about any HTML can go within the{" "}
                  <code>.accordion-body</code>, though the transition does limit
                  overflow.
                </div>
              </div>
            </div>
            <div class="accordion-item bg-white border border-gray-200">
              <h2 class="accordion-header mb-0" id="headingTwo">
                <button
                  class="
        accordion-button
        collapsed
        relative
        flex
        items-center
        w-full
        py-4
        px-5
        text-base text-gray-800 text-left
        bg-white
        border-0
        rounded-none
        transition
        focus:outline-none
      "
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseTwo"
                  aria-expanded="false"
                  aria-controls="collapseTwo"
                >
                  Accordion Item #2
                </button>
              </h2>
              <div
                id="collapseTwo"
                class="accordion-collapse collapse"
                aria-labelledby="headingTwo"
                data-bs-parent="#accordionExample"
              >
                <div class="accordion-body py-4 px-5">
                  <strong>This is the second item's accordion body.</strong> It
                  is hidden by default, until the collapse plugin adds the
                  appropriate classes that we use to style each element. These
                  classes control the overall appearance, as well as the showing
                  and hiding via CSS transitions. You can modify any of this
                  with custom CSS or overriding our default variables. It's also
                  worth noting that just about any HTML can go within the{" "}
                  <code>.accordion-body</code>, though the transition does limit
                  overflow.
                </div>
              </div>
            </div>
            <div class="accordion-item bg-white border border-gray-200">
              <h2 class="accordion-header mb-0" id="headingThree">
                <button
                  class="
        accordion-button
        collapsed
        relative
        flex
        items-center
        w-full
        py-4
        px-5
        text-base text-gray-800 text-left
        bg-white
        border-0
        rounded-none
        transition
        focus:outline-none
      "
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseThree"
                  aria-expanded="false"
                  aria-controls="collapseThree"
                >
                  Accordion Item #3
                </button>
              </h2>
              <div
                id="collapseThree"
                class="accordion-collapse collapse"
                aria-labelledby="headingThree"
                data-bs-parent="#accordionExample"
              >
                <div class="accordion-body py-4 px-5">
                  <strong>This is the third item's accordion body.</strong> It
                  is hidden by default, until the collapse plugin adds the
                  appropriate classes that we use to style each element. These
                  classes control the overall appearance, as well as the showing
                  and hiding via CSS transitions. You can modify any of this
                  with custom CSS or overriding our default variables. It's also
                  worth noting that just about any HTML can go within the{" "}
                  <code>.accordion-body</code>, though the transition does limit
                  overflow.
                </div>
              </div>
            </div>
          </div> */}




          <div  className="md:col-span-2 text-2xl p-3 text-gray-500 border-b-2 md:px-11 font1  mt-2">
        
        <select
                        name="state"
                        onChange={(e) =>{setSelectcourse(e.target.value)}}
                        className=" min-w-full w-full rounded-md text-gray-600 h-12 pl-5 pr-10 bg-white hover:border-gray-400 focus:ring-nirmaan focus:border-nirmaan appearance-none">
                        {/* <option>Select State</option> */}
                        <option value="basic">Basic Course</option>
                                  <option value="inter">Intermediate Course</option>
                                  <option value="advanced">Advanced Course</option>
                      </select>
        </div>






{selectcourse === "basic" ? (
  <section class="py-5 bg-white">
            <div class="container max-w-6xl mx-auto">
              <h2 class="text-2xl font-bold tracking-tight mt-5 px-4 lg:px-0 text-gray-500">
                Basic Coding Summary (Completed Students):
              </h2>
              <div class="grid grid-cols-1 gap-8 mt-5  lg:grid-cols-1 sm:px-8 xl:px-0">
                <div class="lg:flex items-center justify-evenly px-2 py-8 lg:bg-gray-50 border-2 shadow-lg bg-white sm:rounded-xl space-y-1 lg:space-y-0">
                  
                        <div
                          
                          className={`flex flex-col items-center justify-center px-8 py-8 border rounded-xl text-red-400 bg-red-100 border-red-500
                          }`}
                        >
                          <h4 class="text-xl font-medium text-center mb-1">
                            Module 1
                          </h4>
                          <p class="font-bold text-3xl text-center text-black">
                            8968
                          </p>
                        </div>
                        <div
                          
                          className={`flex flex-col items-center justify-center px-8 py-8 border rounded-xl text-blue-500 bg-blue-100 border-blue-600
                          }`}
                        >
                          <h4 class="text-xl font-medium text-center mb-1">
                            Module 2
                          </h4>
                          <p class="font-bold text-3xl text-center text-black">
                            8920
                          </p>
                        </div>
                        <div
                          
                          className={`flex flex-col items-center justify-center px-8 py-8 border rounded-xl text-yellow-500 bg-yellow-100 border-yellow-600
                          }`}
                        >
                          <h4 class="text-xl font-medium text-center mb-1">
                            Module 3
                          </h4>
                          <p class="font-bold text-3xl text-center text-black">
                            8871
                          </p>
                        </div>
                        <div
                          
                          className={`flex flex-col items-center justify-center px-8 py-8 border rounded-xl text-green-500 bg-green-100 border-green-600
                          }`}
                        >
                          <h4 class="text-xl font-medium text-center mb-1">
                            Module 4
                          </h4>
                          <p class="font-bold text-3xl text-center text-black">
                            8843
                          </p>
                        </div>
                        <div
                          
                          className={`flex flex-col items-center justify-center px-8 py-8 border rounded-xl text-purple-500 bg-purple-100 border-purple-600
                          }`}
                        >
                          <h4 class="text-xl font-medium text-center mb-1">
                            Module 5
                          </h4>
                          <p class="font-bold text-3xl text-center text-black">
                          8605
                          </p>
                        </div>
                    
                </div>
              </div>
            </div>
          </section>
):("")}

          








          {selectcourse === "inter" ? (
            <section class="py-5 bg-white">
            <div class="container max-w-6xl mx-auto">
              <h2 class="text-2xl font-bold tracking-tight mt-5 px-4 lg:px-0 text-gray-500">
                Intermediate Coding Summary (Completed Students):
              </h2>
              <div class="grid grid-cols-1 gap-8 mt-5  lg:grid-cols-1 sm:px-8 xl:px-0">
                <div class="lg:flex items-center justify-evenly px-2 py-8 lg:bg-gray-50 border-2 shadow-lg bg-white sm:rounded-xl space-y-1 lg:space-y-0">
                <div
                          
                          className={`flex flex-col items-center justify-center px-8 py-8 border rounded-xl text-red-400 bg-red-100 border-red-500
                          }`}
                        >
                          <h4 class="text-xl font-medium text-center mb-1">
                            Module 1
                          </h4>
                          <p class="font-bold text-3xl text-center text-black">
                            7845
                          </p>
                        </div>
                        <div
                          
                          className={`flex flex-col items-center justify-center px-8 py-8 border rounded-xl text-blue-500 bg-blue-100 border-blue-600
                          }`}
                        >
                          <h4 class="text-xl font-medium text-center mb-1">
                            Module 2
                          </h4>
                          <p class="font-bold text-3xl text-center text-black">
                            7578
                          </p>
                        </div>
                        <div
                          
                          className={`flex flex-col items-center justify-center px-8 py-8 border rounded-xl text-yellow-500 bg-yellow-100 border-yellow-600
                          }`}
                        >
                          <h4 class="text-xl font-medium text-center mb-1">
                            Module 3
                          </h4>
                          <p class="font-bold text-3xl text-center text-black">
                            7321
                          </p>
                        </div>
                        <div
                          
                          className={`flex flex-col items-center justify-center px-8 py-8 border rounded-xl text-green-500 bg-green-100 border-green-600
                          }`}
                        >
                          <h4 class="text-xl font-medium text-center mb-1">
                            Module 4
                          </h4>
                          <p class="font-bold text-3xl text-center text-black">
                            7159
                          </p>
                        </div>
                        <div
                          
                          className={`flex flex-col items-center justify-center px-8 py-8 border rounded-xl text-purple-500 bg-purple-100 border-purple-600
                          }`}
                        >
                          <h4 class="text-xl font-medium text-center mb-1">
                            Module 5
                          </h4>
                          <p class="font-bold text-3xl text-center text-black">
                            6840
                          </p>
                        </div>
                </div>
              </div>
            </div>
          </section>
  ):("")}




         




          {selectcourse === "advanced" ? (
            <section class="py-5 bg-white">
            <div class="container max-w-6xl mx-auto">
              <h2 class="text-2xl font-bold tracking-tight mt-5 px-4 lg:px-0 text-gray-500">
                Advanced Coding Summary (Completed Students):
              </h2>
              <div class="grid grid-cols-1 gap-8 mt-5  lg:grid-cols-1 sm:px-8 xl:px-0">
                <div class="lg:flex items-center justify-evenly px-2 py-8 lg:bg-gray-50 border-2 shadow-lg bg-white sm:rounded-xl space-y-1 lg:space-y-0">
                <div
                          
                          className={`flex flex-col items-center justify-center px-8 py-8 border rounded-xl text-red-400 bg-red-100 border-red-500
                          }`}
                        >
                          <h4 class="text-xl font-medium text-center mb-1">
                            Module 1
                          </h4>
                          <p class="font-bold text-3xl text-center text-black">
                            3387
                          </p>
                        </div>
                        <div
                          
                          className={`flex flex-col items-center justify-center px-8 py-8 border rounded-xl text-blue-500 bg-blue-100 border-blue-600
                          }`}
                        >
                          <h4 class="text-xl font-medium text-center mb-1">
                            Module 2
                          </h4>
                          <p class="font-bold text-3xl text-center text-black">
                            2086
                          </p>
                        </div>
                        <div
                          
                          className={`flex flex-col items-center justify-center px-8 py-8 border rounded-xl text-yellow-500 bg-yellow-100 border-yellow-600
                          }`}
                        >
                          <h4 class="text-xl font-medium text-center mb-1">
                            Module 3
                          </h4>
                          <p class="font-bold text-3xl text-center text-black">
                            1567
                          </p>
                        </div>
                        {/* <div
                          
                          className={`flex flex-col items-center justify-center px-8 py-8 border rounded-xl text-green-500 bg-green-100 border-green-600
                          }`}
                        >
                          <h4 class="text-xl font-medium text-center mb-1">
                            Module 4
                          </h4>
                          <p class="font-bold text-3xl text-center text-black">
                            132
                          </p>
                        </div> */}
                        {/* <div
                          
                          className={`flex flex-col items-center justify-center px-8 py-8 border rounded-xl text-purple-500 bg-purple-100 border-purple-600
                          }`}
                        >
                          <h4 class="text-xl font-medium text-center mb-1">
                            Module 5
                          </h4>
                          <p class="font-bold text-3xl text-center text-black">
                            128
                          </p>
                        </div> */}
                </div>
              </div>
            </div>
          </section>
  ):("")}



      



          <section class="py-5 bg-white">
            <div class="container max-w-6xl mx-auto">
              <h2 class="text-2xl font-bold tracking-tight mt-5 px-4 lg:px-0 text-gray-500">
                Certification Summary (Completed Students):
              </h2>
              <div class="grid grid-cols-1 gap-8 mt-5  lg:grid-cols-1 sm:px-8 xl:px-0">
                <div class="lg:flex items-center justify-between px-16 py-8 lg:bg-gray-50 border-2 shadow-lg bg-white sm:rounded-xl space-y-1 lg:space-y-0 space-x-4">
                <div
                          
                          className={`flex-1 flex-col items-center justify-center px-8 py-8 border rounded-xl text-red-400 bg-red-100 border-red-500
                          }`}
                        >
                          <h4 class="text-xl font-medium text-center mb-1">
                            Basic
                          </h4>
                          <p class="font-bold text-3xl text-center text-black">
7589
                          </p>
                        </div>
                        <div
                          
                          className={`flex-1 flex-col items-center justify-center px-8 py-8 border rounded-xl text-blue-500 bg-blue-100 border-blue-600
                          }`}
                        >
                          <h4 class="text-xl font-medium text-center mb-1">
                            Intermediate
                          </h4>
                          <p class="font-bold text-3xl text-center text-black">
                           6704
                          </p>
                        </div>
                        <div
                          
                          className={`flex-1 flex-col items-center justify-center px-8 py-8 border rounded-xl text-yellow-500 bg-yellow-100 border-yellow-600
                          }`}
                        >
                          <h4 class="text-xl font-medium text-center mb-1">
                            Advanced
                          </h4>
                          <p class="font-bold text-3xl text-center text-black">
                            1124
                          </p>
                        </div>
                        {/* <div
                          
                          className={`flex flex-col items-center justify-center px-8 py-8 border rounded-xl text-green-500 bg-green-100 border-green-600
                          }`}
                        >
                          <h4 class="text-xl font-medium text-center mb-1">
                            Module 4
                          </h4>
                          <p class="font-bold text-3xl text-center text-black">
                            3945
                          </p>
                        </div> */}
                        {/* <div
                          
                          className={`flex flex-col items-center justify-center px-8 py-8 border rounded-xl text-purple-500 bg-purple-100 border-purple-600
                          }`}
                        >
                          <h4 class="text-xl font-medium text-center mb-1">
                            Module 5
                          </h4>
                          <p class="font-bold text-3xl text-c enter text-black">
                            3748
                          </p>
                        </div> */}
                </div>
              </div>
            </div>
          </section>









        </main>
      </div>
    </Template>
  );
}
