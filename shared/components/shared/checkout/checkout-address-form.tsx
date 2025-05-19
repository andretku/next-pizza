"use client";

import React from "react";
import { WhiteBlock } from "../white-block";
import { FormInput, FormTextarea } from "../form";
import { AdressInput } from "../address-input";
import { Controller, useFormContext } from "react-hook-form";
import { ErrorText } from "../../ui";

interface Props {
  delivery: boolean;
  className?: string;
}

export const CheckoutAddressForm: React.FC<Props> = ({ delivery, className }) => {
  const { control } = useFormContext();

  return delivery ? (
    <WhiteBlock title="3. Адрес доставки" className={className}>
      <div className="flex flex-col gap-5">
        {/* в Controller оборачиваются компоненты, которые не являются контролируемыми (AddressInput - это "левый" компонент) */}
        <Controller
          control={control}
          name="address"
          render={({ field, fieldState }) => (
            <>
              <AdressInput onChange={field.onChange} />
              {fieldState.error?.message && <ErrorText text={fieldState.error.message} />}
            </>
          )}
        />

        <FormTextarea
          name="comment"
          className="text-base"
          placeholder="Комментарий к заказу"
          rows={5}
        />
      </div>
    </WhiteBlock>
  ) : (
    <WhiteBlock title="3. Забрать из пиццерии" className={className}>
      <div className="flex flex-col gap-5">
        <FormInput
          name="pizzeria"
          className="text-base"
          placeholder="Список пиццерий"
          disabled
        />
        <FormInput
          name="date"
          className="text-base"
          placeholder="Дата, к которому приготовить"
          type="datetime-local"
          required
        />
        <FormTextarea
          name="comment"
          className="text-base"
          placeholder="Комментарий к заказу"
          rows={5}
        />
      </div>
    </WhiteBlock>
  );
};
