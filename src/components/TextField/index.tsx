import { ComponentPropsWithRef, forwardRef } from "react";
import { ErrorText, Input } from "./styles";

type Props = {
  id: string;
  label?: string;
  error?: string;
} & ComponentPropsWithRef<"input">;

export const TextField = forwardRef<HTMLInputElement, Props>(
  (props: Props, ref) => {
    return (
      <div>
        <label htmlFor={props.id}>{props.label}</label>
        <Input {...props} ref={ref} />
        <ErrorText data-testid={`error-${props.id}`}>{props.error}</ErrorText>
      </div>
    );
  }
);

export default TextField;
