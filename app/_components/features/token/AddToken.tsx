"use client";

import Modal from "@/app/_components/Modal";
import Image from "next/image";
import Form from "@/app/_components/Form";
import { addToken } from "@/app/_lib/actions";

interface AddTokenProps {
  addressId: string;
  chainIdentifier: string;
}

function AddToken({ addressId, chainIdentifier }: AddTokenProps) {
  return (
    <Modal>
      <Modal.Open windowName="add-token">
        <button className="hover:bg-stone-200 w-full flex items-center justify-center gap-2 px-4 py-2 border border-stone-300 rounded-md">
          <Image src="/plus.svg" alt="add" width={16} height={16} />
          <span>Add Token</span>
        </button>
      </Modal.Open>

      <Modal.Window windowName="add-token">
        <Form
          title="Add Token"
          action={addToken.bind(null, addressId, chainIdentifier)}
          fields={[
            {
              label: "Enter Name",
              name: "name",
              placeholder: "Name",
            },
            {
              label: "Enter Token Address",
              name: "tokenAddress",
              placeholder: "Token Address",
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

export default AddToken;
