interface FormField {
  label: string;
  name: string;
  placeholder?: string;
  defaultValue?: string;
}

interface FormProps {
  title: string;
  fields: FormField[];
  onSubmit?: (event?: React.FormEvent) => void;
  onCloseModal?: () => void;
  action?: (formData: FormData) => void;
  submitText?: string;
  className?: string;
}

const Form = ({
  title,
  fields,
  onSubmit,
  onCloseModal,
  action,
  submitText = "Submit",
  className = "bg-white rounded-lg max-w-md space-y-6",
}: FormProps) => {
  return (
    <form
      onSubmit={() => {
        onCloseModal?.();
        onSubmit?.();
      }}
      action={action}
      className={className}
    >
      <h2 className="text-xl font-semibold text-gray-800">{title}</h2>

      {fields.map((field) => (
        <div key={field.name}>
          <label className="text-sm mb-1 inline-block" htmlFor={field.name}>
            {field.label}
          </label>
          <input
            type="text"
            name={field.name}
            id={field.name}
            placeholder={field.placeholder}
            defaultValue={field.defaultValue}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 text-gray-800"
          />
        </div>
      ))}

      <button
        type="submit"
        className="!mt-7 w-full px-4 py-2 text-white bg-gray-600 hover:bg-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-white"
      >
        {submitText}
      </button>
    </form>
  );
};

export default Form;
