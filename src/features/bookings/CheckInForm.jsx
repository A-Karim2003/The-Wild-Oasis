"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Label } from "@/components/ui/label";

export function CheckInForm() {
  return (
    <FieldGroup>
      <FieldLabel>
        <Field orientation="horizontal">
          <Checkbox id="terms-checkbox" name="terms-checkbox" />
          <Label htmlFor="terms-checkbox">
            Want to add breakfast for $450.00?
          </Label>
        </Field>
      </FieldLabel>

      <FieldLabel>
        <Field orientation="horizontal">
          <Checkbox
            id="terms-checkbox-2"
            name="terms-checkbox-2"
            defaultChecked
          />
          <FieldLabel htmlFor="terms-checkbox-2">
            I confirm that rises sky has paid the total amount of $4,200.00
          </FieldLabel>
        </Field>
      </FieldLabel>
    </FieldGroup>
  );
}
