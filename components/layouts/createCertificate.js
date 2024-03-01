import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import {
  LinkIcon,
  PlusIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/solid";
import Alert from "../ui/alert";
const axios = require("axios");
import { API_URL } from "../../config/constants";

export default function AddAssetDialog(props) {
  const [open, setOpen] = useState(false);
  const [tag, setTag] = useState("");

  const [courselevel, setCourseLevel] = useState("");
  const [coursemodule, setCourseModule] = useState("");
  const [Course, setCourse] = useState("");
  const [question, setQuestion] = useState("");
  const [optiona, setOptionA] = useState("");
  const [optionb, setOptionB] = useState("");
  const [optionc, setOptionC] = useState("");
  const [optiond, setOptionD] = useState("");
  const [answer, setAnswer] = useState("");
  const [mydata1, setMyData1] = useState("");
  const [mydata2, setMyData2] = useState("");
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
    setCourseModule("");
    setCourse("");
    setQuestion("");
    setOptionA("");
    setOptionB("");
    setOptionC("");
    setOptionD("");
    setAnswer("");
  }

  function levelTrigger(level_id) {
    setCourseLevel(level_id);
    // e.preventDefault();
    axios
      .post(API_URL + "getcourses.php", { id: level_id })
      .then(function (response) {
        console.log(response);
        setMyData1(response.data?.data);
      });
  }

  function levelTrigger1(level_id) {
    setCourseModule(level_id);
    // e.preventDefault();
    axios
      .post(API_URL + "getcourses1.php", { id: level_id })
      .then(function (response) {
        console.log(response);
        setMyData2(response.data?.data);
      });
  }

  function closedSuccess(message) {
    props.successMessage(message);
    closed();
  }
  function submitAsset(e) {
    e.preventDefault();
    // if (question.trim() === "") {
    //   setAddAssetMessage({ type: "error", message: "Please enter question", icon: "error" });
    // } else if (optiona.trim() === "") {
    //   setAddAssetMessage({ type: "error", message: "Please enter option A", icon: "error" });
    // } else if (optionb.trim() === "") {
    //   setAddAssetMessage({ type: "error", message: "Please Enter option B", icon: "error" });
    // } else if (optionc.trim() === "") {
    //   setAddAssetMessage({ type: "error", message: "Please Enter option C", icon: "error" });
    // } else if (optiond.trim() === "") {
    //   setAddAssetMessage({ type: "error", message: "Please Enter option D", icon: "error" });
    // } else {
    axios
      .post(API_URL + "certificate/add_certificate.php", {
        course_id: courselevel,
        question: question,
        optiona: optiona,
        optionb: optionb,
        optionc: optionc,
        optiond: optiond,
        answer: answer,
      })
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
            icon: "loading",
          });
          props.assetAdded(response.data?.id);
          closedSuccess(response.data?.meta?.message);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    // }
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        static
        className="bg-gray-800 bg-opacity-50 fixed inset-0 overflow-hidden z-40"
        open={open}
        onClose={closed}
      >
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
              leaveTo="translate-x-full"
            >
              <div className="w-screen max-w-2xl">
                <form className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
                  <div className="flex-1">
                    <div className="px-4 py-6 bg-gray-50 sm:px-6">
                      <div className="flex items-start justify-between space-x-3">
                        <div className="space-y-1">
                          <Dialog.Title className="text-lg font-medium text-gray-900">
                            Add certification quiz
                          </Dialog.Title>
                          <p className="text-sm text-gray-500">
                            Get started by filling in the information below to
                            add new Certification Quiz.
                          </p>
                        </div>
                        <div className="h-7 flex items-center">
                          <button
                            type="button"
                            className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            onClick={() => closed()}
                          >
                            <span className="sr-only">Close panel</span>
                            <XIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Divider container */}
                    <div className="py-6 space-y-6 sm:py-0 sm:space-y-0">
                      {addAssetMessage.message ? (
                        <Alert
                          type={addAssetMessage.type}
                          message={addAssetMessage.message}
                          icon={addAssetMessage.icon}
                        />
                      ) : (
                        ""
                      )}

                      {/* Project name */}
                      <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">
                        <div>
                          <label
                            htmlFor="asset_type"
                            className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                          >
                            Select Course 
                          </label>
                        </div>

                        <div className="sm:col-span-2">
                          <select
                            onChange={(e) => levelTrigger(e.target.value)}
                            value={courselevel}
                            id="role"
                            name="role"
                            className="block w-full shadow-sm sm:text-sm qfocus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                          >
                            <option>Select Course</option>

                            <option value="1">Beginner</option>
                            <option value="2">Intermediate</option>
                            <option value="3">Advanced</option>
                          </select>
                        </div>
                      </div>
                      {/* Project name */}
                      {/* <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">
                        <div>
                          <label
                            htmlFor="location"
                            className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                          >
                            Course Module
                          </label>
                        </div>
                        <div className="sm:col-span-2">
                          <select
                            onChange={(e) => levelTrigger1(e.target.value)}
                            value={coursemodule}
                            id="role"
                            name="role"
                            className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                          >
                            <option>Select Module</option>

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
                          <label
                            htmlFor="status"
                            className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                          >
                            Chapter
                          </label>
                        </div>

                        <div className="sm:col-span-2">
                          <select
                            onChange={(e) => setCourse(e.target.value)}
                            value={Course}
                            id="role"
                            name="role"
                            className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                          >
                            <option>Chapter</option>

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

                      {/* Project name */}
                      <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">
                        <div>
                          <label
                            htmlFor="asset_tag"
                            className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                          >
                            Question
                          </label>
                        </div>
                        <div className="sm:col-span-2">
                          <input
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

                      {/* Project name */}
                      <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">
                        <div>
                          <label
                            htmlFor="asset_tag"
                            className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                          >
                            OptionA
                          </label>
                        </div>
                        <div className="sm:col-span-2">
                          <input
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

                      {/* Project name */}
                      <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">
                        <div>
                          <label
                            htmlFor="asset_tag"
                            className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                          >
                            OptionB
                          </label>
                        </div>
                        <div className="sm:col-span-2">
                          <input
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

                      {/* Project name */}
                      <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">
                        <div>
                          <label
                            htmlFor="asset_tag"
                            className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                          >
                            OptionC
                          </label>
                        </div>
                        <div className="sm:col-span-2">
                          <input
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

                      {/* Project name */}
                      <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">
                        <div>
                          <label
                            htmlFor="asset_tag"
                            className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                          >
                            OptionD
                          </label>
                        </div>
                        <div className="sm:col-span-2">
                          <input
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
                      {/* Project name */}
                      {/* <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">
                        <div>
                          <label htmlFor="quantity" className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2">
                            Quantity
                          </label>
                        </div>
                        <div className="sm:col-span-2">
                          <input
                            onChange={(e) => setQuantity(e.target.value)}
                            value={quantity}
                            type="number"
                            name="quantity"
                            id="quantity"
                            className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                          />
                        </div>
                      </div> */}

                      {/* Project name */}
                      <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">
                        <div>
                          <label
                            htmlFor="tracking_option"
                            className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                          >
                            Answer
                          </label>
                        </div>

                        <div className="sm:col-span-2">
                          <select
                            onChange={(e) => setAnswer(e.target.value)}
                            value={answer}
                            id="role"
                            name="role"
                            className="block w-full shadow-sm sm:text-sm qfocus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                          >
                            <option>Select Option</option>
 
                            <option value="A">Option A</option>
                            <option value="B">Option B</option>
                            <option value="C">Option C</option>
                            <option value="D">Option D</option>
                          </select>

                          {/* <input
                            placeholder="Enter Answer"
                            onChange={(e) => setAnswer(e.target.value)}
                            value={answer}
                            type="text"
                            name="asset_tag"
                            id="asset_tag"
                            className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                          /> */}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex-shrink-0 px-4 border-t border-gray-200 py-5 sm:px-6">
                    <div className="space-x-3 flex justify-end">
                      <button
                        type="button"
                        className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={() => closed()}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        onClick={(e) => submitAsset(e)}
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
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
