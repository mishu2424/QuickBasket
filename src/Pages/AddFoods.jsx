
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const AddFoods = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const axiosSecure=useAxiosSecure();
  const handleAddGrocery = async (e) => {
    e.preventDefault();
    const form = e.target;

    const food_name = form.food_name.value;
    const food_image = form.food_image.value;
    const food_category = form.food_category.value;
    const quantity = parseInt(form.quantity.value);
    const price = parseFloat(form.price.value);
    const description = form.description.value;
    const email = user?.email;

    if(quantity>20){
        return toast.error('Quantity can not be more than 20');
    }

    const buyer = {
      buyer_email: email,
      buyer_name: user?.displayName,
      buyer_photo: user?.photoURL,
    };
    const groceryData = {
      food_name,
      food_image,
      food_category,
      quantity,
      price,
      description,
      buyer,
    };

    try {
      const { data } = await axiosSecure.post(
        `/foods`,
        groceryData
      );
      if (data.insertedId) {
        toast.success("Grocery Item Added Successfully!");
        e.target.reset();
      }
        navigate("/added-foods");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-306px)] my-12">
      <section className="p-6 mx-auto bg-white rounded-md shadow-md">
        <h2 className="text-lg font-semibold text-gray-700 capitalize">
          Add Grocery Item
        </h2>

        <form onSubmit={handleAddGrocery}>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label className="text-gray-700" htmlFor="food_name">
                Food Name
              </label>
              <input required
                id="food_name"
                name="food_name"
                type="text"
                className="block w-full px-4 py-2 mt-2 border border-gray-200 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>

            <div>
              <label className="text-gray-700" htmlFor="food_image">
                Image URL
              </label>
              <input required
                id="food_image"
                name="food_image"
                type="text"
                className="block w-full px-4 py-2 mt-2 border border-gray-200 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>

            <div>
              <label className="text-gray-700" htmlFor="food_category">
                Category
              </label>
              <select required
                name="food_category"
                id="food_category"
                className="block w-full px-4 py-2 mt-2 border border-gray-200 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              >
                <option value="Fruits">Fruits</option>
                <option value="Vegetables">Vegetables</option>
                <option value="Dairy">Dairy</option>
                <option value="Others">Others</option>
              </select>
            </div>

            <div>
              <label className="text-gray-700" htmlFor="quantity">
                Quantity
              </label>
              <input  required
                defaultValue={1}
                id="quantity"
                name="quantity"
                type="number"
                min="1"
                step="1"
                className="block w-full px-4 py-2 mt-2 border border-gray-200 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>

            <div>
              <label className="text-gray-700" htmlFor="price">
                Price ($)
              </label>
              <input required
                id="price"
                name="price"
                type="text"
                className="block w-full px-4 py-2 mt-2 border border-gray-200 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>

            <div>
              <label className="text-gray-700" htmlFor="email">
                Buyer Email
              </label>
              <input required
                id="email"
                name="email"
                type="email"
                defaultValue={user?.email}
                disabled
                className="block w-full px-4 py-2 mt-2 bg-gray-100 border border-gray-200 rounded-md"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="text-gray-700" htmlFor="description">
              Description
            </label>
            <textarea required
              name="description"
              id="description"
              rows="4"
              className="block w-full px-4 py-2 mt-2 border border-gray-200 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            ></textarea>
          </div>

          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="px-8 py-2.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Add Item
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default AddFoods;
