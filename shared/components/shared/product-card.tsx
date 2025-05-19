import { cn } from "@/shared/lib/utils";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui";
import { Title } from "./title";
import { Ingredient } from "@prisma/client";

interface IProductCardProps {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  ingredients: Ingredient[];
  className?: string;
}

export const ProductCard = (props: IProductCardProps) => {
  const { id, name, price, imageUrl, ingredients, className } = props;

  return (
    <div className={cn(className)}>
      <Link href={`/product/${id}`}>
        <div className="flex justify-center p-6 bg-secondary rounded-lg h-[260px]">
          <img className="w-[215px] h-[215px]" src={imageUrl} alt={name} />
        </div>
      </Link>

      <Title text={name} size="sm" className="mb-1 mt-3 font-bold" />

      <p className="text-sm text-gray-400">
        {ingredients.map((ingredient) => ingredient.name).join(", ")}
      </p>

      <div className="flex justify-between items-center mt-4">
        <span className="text-[20px]">
          от <b>{price} ₽</b>
        </span>
        <Link href={`/product/${id}`}>
          <Button variant="secondary" className="text-base font-bold">
            <Plus size={20} className="mr-1" />
            Добавить
          </Button>
        </Link>
      </div>
    </div>
  );
};
