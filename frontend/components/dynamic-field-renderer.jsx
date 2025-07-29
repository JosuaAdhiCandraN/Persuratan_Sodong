import { ShortAnswerField } from "./form-fields/short-answer-field";
import { LongAnswerField } from "./form-fields/long-answer-field";
import { DateField } from "./form-fields/date-field";
import { DateNowField } from "./form-fields/date-now-field";
import { SelectField } from "./form-fields/select-field";
import { SearchField } from "./form-fields/search-field";

export function DynamicFieldRenderer({ field, value, onChange, onSearch }) {
  const commonProps = {
    label: field.label,
    name: field.name,
    value: value || "",
    onChange,
    required: field.required,
    placeholder: field.placeholder,
  };

  switch (field.type) {
    case "short_answer":
      return <ShortAnswerField {...commonProps} />;

    case "long_answer":
      return <LongAnswerField {...commonProps} />;

    case "date":
      return <DateField {...commonProps} />;

    case "date_now":
      return <DateNowField {...commonProps} />;

    case "select":
      return <SelectField {...commonProps} options={field.options} />;

    case "search":
      return <SearchField {...commonProps} onSearch={onSearch} />;

    default:
      return <ShortAnswerField {...commonProps} />;
  }
}
