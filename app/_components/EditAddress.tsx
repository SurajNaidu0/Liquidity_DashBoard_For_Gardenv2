"use client";

import Image from "next/image";
import Modal from "@/app/_components/Modal";
import AddressForm from "@/app/_components/AddressForm";

interface EditAddressProps {
  userId: string;
}

function EditAddress({ userId }: EditAddressProps) {
  return (
    <Modal>
      <Modal.Open windowName="edit-address">
        <button className="ml-auto hover:bg-slate-700 flex items-center gap-2 bg-slate-600 text-white px-4 py-2 rounded-md">
          <Image src="/pencil-line.svg" alt="Edit" height={20} width={20} />
          <span>Edit</span>
        </button>
      </Modal.Open>

      <Modal.Window windowName="edit-address">
        <AddressForm userIdToEdit={userId} />
      </Modal.Window>
    </Modal>
  );
}

export default EditAddress;
