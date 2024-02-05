import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Perks from "../Perks";

export default function Placespage() {
  const { action } = useParams();
  console.log(action);
  const [Title, setTitle] = useState("");
  const [Address, setAddress] = useState("");
  const [Description, setDescription] = useState("");
  const [addedPhoto, setAddedPhoto] = useState([]);
  const [Photolink, setPhotolink] = useState("");
  const [perks, setPerks] = useState([]);
  const [CheckIn, setCheckIn] = useState("");
  const [CheckOut, setCheckOut] = useState("");
  const [MinGuest, setMinGuest] = useState("");
  const [ExtraInfo, setExtraInfo] = useState("");

  function inputHandler(text) {
    return <h1 className="text-primary text-xl mt-2">{text}</h1>;
  }
  function inputDiscription(text) {
    return <p className="text-gray-500 text-sm">{text}</p>;
  }
  function preinputHandler(Handler, Discription) {
    return (
      <div>
        {inputHandler(Handler)}
        {inputDiscription(Discription)}
      </div>
    );
  }
  function addPhotobyLink() {}

  return (
    <div>
      {action !== "new" && (
        <div className="text-center">
          <Link
            className="inline-flex gap-2 bg-primary text-white px-4 py-2 rounded-full "
            to={"/account/places/new"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Add new Place
          </Link>
        </div>
      )}

      {action === "new" && (
        <div>
          <form className="flex-col flex">
            {preinputHandler(
              "Title",
              "Title of the place should be unique and catchy."
            )}
            <input
              type="text"
              className="border border-gray-300 rounded-md p-2"
              placeholder="Place Name"
              value={Title}
              onChange={(e) => setTitle(e.target.value)}
            />
            {preinputHandler("Address", "Address of the place")}
            <input
              type="text"
              className="border border-gray-300 rounded-md p-2"
              placeholder="Address"
              value={Address}
              onChange={(e) => setAddress(e.target.value)}
            />
            {preinputHandler("Description", "Description of the place")}
            <textarea
              className="border border-gray-300 rounded-md p-2"
              placeholder="Description"
              value={Description}
              onChange={(e) => setDescription(e.target.value)}
            />
            {preinputHandler("Photo", "Add photo of the place")}
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Add Using Link .....jpg"
                value={Photolink}
                onChange={(e) => setPhotolink(e.target.value)}
                className="w-full border rounded-lg" 
              />
              <button className="bg-gray-200 text-black">Add&nbsp;Photo</button>
              
            </div>
            <div className="flex-col  grid grid-cols-3 lg:grid-cols-6 md:grid-cols-4">
              <button className="border bg-transparent text-black rounded-2xl p-4 text-xl flex justify-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"
                  />
                </svg>
                Upload
              </button>
            </div>
            {/* <input
              type="file"
              className="border border-gray-300 rounded-md p-2"
              placeholder="Photo"
            /> */}

            {preinputHandler("Perks", "Perks of the place")}
            <div>
              <Perks selected={perks} Onchange={setPerks} />
            </div>

            {preinputHandler("Check In & Out Time", "Check In & Out Time")}
            <div className="grid grid-cols-3 gap-7">
              <div>
                <h1>Check In</h1>
                <input
                  type="text"
                  placeholder="14"
                  value={CheckIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                />
              </div>
              <div>
                <h1>Check out</h1>
                <input
                  type="text"
                  placeholder="11"
                  value={CheckOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                />
              </div>
              <div>
                <h1>Minimum Guest</h1>
                <input
                  type="number"
                  placeholder="2...3"
                  value={MinGuest}
                  onChange={(e) => setMinGuest(e.target.value)}
                />
              </div>
            </div>
            {preinputHandler("Extra Info", "Extra Info")}
            <textarea
              className="border border-gray-300 rounded-md p-2"
              placeholder="extra info, rules, etc."
              value={ExtraInfo}
              onChange={(e) => setExtraInfo(e.target.value)}
            />

            <button className="bg-primary text-white p-2 rounded-md">
              Save
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
