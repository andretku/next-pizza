"use client";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  CheckoutSidebar,
  Container,
  Title,
  CheckoutAddressForm,
  CheckoutCart,
  CheckoutPersonalForm,
  Checkbox,
} from "@/shared/components";
import { CheckoutFormValues, checkoutFormSchema } from "@/shared/constants";
import { useCart } from "@/shared/hooks";
import { createOrder } from "@/app/actions";
import toast from "react-hot-toast";
import React from "react";
import { useSession } from "next-auth/react";
import { Api } from "@/shared/services/api-client";
import { Check, CheckSquare } from "lucide-react";

export default function CheckoutPage () {
  const [submitting, setSubmitting] = React.useState(false);
  const { totalAmount, updateItemQuantity, items, removeCartItem, loading } = useCart();
  const { data: session } = useSession();

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema), // * функция валидации -> используем спец библиотеку
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      phone: "",
      address: "",
      comment: "",
    },
  });

  // TODO не работает автоматич заполнение полей юзера в корзине, ошибка 500 - не нашел причину
  // React.useEffect(() => {
  //   async function fetchUserInfo () {
  //     try {
  //       const data = await Api.auth.getMe();
  //       const [firstName, lastName] = data.fullName.split(" ");
  //       form.setValue("firstName", firstName);
  //       form.setValue("lastName", lastName);
  //       form.setValue("email", data.email);
  //     } catch (error) {
  //       console.log("[ERROR FETCH USER]", error);
  //     }
  //   }

  //   if (session) {
  //     fetchUserInfo();
  //   }
  // }, [session]);

  const onSubmit = async (data: CheckoutFormValues) => {
    try {
      setSubmitting(true);

      const url = await createOrder(data);

      toast.error("Заказ успешно оформлен! 📝 Переход на оплату... ", {
        icon: "✅",
      });

      if (url) {
        location.href = url;
      }
    } catch (err) {
      console.log(err);
      setSubmitting(false);
      toast.error("Не удалось создать заказ", {
        icon: "❌",
      });
    }
  };

  const onClickCountButton = (id: number, quantity: number, type: "plus" | "minus") => {
    const newQuantity = type === "plus" ? quantity + 1 : quantity - 1;
    updateItemQuantity(id, newQuantity);
  };

  const [delivery, setDelivery] = React.useState(true);
  const onCheckedChange = () => {
    setDelivery((prev) => !prev);
  };

  return (
    <Container className="mt-10">
      <Title text="Оформление заказа" className="font-extrabold mb-8 text-[36px]" />

      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex gap-10">
            {/* Левая часть */}
            <div className="flex flex-col gap-10 flex-1 mb-20">
              <CheckoutCart
                onClickCountButton={onClickCountButton}
                removeCartItem={removeCartItem}
                items={items}
                loading={loading}
              />

              <CheckoutPersonalForm
                className={loading ? "opacity-40 pointer-events-none" : ""}
              />

              <div className="flex items-center space-x-3">
                <Checkbox
                  onCheckedChange={onCheckedChange}
                  checked={delivery}
                  value="delivery"
                  className="rounded-[8px] w-6 h-6 border border-gray-400"
                  id="checkbox-delivery"
                />
                <label
                  htmlFor="checkbox-delivery"
                  className="leading-none cursor-pointer"
                >
                  доставка
                </label>
              </div>

              <CheckoutAddressForm
                delivery={delivery}
                className={loading ? "opacity-40 pointer-events-none" : ""}
              />
            </div>

            {/* Правая часть */}
            <div className="w-[450px]">
              <CheckoutSidebar
                delivery={delivery}
                totalAmount={totalAmount}
                loading={loading || submitting}
              />
            </div>
          </div>
        </form>
      </FormProvider>
    </Container>
  );
}
