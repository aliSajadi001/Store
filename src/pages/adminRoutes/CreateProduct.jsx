import { Link } from "react-router-dom";
import WithAuth from "../../helper/adminAuth";
import axios from "axios";
import { FiUploadCloud } from "react-icons/fi";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useState } from "react";
import { CiCircleRemove } from "react-icons/ci";
import { toast } from "react-toastify";

function CrateProducts() {
  let categorys = [
    "Tools",
    "computer ",
    "mobile phones",
    "watch",
    "supplement",
    "toy",
  ];

  let [name, setName] = useState("");
  let [price, setPrice] = useState(0);
  let [quantity, setQuantity] = useState(0);
  let [images, setImages] = useState([]);
  let [category, setCategory] = useState("");
  let [discription, setDiscription] = useState("");
  let uploadeImage = (e) => {
    let newEmage = e.target.files;
    setImages((prev) => [...prev, ...newEmage]);
  };

  let handleDragDrop = (result) => {
    if (!result.destination) return;
    let item = Array.from(images);
    let [dragItem] = item.slice(result.source.index, 1);
    item.slice(result.destination.index, 0, dragItem);
  };
  let removeItem = (item) => {
    setImages((prev) => prev.filter((image) => image !== item));
  };
  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("quantity", quantity);
      formData.append("discription", discription);
      formData.append("category", category);
      images.forEach((image) => {
        formData.append("images", image);
      });

      let res = await axios.post(
        "http://localhost:3001/createProduct",
        formData
      );

      if (res.data.success) {
        toast.success("Productes saved successfully");
        setName("");
        setPrice("");
        setImages("");
        setQuantity("");
        setDiscription("");
      } else {
        toast.error(res.data.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-full flex flex-col items-center pt-5 gap-5">
      <div className="flex items-center justify-center gap-4 flex-wrap text-white font-normal ">
        <Link
          className="flex w-40 items-center justify-center rounded-sm border p-3 bg-blue-400"
          to="/admin/product">
          Product
        </Link>
        <Link
          className="flex w-40 items-center justify-center rounded-sm border p-3 bg-blue-400"
          to="/admin/createProduct">
          CreateProduct
        </Link>
        <Link
          className="flex w-40 items-center justify-center rounded-sm border p-3 bg-blue-400"
          to="/admin/updateProduct">
          UpdateProduct
        </Link>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center p-5 gap-5 w-[500px] border bg-indigo-200 shadow-lg pb-2 shadow-blue-700 h-auto rounded-md">
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          className="w-full  border outline-none
         border-blue-200 rounded-md py-1 px-3 placeholder:text-blue-300"
          type="text"
          placeholder="Nmae"
        />
        <input
          onChange={(e) => setPrice(e.target.value)}
          value={price}
          className="w-full  border outline-none
         border-blue-200 rounded-md py-1 px-3 placeholder:text-blue-300"
          type="number"
          placeholder="Price"
        />
        <input
          onChange={(e) => setQuantity(e.target.value)}
          value={quantity}
          className="w-full  border outline-none
         border-blue-200 rounded-md py-1 px-3 placeholder:text-blue-300"
          type="number"
          placeholder="Quantity"
        />
        <textarea
          onChange={(e) => setDiscription(e.target.value)}
          value={discription}
          className="w-full  border rounded-md px-3 border-blue-200 placeholder:text-blue-300 "
          name="Discription"
          placeholder="Discription"></textarea>

        <input
          onChange={uploadeImage}
          accept="image/*"
          type="file"
          multiple
          className="hidden"
        />

        <DragDropContext onDragEnd={handleDragDrop}>
          <Droppable droppableId="image" discription="horizontal">
            {(provided) => (
              <div
                className=""
                {...provided.droppableProps}
                ref={provided.innerRef}>
                {images.length < 1 && (
                  <>
                    <label htmlFor="images">
                      <FiUploadCloud className="text-9xl text-blue-700 opacity-30 hover:opacity-70 w-full" />
                    </label>
                    <input
                      className="hidden"
                      type="file"
                      multiple
                      onChange={uploadeImage}
                      accept="image/*"
                      name="images"
                      id="images"
                    />
                  </>
                )}
                {images.length >= 1 && (
                  <>
                    {images.map((image, index) => {
                      return (
                        <Draggable
                          key={index}
                          draggableId={index.toString()}
                          index={index}>
                          {(provided) => (
                            <div
                              {...provided.draggableProps}
                              ref={provided.innerRef}
                              {...provided.dragHandleProps}>
                              <div className="relative">
                                <img
                                  src={URL.createObjectURL(image)}
                                  alt="dp"
                                  className="w-full h-[200px] rounded-md mt-2 "
                                />
                                <div className="absolute top-0 left-0">
                                  <CiCircleRemove
                                    onClick={() => removeItem(image)}
                                    className=" cursor-pointer text-rose-600 text-3xl"
                                  />
                                </div>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      );
                    })}
                    <label htmlFor="images">
                      <FiUploadCloud className="text-9xl text-blue-700 opacity-30 hover:opacity-70 w-full" />
                    </label>
                    <input
                      className="hidden"
                      type="file"
                      multiple
                      onChange={uploadeImage}
                      accept="image/*"
                      name="images"
                      id="images"
                    />
                  </>
                )}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <select
          onChange={(e) => setCategory(e.target.value)}
          name="category"
          className="w-full border outline-none border-blue-300 rounded-md px-3 py-1">
          {categorys.map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <button className="bg-blue-500 p-1 rounded-md w-full text-white font-bold">
          Submit
        </button>
      </form>
    </div>
  );
}

export default WithAuth(CrateProducts);
