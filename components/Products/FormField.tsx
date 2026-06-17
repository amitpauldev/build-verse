import React from "react";

type FromFieldProps = {
	label: string;
	name: string;
	id: string;
	placeholder: string;
	required: boolean;
	onChange: (
		e:
			| React.ChangeEvent<HTMLInputElement>
			| React.ChangeEvent<HTMLTextAreaElement>,
	) => void;
	value?: string;
	error: string[];
	helperText?: string;
	textarea?: boolean;
};

const FormField = ({
	label,
	name,
	id,
	placeholder,
	required,
	onChange,
	value,
	error,
	helperText,
	textarea,
}: FromFieldProps) => {
	return (
		<div className="mb-4">
			<label htmlFor={id} className=" font-medium ">
				{label}
			</label>
			{textarea ? (
				<textarea
					id={id}
					name={name}
					rows={5}
					placeholder={placeholder}
					onChange={onChange}
					value={value}
					required={required}
					className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:ring-2 focus:ring-primary"
				/>
			) : (
				<input
					type="text"
					id={id}
					name={name}
					placeholder={placeholder}
					onChange={onChange}
					value={value}
					required={required}
					className="w-full rounded-lg border border-gray-300 px-4 py-2 mb-1.5 outline-none focus:ring-2 focus:ring-primary"
				/>
			)}
			{helperText && <p className="text-xs text-gray-500">{helperText}</p>}
			{error && <p className="text-sm text-red-500">{error.join(", ")}</p>}
		</div>
	);
};

export default FormField;
