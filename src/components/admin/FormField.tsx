import type {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";

const fieldClassName =
  "w-full rounded-lg bg-surface-container-lowest border border-outline-variant/20 px-4 py-3 text-on-surface placeholder:text-on-tertiary-container/50 focus:outline-none focus:border-secondary transition-colors";

const labelClassName =
  "block text-xs font-headline font-bold uppercase tracking-widest text-on-tertiary-container mb-2";

type FieldProps = {
  label: string;
  htmlFor: string;
  children: ReactNode;
  hint?: string;
};

export function Field({ label, htmlFor, children, hint }: FieldProps) {
  return (
    <div>
      <label htmlFor={htmlFor} className={labelClassName}>
        {label}
      </label>
      {children}
      {hint ? <p className="mt-2 text-xs text-on-tertiary-container">{hint}</p> : null}
    </div>
  );
}

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  hint?: string;
};

export function TextInput({ label, id, hint, className = "", ...props }: InputProps) {
  const inputId = id ?? props.name;
  return (
    <Field label={label} htmlFor={inputId ?? ""} hint={hint}>
      <input id={inputId} className={`${fieldClassName} ${className}`} {...props} />
    </Field>
  );
}

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  hint?: string;
};

export function TextArea({ label, id, hint, className = "", ...props }: TextAreaProps) {
  const inputId = id ?? props.name;
  return (
    <Field label={label} htmlFor={inputId ?? ""} hint={hint}>
      <textarea id={inputId} className={`${fieldClassName} ${className}`} {...props} />
    </Field>
  );
}

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  options: { label: string; value: string }[];
};

export function SelectField({ label, id, options, className = "", ...props }: SelectProps) {
  const inputId = id ?? props.name;
  return (
    <Field label={label} htmlFor={inputId ?? ""}>
      <select id={inputId} className={`${fieldClassName} ${className}`} {...props}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </Field>
  );
}

type CheckboxProps = {
  label: string;
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
};

export function CheckboxField({ label, id, checked, onChange }: CheckboxProps) {
  return (
    <label htmlFor={id} className="flex items-center gap-3 cursor-pointer select-none">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="h-4 w-4 rounded border-outline-variant/40 bg-surface-container-lowest text-secondary focus:ring-secondary"
      />
      <span className="text-sm font-headline font-bold uppercase tracking-wide text-on-surface">
        {label}
      </span>
    </label>
  );
}

export function FormActions({
  children,
  error,
}: {
  children: ReactNode;
  error?: string | null;
}) {
  return (
    <div className="flex flex-col gap-4 pt-2">
      {error ? (
        <p className="text-sm text-red-300 bg-red-950/40 border border-red-500/20 rounded-lg px-4 py-3">
          {error}
        </p>
      ) : null}
      <div className="flex flex-wrap gap-3">{children}</div>
    </div>
  );
}

export function PrimaryButton({
  children,
  disabled,
  type = "submit",
  onClick,
}: {
  children: ReactNode;
  disabled?: boolean;
  type?: "submit" | "button";
  onClick?: () => void;
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className="inline-flex items-center justify-center rounded-lg bg-secondary px-5 py-3 text-sm font-headline font-bold uppercase tracking-wide text-on-secondary hover:opacity-90 disabled:opacity-50 transition-opacity"
    >
      {children}
    </button>
  );
}

export function SecondaryButton({
  children,
  href,
  onClick,
  type = "button",
  disabled,
}: {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
}) {
  const className =
    "inline-flex items-center justify-center rounded-lg border border-outline-variant/30 px-5 py-3 text-sm font-headline font-bold uppercase tracking-wide text-on-surface hover:bg-surface-container-high disabled:opacity-50 transition-colors";

  if (href) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} disabled={disabled} onClick={onClick} className={className}>
      {children}
    </button>
  );
}

export function DangerButton({
  children,
  onClick,
  disabled,
}: {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className="inline-flex items-center justify-center rounded-lg border border-red-500/30 px-5 py-3 text-sm font-headline font-bold uppercase tracking-wide text-red-300 hover:bg-red-950/40 disabled:opacity-50 transition-colors"
    >
      {children}
    </button>
  );
}

export function PageHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
      <div>
        <h1 className="font-headline text-3xl md:text-4xl font-bold tracking-tight text-on-surface">
          {title}
        </h1>
        {description ? (
          <p className="mt-2 text-on-tertiary-container">{description}</p>
        ) : null}
      </div>
      {action}
    </div>
  );
}
