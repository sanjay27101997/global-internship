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

export default function AddAssetTypeDialog(props) {
  const [open, setOpen] = useState(false);

  const [courselevel, setCourseLevel] = useState("");
  const [coursemodule, setCourseModule] = useState("");
  const [coursetitle, setCourseTitle] = useState("");
  const [coursedescription, setCourseDescription] = useState("");

  const [status, setStatus] = useState("Active");

  // const [mydata, setMyData] = useState("");
  const [mydata1, setMyData1] = useState("");
  const [myimage, setMyImage] = useState("");

  const [addAssetTypeMessage, setAddAssetTypeMessage] = useState({
    type: "",
    message: "",
    icon: "",
  });

  useEffect(() => {
    setOpen(props.open);

    // axios.post(API_URL + "allcourses.php").then(function(response) {

    //   console.log(response);
    //   setMyData(response.data?.data);

    //         // return;

    //       })
  }, [props.open]);
  function closed() {
    setOpen(false);
    props.onChangeOpen();
    setAddAssetTypeMessage("");
    setCourseModule("");
    setCourseLevel("");
    setCourseTitle("");
    setCourseDescription("");
    setStatus("");
  }
  function closedSuccess(message) {
    props.successMessage(message);
    closed();
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

  function submitAsset(e) {
    e.preventDefault();

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    const formData = new FormData();
    formData.append("file", myimage);
    formData.append("course_module", coursemodule);
    formData.append("course_title", coursetitle);
    formData.append("course_description", coursedescription);
    formData.append("status", status);

    if (coursetitle.trim() === "") {
      setAddAssetTypeMessage({
        type: "error",
        message: "Please enter asset name",
        icon: "error", 
      });
    } else {
      axios
        .post(API_URL + "courses/add_courses.php", formData, config)
        .then(function (response) {
          if (response.data.meta.error) {
            setAddAssetTypeMessage({
              type: "error",
              message: response.data?.meta?.message,
              icon: "error",
            });
          }
          if (!response.data.meta.error) {
            setAddAssetTypeMessage({
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
    }
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
                    {/* Header */}
                    <div className="px-4 py-6 bg-gray-50 sm:px-6">
                      <div className="flex items-start justify-between space-x-3">
                        <div className="space-y-1">
                          <Dialog.Title className="text-lg font-medium text-gray-900">
                            Add Course
                          </Dialog.Title>
                          <p className="text-sm text-gray-500">
                            Get started by filling in the information below to
                            add Chapters.
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
                      {addAssetTypeMessage.message ? (
                        <Alert
                          type={addAssetTypeMessage.type}
                          message={addAssetTypeMessage.message}
                          icon={addAssetTypeMessage.icon}
                        />
                      ) : (
                        ""
                      )}

                      {/* Project name */}
                      <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">
                        <div>
                          <label
                            htmlFor="asset_name"
                            className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                          >
                            Course Level
                          </label>
                        </div>
                        <div className="sm:col-span-2">
                          <select
                            onChange={(e) => levelTrigger(e.target.value)}
                            value={courselevel}
                            id="role"
                            name="role"
                            className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                          >
                            <option>Select Level</option>

                            <option value="1">Beginner</option>
                            <option value="2">Intermediate</option>
                            <option value="3">Advanced</option>

                            {/* {countriesData
                          ? countriesData.map((country) => {
                              return <option value={country.code3}>{country.name}</option>;
                            })
                          : ""} */}

                            {/* {Object.entries(rolesData).map(([key, value]) => (
                              <option key={key} value={key}>
                                {value}
                              </option>
                            ))} */}
                          </select>

                          {/* <input
                            onChange={(e) => setAssetName(e.target.value)}
                            value={assetName}
                            type="text"
                            name="asset_name"
                            id="asset_name"
                            className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                          /> */}
                        </div>
                      </div>

                      {/* Project name */}
                      <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">
                        <div>
                          <label
                            htmlFor="asset_name"
                            className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                          >
                            Course Module
                          </label>
                        </div>
                        <div className="sm:col-span-2">
                          <select
                            onChange={(e) => setCourseModule(e.target.value)}
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

                            {/* {countriesData
                          ? countriesData.map((country) => {
                              return <option value={country.code3}>{country.name}</option>;
                            })
                          : ""} */}
                            {/* <option value="IND">India</option>
                            <option value="China">China</option> */}

                            {/* {Object.entries(rolesData).map(([key, value]) => (
                              <option key={key} value={key}>
                                {value}
                              </option>
                            ))} */}
                          </select>

                          {/* <input
                            onChange={(e) => setAssetName(e.target.value)}
                            value={assetName}
                            type="text"
                            name="asset_name"
                            id="asset_name"
                            className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                          /> */}
                        </div>
                      </div>
                      {/* Project name */}
                      <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">
                        <div>
                          <label
                            htmlFor="model_number"
                            className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                          >
                            Chapter Title
                          </label>
                        </div>
                        <div className="sm:col-span-2">
                          <input
                            onChange={(e) => setCourseTitle(e.target.value)}
                            value={coursetitle}
                            type="text"
                            name="model_number"
                            id="model_number"
                            className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                          />
                        </div>
                      </div>


                      {/* Project name */}
                      <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">
                        <div>
                          <label
                            htmlFor="address"
                            className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                          >
                            Chapter Description
                          </label>
                        </div>
                        <div className="sm:col-span-2">
                          <textarea
                            onChange={(e) =>
                              setCourseDescription(e.target.value)
                            }
                            name="address"
                            id="address"
                            value={coursedescription}
                            className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md h-36"
                          ></textarea>
                        </div>
                      </div>

                      {/* Project name */}
                      {/* <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">
                        <div>
                          <label
                            htmlFor="brand"
                            className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                          >
                            course Description
                          </label>
                        </div>
                        <div className="sm:col-span-2">
                          <input
                            onChange={(e) =>
                              setCourseDescription(e.target.value)
                            }
                            value={coursedescription}
                            type="text"
                            name="brand"
                            id="brand"
                            className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                          />
                        </div>
                      </div> */}

                      {/* Project name */}
                      <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">
                        <div>
                          <label
                            htmlFor="location_name"
                            className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                          >
                            Module Image
                          </label>
                        </div>
                        <div className="sm:col-span-2">
                          <input
                            onChange={(e) => setMyImage(e.target.files[0])}
                            type="file"
                            multiple
                            accept="image/*"
                            name="image"
                            id="image"
                            className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300"
                          />
                        </div>
                      </div>

                      {/* Project name */}
                      <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-2">
                        <div>
                          <label
                            htmlFor="brand"
                            className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                          >
                            Status
                          </label>
                        </div>
                        <div className="sm:col-span-2">
                          <select
                            onChange={(e) => setStatus(e.target.value)}
                            value={status}
                            id="role"
                            name="role"
                            className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                          >
                            {/* <option>Select Status</option> */}

                            {/* {countriesData
                          ? countriesData.map((country) => {
                              return <option value={country.code3}>{country.name}</option>;
                            })
                          : ""} */}
                            <option value="Active">Active</option>
                            {/* <option value="Pending">Pending</option> */}
                            <option value="Disabled">Disabled</option>

                            {/* {Object.entries(rolesData).map(([key, value]) => (
                              <option key={key} value={key}>
                                {value}
                              </option>
                            ))} */}
                          </select>

                          {/* <input
                            onChange={(e) => setBrand(e.target.value)}
                            value={brand}
                            type="text"
                            name="brand"
                            id="brand"
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
