import { addAddress, editAddress } from "@/app/_lib/actions";
import Form from "@/app/_components/Form";
import config from "@/app/_lib/config.json";
import { findAddress } from "@/app/_lib/utils";
import type { AddressType } from "@/app/_types/types";

interface AddressFormProps {
  addressIdToEdit?: string;
  onCloseModal?: () => void; // will be replaced by onCloseModal coming from cloneElement in Modal
}

function AddressForm({ addressIdToEdit, onCloseModal }: AddressFormProps) {
  let addressObject: AddressType | undefined;
  if (addressIdToEdit) {
    addressObject = findAddress(config, addressIdToEdit);
  }

  return (
    <Form
      title={`${addressIdToEdit ? "Edit" : "Add"} Filler Address`}
      action={
        addressIdToEdit ? editAddress.bind(null, addressIdToEdit) : addAddress
      }
      fields={[
        {
          label: "Enter Name",
          name: "name",
          placeholder: "Name",
          defaultValue: addressIdToEdit ? addressObject?.addressName ?? "" : "",
        },
        {
          label: "Enter Filler Address",
          name: "fillerAddress",
          placeholder: "Filler Address",
          defaultValue: addressIdToEdit
            ? addressObject?.fillerAddress ?? ""
            : "",
        },
      ]}
      onCloseModal={onCloseModal}
      submitText={addressIdToEdit ? "Edit" : "Add"}
    />
  );
}

export default AddressForm;
