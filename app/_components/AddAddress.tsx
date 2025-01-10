"use client";

import Image from "next/image";
import Modal from "@/app/_components/Modal";
import Form from "@/app/_components/Form";
import { addAddress } from "@/app/_lib/actions";

function AddAddress() {
  return (
    <Modal>
      <Modal.Open windowName="add-address">
        <button className="hover:bg-slate-700 bg-slate-600 flex items-center justify-center gap-2 px-4 py-2 border rounded-md text-white">
          <Image
            className="invert"
            src="/plus.svg"
            alt="add"
            width={16}
            height={16}
          />
          <span>Add Address</span>
        </button>
      </Modal.Open>

      <Modal.Window windowName="add-address">
        <Form
          title="Add Filler Address"
          action={addAddress}
          fields={[
            {
              label: "Enter Name",
              name: "name",
              placeholder: "Name",
            },
            {
              label: "Enter Filler Address",
              name: "fillerAddress",
              placeholder: "Filler Address",
            },
          ]}
          onCloseModal={() => {
            // will be replaced by onCloseModal coming from cloneElement in Modal
            return;
          }}
          submitText="Add"
        />
      </Modal.Window>
    </Modal>
  );
}

export default AddAddress;
