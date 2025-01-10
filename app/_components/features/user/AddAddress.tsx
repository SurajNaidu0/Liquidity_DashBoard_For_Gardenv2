"use client";

import Image from "next/image";
import Modal from "@/app/_components/Modal";
import AddressForm from "@/app/_components/features/user/AddressForm";

function AddAddress() {
  return (
    <Modal>
      <Modal.Open windowName="add-address">
        <button className="ml-auto hover:bg-slate-700 bg-slate-600 flex items-center justify-center gap-2 px-4 py-2 border rounded-md text-white">
          <Image
            className="invert"
            src="/plus.svg"
            alt="Add"
            width={16}
            height={16}
          />
          <span>Add Address</span>
        </button>
      </Modal.Open>

      <Modal.Window windowName="add-address">
        <AddressForm />
      </Modal.Window>
    </Modal>
  );
}

export default AddAddress;
