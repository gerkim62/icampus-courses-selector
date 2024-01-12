"use client";

import { useFormStatus } from "react-dom";

type Props = {
  pendingText?: string;
  defaultText?: string;
};

const SubmitButton = ({
  pendingText = "Submitting...",
  defaultText = "Submit",
}: Props) => {
  const { pending } = useFormStatus();
  return (
    <button
      className={`py-2 px-4 rounded font-semibold bg-emerald-600 hover:bg-emerald-700 text-white transition duration-300 `}
      disabled={pending}
    >
      {pending ? pendingText : defaultText}
    </button>
  );
};

export default SubmitButton;
