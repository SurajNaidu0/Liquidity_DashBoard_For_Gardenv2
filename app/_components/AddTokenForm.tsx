import { useState } from "react";
import { addToken } from "../_lib/actions";

interface AddTokenFormProps {
  chainIdentifier: string;
  onCloseModal: () => void;
}

interface AddTokenFormData {
  name: string;
  address: string;
}

const initialState: AddTokenFormData = {
  name: "",
  address: "",
};

function AddTokenForm({ chainIdentifier, onCloseModal }: AddTokenFormProps) {
  const [formState, setFormState] = useState(initialState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form
      onSubmit={onCloseModal}
      action={addToken.bind(null, chainIdentifier)}
      className="bg-white rounded-lg max-w-md space-y-6"
    >
      <h2 className="text-xl font-semibold text-gray-800">Add Token</h2>

      <div>
        <label className="text-sm mb-1 inline-block" htmlFor="address">
          Enter Name
        </label>
        <input
          name="name"
          id="name"
          value={formState.name}
          onChange={handleChange}
          placeholder="Name"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 text-gray-800"
        />
      </div>

      <div>
        <label className="text-sm mb-1 inline-block" htmlFor="address">
          Enter Contract Address
        </label>
        <input
          name="address"
          id="address"
          value={formState.address}
          onChange={handleChange}
          placeholder="Contract Address"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 text-gray-800"
        />
      </div>

      <button
        type="submit"
        className="!mt-7 w-full px-4 py-2 text-white bg-gray-600 hover:bg-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-white"
      >
        Add
      </button>
    </form>
  );
}

export default AddTokenForm;
