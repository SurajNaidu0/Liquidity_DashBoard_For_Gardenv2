"use client";

import Modal from "@/app/_components/Modal";
import AddTokenForm from "@/app/_components/AddTokenForm";
import Image from "next/image";

function AddTokenModal() {
  return (
    <Modal>
      <Modal.Open windowName="add-token">
        <button className="hover:bg-stone-100 w-full flex items-center justify-center gap-2 px-4 py-2 border rounded-md mt-auto">
          <Image src="/plus.svg" alt="add" width={16} height={16} />
          <span>Add Token</span>
        </button>
      </Modal.Open>

      <Modal.Window windowName="add-token">
        <AddTokenForm
          onCloseModal={() => {
            // will be replaced by onCloseModal coming from cloneElement in Modal
            return;
          }}
        />
      </Modal.Window>
    </Modal>
  );
}

export default AddTokenModal;
