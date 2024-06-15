import { useEffect, useState } from "react";

import axios from "axios";
import { FiUploadCloud } from "react-icons/fi";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { CiCircleRemove } from "react-icons/ci";
import { useNavigate, useParams } from "react-router-dom";
import Categorys from "../../component/Categorys";

function UpdataProducts() {
  let navigate = useNavigate();
  let [name, setName] = useState("");
  let [price, setPrice] = useState(0);
  let [quantity, setQuantity] = useState(0);
  let [discription, setDiscription] = useState("");
  let [category, setCategory] = useState("");
  let [images, setImages] = useState([]);
  let [loading, setLoading] = useState(false);
  console.log(images);

  let id = useParams().id;
  console.log(id);
  let handleSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("quantity", quantity);
    formData.append("discription", discription);
    if (images.length === 1) {
      formData.append("images", images[0]);
    } else {
      for (let image of images) {
        formData.append("images", image);
      }
    }

    try {
      setLoading(true);
      let { data } = await axios.put(
        `http://localhost:3001/updateProduct/${id}`,
        formData
      );
      setLoading(false);
      console.log(images);
      console.log(data);
      if (data.success) {
        navigate("/admin");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  let getProduct = async () => {
    try {
      let { data } = await axios.get(
        `http://localhost:3001/singleProduct/${id}`
      );
      console.log(data);
      setName(data?.product?.name);
      setPrice(data?.product?.price);
      setImages(data?.product?.imagePath);
      setCategory(data?.product?.category);
      setQuantity(data?.product?.quantity);
      setDiscription(data?.product?.discription);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProduct();
  }, [id]);

  let uploadeImage = (e) => {
    let newImage = e.target.files;
    setImages((prev) => [...prev, ...newImage]);
  };

  let handleDragDrop = (result) => {
    if (!result.destination) return;
    let items = Array.from(images);
    let [dragItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, dragItem);
    setImages(items);
  };

  let removeItem = (item) => {
    setImages((prev) => prev.filter((image) => image != item));
  };

  return (
    <div className="flex items-center justify-center mt-6">
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
                <>
                  {images?.map((image, index) => {
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
                              {image instanceof Object ? (
                                <img
                                  src={URL.createObjectURL(image)}
                                  alt="image"
                                  className="w-full h-[200px] rounded-md mt-2 "
                                />
                              ) : (
                                <img
                                  className="w-full h-[200px] rounded-md mt-2 "
                                  src={`http://localhost:3001/${image.replace(
                                    "public",
                                    ""
                                  )}`}
                                  alt="image"
                                />
                              )}
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
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <select
          onChange={(e) => setCategory(e.target.value)}
          name="category"
          className="w-full border outline-none border-blue-300 rounded-md px-3 py-1">
          {Categorys.map((cat, index) => (
            <option key={index} value={category}>
              {cat}
            </option>
          ))}
        </select>
        <button
          disabled={loading}
          className="bg-blue-500 p-1 disabled:cursor-not-allowed rounded-md w-full text-white font-bold">
          Submit
        </button>
      </form>
    </div>
  );
}

export default UpdataProducts;
