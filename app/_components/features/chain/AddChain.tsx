"use client";

import Image from "next/image";
import Modal from "@/app/_components/Modal";
import Form from "@/app/_components/Form";
import { addChain } from "@/app/_lib/actions";

interface AddTokenProps {
  addressId: string;
}

function AddChain({ addressId }: AddTokenProps) {
  return (
    <Modal>
      <Modal.Open windowName="add-chain">
        <button className="border border-dashed border-stone-300 flex flex-col gap-3 items-center hover:bg-stone-200 px-5 py-4 rounded-lg">
          <Image src="/plus.svg" alt="Add" height={24} width={24} />
          <span>Add Chain</span>
        </button>
      </Modal.Open>

      <Modal.Window windowName="add-chain">
        <Form
          title="Add Chain"
          action={addChain.bind(null, addressId)}
          fields={[
            {
              label: "Enter Name",
              name: "name",
              placeholder: "Name",
            },
            {
              label: "Enter Chain ID",
              name: "chainId",
              placeholder: "Chain ID",
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

export default AddChain;
