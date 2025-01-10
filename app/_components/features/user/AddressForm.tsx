import { addAddress, editAddress } from "@/app/_lib/actions";
import Form from "@/app/_components/Form";
import config from "@/app/_lib/config.json";
import { findUser } from "@/app/_lib/utils";
import type { UserType } from "@/app/_types/types";

interface AddressFormProps {
  userIdToEdit?: string;
  onCloseModal?: () => void; // will be replaced by onCloseModal coming from cloneElement in Modal
}

function AddressForm({ userIdToEdit, onCloseModal }: AddressFormProps) {
  let userObject: UserType | undefined;
  if (userIdToEdit) {
    userObject = findUser(config, userIdToEdit);
  }

  return (
    <Form
      title={`${userIdToEdit ? "Edit" : "Add"} Filler Address`}
      action={userIdToEdit ? editAddress.bind(null, userIdToEdit) : addAddress}
      fields={[
        {
          label: "Enter Name",
          name: "name",
          placeholder: "Name",
          defaultValue: userIdToEdit ? userObject?.username ?? "" : "",
        },
        {
          label: "Enter Filler Address",
          name: "fillerAddress",
          placeholder: "Filler Address",
          defaultValue: userIdToEdit ? userObject?.fillerAddress ?? "" : "",
        },
      ]}
      onCloseModal={onCloseModal}
      submitText={userIdToEdit ? "Edit" : "Add"}
    />
  );
}

export default AddressForm;
