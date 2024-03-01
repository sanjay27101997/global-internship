import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
// import Keyboard1 from "../../components/ui/keyboard";
import { LinkIcon, PlusIcon, QuestionMarkCircleIcon } from "@heroicons/react/solid";
import Alert from "../ui/alert";
const axios = require("axios");
import { API_URL } from "../../config/constants";

export default function AddAssetDialog(props) {
  const [open, setOpen] = useState(false);
  const [tag, setTag] = useState("");

  const [courselevel, setCourseLevel] = useState("");
  // const [coursemodule, setCourseModule] = useState("");
  // const [Course, setCourse] = useState("");
  const [question, setQuestion] = useState("");
  const [qtype, setQtype] = useState("");

  const [questionfile, setQuestionFile] = useState("");

  const [optiona, setOptionA] = useState("");
  const [optionb, setOptionB] = useState("");
  const [optionc, setOptionC] = useState("");
  const [optiond, setOptionD] = useState("");

  const [nooptions, setNoOptions] = useState("");
  const [optionafile, setOptionAFile] = useState("");
  const [optionbfile, setOptionBFile] = useState("");
  const [optioncfile, setOptionCFile] = useState("");
  const [optiondfile, setOptionDFile] = useState("");

  const [answer, setAnswer] = useState("");
  const [mydata1, setMyData1] = useState("");
  const [mydata2, setMyData2] = useState("");

  const [questiontype, setQuestionType] = useState("");
  const [answertype, setAnswerType] = useState("");

  const [displayquestionkey, setDiaplayquestionkey] = useState(false);
  const [displayanswerkey, setDiaplayanswerkey] = useState(false);

  const [displayanswer1key, setDisplayanswer1key] = useState(false);
  const [displayanswer2key, setDisplayanswer2key] = useState(false);
  const [displayanswer3key, setDisplayanswer3key] = useState(false);
  const [displayanswer4key, setDisplayanswer4key] = useState(false);

  function displayquestion(input) {
    setQuestion(input);
    setDiaplayanswerkey(false);
    setDisplayanswer1key(false);
    setDisplayanswer2key(false);
    setDisplayanswer3key(false);
    setDisplayanswer4key(false);
  }

  function displayanswer(input) {
    setAnswer(input);
    setDiaplayquestionkey(false);
  }

  function displayans1(input) {
    setOptionA(input);

    setDiaplayquestionkey(false);
    setDisplayanswer2key(false);
    setDisplayanswer3key(false);
    setDisplayanswer4key(false);
  }

  function displayans2(input) {
    setOptionB(input);
    setDiaplayquestionkey(false);
    setDisplayanswer1key(false);
    setDisplayanswer3key(false);
    setDisplayanswer4key(false);
  }

  function displayans3(input) {
    setOptionC(input);
    setDiaplayquestionkey(false);
    setDisplayanswer2key(false);
    setDisplayanswer1key(false);
    setDisplayanswer4key(false);
  }

  function displayans4(input) {
    setOptionD(input);
    setDiaplayquestionkey(false);
    setDisplayanswer2key(false);
    setDisplayanswer3key(false);
    setDisplayanswer1key(false);
  }

  // const [assetType, setAssetType] = useState("");
  // const [location, setLocation] = useState("");
  // const [quantity, setQuantity] = useState("");
  // const [status, setStatus] = useState("");
  // const [trackingOption, setTrackingOption] = useState("");
  const [addAssetMessage, setAddAssetMessage] = useState({
    type: "",
    message: "",
    icon: "",
  });

  useEffect(() => {
    setOpen(props.open);
  }, [props.open]);

  function closed() {
    setOpen(false);
    props.onChangeOpen();
    setAddAssetMessage("");
    setTag("");
    setCourseLevel("");
    // setCourseModule("");
    // setCourse("");
    setQuestion("");
    setOptionA("");
    setOptionB("");
    setOptionC("");
    setOptionD("");
    setAnswer("");
  }

  // function levelTrigger(level_id) {
  //   setCourseLevel(level_id);
  //   // e.preventDefault();
  //   axios.post(API_URL + "getcourses.php", { id: level_id }).then(function (response) {
  //     console.log(response);
  //     setMyData1(response.data?.data);
  //   });
  // }

  // function levelTrigger1(level_id) {
  //   setCourseModule(level_id);
  //   // e.preventDefault();
  //   axios.post(API_URL + "getcourses1.php", { id: level_id }).then(function (response) {
  //     console.log(response);
  //     setMyData2(response.data?.data);
  //   });
  // }

  function closedSuccess(message) {
    props.successMessage(message);
    closed();
  }
  function submitAsset(e) {
    e.preventDefault();
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    const formData = new FormData();

    if (qtype === "blank") {
      formData.append("level_id", courselevel);
      formData.append("qtype", qtype);
      formData.append("question", question);
      formData.append("answer", answer);
      formData.append("questiontype", questiontype);
      if (questionfile) {
        formData.append("questionfile", questionfile);
      }
    }

    if (qtype != "blank") {
      formData.append("level_id", courselevel);
      formData.append("qtype", qtype);
      formData.append("question", question);
      formData.append("answer", answer);
      if (questionfile) {
        formData.append("questionfile", questionfile);
      }
      if (answertype === "Image" || answertype === "Audio") {
        if (optionafile) {
          formData.append("optionafile", optionafile);
        }
        if (optionbfile) {
          formData.append("optionbfile", optionbfile);
        }
        if (optioncfile) {
          formData.append("optioncfile", optioncfile);
        }
        if (optiondfile) {
          formData.append("optiondfile", optiondfile);
        }
      }
      formData.append("answertype", answertype);
      formData.append("questiontype", questiontype);
      if (answertype === "Text") {
        formData.append("optiona", optiona);
        formData.append("optionb", optionb);
        formData.append("optionc", optionc);
        formData.append("optiond", optiond);
      }
    }
    axios
      .post(API_URL + "progressive_quiz/add_quiz.php", formData, config)
      .then(function (response) {
        if (response.data.meta.error === true) {
          setAddAssetMessage({
            type: "error",
            message: response.data?.meta?.message,
            icon: "error",
          });
        }
        if (response.data.meta.error === false) {
          setAddAssetMessage({
            type: "success",
            message: response.data?.meta?.message,
            icon: "success",
          });
          props.assetAdded(response.data?.id);
          closedSuccess(response.data?.meta?.message);
        }
      })
      .catch(function (error) {
        console.log(error);
      });

    setCourseLevel("");
    // setCourseModule("");
    // setCourse("");
    setQuestion("");
    setQuestionFile("");
    setQuestionType("");
    setAnswer("");
    setAnswerType("");
    setOptionA("");
    setOptionB("");
    setOptionC("");
    setOptionD("");
    setOptionAFile("");
    setOptionBFile("");
    setOptionCFile("");
    setOptionDFile("");
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" static className="bg-gray-800 bg-opacity-50 fixed inset-0 overflow-hidden z-40" open={open} onClose={closed}>
        <div className="absolute inset-0 overflow-hidden">
          <Dialog.Overlay className="absolute inset-0" />

          <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex sm:pl-16">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full">
              <div className="w-screen max-w-2xl">
                <form className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
                  <div className="flex-1">
                    <div className="px-4 py-6 bg-gray-50 sm:px-6">
                      <div className="flex items-start justify-between space-x-3">
                        <div className="space-y-1">
                          <Dialog.Title className="text-lg font-medium text-gray-900">Add Progressive Quizz</Dialog.Title>
                          <p className="text-sm text-gray-500">Get started by filling in the information below to add new Quizz.</p>
                        </div>
                        <div className="h-7 flex items-center">
                          <button type="button" className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500" onClick={() => closed()}>
                            <span className="sr-only">Close panel</span>
                            <XIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Divider container */}
                    <div className="py-6 space-y-6 sm:py-0 sm:space-y-0">
                      {/* Project name */}
                      <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">
                        <div>
                          <label htmlFor="asset_type" className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2">
                            Course Level <span className="text-red-700">*</span>
                          </label>
                        </div>

                        <div className="sm:col-span-2">
                          <select onChange={(e) => setCourseLevel(e.target.value)} value={courselevel} id="role" name="role" className="block w-full shadow-sm sm:text-sm qfocus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md">
                            <option>Select Level</option>

                            <option value="1">Level 1</option>
                            <option value="2">Level 2</option>
                            <option value="3">Level 3</option>
                            <option value="4">Level 4</option>
                            <option value="5">Level 5</option>

                            <option value="6">Level 6</option>
                            <option value="7">Level 7</option>
                            <option value="8">Level 8</option>
                            <option value="9">Level 9</option>
                            <option value="10">Level 10</option>
                           
                            {/* <option value="3">Advanced</option> */}
                          </select>
                        </div>
                      </div>
                      {courselevel}
                      {/* Project name */}
                      {/* <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">
                        <div>
                          <label htmlFor="location" className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2">
                            Lesson <span className="text-red-700">*</span>
                          </label>
                        </div>
                        <div className="sm:col-span-2">
                          <select onChange={(e) => levelTrigger1(e.target.value)} value={coursemodule} id="role" name="role" className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md">
                            <option>Select lesson</option>

                            {mydata1
                              ? mydata1.map((data) => (
                                  <option value={data.ID} key={data.ID}>
                                    {data.ModuleTitle}
                                  </option>
                                ))
                              : ""}
                          </select>
                        </div>
                      </div> */}
                      {/* Project name */}
                      {/* <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">
                        <div>
                          <label htmlFor="status" className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2">
                            Section <span className="text-red-700">*</span>
                          </label>
                        </div>

                        <div className="sm:col-span-2">
                          <select onChange={(e) => setCourse(e.target.value)} value={Course} id="role" name="role" className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md">
                            <option>Select Section</option>

                            {mydata2
                              ? mydata2.map((data) => (
                                  <option value={data.ID} key={data.ID}>
                                    {data.Title}
                                  </option>
                                ))
                              : ""}
                          </select>

                        </div>
                      </div> */}

                      <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">
                        <div>
                          <label className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2">
                            Question Type <span className="text-red-700">*</span>
                          </label>
                        </div>

                        <div className="sm:col-span-2">
                          <select onChange={(e) => setQtype(e.target.value)} value={qtype} className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md">
                            <option value="">Select Question Type</option>
                            <option value="blank">Fill in the blank</option>
                            <option value="mcq">Multiple Choice Question</option>
                          </select>

                          {/* {Course} */}
                        </div>
                      </div>
                      <div id="mcqdiv" className={qtype === "mcq" ? "block" : "hidden"}>
                        <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">
                          <div>
                            <label htmlFor="asset_tag" className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2">
                              Question <span className="text-red-700">*</span>
                            </label>
                          </div>
                          <div className="sm:col-span-2">
                            <input
                              onFocus={() => {
                                setDiaplayquestionkey(true);
                              }}
                              placeholder="Enter Question"
                              onChange={(e) => setQuestion(e.target.value)}
                              value={question}
                              type="text"
                              name="asset_tag"
                              id="asset_tag"
                              className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                            />
                          </div>
                        </div>


                        <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">
                          <div>
                            <label htmlFor="location" className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2">
                              Question Media Type
                            </label>
                          </div>
                          <div className="sm:col-span-2">
                            <select onChange={(e) => setQuestionType(e.target.value)} value={questiontype} id="role" name="role" className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md">
                              <option>Select Question Type</option>

                              <option value="Image">Image</option>
                              <option value="Audio">Audio</option>
                              <option value="Video">Video</option>
                            </select>
                          </div>
                        </div>

                        {questiontype === "Image" || questiontype === "Audio" || questiontype === "Video" ? (
                          <>
                            <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">
                              <div>
                                <label htmlFor="asset_tag" className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2">
                                  Image Question
                                </label>
                              </div>
                              <div className="sm:col-span-2">
                                <input
                                  placeholder="Enter Question"
                                  onChange={(e) => setQuestionFile(e.target.files[0])}
                                  type="file"
                                  multiple
                                  accept="audio/*,video/*,image/*"
                                  name="image"
                                  id="image"
                                  className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                                />
                              </div>
                            </div>
                          </>
                        ) : (
                          ""
                        )}

                        <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">
                          <div>
                            <label htmlFor="location" className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2">
                              Answer Type <span className="text-red-700">*</span>
                            </label>
                          </div>
                          <div className="sm:col-span-2">
                            <select onChange={(e) => setAnswerType(e.target.value)} value={answertype} id="role" name="role" className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md">
                              <option>Select Answer Type</option>

                              <option value="Text">Text</option>
                              <option value="Image">Image</option>
                              <option value="Audio">Audio</option>
                            </select>
                          </div>
                        </div>

                        <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">
                          <div>
                            <label htmlFor="location" className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2">
                              Select number of options <span className="text-red-700">*</span>
                            </label>
                          </div>
                          <div className="sm:col-span-2">
                            <select onChange={(e) => setNoOptions(e.target.value)} value={nooptions} id="role" name="role" className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md">
                              <option>Select options</option>

                              <option value="2">2 options</option>
                              <option value="3">3 options</option>
                              <option value="4">4 options</option>
                            </select>
                          </div>
                        </div>

                        {answertype === "Text" && nooptions === "2" ? (
                          <>
                            <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">
                              <div>
                                <label htmlFor="asset_tag" className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2">
                                  OptionA <span className="text-red-700">*</span>
                                </label>
                              </div>
                              <div className="sm:col-span-2">
                                <input
                                onFocus={() => {
                                    setDisplayanswer1key(true);
                                  }}
                                  placeholder="Enter OptionA"
                                  onChange={(e) => setOptionA(e.target.value)}
                                  value={optiona}
                                  type="text"
                                  name="asset_tag"
                                  id="asset_tag"
                                  className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                                />
                              </div>
                            </div>


                            <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">
                              <div>
                                <label htmlFor="asset_tag" className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2">
                                  OptionB <span className="text-red-700">*</span>
                                </label>
                              </div>
                              <div className="sm:col-span-2">
                                <input
                                 onFocus={() => {
                                    setDisplayanswer2key(true);
                                  }}
                                  placeholder="Enter OptionB"
                                  onChange={(e) => setOptionB(e.target.value)}
                                  value={optionb}
                                  type="text"
                                  name="asset_tag"
                                  id="asset_tag"
                                  className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                                />
                              </div>
                            </div>


                            <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">
                              <div>
                                <label htmlFor="tracking_option" className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2">
                                  Answer <span className="text-red-700">*</span>
                                </label>
                              </div>

                              <div className="sm:col-span-2">
                                <select onChange={(e) => setAnswer(e.target.value)} value={answer} id="role" name="role" className="block w-full shadow-sm sm:text-sm qfocus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md">
                                  <option>Select Option</option>

                                  <option value="A">Option A</option>
                                  <option value="B">Option B</option>
                                </select>
                              </div>
                            </div>
                          </>
                        ) : (
                          ""
                        )}

                        {answertype === "Text" && nooptions === "3" ? (
                          <>
                            <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">
                              <div>
                                <label htmlFor="asset_tag" className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2">
                                  OptionA <span className="text-red-700">*</span>
                                </label>
                              </div>
                              <div className="sm:col-span-2">
                                <input
                                onFocus={() => {
                                    setDisplayanswer1key(true);
                                  }}
                                  placeholder="Enter OptionA"
                                  onChange={(e) => setOptionA(e.target.value)}
                                  value={optiona}
                                  type="text"
                                  name="asset_tag"
                                  id="asset_tag"
                                  className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                                />
                              </div>
                            </div>


                            <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">
                              <div>
                                <label htmlFor="asset_tag" className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2">
                                  OptionB <span className="text-red-700">*</span>
                                </label>
                              </div>
                              <div className="sm:col-span-2">
                                <input
                                 onFocus={() => {
                                    setDisplayanswer2key(true);
                                  }}
                                  placeholder="Enter OptionB"
                                  onChange={(e) => setOptionB(e.target.value)}
                                  value={optionb}
                                  type="text"
                                  name="asset_tag"
                                  id="asset_tag"
                                  className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                                />
                              </div>
                            </div>


                            <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">
                              <div>
                                <label htmlFor="asset_tag" className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2">
                                  OptionC <span className="text-red-700">*</span>
                                </label>
                              </div>
                              <div className="sm:col-span-2">
                                <input
                                  onFocus={() => {
                                    setDisplayanswer3key(true);
                                  }}
                                  placeholder="Enter OptionC"
                                  onChange={(e) => setOptionC(e.target.value)}
                                  value={optionc}
                                  type="text"
                                  name="asset_tag"
                                  id="asset_tag"
                                  className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                                />
                              </div>
                            </div>


                            <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">
                              <div>
                                <label htmlFor="tracking_option" className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2">
                                  Answer <span className="text-red-700">*</span>
                                </label>
                              </div>

                              <div className="sm:col-span-2">
                                <select onChange={(e) => setAnswer(e.target.value)} value={answer} id="role" name="role" className="block w-full shadow-sm sm:text-sm qfocus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md">
                                  <option>Select Option</option>

                                  <option value="A">Option A</option>
                                  <option value="B">Option B</option>
                                  <option value="C">Option C</option>
                                </select>
                              </div>
                            </div>
                          </>
                        ) : (
                          ""
                        )}

                        {answertype === "Text" && nooptions === "4" ? (
                          <>
                            <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">
                              <div>
                                <label htmlFor="asset_tag" className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2">
                                  OptionA <span className="text-red-700">*</span>
                                </label>
                              </div>
                              <div className="sm:col-span-2">
                                <input
                                  onFocus={() => {
                                    setDisplayanswer1key(true);
                                  }}
                                  placeholder="Enter OptionA"
                                  onChange={(e) => setOptionA(e.target.value)}
                                  value={optiona}
                                  type="text"
                                  name="asset_tag"
                                  id="asset_tag"
                                  className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                                />
                              </div>
                            </div>


                            <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">
                              <div>
                                <label htmlFor="asset_tag" className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2">
                                  OptionB <span className="text-red-700">*</span>
                                </label>
                              </div>
                              <div className="sm:col-span-2">
                                <input
                                  onFocus={() => {
                                    setDisplayanswer2key(true);
                                  }}
                                  placeholder="Enter OptionB"
                                  onChange={(e) => setOptionB(e.target.value)}
                                  value={optionb}
                                  type="text"
                                  name="asset_tag"
                                  id="asset_tag"
                                  className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                                />
                              </div>
                            </div>


                            <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">
                              <div>
                                <label htmlFor="asset_tag" className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2">
                                  OptionC <span className="text-red-700">*</span>
                                </label>
                              </div>
                              <div className="sm:col-span-2">
                                <input
                                  onFocus={() => {
                                    setDisplayanswer3key(true);
                                  }}
                                  placeholder="Enter OptionC"
                                  onChange={(e) => setOptionC(e.target.value)}
                                  value={optionc}
                                  type="text"
                                  name="asset_tag"
                                  id="asset_tag"
                                  className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                                />
                              </div>
                            </div>


                            <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">
                              <div>
                                <label htmlFor="asset_tag" className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2">
                                  OptionD <span className="text-red-700">*</span>
                                </label>
                              </div>
                              <div className="sm:col-span-2">
                                <input
                                  onFocus={() => {
                                    setDisplayanswer4key(true);
                                  }}
                                  placeholder="Enter OptionD"
                                  onChange={(e) => setOptionD(e.target.value)}
                                  value={optiond}
                                  type="text"
                                  name="asset_tag"
                                  id="asset_tag"
                                  className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                                />
                              </div>
                            </div>


                            <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">
                              <div>
                                <label htmlFor="tracking_option" className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2">
                                  Answer <span className="text-red-700">*</span>
                                </label>
                              </div>

                              <div className="sm:col-span-2">
                                <select onChange={(e) => setAnswer(e.target.value)} value={answer} id="role" name="role" className="block w-full shadow-sm sm:text-sm qfocus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md">
                                  <option>Select Option</option>

                                  <option value="A">Option A</option>
                                  <option value="B">Option B</option>
                                  <option value="C">Option C</option>
                                  <option value="D">Option D</option>
                                </select>
                              </div>
                            </div>
                          </>
                        ) : (
                          ""
                        )}

                        {(answertype === "Image" || answertype === "Audio") && nooptions === "2" ? (
                          <>
                            <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">
                              <div>
                                <label htmlFor="asset_tag" className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2">
                                  OptionA <span className="text-red-700">*</span>
                                </label>
                              </div>
                              <div className="sm:col-span-2">
                                <input
                                  placeholder="Enter OptionA"
                                  onChange={(e) => setOptionAFile(e.target.files[0])}
                                  type="file"
                                  multiple
                                  accept="audio/*,video/*,image/*"
                                  name="image"
                                  id="image"
                                  className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                                />
                              </div>
                            </div>
                            <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">
                              <div>
                                <label htmlFor="asset_tag" className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2">
                                  OptionB <span className="text-red-700">*</span>
                                </label>
                              </div>
                              <div className="sm:col-span-2">
                                <input
                                  placeholder="Enter OptionB"
                                  onChange={(e) => setOptionBFile(e.target.files[0])}
                                  type="file"
                                  multiple
                                  accept="audio/*,video/*,image/*"
                                  name="image"
                                  id="image"
                                  className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                                />
                              </div>
                            </div>

                            <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">
                              <div>
                                <label htmlFor="tracking_option" className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2">
                                  Answer <span className="text-red-700">*</span>
                                </label>
                              </div>

                              <div className="sm:col-span-2">
                                <select onChange={(e) => setAnswer(e.target.value)} value={answer} id="role" name="role" className="block w-full shadow-sm sm:text-sm qfocus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md">
                                  <option>Select Option</option>

                                  <option value="A">Option A</option>
                                  <option value="B">Option B</option>
                                </select>
                              </div>
                            </div>
                          </>
                        ) : (
                          ""
                        )}

                        {(answertype === "Image" || answertype === "Audio") && nooptions === "3" ? (
                          <>
                            <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">
                              <div>
                                <label htmlFor="asset_tag" className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2">
                                  OptionA <span className="text-red-700">*</span>
                                </label>
                              </div>
                              <div className="sm:col-span-2">
                                <input
                                  placeholder="Enter OptionA"
                                  onChange={(e) => setOptionAFile(e.target.files[0])}
                                  type="file"
                                  multiple
                                  accept="audio/*,video/*,image/*"
                                  name="image"
                                  id="image"
                                  className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                                />
                              </div>
                            </div>
                            <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">
                              <div>
                                <label htmlFor="asset_tag" className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2">
                                  OptionB <span className="text-red-700">*</span>
                                </label>
                              </div>
                              <div className="sm:col-span-2">
                                <input
                                  placeholder="Enter OptionB"
                                  onChange={(e) => setOptionBFile(e.target.files[0])}
                                  type="file"
                                  multiple
                                  accept="audio/*,video/*,image/*"
                                  name="image"
                                  id="image"
                                  className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                                />
                              </div>
                            </div>

                            <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">
                              <div>
                                <label htmlFor="asset_tag" className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2">
                                  OptionC <span className="text-red-700">*</span>
                                </label>
                              </div>
                              <div className="sm:col-span-2">
                                <input
                                  placeholder="Enter OptionC"
                                  onChange={(e) => setOptionCFile(e.target.files[0])}
                                  type="file"
                                  multiple
                                  accept="audio/*,video/*,image/*"
                                  name="image"
                                  id="image"
                                  className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                                />
                              </div>
                            </div>

                            <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">
                              <div>
                                <label htmlFor="tracking_option" className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2">
                                  Answer <span className="text-red-700">*</span>
                                </label>
                              </div>

                              <div className="sm:col-span-2">
                                <select onChange={(e) => setAnswer(e.target.value)} value={answer} id="role" name="role" className="block w-full shadow-sm sm:text-sm qfocus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md">
                                  <option>Select Option</option>

                                  <option value="A">Option A</option>
                                  <option value="B">Option B</option>
                                  <option value="C">Option C</option>
                                </select>
                              </div>
                            </div>
                          </>
                        ) : (
                          ""
                        )}

                        {(answertype === "Image" || answertype === "Audio") && nooptions === "4" ? (
                          <>
                            <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">
                              <div>
                                <label htmlFor="asset_tag" className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2">
                                  OptionA <span className="text-red-700">*</span>
                                </label>
                              </div>
                              <div className="sm:col-span-2">
                                <input
                                  placeholder="Enter OptionA"
                                  onChange={(e) => setOptionAFile(e.target.files[0])}
                                  type="file"
                                  multiple
                                  accept="audio/*,video/*,image/*"
                                  name="image"
                                  id="image"
                                  className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                                />
                              </div>
                            </div>
                            <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">
                              <div>
                                <label htmlFor="asset_tag" className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2">
                                  OptionB <span className="text-red-700">*</span>
                                </label>
                              </div>
                              <div className="sm:col-span-2">
                                <input
                                  placeholder="Enter OptionB"
                                  onChange={(e) => setOptionBFile(e.target.files[0])}
                                  type="file"
                                  multiple
                                  accept="audio/*,video/*,image/*"
                                  name="image"
                                  id="image"
                                  className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                                />
                              </div>
                            </div>

                            <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">
                              <div>
                                <label htmlFor="asset_tag" className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2">
                                  OptionC <span className="text-red-700">*</span>
                                </label>
                              </div>
                              <div className="sm:col-span-2">
                                <input
                                  placeholder="Enter OptionC"
                                  onChange={(e) => setOptionCFile(e.target.files[0])}
                                  type="file"
                                  multiple
                                  accept="audio/*,video/*,image/*"
                                  name="image"
                                  id="image"
                                  className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                                />
                              </div>
                            </div>

                            <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">
                              <div>
                                <label htmlFor="asset_tag" className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2">
                                  OptionD <span className="text-red-700">*</span>
                                </label>
                              </div>
                              <div className="sm:col-span-2">
                                <input
                                  placeholder="Enter OptionD"
                                  onChange={(e) => setOptionDFile(e.target.files[0])}
                                  type="file"
                                  multiple
                                  accept="audio/*,video/*,image/*"
                                  name="image"
                                  id="image"
                                  className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                                />
                              </div>
                            </div>

                            <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">
                              <div>
                                <label htmlFor="tracking_option" className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2">
                                  Answer <span className="text-red-700">*</span>
                                </label>
                              </div>

                              <div className="sm:col-span-2">
                                <select onChange={(e) => setAnswer(e.target.value)} value={answer} id="role" name="role" className="block w-full shadow-sm sm:text-sm qfocus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md">
                                  <option>Select Option</option>

                                  <option value="A">Option A</option>
                                  <option value="B">Option B</option>
                                  <option value="C">Option C</option>
                                  <option value="D">Option D</option>
                                </select>
                              </div>
                            </div>
                          </>
                        ) : (
                          ""
                        )}
                      </div>
                      <div id="blankdiv" className={qtype === "blank" ? "block" : "hidden"}>
                        <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">
                          <div>
                            <label htmlFor="location" className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2">
                              Question Media Type
                            </label>
                          </div>
                          <div className="sm:col-span-2">
                            <select onChange={(e) => setQuestionType(e.target.value)} value={questiontype} id="role" name="role" className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md">
                              <option>Select Question Type</option>

                              <option value="Image">Image</option>
                              <option value="Audio">Audio</option>
                              <option value="Video">Video</option>
                            </select>
                          </div>
                        </div>

                        {questiontype === "Image" || questiontype === "Audio" || questiontype === "Video" ? (
                          <>
                            <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">
                              <div>
                                <label htmlFor="asset_tag" className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2">
                                  Image Question
                                </label>
                              </div>
                              <div className="sm:col-span-2">
                                <input
                                  placeholder="Enter Question"
                                  onChange={(e) => setQuestionFile(e.target.files[0])}
                                  type="file"
                                  multiple
                                  accept="audio/*,video/*,image/*"
                                  name="image"
                                  id="image"
                                  className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                                />
                              </div>
                            </div>
                          </>
                        ) : (
                          ""
                        )}

                        <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">
                          <div>
                            <label htmlFor="asset_tag" className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2">
                              Question <span className="text-red-700">*</span>
                            </label>
                          </div>
                          <div className="sm:col-span-2">
                            <input
                              onFocus={() => {
                                setDiaplayquestionkey(true);
                              }}
                              placeholder="Enter Question"
                              onChange={(e) => setQuestion(e.target.value)}
                              value={question}
                              type="text"
                              name="asset_tag"
                              id="asset_tag"
                              className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                            />
                          </div>
                        </div>
 

                        <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">
                          <div>
                            <label htmlFor="tracking_option" className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2">
                              Answer <span className="text-red-700">*</span>
                            </label>
                          </div>

                          <div className="sm:col-span-2">
                            <input
                              onFocus={() => {
                                setDiaplayanswerkey(true);
                              }}
                              placeholder="Enter Answer"
                              onChange={(e) => setAnswer(e.target.value)}
                              value={answer}
                              type="text"
                              className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                            />
                          </div>
                        </div>

                      </div>

                      {addAssetMessage.message ? <Alert type={addAssetMessage.type} message={addAssetMessage.message} icon={addAssetMessage.icon} /> : ""}
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex-shrink-0 px-4 border-t border-gray-200 py-5 sm:px-6">
                    <div className="space-x-3 flex justify-end">
                      <button
                        type="button"
                        className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={() => closed()}>
                        Cancel
                      </button>
                      <button
                        type="submit"
                        onClick={(e) => submitAsset(e)}
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Create
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
